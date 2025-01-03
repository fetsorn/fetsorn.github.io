# Select Core
## old
 - function signatures
 - steps in pdl
 - memory efficiency
 - process efficiency
 - data structures

yeah. so right now I have four record streams, four tablet streams and four pure line functions. four strategies.
low level design in program design language for every component

today's thought is that the lines are also a strategy of sorts. every level kind of forms the collection and then iterates on it with the transformer of the next level, and does other io. there's three iterations, queries, tablets and lines, with the step being a reducer function that is the only one that acts on just values, just a key value pair and state. so i'd put all extra state in to a strategy step, not just the tablet, and have one general recursive function. what if I could describe that?

so csvs-lib is the library for playing with csvs datasets. It currently provides four methods - select, update, insert and delete, each with the same API of a transform web stream factory asking for fs and dir. each method is currently implemented in the same style of constant memory and nested streams. A top-level record stream accepts a query record and returns a record. It builds a list of tablets from each query - a strategy, - and builds a pipeline of tablet streams. A tablet stream accepts a query record and returns a record. It streams lines from the tablet and optionally calls a reducer on each line to transform state and form records for output. A reducer function accepts the strategy step, the record and some state to step through each line. During reduce multiple records are queued in the tablet stream, passed to record stream and queued there for consumption.

the select record stream asks for select strategy and pipes it through select tablet streams. select tablet stream calls the select reducer which searches the record for values that match the line, signals a match and transforms the record.

the update record stream asks for update strategy and pipes it through update tablet streams. update tablet stream calls the update reducer which searches the record for values that match the line, signals a match and passes novel records to a stream that writes them as lines.

the insert record stream asks for insert strategy and pipes it through insert tablet streams. insert tablet stream writes the records as lines at the end of the tablet. at the end of the record stream the tablet content is grouped to a valid form by sorting.

the delete record stream asks for delete strategy and pipes it through delete tablet streams. delete tablet stream calls the delete reducer to match the record and prune lines that are written to the file.

walk the tablets one line at a time in parallel

this describes an algorithm to query csvs datasets that does not cache the dataset into memory but keeps search results in memory

algo is divided into shell and core

The shell has access to i/o, the core has no access to i/o

The core is a pure function that maps a struct and a string to a struct

Together, core and shell search csvs tablets

The shell is an execution environment and the core is a reducer function

The shell passes one line at a time to the core along with return value of previous call to the core

The shell may choose to implement a pipeline of streams, eagerly passing values to the next tablet. O(1) memory

Otherwise the shell caches values, O(n) memory

The shell must sort the tablet before passing lines to the core

This enables support for array semantics

Shell should follow the order of tablets recommended by initial call to the core

Otherwise shell can parse all tablets in a loop until core completes

The core is a reducer function that transforms an intermediary data structure by enriching it with data from a tablet line

The data structure holds the algorithm state, among others

- name of tablet

- thing branch

- thing column

- trait branch

- trait column

- query record

- previous key

- push toggle

The core searches the line for thing by trait using regex from the query object and replaces the query thing field with found value

The core replaces A when it encounters B and knows the sorted array batch is complete

if line has duplicate key, array, core pushes found value to thing field instead of replacing. if previous step has the same key, thing and trait

if previous step has different key the previous directive is returned with push toggle and replaced value in query object, shell pushes record to next tablet stream or stores in memory

If shell implements streams it's O(1) memory multiplied by number of parallel streams

without streams it's O(n) memory

Computationally it's O(n)

Core can implement boyer-moore variant and direct shell to skip lines for O(n)

query syntax now is js regex, will be rust regex

Update and delete algos are naive shell code now, can use core to edit sorted too.

### Strategy

strategy is a function that accepts schema, record, and returns the list of tablets.

 - strategy: schema -> record -> List Tablet
 - strategy: JSON -> JSON -> List Tablet 

Tablet
- filename: string
- trait: string
- thing: string
- traitIsFirst: bool 
- traitIsRegex: bool
- thingIsFirst: bool
- accumulating: bool
- eager: bool
- passthrough: bool
- querying: bool

