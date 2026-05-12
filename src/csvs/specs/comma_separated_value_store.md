# Comma-Separated Value Store

This document specifies the CSVS dataset format. 

"CSVS" stands for "Comma-Separated Value Store"

## file format

A CSVS file, also called "tablet", is a CSV file, and thus a subset of RFC 4180. It is defined by the following ABNF grammar:

      file = record *(line-ending record) [line-ending]

      record = field COMMA field

      field = (escaped / non-escaped)

      escaped = DQUOTE *(TEXTDATA / COMMA / CR / LF / 2DQUOTE) DQUOTE

      non-escaped = *TEXTDATA

      COMMA = %x2C

      CR = %x0D ;as per section 6.1 of RFC 2234 [2]

      DQUOTE =  %x22 ;as per section 6.1 of RFC 2234 [2]

      LF = %x0A ;as per section 6.1 of RFC 2234 [2]

      CRLF = CR LF ;as per section 6.1 of RFC 2234 [2]

      line-ending = CRLF / LF

      TEXTDATA = %x20-21 / %x23-2B / %x2D-D7FF / %xE000-10FFFF

As you can see, CSVS is stricter than CSV in several regards:

1. There are only two columns, and other columns are discarded. The first column is the key and the second column is the value. A key can have multiple values (multiple records with the same first field), forming a one-to-many relationship. Multiple keys can have the same value, forming a many-to-one relationship.

2. There are no headers inside the file. Instead, headers are in the file names as described below.

## dataset

A CSVS dataset is a directory with CSVS files, also called "tablets". Together, tablets comprise a database based on the relational model of data. The schema tablet is special and describes the dataset structure. Other tablets describe relationships between values.

### version tablet

a dataset must contain a tablet named `.csvs.csv`, also called "version tablet", which describes the dataset.

 - `version,0.0.4`, this line is to support future breaking changes to the format.
 - `id,some-uniq-uenu-mber`, this line is to uniquely identify this dataset.

### schema tablet

a dataset must contain a tablet named `_-_.csv`, also called "schema tablet", which describes relationships between collections. Specifying a collection here will allow to create a tablet with collection values later.

Other names describe collections of values. For example:
 - `event,date` - dataset has an "event" collection with an attribute collection "date".

The schema tablet has special naming rules:
 - a collection name must not be `_` because this name is reserved for the schema.
 - a collection name must not include the following characters: `[/\<>':"```|?*.,[];{}$&\n\r]` because collection names can be used for filenames, and these characters are reserved on most filesystems.
 - a collection name must not include the character "-" because this character is reserved for connecting the collections in the filenames.
 - a collection name can include any of the following: `[azAZ09%+@]`, white-space and other Unicode characters

values are unconstrained UTF-8; only collection names have naming restrictions

NOTE: As you can see a CSVS collection only exists in a relationship with another, there can be no independent collections.

NOTE: A relation between collections can be recursive. For example, in this dataset events can have dates, and dates can have events.
```
event,date
date,event
``` 
and even
```
event,event
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

NOTE: a duplicate relationship means a list a values. The following example means John lives in two cities: Bath and London.
   `name-city.csv`
   ```
   john,Bath
   john,London
   ```
   
### blob store

A dataset can optionally contain a directory named `store/` for large
text descriptions. Any value in any tablet can have descriptions,
stored as plain text files:

- `store/{sha256(value)}` -- untagged description
- `store/{sha256(value)}.en` -- English description
- `store/{sha256(value)}.ru` -- Russian description

Language suffixes follow BCP 47 tags. Each value can have at most one
untagged description and one description per language tag.

The blob store is a parallel layer -- it does not add collections to
`_-_.csv` or records to data tablets. Descriptions are never indexed
in the hexastore.

For example, if the value `visited-japan` has an English description,
it is stored at `store/{sha256("visited-japan")}.en`.

## Example
For example, let's represent that John is 35 years old and lives in Bath

`.csvs.csv`
```
version,0.0.4
id,some-uniq-numb-er
```

`_-_.csv`
```
name,age
name,city
```

`name-age.csv`
```
john,35
```

`name-city.csv`
```
john,Bath
```
