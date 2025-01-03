# Schema

 - [to schema](#to-schema)
 - [is connected](#is-connected)
 - [find crown](#find-crown)
  
To learn more about the architecture of csvs, see other [User Guides](./user_guides.md), the [Reference](./reference.md) and the [Requirements](./requirements.md).

## to schema
[Entry](./00_data_types.md#entry) -> [Schema](./00_data_types.md#schema)

```pdl
validate that entry has `_:_` 
for each trunk of entry except _
  for each leaf of entry.trunk
    append trunk to schema.leaf.trunks
    append leaf to schema.trunk.leaves
return schema
```
## is connected
[Schema](./00_data_types.md#schema) -> [Base](./00_data_types.md#base) -> [Branch](./00_data_types.md#branch) -> Boolean

This tells if a branch is connected to base branch.

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

## find crown
[Schema](./00_data_types.md#schema) -> [Base](./00_data_types.md#base) -> List [Branch](./00_data_types.md#branch)

This finds all branches that are connected to the base branch.

```pdl
if leaf is connected to base
  return leaf
```
