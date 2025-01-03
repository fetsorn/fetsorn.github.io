# Delete

delete literal must take literal query object notation and delete records that match literal constraints

the delete record stream asks for delete strategy and pipes it through delete tablet streams. delete tablet stream pipes lines to the delete line stream to match the record and prune lines that are written to the file.

delete regular expression must take regular expression query object notation and delete records that match regular expression constraint

should remove literal and only match on regular expression?

WON'T delete unexpected extra records that match constraint by accident

should we only have literal match after query to avoid unexpected deletions?

 - [delete in dataset](#delete-in-dataset)
   - [delete stream](#delete-stream)
     - [delete strategy](#delete-strategy)
     - [delete tablet](#delete-tablet)
       - [delete line stream](#delete-line-stream)

To learn more about the architecture of csvs, see other [User Guides](./user_guides.md), the [Reference](./reference.md) and the [Requirements](./requirements.md).

## functions
### delete in dataset
FS -> Dir -> List Query -> IO List Entry

FS is input output interface to the file system

Dir is String of a path to open in FS

Query is a JSON in Query Object Notation

Record is a JSON in Entry Object Notation

```pdl
pipe each query 
  to delete stream 
  to return
```
### delete stream
FS -> Dir -> Query -> IO List Entry

FS is input output interface to the file system

Dir is String of a path to open in FS

Query is a JSON in Query Object Notation

Entry is a JSON in Entry Object Notation

```pdl
schema = select schema
for each query
  strategy = delete strategy with schema, query
  for each tablet of strategy
    delete tablet with fs, dir, query
    return query
```
### delete strategy
Schema -> Entry -> List Tablet

This describes all tablets needed to delete an entry

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
  trait: String, 
  trait is first: Boolean 
}
```

```pdl
base = entry._
if base has trunk
  append { 
    filename: trunk-base.csv, 
    trait: entry.base, 
    trait is first: false 
  }
for each leaf of base
  append {
    filename: base-leaf.csv, 
    trait: entry.base, 
    trait is first: true 
  }
```
### delete tablet
FS -> Dir -> Query -> IO

FS is input output interface to the file system

Dir is String of a path to open in FS

Tablet is 
``` js
{ 
  filename: String, 
  trait: String, 
  trait is first: Boolean 
}
```

```pdl
filepath = dir/tablet.filename;
if filepath is empty return;
pipe filepath 
  to delete line stream
  to append temporary file;
move temporary file to filepath;
```
### delete line stream
Tablet -> Line -> Line

Tablet is 
```js
{ 
  filename: String, 
  trait: string, 
  trait is first: Boolean 
}
```

Line is String in CSVS file format

```pdl
fst, snd = parse line
trait is fst if tablet.trait is first
trait is snd if not tablet.trait is first 
if trait equals tablet.trait
  enqueue line
```
