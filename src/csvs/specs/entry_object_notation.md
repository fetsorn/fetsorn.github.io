# Store Object Notation

This document describes the Store Object Notation format. 

## text format

Dataset object notation is a JSON object, and thus a subset of [RFC 8259](https://www.rfc-editor.org/rfc/rfc8259).  It is defined by the following ABNF grammar:

    record = begin-object [ base value-separator *( value-separator member ) ]
             end-object

    base = underscore name-separator string

    underscore = quotation-mark %x5F quotation-mark

    link = string name-separator data

    data = record / list / string

    list = begin-array [ item *( value-separator item ) ] end-array

    item = record / string

As you can see, SON is stricter than JSON in several regards:

1. There are no numbers, booleans, or null - the only allowed literal is a string.
2. Arrays must not contain other arrays - the only alowed items are records or strings. 
3. Objects must have a base field with a fixed key "_". The base represents a group of values as described below. 

## dataset format

A SON dataset is a set of SON records. Together, records comprise a database based on the relational model of data. The schema record describes the dataset structure. Other records describe data.

For example, this record represents that John is 35 years old: `{ "_": "name", "name": "John", "age": "35" }`.

### schema record

A dataset must contain a single schema record which describes the dataset. 

Names that start with "_" are reserved and describe the metadata of the dataset.

`"_": "_"` - this field is required and always has a reserved value of the underscore.
`"_version": "0.0.3"` - this field is to support future breaking changes to the format.
`"_id": "some-uniq-numb-er"` - this field is to uniquely identify this dataset.

Other names describe collections of values. For example:
 - `"event": "date"` - dataset has an "event" collection with an attribute collection "date".

 The schema tablet has special naming rules:
 - a collection name must not be `_` because this name is reserved for the schema.
 - a collection name must not include the following characters: `[/\<>':"```|?*.,[];{}$&]` because collection names can be used for filenames, and these characters are reserved on most filesystems.
 - a collection name must not include the character "-" because this character is reserved for connecting the collections in the filenames.
 - a collection name can include any of the following: `[azAZ09_%+@]`, white-space and other Unicode characters

NOTE: As you can see a SON collection only exists in a relationship with another, there can be no independent collections.

NOTE: For a field that has multiple connections, use a list
```
"event": ["date", "name"]
```

NOTE: A relation between collections can be recursive. For example, in this dataset events can have dates, and dates can have events.
```
"event": "date",
"date: "event"
``` 
and even
```
"event: "event"
```

NOTE: Given a field with a list, all items of a list must have the same base as field.

NOTE: Given a field with a record, the record should have the same base as field.

NOTE: Keys must be unique in a record.

NOTE: Discard empty list [], empty object {}, object without a base, object with base different than the field, object with a base branch but no base value.

### data record

For relationships described in the schema, a data record describes relationships between values.

For example, this dataset represents that John is 35 years old and Jane is 36:

```
{ "_": "_", "name": "age" }
{ "_": "name", "age": "35" }
{ "_": "name", "age": "36" }
```

NOTE: A record that has only one relation is called a "grain"
```
{ "_": "name", "age": "35" }
```

### query record

To find data records in the dataset, one can use query records. In a query record, the string can be a regular expression. And a record can have no base value, just a base field.

#### grammar
query literal MUST have exactly the same semantics as record object notation with every value treated as literal constraints

query regex MUST be a subset of record object notation that interprets string values as regular expression constraints

the regular expression dialect CAN be specific to client implementation

characters reserved by the regular expression dialect MUST be escaped when stored in the dataset as literal values

The following dataset with the files `.csvs-csv`, `_-_.csv` and `event-date.csv` describes two events.

```
{ "_": "_", "event": [ "date", "filepath" ], "filepath": [ "filehash", "filesize" ]}
{ "_": "event", "event": "cooked-lasagna", "date": "2002-02-02" }
{ "_": "event", "event": "visited-japan", "date": "2001-01-01" }
{ "_": "event", "event": "climbed-everest", "date": "2003-03-03", "filehash": "photo-everest" }
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

#### query object
algo MUST take a record where each value is a regex.

each leaf of a record MUST be interpreted as an AND operator.

this MUST match all records a with value a1 that have BOTH leaf1 that matches regex1 AND leaf2 that matches regex2
`{ _: "a", a: "a1", leaf1: "regex", leaf2: "regex" }`

each value in a list of values MUST be interpreted as an OR operator. FIXME

this MUST match all records a with value a1 that have EITHER leaf1 that matches regex1 OR leaf1 that matches regex2 FIXME
`{ _: "a", a: "a1", leaf1: [ "regex1", "regex2"] }`

should we interpret list as AND? OR can always be done as "|" inside the regex, but AND needs to happen outside. however, OR list of query objects would match by several `__`. if list is AND a list of query object could not fallback on multiple different `__`. cannot use "|" inside `__` because each `__` requires different leaf branches. although since unrelated leaf branches are discarded, could just provide a `__` that contains "|" with leaf constraints for each possible `__` branch

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

#### data structure
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


## schema

One can use several vocabularies to describe the schema of a SON dataset. 

As a relational database, the schema can be described in terms of collections and attributes. For example, all names are in a collection called "name", and all ages are in a collection called "age", which is an attribute of "name".