```pdl
search schema for base
if no base 
    panic
search schema for trunk of each branch
if select
    if base is _
        list with one element
        filename: _-_.csv
        thing: _
        trait: _
        thing is first: false
        trait is first: true
    if only base
        for trunk of base 
            filename: trunk-base.csv
            thing: base
            trait: trunk
            thing is first: false
            trait is first: false
            trait is regex: true
            eager: true
            accumulating: true
        for each leaf of base
            filename: base-leaf.csv
            thing: base
            trait: base
            thing is first: true
            trait is first: true
            trait is regex: true
            accumulating: true
            eager: true
    else
        for each queried key in ascending order minus the base
            filename: trunk-branch.csv
            thing: trunk
            trait: branch
            thing is first: true
            trait is first: false
            traitIsRegex: true
            querying: true
            eager: true
        for each branch connected to base
            filename: trunk-branch.csv
            thing: branch
            trait: trunk
            thing is first: false
            trait is first: true
            eager: trunk === base
            passthrough: true
if update
    for each branch connected to base
        filename: trunk-branch.csv
if delete
    for trunk of base 
        filename: trunk-base.csv
        trait: baseValue
        trait is first: false
    for each leaf of base
        filename: base-leaf.csv
        trait: baseValue
        trait is first: true
if insert
    for each branch connected to base
        filename: trunk-branch.csv
else
   panic
```

### Core

core is a function that accepts the record, tablet, key, value and returns the record.

 - core: record -> Tablet -> key -> value -> record
 - core: JSON -> Tablet -> String -> String -> JSON


```pdl
if select
    if base is thing
        if base is _
            set leaves to trait
        else if base is regex
            if base value matches trait
                set thing to base
        else if trait is leaf
            for each leaf item
                if leaf value matches trait
                    add leaf value to leaf
        else trait is trunk 
             set thing to base 
    else if base is trait
        if base value matches trait
            add thing to leaf
    else if trait is object
        for each trunk item
            if trunk value matches trait
                add thing to leaf
    else
        for each leaf
            for each item
               call core
               if item matches
                   add item to key
else if update
    for each relation TODO: rewrite to not use relations and lines
        if is between
            return line
else if delete
or insert
    return record
    return record
else 
    panic
```
### Shell

tablet is a function that accepts the record, tablet, fs, dir and returns the record and IO.

 - shell: record -> Tablet -> fs -> dir -> IO Record -> IO 
 - shell: JSON -> Tablet -> FS -> String -> enqueue -> IO

can use streams, asynchronous iterators, for loops, threads.

TODO: add the last line after iteration

```pdl
run strategy
instantiate FS
for each tablet of strategy
    if accumulating 
        if has record
            forward
        assign initial record
        assign current record
        assign match map
    for each line of filename
        if querying 
            assign complete to current without trait
        else
            assign complete to current
        if eof and select 
            if tablet is not eager or if eager matched
                enqueue complete
                return
        if eof and select and tablet is eager or not matched
        or empty line
            enqueue empty
            return
        if eof and update
            assign fst undefined
        else
            parse line
        if key matches first
            assign first is new false
        else
            assign first is new true
        if eager and first is new and select
            assign chosen to initial
        else
            assign chosen to current
        if update
            if first is new
                call core with chosen
            else 
                assign empty state
        else
            call core with chosen
        assign current
        if eager and first is not new and is match or is previous match and select
            assign is match true TODO: unravel this
        else 
            assign is match false
        if eager and first is new and previous is match
            enqueue initial, current, first, is match, complete
        else
            enqueue initial, current, first, is match
        if delete and trait is first and first matches trait
        or delete trait is second and second matches trait
        or delete and no match
        or update and line complete
            enqueue line
        else if delete
            enqueue undefined
        if record complete and select
            if accumulating
                assign new match to map value undefined
            else 
                assign new match true
            if new match
                enqueue record
                set match
            delete record
        if update and new relations has key TODO: remove relations and make sense of match partial
            enqueue lines
        assign first
        assign is match
    if passthrough and no match
        enqueue record
    if accumulating
        enqueue record and match map
    if update or delete
        for each line in queue
            append line to tmp
        write tmp to filename
    if insert
        for each relation in record
            return key,value
        append line to filename
```

To learn more about the architecture of csvs, see the [Requirements](./requirements.md).


## new
### sow
Entry -> Grain -> Trait -> Thing -> Entry

