# dataset

select must take query object notation

the select record stream asks for select strategy and pipes it through select tablet streams. select tablet stream pipes lines to the select line stream which searches the record for values that match the line, signals a match and transforms the record.

To learn more about the architecture of csvs, see other [User Guides](./user_guides.md), the [Reference](./reference.md) and the [Requirements](./requirements.md).

## functions
### select schema
FS -> Dir -> Schema

FS is input output interface to the file system

Dir is String of a path to open in FS

Schema is Map Branch Connection 

Branch is string name of a given branch

Connection is 
```js
{ 
  trunks: List Trunk, 
  leaves: List Leaf 
}
```

Leaf is string name of a leaf

Trunk is string name of the trunk of Leaf

<!-- TODO rename schema to trunkToLeaf -->
```pdl
select in dataset { _: _ }
first result to schema
return schema
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
  to each select tablet stream
  to leader stream
  to return
```
### select strategy
Schema -> Query -> List Tablet

This describes all tablets needed to update an entry

Schema is Map Branch Connection 

Branch is string name of a given branch

Connection is 
```js
{ 
  trunks: List Trunk, 
  leaves: List Leaf 
}
```

Leaf is string name of a leaf

Trunk is string name of the trunk of Leaf

Entry is a JSON in Entry Object Notation

Tablet is 
``` js
{
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
```

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
### select tablet stream
FS -> Dir -> Tablet

FS is input output interface to the file system

Dir is String of a path to open in FS

Tablet is 
``` js
{
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
```

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
### select schema stream
State -> Line -> State

State is 
```js 
{
  query: Query,
  entry: Entry,
  fst: String,
  match: Boolean,
  has match: Boolean,
  map: Map String Boolean,
  thing: String,
}
```

Query is a JSON in Query Object Notation

Entry is a JSON in Entry Object Notation

```pdl
state.entry: { _: _ }

for each line
  trunk,leaf = parse line
  leaves = state.entry[trunk]
  new leaves = [leaf] if no leaves otherwise leaves + leaf
  state.entry[trunk] = new leaves
enqueue {
  query: state.query,
  entry: state.entry,
}
```
### select line stream
State -> Tablet -> State

State is 
```js 
{
  query: Query,
  entry: Entry,
  fst: String,
  match: Boolean,
  has match: Boolean,
  map: Map String Boolean,
  thing: String,
}
```

Query is a JSON in Query Object Notation

Entry is a JSON in Entry Object Notation

Tablet is 
``` js
{
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
```

```pdl
if tablet.passthrough and state.map
  return drop stream
if tablet.accumulating and no state.map
  return forward stream
otherwise
  return parse line stream
```
### drop stream
State -> Line -> Void

State is 
```js 
{
  query: Query,
  entry: Entry,
  fst: String,
  match: Boolean,
  has match: Boolean,
  map: Map String Boolean,
  thing: String,
}
```

Query is a JSON in Query Object Notation

Entry is a JSON in Entry Object Notation

Line is a String in CSVS file format

```pdl
do nothing
```
### forward stream
State -> Line -> State

State is 
```js 
{
  query: Query,
  entry: Entry,
  fst: String,
  match: Boolean,
  has match: Boolean,
  map: Map String Boolean,
  thing: String,
}
```

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
### parse line stream
State -> Tablet -> Line -> State

State is 
```js 
{
  query: Query,
  entry: Entry,
  fst: String,
  match: Boolean,
  has match: Boolean,
  map: Map String Boolean,
  thing: String,
}
```

Query is a JSON in Query Object Notation

Entry is a JSON in Entry Object Notation

Tablet is 
``` js
{
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
```


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
### initial state
State -> Tablet -> State

State is 
```js 
{
  query: Query,
  entry: Entry,
  fst: String,
  match: Boolean,
  has match: Boolean,
  map: Map String Boolean,
  thing: String,
}
```

Query is a JSON in Query Object Notation

Entry is a JSON in Entry Object Notation

Tablet is 
``` js
{
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
```

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

State is 
```js 
{
  query: Query,
  entry: Entry,
  fst: String,
  match: Boolean,
  has match: Boolean,
  map: Map String Boolean,
  thing: String,
}
```

Query is a JSON in Query Object Notation

Entry is a JSON in Entry Object Notation

Tablet is 
``` js
{
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
```

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
### leader stream
Base -> Query -> State -> State

State is 
```js 
{
  query: Query,
  entry: Entry,
  fst: String,
  match: Boolean,
  has match: Boolean,
  map: Map String Boolean,
  thing: String,
}
```

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
## tests

> .csvs.csv
``` csv
csvs,0.0.2
```

> _-_.csv
``` csv
datum, date
datum, filepath
filepath, filehash
filepath, filetype
filepath, filesize
```

> datum-date.csv
```  csv
datum1,date1Overwrite
datum2,date2
datum3,date3
datum4,date4
```

> datum-filepath.csv
``` csv
datum4,filepath4
datum5,filepath5a
datum5,filepath5a
```

> filepath-filehash.csv
``` csv
filepath3,filehash3
filepath4,filehash4
```
### query(queryDatum, fs)

> queryDatum
``` javascript
{
  _: "datum",
  datum: "value1"
}
```

> resultDatum
``` javascript
[
  {
    _: "datum",
    datum: "datum1",
    date: "date1Overwrite"
  }
]
```

### query(queryRegex, fs)

> queryRegex
``` javascript
{
  _: "datum",
  datum: "value[12]"
}
```

> resultRegex
``` javascript
[
  {
    _: "datum",
    datum: "datum1",
    date: "date1Overwrite"
  },
  {
    _: "datum",
    datum: "datum2",
    date: "date2"
  },
]
```

### query(queryOptions, fs)

> queryOptions
``` javascript
{
  _: "datum",
}
```

> resultOptions
``` javascript
[
  {
    _: "datum",
    datum: "datum1",
    date: "date1Overwrite"
  },
  {
    _: "datum",
    datum: "datum2",
    date: "date2"
  },
  {
    _: "datum",
    datum: "datum3",
    date: "date3"
  },
  {
    _: "datum",
    datum: "datum4",
    date: "date4"
    filepath: {
      _: "filepath",
      filepath: "filepath4",
      filehash: "filehash4"
    }
  },
]
```

### query(queryFilter, fs)

> queryfilter
``` javascript
{
  _: "datum",
  filepath: "filepath4"
}
```

> resultFilter
``` javascript
[
  {
    _: "datum",
    datum: "datum4",
    date: "date4"
    filepath: {
      _: "filepath",
      filepath: "filepath4",
      filehash: "filehash4"
    }
  },
]
```

### query(queryFilterNested, fs)

> queryfilterNested
``` javascript
{
  _: "datum",
  filehash: "filehash4"
}
```

> resultFilterNested
``` javascript
[
  {
    _: "datum",
    datum: "datum4",
    date: "date4"
    filepath: {
      _: "filepath",
      filepath: "filepath4",
      filehash: "filehash4"
    }
  },
]
```
