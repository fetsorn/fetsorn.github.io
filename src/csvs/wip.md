# The Forest and The Garden

## view
data inside

### list of texts
have some text

```
today went to the zoo, yesterday stayed home
```

### graph of tokens
separate text into tokens that are connected to each other

```
today-went to the zoo
yesterday-stayed home
```

### cluster of entities
group some tokens into clusters and name each cluster as an entity

```
| event            | day       |
| ---------------- | --------  |
| went to the zoo  | today     |
| stayed home      | yesterday |
```

### tree of entries
choose one entity as a root and cut connections to it

```
.
|
|-- went to the zoo
| |--- today
|-- stayed at home
  |--- yesterday
```

## dataset
shorthand data inside

### list of texts
have some text

```js
{ _: "dataset", 
  text: ["today went to the zoo", "yesterday stayed home"] }
```

### graph of tokens
separate text into tokens that are connected to each other

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

### cluster of entities
group some tokens into clusters and name each cluster as an entity

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

### tree of entries
choose one entity as a root and cut connections to it

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

## branch
structure of data inside

describe each level as a tree where a possible entity is called "branch", it connects to "leaves" and leaves connect to "trunk".

```js
{ _: "_", 
  root: "branch", 
  branch: ["trunk", "leaf"] }
```

### list of texts
have some dataset with text

```js
{ _: "root", 
  branch: [
    { _: "branch",
      branch: "dataset",
      trunk: [],
      leaf: ["text"] }
    
    { _: "branch",
      branch: "text",
      trunk: ["dataset"],
      leaf: [] }
  ] }
```

### graph of tokens
separate text into tokens, each token has a relation to some other token

```js
{ _: "root", 
  branch: [
    { _: "branch",
      branch: "dataset",
      trunk: [],
      leaf: ["token"] }
    
    { _: "branch",
      branch: "token",
      trunk: ["dataset"],
      leaf: ["relation"] }
    
    { _: "branch",
      branch: "relation",
      trunk: ["token"],
      leaf: [] }
  ] } 
```

### cluster of entities
group tokens into clusters "event" and "day"

```js
{ _: "root", 
  branch: [
    { _: "branch", 
      branch: "dataset", 
      trunk: [], 
      leaf: ["event", "day"] }
    
    { _: "branch", 
      branch: "event", 
      trunk: ["dataset", "day"], 
      leaf: ["day"] } 
    
    { _: "branch", 
      branch: "day",
      trunk: ["dataset", "event"], 
      leaf: ["event"] }
  ] }
```

### tree of entries
choose the "event" entity as root and cut connection to it from "day"

```js
{ _: "root", 
  branch: [
    { _: "branch",
      branch: "dataset",
      trunk: [],
      leaf: ["event"] }
    
    { _: "branch",
      branch: "event",
      trunk: ["dataset"],
      leaf: ["day"] }
    
    { _: "branch",
      branch: "day",
      trunk: ["event"],
      leaf: [] }
  ] }
```
  
## schema
shorthand structure of data inside

write trunk as field name and its leaves as a list a values

### list of texts
have some text
  
```js 
{ _: "_", dataset: ["text"], text: [] }
```
### graph of tokens
separate text into tokens that are related to each other

```js 
{ _: "_", dataset: ["token"], token: ["relation"], relation: [] }
```

### cluster of entities
group tokens into clusters "event" and "day"


```js
{ _: "_", 
  dataset: ["event", "day"], 
  event: ["day"], 
  day: ["event"] }
```

### tree of entries
choose the "event" entity as root and cut connection to it from day

```js 
{ _: "_", dataset: ["event"], event: ["day"], day: [] }
```

## crud api

add new branch, remove branch, remove branch and its crown, remove branch and graft its crown to trunk, rewrite entire tree, find leaves, find trunks, find roots, find cognates, find laterals, find neighbours, find twigs, graft one branch to another, download tree, upload tree, find number of branches, find crown from root, find crown from twig, find all ancestors of a branch, find all progeny of a branch, insert branch with leaves to a branch, turn one tree into another, rename branch, switch branches with each other

delete, insert, create, update