puts one field from Grain into Record

Entry is a JSON in Entry Object Notation

grain is a record with only _ field, base field and leaf field.

Trait and Thing are Strings

Trait is the branch what we look for, Thing is the branch we insert

sow will find a place in Record that has the same value of Trait as Grain, and insert a Thing nearby.

how it can tell whether to insert the thing as leaf or trunk is beyond me. i guess it assumes thing is always leaf of trait? 

```pdl
base = record._

if base equals thing
  append grain.thing to record.thing
if base equals trait
  append grain.thing to record.thing
if record has trait
  for each item of record.trait
    if item.trait equals grain.trait
      append grain.thing to item.thing
otherwise 
  for each field of record
    for each item of record.field
      sow grain to item
```

### mow
Entry -> Trait -> Thing -> List Grain

Break Record down into grains of Trait and Thing

Entry is a JSON in Entry Object Notation

grain is a record with only _ field, base field and leaf field.

Trait and Thing are Strings

Trait is the branch what we look for, Thing is the branch we insert

mow will find all individual trait-thing relations in the record

```pdl
base = record._

<!-- TODO: weird trait/thing mix here -->
if base equals thing
  for each item of record.trait
    return { _: base, base: record.base, trait: item.trait }
<!-- TODO: weird trait/thing mix here -->
if base equals trait
  for each item of record.thing
    return { _: base, base: record.base, thing: item.thing }
if record has trait
  for each trunk of record.trait
    for each leaf of item.thing
      return { _: trait, trait: trunk, thing: leaf }
otherwise 
  for each field of record
    mow each item of record.field
```

### to schema
Entry -> Schema

Entry is a JSON in Entry Object Notation

Schema is Map Branch Connection 

Branch is string name of a given branch

Connection is { trunks: List Trunk, leaves: List Leaf }

Leaf is string name of a leaf

Trunk is string name of the trunk of Leaf

```pdl
validate that entry has `_:_` 
for each trunk of entry except _
  for each leaf of entry.trunk
    append trunk to schema.leaf.trunks
    append leaf to schema.trunk.leaves
return schema
```
### is connected
Schema -> Base -> Branch -> Boolean

This tells if a branch is connected to base branch.

Schema is Map Branch Connection 

Branch is string name of a given branch

Connection is { trunks: List Trunk, leaves: List Leaf }

Leaf is string name of a leaf

Trunk is string name of the trunk of Leaf

Base is string name of base branch

```pdl
if branch equals base
  return true
for each trunk of branch
  if trunk equals base
    return true
  if trunk is connected to base
    return true
otherwise
  return false
```

### find crown
Schema -> Base -> List Branch

This finds all branches that are connected to the base branch.

Schema is Map Branch Connection 

Branch is string name of a given branch

Connection is { trunks: List Trunk, leaves: List Leaf }

Leaf is string name of a leaf

Trunk is string name of the trunk of Leaf

```pdl
if leaf is connected to base
  return leaf
```

### select strategy
Schema -> Query -> List Tablet

This describes all tablets needed to update an entry

Schema is Map Branch Connection 

Branch is string name of a given branch

Connection is { trunks: List Trunk, leaves: List Leaf }

Leaf is string name of a leaf

Trunk is string name of the trunk of Leaf

Entry is a JSON in Entry Object Notation

Tablet is { 
  filename: String, 
  thing: String,
  trait: String, 
  thing is first: Boolean,
  trait is first: Boolean,
  base: String,
  passthrough: Boolean,
  eager: Boolean,
  accumulating: Boolean,
  trait is regex: Boolean,
  querying: Boolean,
}

