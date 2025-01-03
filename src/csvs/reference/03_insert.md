# Insert

The update function takes a record object notation and mutates the dataset to append lines.

the insert record stream asks for insert strategy and pipes it through insert tablet streams. insert tablet stream writes the records as lines at the end of the tablet. at the end of the record stream the tablet content is grouped to a valid form by sorting.

- [insert in dataset](#insert-in-dataset)
  - [insert stream](#insert-stream)
    - [insert strategy](#insert-strategy)
    - [insert tablet stream](#insert-tablet-stream)

To learn more about the architecture of csvs, see other [User Guides](./user_guides.md), the [Reference](./reference.md) and the [Requirements](./requirements.md).
## insert in dataset
FS -> Dir -> List Entry -> IO List Entry

FS is input output interface to the file system

Dir is String of a path to open in FS

Query is a JSON in Query Object Notation

Entry is a JSON in Entry Object Notation

```pdl
pipe each query 
  to insert stream
  to return
```
## insert stream
FS -> Dir -> Entry -> IO List Entry

FS is input output interface to the file system

Dir is String of a path to open in FS

Entry is a JSON in Entry Object Notation

```pdl
schema = select schema
for each entry
  strategy = insert strategy with schema, query
  for each tablet of strategy
    append insert tablet stream
for each tablet of strategy
  sort tablet
pipe query 
  to each insert tablet stream
  to return
```
## insert strategy
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
```js
{ 
  filename: String, 
  trunk: String, 
  branch: String 
}
```

```pdl
base = entry._
crown = find crown with schema, base
for each branch of crown
  for each trunk of schema.branch.trunks
    return {
      filename: trunk-branch.csv,
      trunk: trunk,
      branch: branch,
    }
```

## insert tablet stream
FS -> Dir -> Schema -> Tablet -> Entry -> IO Entry

FS is input output interface to the file system

Dir is String of a path to open in FS

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

Tablet is 
```js
{ 
  filename: String, 
  trunk: String, 
  branch: String 
}
```

Entry is a JSON in Entry Object Notation

```pdl
filepath = dir/tablet.filename
// in order to start other tablet streams
enqueue entry 
grains = mow query with tablet.trunk, tablet.branch
for each grain
  append grain.key,grain.value to filepath
```
