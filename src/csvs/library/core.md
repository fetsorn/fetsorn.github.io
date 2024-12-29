# Core

core is a function that accepts the record, tablet, key, value and returns the record.

 - core: record -> Tablet -> key -> value -> record
 - core: JSON -> Tablet -> String -> String -> JSON


```pdl
if select
    if base is thing
        if base is _
            set leaves to trait
        else if base is regex
            if base value matches trait
                set thing to base
        else if trait is leaf
            for each leaf item
                if leaf value matches trait
                    add leaf value to leaf
        else trait is trunk 
             set thing to base 
    else if base is trait
        if base value matches trait
            add thing to leaf
    else if trait is object
        for each trunk item
            if trunk value matches trait
                add thing to leaf
    else
        for each leaf
            for each item
               call core
               if item matches
                   add item to key
else if update
    for each relation TODO: rewrite to not use relations and lines
        if is between
            return line
else if delete
or insert
    return record
    return record
else 
    panic
```