```pdl
base = query._
if base equals _
  return {
    thing: _,
    trait: _,
    thing is first: false,
    trait is first: true,
    filename: _-_.csv,
  }
queried = gather keys sorted ascending with schema
if queried.length > 0
  for each branch of queried
    for each trunk of schema[branch].trunks
      append {
        thing: trunk,
        trait: branch,
        thing is first: true,
        trait is first: false,
        base: trunk,
        filename: trunk-branch.csv,
        trait is regex: true,
        querying: true,
        eager: true,
      }
otherwise
  for each trunk of schema[base].trunks
    append {
      thing: base,
      trait: trunk,
      thing is first: false,
      trait is first: false,
      base: trunk,
      filename: trunk-base.csv,
      trait is regex: true,
      eager: true,
      accumulating: true,
    }
  for each leaf of schema[base].leaves
    append {
      thing: base,
      trait: base
      thing is first: true,
      trait is first: true,
      base: base, 
      filename: base-leaf.csv,
      trait is regex: true,
      accumulating: true,
      eager: true,
    }
crown = find crown with schema, base sorted descending
for each branch of crown
  for each trunk of schema[branch].trunks
    if trunk is connected with schema, base
      append {
        thing: branch,
        trait: trunk,
        thing is first: false,
        trait is first: true,
        base: trunk,
        filename: trunk-branch.csv,
        passthrough: true,
        eager: if trunk equals base then true,
      }
```
### drop stream
State -> Line -> Void

State is {
  query: Query,
  entry: Entry,
  fst: String,
  isMatch: Boolean,
  hasMatch: Boolean,
  matchMap: Map String Boolean,
  thingQuerying: String,
}

Query is a JSON in Query Object Notation

Entry is a JSON in Entry Object Notation

Line is a String in CSVS file format

```pdl
do nothing
```
### forward stream
State -> Line -> State

State is {
  query: Query,
  entry: Entry,
  fst: String,
  isMatch: Boolean,
  hasMatch: Boolean,
  matchMap: Map String Boolean,
  thingQuerying: String,
}

Query is a JSON in Query Object Notation

Entry is a JSON in Entry Object Notation

Line is a String in CSVS file format

```pdl
at the start
  enqueue {
    query: state.query,
    entry: state.entry,
  }
do nothing
```
### initial state
State -> Tablet -> State

State is {
  query: Query,
  entry: Entry,
  fst: String,
  isMatch: Boolean,
  hasMatch: Boolean,
  matchMap: Map String Boolean,
  thingQuerying: String,
}

Query is a JSON in Query Object Notation

Entry is a JSON in Entry Object Notation

Tablet is { 
  filename: String, 
  thing: String,
  trait: String, 
  thing is first: Boolean,
  trait is first: Boolean,
  base: String,
  passthrough: Boolean,
  eager: Boolean,
  accumulating: Boolean,
  trait is regex: Boolean,
  querying: Boolean,
}

```pdl
same base = tablet.querying and tablet.base === query._
fallback entry = { _: tablet.base } if same base otherwise entry
initial entry = sow { _: tablet.base } with entry, tablet.base, entry._ if tablet.querying and not same base otherwise fallback entry
initial thing = undefined if entry._ not equal initial entry._ otherwise thing
value tablet = not tablet.accumulating and not tablet.querying
accumulating by trunk = tablet.accumulating and not tablet.thing is first
initial query = initial entry if value tablet or accumulating by trunk otherwise query
return {
  query: initial query,
  entry: initial entry,
  fst: undefined,
  match: false,
  has match: false,
  map: map,
  thing: initial thing,
}
```
### line state
State -> State -> Tablet -> List Grain -> Trait -> Thing -> State

State is {
  query: Query,
  entry: Entry,
  fst: String,
  isMatch: Boolean,
  hasMatch: Boolean,
  matchMap: Map String Boolean,
  thingQuerying: String,
}

Query is a JSON in Query Object Notation

Entry is a JSON in Entry Object Notation

Tablet is { 
  filename: String, 
  thing: String,
  trait: String, 
  thing is first: Boolean,
  trait is first: Boolean,
  base: String,
  passthrough: Boolean,
  eager: Boolean,
  accumulating: Boolean,
  trait is regex: Boolean,
  querying: Boolean,
}

Grain is a record with only _ field, base field and leaf field.

Trait is String that we look for

Thing is String we insert

```pdl
new grain = {
  _: tablet.trait,
  tablet.trait: trait,
  tablet.thing: thing,
}

new grains = for each grain in grains
  match grain = grain[tablet.trait].test(trait) if tablet.trait is regex otherwise grain[tablet.trait] equals trait
  match querying = tablet.querying and has initial.thing
  match = match grain or match querying
  new match = no state.map or no thing in state.map
  state.match = state.match if state.match otherwise match and new match
  state.thing = thing if tablet.querying and state.match
  state.map.thing = true if tablet.accumulating and match and new match
  state.has match = state.has match if state.has match otherwise state.match
  if match and new match
    return new grain
state.entry = reduce new grains to sow state.entry with grain, tablet.trait, tablet.thing
state.query = reduce state.query to grain, tablet.trait, tablet.thing if tablet.querying
return state
```
### parse line stream
State -> Tablet -> Line -> State

