# Record Object Notation

This document describes the object notation that represents records in a [CSVS](https://csvs-format.docs.norcivilianlabs.org/) dataset.

Record object notation is a subset of [RFC 8259](https://www.rfc-editor.org/rfc/rfc8259). In cases where this document contradicts the RFC, RFC takes precedence and this document should be corrected.

# grammar

string - text value escaped according to rfc 8259

list - array of strings, or of lists according to rfc 8259

key - string object accessor according to rfc 8259

value - a string or a list, or an object

field - a pair of key and value

object - a set of key-value pairs

key MUST be unique in an object, no `{ a: 1, a: 2 }`

object that has no keys {} CAN be called empty

object MUST contain a key "_"

if object does not contain a key "_", it SHOULD be considered empty

# Examples with records and datasets

object with field `_: "_"` MUST represent the dataset schema

key "_" MUST represent the base branch of a record

nested relations between branches MUST be represented as nested object values

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
```

This dataset represents `1` schema record, `2` records of branch `event` and `2` records of branch `date`.

The schema record
```
{
  _: "_",
  event: [ "date", "filepath" ],
  filepath: [ "filehash", filesize" ]
}
```

Two `event` records
```
{
  _: "event",
  event: "cooked-lasagna",
  date: "2002-02-02"
}
```
```
{
  _: "event",
  event: "visited-japan",
  date: "2001-01-01"
}
```

Two `date` records
```
{
  _: "date",
  date: "2002-02-02"
}
```
```
{
  _: "event",
  date: "2001-01-01"
}
```

# normal form
requirement `neutral clutch blame`

Each value can be a list of objects. 

# verbose
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

## concise
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

# schema object

Object with base `_` must represent a flattened structure of relationships between schema branches, each field must represent a list of connections between trunk and leaves.

 - trunk branch is a key
 - field value is a list
 - leaf branch is a string

A concise form
```
{
  _: "_",
  event: [ "date", "filepath" ],
  filepath: "filehash"
}
```

A verbose form
```
{
  _: "_",
  event: [ "date", "filepath" ],
  filepath: [ "filehash" ]
}
```

# questions
discard empty list

discard empty object

discard object without a base branch

discard object with base branch different than the assigned key

discard object with a base branch but no base value

  - treat empty object as "" when field is. should we discard instead?
    - { _: {} }
  - treat empty array as "" when field is. should we discard instead?
    - { _: [] }
     
do we ignore and discard empty objects?

do we treat empty objects as empty string?

there's reason to discard empty object cause it has no base branch and so unpredictable vague semantics

but in a field value base branch is the key, so should we discard object without a base?

what is the semantics of a field value with a base branch different than the key?

how to differentiate names of fields between `_: amount` and `amount: "1"`? one is base branch name, another is base branch value.

To learn more about the architecture of csvs, see other [User Guides](./user_guides.md), the [Reference](./reference.md) and the [Requirements](./requirements.md).
