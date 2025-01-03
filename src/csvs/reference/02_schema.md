# Schema

## functions
### to schema
Entry -> Schema

Entry is a JSON in Entry Object Notation

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

```pdl
validate that entry has `_:_` 
for each trunk of entry except _
  for each leaf of entry.trunk
    append trunk to schema.leaf.trunks
    append leaf to schema.trunk.leaves
return schema
```
### is connected
Schema -> Base -> Branch -> Boolean

This tells if a branch is connected to base branch.

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

Base is string name of base branch

```pdl
if branch equals base
  return true
for each trunk of branch
  if trunk equals base
    return true
  if trunk is connected to base
    return true
otherwise
  return false
```

### find crown
Schema -> Base -> List Branch

This finds all branches that are connected to the base branch.

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

```pdl
if leaf is connected to base
  return leaf
```