State is {
  query: Query,
  entry: Entry,
  fst: String,
  isMatch: Boolean,
  hasMatch: Boolean,
  matchMap: Map String Boolean,
  thingQuerying: String,
}

Query is a JSON in Query Object Notation

Entry is a JSON in Entry Object Notation

Tablet is { 
  filename: String, 
  thing: String,
  trait: String, 
  thing is first: Boolean,
  trait is first: Boolean,
  base: String,
  passthrough: Boolean,
  eager: Boolean,
  accumulating: Boolean,
  trait is regex: Boolean,
  querying: Boolean,
}

Line is a String in CSVS file format

```pdl
initial = initial state with state, tablet
grains = mow query with tablet.trait, tablet.thing
for each line
  fst,snd = parse line
  fst is new = state.fst not equals fst
  state.fst = fst;
  if state.match and tablet.eager and fst is new
    enqueue {
      query: state.query,
      entry: state.entry,
      thing: state.thing,
    }
    state.entry = initial.entry
    state.query = initial.query
    state.match = initial.match
  trait = fst if tablet.trait is first otherwise snd
  thing = fst if tablet.thing is first otherwise snd
  state = line state with initial, state, tablet, grains, trait, thing
if not tablet.eager or state.match
  enqueue {
    query: state.query,
    entry: state.entry,
    thing: state.thing,
  }
if tablet.accumulating
  enqueue {
   query: state.query,
   entry: initial.entry,
   map: state.map,
  }
else if tablet.passthrough and not state.has match
  enqueue {
    query: state.query,
    entry: state.entry,
  }
```
### select line stream
State -> Tablet -> State

State is {
  query: Query,
  entry: Entry,
  fst: String,
  isMatch: Boolean,
  hasMatch: Boolean,
  matchMap: Map String Boolean,
  thingQuerying: String,
}

Query is a JSON in Query Object Notation

Entry is a JSON in Entry Object Notation

Tablet is { 
  filename: String, 
  thing: String,
  trait: String, 
  thing is first: Boolean,
  trait is first: Boolean,
  base: String,
  passthrough: Boolean,
  eager: Boolean,
  accumulating: Boolean,
  trait is regex: Boolean,
  querying: Boolean,
}

```pdl
if tablet.passthrough and state.map
  return drop stream
if tablet.accumulating and no state.map
  return forward stream
otherwise
  return parse line stream
```
### select tablet stream
FS -> Dir -> Tablet

FS is input output interface to the file system

Dir is String of a path to open in FS

Tablet is { 
  filename: String, 
  thing: String,
  trait: String, 
  thing is first: Boolean,
  trait is first: Boolean,
  base: String,
  passthrough: Boolean,
  eager: Boolean,
  accumulating: Boolean,
  trait is regex: Boolean,
  querying: Boolean,
}

```pdl
filepath = dir/tablet.filename
if tablet.filename equals _-_.csv
  pipe filepath
    to select schema stream
    to return
otherwise
  pipe filepath
    to select line stream
    to return
```
### leader stream
Base -> Query -> State -> State

State is {
  query: Query,
  entry: Entry,
  fst: String,
  isMatch: Boolean,
  hasMatch: Boolean,
  matchMap: Map String Boolean,
  thingQuerying: String,
}

Query is a JSON in Query Object Notation

Entry is a JSON in Entry Object Notation

```pdl
if state.entry._ equals base 
  base = state.entry._
if query.__ 
  entry = state.query[query.__]
otherwise
  entry = state.entry
enqueue entry
```
### select stream
FS -> Dir -> Query -> List Entry

FS is input output interface to the file system

Dir is String of a path to open in FS

Query is a JSON in Query Object Notation

Entry is a JSON in Entry Object Notation

