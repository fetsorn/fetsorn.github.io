# Update

The update function takes a record object notation and mutates the dataset to add or overwrite lines.

the update record stream asks for update strategy and pipes it through update tablet streams. update tablet stream pipes lines to the update line stream which searches the record for values that match the line, signals a match and passes novel lines to a stream that writes them to file.

Each step passes a record to `csvs.update` and changes the state of the dataset.

- [update in dataset](#update-in-dataset)
  - [update stream](#update-stream)
    - [update strategy](#update-strategy)
    - [update tablet stream](#update-tablet-stream)
      - [update schema stream](#update-schema-stream)
      - [update line stream](#update-line-stream)

To learn more about the architecture of csvs, see other [User Guides](./user_guides.md), the [Reference](./reference.md) and the [Requirements](./requirements.md).

## update in dataset
FS -> Dir -> List Entry -> List Entry

FS is input output interface to the file system

Dir is String of a path to open in FS

Query is a JSON in Query Object Notation

Entry is a JSON in Entry Object Notation

```pdl
pipe each query 
  to update stream 
  to return
```
## update stream
FS -> Dir -> Entry -> List Entry

FS is input output interface to the file system

Dir is String of a path to open in FS

Entry is a JSON in Entry Object Notation

```pdl
schema = select schema
strategy = update strategy with schema, query
for each tablet of strategy
  append update tablet stream
pipe query
  to each update tablet stream
  to return
```
## update strategy
Schema -> Entry -> List Tablet

This describes all tablets needed to update an entry

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
if base equals _
  return [{
    filename: _-_.csv
  }]
for each branch of crown
  for each trunk of schema.branch.trunks
    return {
      filename: trunk-branch.csv,
      trunk,
      branch,
    }
```
## update tablet stream
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
if tablet.filename equals _-_.csv
  pipe filepath
    to update schema stream
    to temporary file
otherwise
  pipe filepath
    to update line stream
    to temporary file
move temporary file to filepath
```
## update schema stream
Entry -> Line

Entry is a JSON in Entry Object Notation

Line is a String in CSVS file format

```pdl
for each field of entry
  for each leaf of entry.field
    enqueue field,leaf
```
## update line stream
Entry -> Tablet -> Line -> Line

Entry is a JSON in Entry Object Notation

Tablet is 
```js
{ 
  filename: String, 
  trunk: String, 
  branch: String 
}
```

Line is a String in CSVS file format

```pdl
grains = mow query with tablet.trunk, tablet.branch
keys = map grain to grain[tablet.trunk] sorted
values = reduce grains to { grain[tablet.trunk]: grain[tablet.branch] }
for each line
  fst, snd = parse line
  fst is new = state.fst is undefined or state.fst not equal fst
  if fst is new and state.match
    for each value of values[state.fst]
      enqueue state.fst,value
    keys = filter keys where key not equal state.fst
  if fst is new
    between = filter keys where key is after state.fst and before fst
    for each key of between
      for each value of values[key]
        enqueue key,value
      keys = filter keys where key not equal state.fst
  if keys not include fst
    enqueue line
  state = { fst, match }
for key of keys
  for each value of values[key]
    enqueue key,value
  keys = filter keys where key not equal state.fst
```
