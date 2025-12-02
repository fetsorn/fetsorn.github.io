# Comma-Separated Value Store

This document specifies the CSVS dataset format. 

"CSVS" stands for "Comma-Separated Value Store"

## file format

A CSVS file, also called "tablet", is a CSV file, and thus a subset of RFC 4180. It is defined by the following ABNF grammar:

 file = record *(CRLF record) [CRLF]

 record = field COMMA field

 field = (escaped / non-escaped)

 escaped = DQUOTE *(TEXTDATA / COMMA / CR / LF / 2DQUOTE) DQUOTE

 non-escaped = *TEXTDATA

 COMMA = %x2C

 CR = %x0D ;as per section 6.1 of RFC 2234 [2]

 DQUOTE =  %x22 ;as per section 6.1 of RFC 2234 [2]

 LF = %x0A ;as per section 6.1 of RFC 2234 [2]

 CRLF = CR LF ;as per section 6.1 of RFC 2234 [2]

 TEXTDATA = *UTF-8

For example, this tablet represents that John is 35 years old, and Jane is 36:
  `john,35
   jane,36`

As you can see, CSVS is stricter than CSV in several regards:

1. There are only two columns, and other columns are discarded. 

2. There are no headers inside the file. Instead, headers are in the file names as decribed below.

## dataset

A CSVS dataset is a directory with CSVS files, also called "tablets". Together, tablets comprise a database based on the relational model of data. Some tablets are special and describe the dataset structure. Other tablets describe relationships between values.

### version tablet

A dataset must contain a tablet named`.csvs.csv`, also called "version tablet", with metadata about the dataset.

 - `version,0.0.3`, this line is to support future breaking changes to the format.
 - `id,some-uniq-uenu-mber`, this line is uniquely identify this dataset.

### schema tablet

a dataset must contain a tablet named `_-_.csv`, also called "schema tablet", which describes relationships between collections. Specifying a collection here will allow to create a tablet with collection values later.

examples:
 - `_-_.csv`: `event,date` - dataset has an "event" collection with an attribute collection "date".

Each value in the schema is a name of a collection of values and has special naming rules:
 - a collection name must not be `_` because this name is reserved for the schema.
 - a collection name must not include the following characters: `[/\<>':"```|?*.,[];{}$&]` because collection names will be use for filenames, and these characters are reserved on most filesystems.
 - a collection name must not include the character "-" because this character is reserved for connecting the collections in the filenames.
 - a collection name can include any of the following: `[azAZ09_%+@]`, white-space and other Unicode characters

NOTE: As you can see a CSVS collection only exists in a relationship with another, there can be no independent collections.

NOTE: A relation between collections can be recursive. For example, in this dataset events can have dates, and dates can have events.
```
event,date
date,event
``` 

NOTE: A duplicate relationship is ignored. For example
```
event,date
event,date
``` 

### data tablet

For each relationship in the schema, the dataset can contain a tablet named `{collection1}-{collection2}.csv`, also called a "data tablet", which describes relationships between values of two collections.

For example, this tablet is called `name-age.csv` and represents that John is 35 years old, and Jane is 36:
  `john,35
   jane,36`

## schema

One can use several vocabularies to describe the schema of a CSVS dataset. 

As a relational database, the schema can be described in terms of collections and attributes. For example, all names are in a collection called "name", and all ages are in a collection called "age", which is an attribute of "name".

Seen as an abstract data type, the schema can be described in terms of tree nodes. For example, all names are in a node "name", all ages are in a node "age". Nodes "name" and "age" are connected. "name" is a parent node of "age", and "age" is a child node of "name". "name" is a root node because it does not have parents. "age" is an external node, because it does not have children.

We use special terminology to describe the CSVS dataset schema in terms of "branches". For example, all names are in the branch "name", all ages are in the branch "age". "name" is a trunk of "age", and "age" is a leaf of "name". "name" is a root because it does not have trunks. "age" is a twig because it does not have leaves. 

A typical schema has several levels of nesting. For example,
```event,date
event,name
event,text
name,address
address,city
```

Here, an event has several leaves, - "date", "name" and "text". The "name" branch also has a leaf "address" which itself is a trunk of "city".

The terms are also listed below in the "Terminology" section.

## Records

A record is a set of connected values from multiple branches.

For example, let's represent that John is 35 years old and lives in Bath

_-_.csv
```
name,age
name,city
```

name-age.csv
```
john,35
```

name-city.csv
```
john,Bath
```

CSVS can fully represent objects specified by the Query Object Notation. For example, the dataset above represents a record 
`{ "_": "name", "name": "john", "age": "35", "city": "Bath" }`. For more complex examples see QON specification.

## Terminology

tablet - a CSVS file

branch - a collection. a node.

twig - a collection without attributes. an external node.

trunk - a collection with attributes. a parent node. a branch can have multiple trunks. 

leaf - an attribute of another collection. a child node. a branch can have multiple leaves. 

root - a collection that is not an attribute of any other collection. a root node. a dataset can have multiple roots.

record - a set of connected values from multiple collections.