```pdl
base = query._
if base not equals _
  schema = select schema
strategy = select strategy with schema, query
for each tablet of strategy
  append select tablet stream
pipe query
  to each update tablet stream
  to leader stream
  to return
```
### select in dataset
FS -> Dir -> List Query -> List Entry

FS is input output interface to the file system

Dir is String of a path to open in FS

Query is a JSON in Query Object Notation

Entry is a JSON in Entry Object Notation

<!-- TODO rename record object notation to entry object notation -->
```pdl
pipe each query 
  to select stream 
  to return
```
### select schema
FS -> Dir -> Schema

FS is input output interface to the file system

Dir is String of a path to open in FS

Schema is Map Branch Connection 

Branch is string name of a given branch

Connection is { trunks: List Trunk, leaves: List Leaf }

Leaf is string name of a leaf

Trunk is string name of the trunk of Leaf

<!-- TODO rename schema to trunkToLeaf -->
```pdl
select in dataset { _: _ }
first result to schema
return schema
```
### update strategy
Schema -> Entry -> List Tablet

This describes all tablets needed to update an entry

Schema is Map Branch Connection 

Branch is string name of a given branch

Connection is { trunks: List Trunk, leaves: List Leaf }

Leaf is string name of a leaf

Trunk is string name of the trunk of Leaf

Entry is a JSON in Entry Object Notation

Tablet is { 
  filename: String, 
  trunk: String, 
  branch: String 
}

```pdl
base = entry._
crown = find crown with schema, base
if base equals _
  return [{
    filename: _-_.csv
  }]
for each branch of crown
  for each trunk of schema.branch.trunks
    return {
      filename: trunk-branch.csv,
      trunk,
      branch,
    }
```
### update schema stream
Entry -> Line

Entry is a JSON in Entry Object Notation

Line is a String in CSVS file format

```pdl
for each field of entry
  for each leaf of entry.field
    enqueue field,leaf
```
### update line stream
Entry -> Tablet -> Line -> Line

Entry is a JSON in Entry Object Notation

Tablet is { 
  filename: String, 
  trunk: String, 
  branch: String 
}

Line is a String in CSVS file format

```pdl
grains = mow query with tablet.trunk, tablet.branch
keys = map grain to grain[tablet.trunk] sorted
values = reduce grains to { grain[tablet.trunk]: grain[tablet.branch] }
for each line
  fst, snd = parse line
  fst is new = state.fst is undefined or state.fst not equal fst
  if fst is new and state.match
    for each value of values[state.fst]
      enqueue state.fst,value
    keys = filter keys where key not equal state.fst
  if fst is new
    between = filter keys where key is after state.fst and before fst
    for each key of between
      for each value of values[key]
        enqueue key,value
      keys = filter keys where key not equal state.fst
  if keys not include fst
    enqueue line
  state = { fst, match }
for key of keys
  for each value of values[key]
    enqueue key,value
  keys = filter keys where key not equal state.fst
```
### update tablet stream
FS -> Dir -> Schema -> Tablet -> Entry -> IO Entry

FS is input output interface to the file system

Dir is String of a path to open in FS

Schema is Map Branch Connection 

Branch is string name of a given branch

Connection is { trunks: List Trunk, leaves: List Leaf }

Leaf is string name of a leaf

Trunk is string name of the trunk of Leaf

Tablet is { 
  filename: String, 
  trunk: String, 
  branch: String 
}

Entry is a JSON in Entry Object Notation
```pdl
filepath = dir/tablet.filename
// in order to start other tablet streams
enqueue entry 
if tablet.filename equals _-_.csv
  pipe filepath
    to update schema stream
    to temporary file
otherwise
  pipe filepath
    to update line stream
    to temporary file
move temporary file to filepath
```
### update stream
FS -> Dir -> Entry -> List Entry

FS is input output interface to the file system

Dir is String of a path to open in FS

Entry is a JSON in Entry Object Notation

```pdl
schema = select schema
strategy = update strategy with schema, query
for each tablet of strategy
  append update tablet stream
pipe query
  to each update tablet stream
  to return
```
### update in dataset
FS -> Dir -> List Entry -> List Entry

FS is input output interface to the file system

Dir is String of a path to open in FS

Query is a JSON in Query Object Notation

Entry is a JSON in Entry Object Notation

