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
"event": "event"
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
{ "_": "name", "name": "john", "age": "35" }
{ "_": "name", "name": "jane", "age": "36" }
```

NOTE: A record that has only one relation is called a "grain"
```
{ "_": "name", "name": "john", "age": "35" }
```

### query record

To find data records in the dataset, one can use query records. In a query record, the string can be a regular expression. And a record can have no base value, just a base field.

The following dataset with the files `.csvs-csv`, `_-_.csv` and `event-date.csv` describes three events.

```
{ "_": "_", "event": [ "date", "filepath" ] ]}
{ "_": "event", "event": "visited-japan", "date": "2001-01-01" }
{ "_": "event", "event": "climbed-everest", "date": "2003-03-03", "filepath": "photo-everest" }
```

The following query looks for the schema of the dataset
```
{ _: "_" }
```
finds `1` schema record 
```
{ "_": "_", "event": [ "date", "filepath" ]}
```

The following query looks for all events in the dataset
```
{ _: "event" }
```
finds `2` records of base `event`
```
{ "_": "event", "event": "visited-japan", "date": "2001-01-01" }
{ "_": "event", "event": "climbed-everest", "date": "2003-03-03", "filepath": "photo-everest" }
```

The following query looks for all events in the dataset
```
{ _: "event", filepath: "photo" }
```
finds `1` record of base `event`
```
{ "_": "event", "event": "climbed-everest", "date": "2003-03-03", "filepath": "photo-everest" }
```

Each item of a list must be interpreted as an AND operator. Each field of a record must be interpreted as an AND operator. For OR operator, use `|` inside the regex, or make multiple queries.

## Form

SON is meant to be both machine- and human- readable. Use concise form for less repetition. Use verbose form for easier parsing. When in doubt, consider the record to be in mixed form, i.e. containing both concise and verbose values.

### concise
Lists with one element are reduced to that element. Object with a single base value is reduced to the string of that value.

```
{ "_": "name", "name": "john" } -> "john"
{ "_": "name", "name": "john", "age": [ "35" ] } -> { "_": "name", "name": "john", "age": "35" }
```

### verbose
A field value is always a list of records. A string is expanded to a record with a single base value. base name and base value is always a single value.
```
"john" -> { "_": "name", "name": "john" }
{ "_": "name", "name": "john", "age": "35" } -> { "_": "name", "name": "john", "age": [ { "_": "age", "age": "35" } ] }
```

### mixed

Record can contain both expanded records and concise strings. 
```
{ "_": "event", "event": "visited-japan", "date": [ "2001-01-01", { "_": "date", "date": "2005-01-01" } ]}
```