Seen as an abstract data type, the schema can be described in terms of tree nodes. For example, all names are in a node "name", all ages are in a node "age". Nodes "name" and "age" are connected. "name" is a parent node of "age", and "age" is a child node of "name". "name" is a root node because it does not have parents. "age" is an external node, because it does not have children.

We use special terminology to describe the SON dataset schema in terms of "branches". For example, all names are in the branch "name", all ages are in the branch "age". "name" is a trunk of "age", and "age" is a leaf of "name". "name" is a root because it does not have trunks. "age" is a twig because it does not have leaves. 

A typical schema has several levels of nesting. For example,
```
{
  "_": "_",
  "event": ["date", "name", "text"],
  "name": "address", 
  "address": "city"
}
```

Here, an event has several leaves, - "date", "name" and "text". The "name" branch also has a leaf "address" which itself is a trunk of "city".

The terms are also listed below in the "Terminology" section.

## Form

SON is meant to be both machine- and human- readable, so it can have several equivalent forms. Use concise form for human readability and less repetition. Use verbose form for easier parsing. When in doubt, consider the record to be in mixed, loose form.

### concise
Lists that have only one element and objects that have only base field can be expressed as singleton values. An object where all values are condensed to singletons can be called `concise`.

 - treat as "value" when the field is object with value
   - { _: { _: "value" } }
   - { _: "value" }
 - treat as "value" when the field is array with one item
   - { _: [ { _: "value" } ] }
   - { _: "value" }

A singleton value can represent a list that has one element.
```
{
  _: "event",
  event: "visited-japan",
  date: [ "2001-01-01" ]
}
```
is equivalent to concise form
```
{
  _: "event",
  event: "visited-japan",
  date: "2001-01-01"
}
```

A singleton value can represent an object that has only base field.
```
{
  _: "event",
  event: "visited-japan",
  date: { _: "date", date: "2001-01-01" }
}
```
is equivalent to consise form
```
{
  _: "event",
  event: "visited-japan",
  date: "2001-01-01"
}
```

When all elements in a list have identical fields except base branch of base value, they must be merged to a single object with schema list and base list.

A schema list can represent a list of objects with identical fields
```
[
  { _: "event", event: "visited-japan", image: "IMG_0890.jpeg" },
  { _: "image", event: "visited-japan", image: "IMG_0890.jpeg" }
]
```
is equivalent to concise form
```
`{ _: [ "event", "image" ], event: "visited-japan", image: "IMG_0890.jpeg" }`
```

A base value list can represent a list of objects with identical fields
```
[
  { _: "event", event: "visited-japan", image: "IMG_0890.jpeg" },
  { _: "event", event: "cooked-lasagna", image: "IMG_0890.jpeg" }
]
```
is equivalent to concise form
```
`{ _: "event", event: [ "visited-japan", "cooked-lasagna" ], image: "IMG_0890.jpeg" }`
```

Elements in a list that have different fields can't be expressed in a more concise form.
```
[
  { _: "event", event: "visited-japan", image: "IMG_0890.jpeg" },
  { _: "image", event: "visited-japan", image: "IMG_1324.jpeg" }
]
```

### verbose

An object where all values are expanded to lists of objects, and the schema brach and base value are expanded to a singleton string can be called `verbose`.

 - each leaf value is a list of objects
 - base value is a singleton value, a list would be recursive
 - treat single value as list with single element
 - treat string as object with a _ field and a base field

```
{
  _: "event",
  event: "visited-japan",
  date: "2001-01-01"
}
```
is equivalent to verbose form
```
{
  _: "event",
  event: "visited-japan",
  date: [ { _: "date", date: "2001-01-01" } ]
}
```

In verbose form, the schema branch `_`must be a singleton string, and the base value `event` must be a singleton string. 
`{ _: "event", event: "visited-japan" }`

When the schema branch or the base value is a list, they must be divided into separate objects and leaf field must be common for each of the separate objects. The dataset maintainer must design the schema to define the relationships between overlapping branch values.

If the schema branch is list, the object must be divided into separate objects for each item of the list. The leaf fields must be common for each of the separate objects.
```
`{ _: [ "event", "image" ], event: "visited-japan", image: "IMG_0890.jpeg" }`
```
is equivalent to verbose form
```
[
  { _: "event", event: "visited-japan", image: "IMG_0890.jpeg" },
  { _: "image", event: "visited-japan", image: "IMG_0890.jpeg" }
]
```

If the schema branch is list, the object must be divided into separate objects for each itema of the list. The leaf fields must be common for each of the separate objects.
```
`{ _: "event", event: [ "visited-japan", "cooked-lasagna" ], image: "IMG_0890.jpeg" }`
```
is equivalent to verbose form
```
[
  { _: "event", event: "visited-japan", image: "IMG_0890.jpeg" },
  { _: "event", event: "cooked-lasagna", image: "IMG_0890.jpeg" }
]
```

### loose

Values inside a list can be both records and strings. 

## Terminology

tablet - a CSVS file

branch - a collection. a node.

twig - a collection without attributes. an external node.

trunk - a collection with attributes. a parent node. a branch can have multiple trunks. 

leaf - an attribute of another collection. a child node. a branch can have multiple leaves. 

root - a collection that is not an attribute of any other collection. a root node. a dataset can have multiple roots.

record - a set of connected values from multiple collections.

grain - a pair of connected values from two collections