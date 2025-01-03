# Query Object Notation

This document describes the object notation that represents queries in a [CSVS](https://csvs-format.docs.norcivilianlabs.org/) dataset.

Query object notation is a subset of [RFC 8259](https://www.rfc-editor.org/rfc/rfc8259). In cases where this document contradicts the RFC, RFC takes precedence and this document should be corrected.

Query object notation is a subset of the [record object notation](./record_object_notation).

# grammar
query literal MUST have exactly the same semantics as record object notation with every value treated as literal constraints

query regex MUST be a subset of record object notation that interprets string values as regular expression constraints

the regular expression dialect CAN be specific to client implementation

characters reserved by the regular expression dialect MUST be escaped when stored in the dataset as literal values

The following dataset with the files `.csvs-csv`, `_-_.csv` and `event-date.csv` describes two events.

> `.csvs.csv`
``` csv
csvs,0.0.2
```

> `_-_.csv`
``` csv
event, date
event, filepath
filepath, filehash
filepath, filesize
```

> `event-date.csv`
``` csv
cooked-lasagna,2002-02-02
visited-japan,2001-01-01
climbed-everest,2003-03-03
```

> - `event-filepath.csv`
``` csv
climbed-everest,photo-everest
```

query with the base name "_" MUST query dataset schema

 - "?_:_" -> { _: _, entity1: "entity2", entity2: "entity3" }

The following query looks for the schema of the dataset
```
{ _: "_" }
```
finds `1` schema record 
```
{
  _: "_",
  event: [ "date", "filepath" ],
  filepath: [ "filehash", filesize" ]
}
```

query with the base name "a" MUST match all records of base branch "a" that match constraints specified in the query

The following query looks for all events in the dataset
```
{ _: "event" }
```
finds `2` records of base `event`
```
[
  {
    _: "event",
    event: "cooked-lasagna",
    date: "2002-02-02"
  },
  {
    _: "event",
    event: "visited-japan",
    date: "2001-01-01"
  },
  {
    _: "event",
    event: "climbed-everest",
    date: "2003-03-03",
    filepath: "photo-everest"
  }
]
```

The following query looks for all events from January 1st, 2001
```
{ _: "event", date: "2001-01-01" }
```
finds `1` record of base `event`
```
[
  {
    _: "event",
    event: "visited-japan",
    date: "2001-01-01"
  }
]
```

query that specifies only base name and base value must match all options of base branch
  
literal query that contains regular expression characters must be interpreted as a literal string

regular expression query that contains literal constraint must be interpreted as a regular expression

query with base branch "a" and leader branch "b" MUST return all records of base branch "b" connected to records of base branch "a" that match constraints specified in the query

query with a base branch and no leader branch MUST assume that leader branch is the same as base 

The following query looks for all filepaths that related to events from March 3rd, 2003
```
{ _: "event", __: "filepath", date: "2003-03-03" }
```
finds `1` record of base `filepath`
```
[
  {
    _: "filepath",
    filepath: "photo-everest"
  }
]
```

can field name, branch name be an empty string?

what's the behaviour of leader branch in a schema query with base "_"?

# query object
algo MUST take a record where each value is a regex.

each leaf of a record MUST be interpreted as an AND operator.

this MUST match all records a with value a1 that have BOTH leaf1 that matches regex1 AND leaf2 that matches regex2
`{ _: "a", a: "a1", leaf1: "regex", leaf2: "regex" }`

each value in a list of values MUST be interpreted as an OR operator. FIXME

this MUST match all records a with value a1 that have EITHER leaf1 that matches regex1 OR leaf1 that matches regex2 FIXME
`{ _: "a", a: "a1", leaf1: [ "regex1", "regex2"] }`

should we interpret list as AND? OR can always be done as "|" inside the regex, but AND needs to happen outside. however, OR list of query objects would match by several "__". if list is AND a list of query object could not fallback on multiple different "__". cannot use "|" inside "__" because each "__" requires different leaf branches. although since unrelated leaf branches are discarded, could just provide a "__" that contains "|" with leaf constraints for each possible "__" branch

query by number of list elements WON'T be covered by query object notation

query by number of list elements MUST be impemented as post-processing step outside this library

for the OR operator, use "|" inside a regex

this MUST match all records a with value a1 that have leaf1 that matches EITHER regex1 OR regex2
`{ _: "a", a: "a1", leaf1: "regex1|regex2" }`

these two query records MUST match different sets of "a" keys FIXME

`{_: "a", a: "a1", b: [ { _: "b", b: "b1", c: "c1" }, { _: "b", b: "b2", c: "c2" }]}`

MUST match a that has BOTH "b1 with c1" AND "b2 with c2" FIXME

`{_: "a", a: "a1", b: {_: "b", b: "b1", c: ["c1", "c2"] }, {_: "b", b: "b2" }}`
MUST match a that has BOTH "b1 with c1 OR c2", AND "any b2"

- this WON'T match on exact number of values
- this WON'T mean "a1 with exactly two values of b"
- this MUST mean "a1 with EITHER b1 or b2"
`{_: "a", a: "a1", b: [ "b1", "b2" ]}`

# data structure
here entity is same as "base branch"

here attribute is same as "leaf branch"

 - entity record MUST have a string value
 - entity record MUST have entity name
 - entity record CAN have relations to attribute entities
 - entity record MUST be an list of records
 - entity name SHOULD be described as "_"
 - entity string value SHOULD be described as a field with entity name.

examples of data structure: 
 
 - `[{ "_": "event", "event": "won in championship", date: [ { "_": "date", "event": "2024-01-01" } ], datum: [], file: [] ] }]`
 - `[{ "_": "event", "event": "won in championship", date: "2024-01-01", datum: [], file: [] ] }]`
 - `[{ "_": "event", "event": "won in championship"]`
 - `_-_.csv`: `event,date`, `event,date`: `went to groceries,2024-01-01`, JSON: `{ "_": "event", "event": "went to groceries", "date": [ { "_": "date", "date": "2024-01-01" } ] }`
 - `[{"_":"event","event":"0bac","dateact":[{"_":"dateact","dateact":"02-01-2023"}],"datum":[{"_":"datum","datum":"went to groceries"}],"file":[{"_":"file","file":"0faa","filename":[{"_":"filename","filename":"image.gif"}]}]}]`

To learn more about the architecture of csvs, see other [User Guides](./user_guides.md), the [Reference](./reference.md) and the [Requirements](./requirements.md).
