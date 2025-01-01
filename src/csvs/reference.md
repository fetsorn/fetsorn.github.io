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
selectRecordStream
selectRecord
selectSchema
updateRecord
updateRecordStream
insertRecord
insertRecordStream
deleteRecord
deleteRecordStream
condense
expand
isTwig
enrichBranchRecords
extractSchemaRecords
searchParamsToQuery
findCrown
toSchema
mow
sow
