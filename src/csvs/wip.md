# The Forest and The Garden

## god view

this is used to describe the dataset at different levels

### god branch
```js
{ _: "branch0", 
  trunk0: ["dataset0"], 
  leaf0: ["trunk0", "leaf0"] }
```

### god schema
```js
{ _: "_", 
  dataset0: "branch0", 
  branch0: ["trunk0", "leaf0"] }
```

## list of texts

### dataset

```js
{ _: "dataset", 
  text: ["today went to the zoo", "yesterday stayed home"] }
```

### schema 
```js 
{ _: "_", dataset: ["text"] }
```

### god ?\_=branch0

```js
{ _: "branch0",
  branch0: "dataset",
  trunk0: [],
  leaf0: ["text"] }

{ _: "branch0",
  branch0: "text",
  trunk0: ["dataset"],
  leaf0: [] }
```

## graph of tokens

### dataset

```js
{ _: "dataset", 
  token: [
    { _: "token", 
      token: "today", 
      relation: "went to the zoo" }
    { _: "token", 
      token: "went to the zoo", 
      relation: "today" }
    { _: "token", 
      token: "yesterday", 
      relation: "stayed home" }
    { _: "token", 
      token: "stayed home", 
      relation: "yesterday" }
  ] }
```

### schema
```js 
{ _: "_", dataset: ["token"], token: ["relation"] }
```

### god ?\_=branch0

```js
{ _: "branch0",
  branch0: "dataset",
  trunk0: [],
  leaf0: ["token"] }

{ _: "branch0",
  branch0: "token",
  trunk0: ["dataset"],
  leaf0: ["relation"] }

{ _: "branch0",
  branch0: "relation",
  trunk0: ["token"],
  leaf0: [] }
```

## cluster of entities

### dataset

```js
{ _: "dataset", 
  event: [
    { _: "event", 
      event: "went to the zoo", 
      day: "today" }, 
    { _: "event", 
      event: "stayed at home", 
      day: "yesterday" }
  ], 
  day: [
     { _: "day", 
       day: "today", 
       event: "went to the zoo" }, 
     { _: "day", 
       day: "yesterday", 
       event: "stayed at home" }
   ] }
```

### schema

```js
{ _: "_", 
  dataset: ["event", "day"], 
  event: ["day"], 
  day: ["event"] }
```

### god ?\_=branch0

```js
{ _: "branch0", 
  branch0: "dataset", 
  trunk0: [], 
  leaf0: ["event", "day"] }

{ _: "branch0", 
  branch0: "event", 
  trunk0: ["dataset", "day"], 
  leaf0: ["day"] } 

{ _: "branch0", 
  branch0: "day",
  trunk0: ["dataset", "event"], 
  leaf0: ["event"] }
```

## tree of entries

### dataset 

```js
{ _: "dataset", 
  event: [ 
    { _: "event", event: "went to the zoo", day: "today" }, 
    { _: "event", event: "stayed at home", day: "yesterday" }
  ], 
  day: [
    { _: "day", day: "today" }, 
    { _: "day", day: "yesterday" }
  ] }
```

### schema
```js 
{ _: "_", dataset: ["event"], event: ["day"] }
```

### god ?\_=branch0

```js
{ _: "branch0",
  branch0: "dataset",
  trunk0: [],
  leaf0: ["event"] }

{ _: "branch0",
  branch0: "event",
  trunk0: ["dataset"],
  leaf0: ["day"] }

{ _: "branch0",
  branch0: "day",
  trunk0: ["event"],
  leaf0: [] }
```

## crud api

add new branch, remove branch, remove branch and its crown, remove branch and graft its crown to trunk, rewrite entire tree, find leaves, find trunks, find roots, find cognates, find laterals, find neighbours, find twigs, graft one branch to another, download tree, upload tree, find number of branches, find crown from root, find crown from twig, find all ancestors of a branch, find all progeny of a branch, insert branch with leaves to a branch, turn one tree into another, rename branch, switch branches with each other

delete, insert, create, update
