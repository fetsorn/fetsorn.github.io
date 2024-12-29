# Strategy

strategy is a function that accepts schema, record, and returns the list of tablets.

 - strategy: schema -> record -> List Tablet
 - strategy: JSON -> JSON -> List Tablet 

Tablet
- filename: string
- trait: string
- thing: string
- traitIsFirst: bool 
- traitIsRegex: bool
- thingIsFirst: bool
- accumulating: bool
- eager: bool
- passthrough: bool
- querying: bool
- enumerator
  - 1 select
  - 2 update
  - 3 delete
  - 4 insert

```pdl
search schema for base
if no base 
    panic
search schema for trunk of each branch
if select
    if base is _
        list with one element
        filename: _-_.csv
        thing: _
        trait: _
        thing is first: false
        trait is first: true
    if only base
        for trunk of base 
            filename: trunk-base.csv
            thing: base
            trait: trunk
            thing is first: false
            trait is first: false
            trait is regex: true
            eager: true
            accumulating: true
        for each leaf of base
            filename: base-leaf.csv
            thing: base
            trait: base
            thing is first: true
            trait is first: true
            trait is regex: true
            accumulating: true
            eager: true
    else
        for each queried key in ascending order minus the base
            filename: trunk-branch.csv
            thing: trunk
            trait: branch
            thing is first: true
            trait is first: false
            traitIsRegex: true
            querying: true
            eager: true
        for each branch connected to base
            filename: trunk-branch.csv
            thing: branch
            trait: trunk
            thing is first: false
            trait is first: true
            eager: trunk === base
            passthrough: true
if update
    for each branch connected to base
        filename: trunk-branch.csv
if delete
    for trunk of base 
        filename: trunk-base.csv
        trait: baseValue
        trait is first: false
    for each leaf of base
        filename: base-leaf.csv
        trait: baseValue
        trait is first: true
if insert
    for each branch connected to base
        filename: trunk-branch.csv
else
   panic
```

