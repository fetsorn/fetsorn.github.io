# The Forest and The Garden

## levels

### god view

this is used to describe the dataset at different levels

god branch - `{ _: "branch0", trunk0: ["dataset0"], leaf0: ["trunk0", "leaf0"] }`

god schema - `{ _: "_", dataset0: "branch0", branch0: ["trunk0", "leaf0"] }`

### list of texts

dataset -

```js
{ _: "dataset", 
  text: ["today went to the zoo", "yesterday stayed home"] }
```

??? - `{ _: "text" }`

schema - `{ _: "_", dataset: ["text"] }`

god ?\_=branch0 -

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

### tokens and relations

### cluster of entities

dataset -

```js
{ _: "dataset", 
  day: ["today", "yesterday"], 
  event: ["went to the zoo", "stayed at home"] }
```

??? - `{ _: "event" }`, `{ _: "day" }`

schema - `{ _: "_", dataset: ["event", "day"] }`

god ?\_=branch0 -

```js
{ _: "branch0",
  branch0: "dataset",
  trunk0: [],
  leaf0: ["event", "day"] }

{ _: "branch0",
  branch0: "event",
  trunk0: ["dataset"],
  leaf0: [] }

{ _: "branch0",
  branch0: "day",
  trunk0: ["dataset"],
  leaf0: [] }
```

### graph of nodes

dataset -

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

??? - `{ _: "event", relation: ["day"] }`, `{ _: "day", relation: ["event"] }`

schema - `{ _: "_", dataset: ["branch"], branch: ["relation"] }`

god ?\_=branch0 -

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

### tree of entries

dataset -

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

??? - `{ _: "event", trunk: [], leaf: ["day"] }` `{ _: "day", trunk: ["event"], leaf:[] }`

schema - `{ _: "_", dataset: ["branch"], branch: ["trunk", "leaf"] }`

god ?\_=branch0 -

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
