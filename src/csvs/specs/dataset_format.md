# csvs Dataset Format

version 0.1.0

This document specifies the csvs dataset format.

"CSVS" stands for "Comma-Separated Value Store"

a csvs dataset represents relationships between collection values

## terminology

each collection CAN be called a "branch", plural "branches"

an collection without attributes CAN be called a "twig", plural "twigs"

an collection with attributes CAN be called a "trunk", plural "trunks"

an collection that is an attribute of another collection CAN be called a "leaf", plural "leaves"

an collection that is not an attribute of any other collection CAN be called a "root", plural "roots"

a dataset CAN have multiple roots

a branch CAN have multiple trunks

a branch CAN have multiple leaves

## .csvs.csv

a dataset MUST contain a tablet named`.csvs.csv` which describes the dataset

tablet is for metadata

`.csvs.csv` tablet MUST have a line `csvs,0.0.2`

this line is to support future breaking changes to the format.

## `_-_.csv`

a dataset SHOULD contain a tablet named `_-_.csv` which describes relationships between collections

reserved technical implementation details

underscroll-dash-underscroll

examples:
 - `_-_.csv`: `event,date` - dataset has an "event" collection with an attribute "date" 

if there is no `_-_.csv` tablet, dataset MUST be considered empty

an collection name MUST NOT be "_".

an collection name MUST NOT include the following characters: `[/\<>':"```|?*-.,[];{}$&]`.

an collection name CAN include any of the following: `[azAZ09_%+@]`, white-space and other Unicode characters

NOTE: when there's no `_-_.csv` file, list directory and deduce relations from tablet names.

## collection-collection.csv

underscore is like SQL table?
underscore is not like SQL table?
underscore is like MongoDB collection?
underscore is not like MongoDB collection?

a dataset CAN have a tablet named `{collection1}-{collection2}.csv` which describes relationships between values of two collections

contains values of two collections

"went to groceries" is an identifier here
examples:
 - `description-date.csv`: `went to groceries,2024-01-01`
 - `description-date.csv`: `went to groceries,2003-01-01`
 { _: description, description: "went to groceries", date: [2024-01-01, 2003-01-01]}
 { _: date, date: "2024-01-01"}
 { _: date, date: "2003-01-01"}
 
 - `event-description`: `0acab,went to groceries\n0abac,went to groceries`
 - `event-date`: `0acab,2024-01-01\n0abac,2003-01-01`
 { _: event, event: "0acab", description: "went to groceries", date: "2024-01-01"}
 { _: event, event: "0abac", description: "went to groceries", date: "2003-01-01"}
 
how to create two different values with the same text

a relation between collections MUST be listed in `_-_.csv`

a relation between collections CAN be recursive. 

examples: 
 - collection "person" CAN have an attribute "person".
 - collection "product" CAN have an attribute "competitor" which has an attribute "product". 

