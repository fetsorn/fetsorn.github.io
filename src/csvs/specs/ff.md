## to be named

 - with for nesting
 - and for arrays

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

## Terminology

tablet - a CSVS file

branch - a collection. a node.

twig - a collection without attributes. an external node.

trunk - a collection with attributes. a parent node. a branch can have multiple trunks. 

leaf - an attribute of another collection. a child node. a branch can have multiple leaves. 

root - a collection that is not an attribute of any other collection. a root node. a dataset can have multiple roots.

record - a set of connected values from multiple collections.

grain - a pair of connected values from two collections