```pdl
pipe each query 
  to update stream 
  to return
```
### insert strategy
Schema -> Entry -> List Tablet

This describes all tablets needed to delete an entry

Schema is Map Branch Connection 

Branch is string name of a given branch

Connection is { trunks: List Trunk, leaves: List Leaf }

Leaf is string name of a leaf

Trunk is string name of the trunk of Leaf

Entry is a JSON in Entry Object Notation

Tablet is { 
  filename: String, 
  trunk: String, 
  branch: String 
}

```pdl
base = entry._
crown = find crown with schema, base
for each branch of crown
  for each trunk of schema.branch.trunks
    return {
      filename: trunk-branch.csv,
      trunk: trunk,
      branch: branch,
    }
```

### insert tablet stream
FS -> Dir -> Schema -> Tablet -> Entry -> IO Entry

FS is input output interface to the file system

Dir is String of a path to open in FS

Schema is Map Branch Connection 

Branch is string name of a given branch

Connection is { trunks: List Trunk, leaves: List Leaf }

Leaf is string name of a leaf

Trunk is string name of the trunk of Leaf

Tablet is { 
  filename: String, 
  trunk: String, 
  branch: String 
}

Entry is a JSON in Entry Object Notation

```pdl
filepath = dir/tablet.filename
// in order to start other tablet streams
enqueue entry 
grains = mow query with tablet.trunk, tablet.branch
for each grain
  append grain.key,grain.value to filepath
```
### insert stream
FS -> Dir -> Entry -> IO List Entry

FS is input output interface to the file system

Dir is String of a path to open in FS

Entry is a JSON in Entry Object Notation

```pdl
schema = select schema
for each entry
  strategy = insert strategy with schema, query
  for each tablet of strategy
    append insert tablet stream
for each tablet of strategy
  sort tablet
pipe query 
  to each insert tablet stream
  to return
```
### insert in dataset
FS -> Dir -> List Entry -> IO List Entry

FS is input output interface to the file system

Dir is String of a path to open in FS

Query is a JSON in Query Object Notation

Entry is a JSON in Entry Object Notation

```pdl
pipe each query 
  to insert stream 
  to return
```
### delete strategy
Schema -> Entry -> List Tablet

This describes all tablets needed to delete an entry

Schema is Map Branch Connection 

Branch is string name of a given branch

Connection is { trunks: List Trunk, leaves: List Leaf }

Leaf is string name of a leaf

Trunk is string name of the trunk of Leaf

Entry is a JSON in Entry Object Notation

Tablet is { 
  filename: String, 
  trait: string, 
  trait is first: Boolean 
}

```pdl
base = entry._
if base has trunk
  append { 
    filename: trunk-base.csv, 
    trait: entry.base, 
    trait is first: false 
  }
for each leaf of base
  append {
    filename: base-leaf.csv, 
    trait: entry.base, 
    trait is first: true 
  }
    ```
### delete line stream
Tablet -> Line -> Line

Tablet is { 
  filename: String, 
  trait: string, 
  trait is first: Boolean 
}

Line is String in CSVS file format

```pdl
fst, snd = parse line
trait is fst if tablet.trait is first
trait is snd if not tablet.trait is first 
if trait equals tablet.trait
  enqueue line
```
### delete tablet
FS -> Dir -> Query -> IO

FS is input output interface to the file system

Dir is String of a path to open in FS

Tablet is { 
  filename: String, 
  trait: string, 
  trait is first: Boolean 
}

```pdl
filepath = dir/tablet.filename;
if filepath is empty return;
pipe filepath 
  to delete line stream
  to append temporary file;
move temporary file to filepath;
```
### delete stream
FS -> Dir -> Query -> IO List Entry

FS is input output interface to the file system

Dir is String of a path to open in FS

Query is a JSON in Query Object Notation

Entry is a JSON in Entry Object Notation

```pdl
schema = select schema
for each query
  strategy = delete strategy with schema, query
  for each tablet of strategy
    delete tablet with fs, dir, query
    return query
```
### delete in dataset
FS -> Dir -> List Query -> IO List Entry

FS is input output interface to the file system

Dir is String of a path to open in FS

Query is a JSON in Query Object Notation

Record is a JSON in Entry Object Notation

```pdl
pipe each query 
  to delete stream 
  to return
```
