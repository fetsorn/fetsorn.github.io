# Shell

tablet is a function that accepts the record, tablet, fs, dir and returns the record and IO.

 - shell: record -> Tablet -> fs -> dir -> IO Record -> IO 
 - shell: JSON -> Tablet -> FS -> String -> enqueue -> IO

can use streams, asynchronous iterators, for loops, threads.

TODO: add the last line after iteration

```pdl
run strategy
instantiate FS
for each tablet of strategy
    if accumulating 
        if has record
            forward
        assign initial record
        assign current record
        assign match map
    for each line of filename
        if querying 
            assign complete to current without trait
        else
            assign complete to current
        if eof and select 
            if tablet is not eager or if eager matched
                enqueue complete
                return
        if eof and select and tablet is eager or not matched
        or empty line
            enqueue empty
            return
        if eof and update
            assign fst undefined
        else
            parse line
        if key matches first
            assign first is new false
        else
            assign first is new true
        if eager and first is new and select
            assign chosen to initial
        else
            assign chosen to current
        if update
            if first is new
                call core with chosen
            else 
                assign empty state
        else
            call core with chosen
        assign current
        if eager and first is not new and is match or is previous match and select
            assign is match true TODO: unravel this
        else 
            assign is match false
        if eager and first is new and previous is match
            enqueue initial, current, first, is match, complete
        else
            enqueue initial, current, first, is match
        if delete and trait is first and first matches trait
        or delete trait is second and second matches trait
        or delete and no match
        or update and line complete
            enqueue line
        else if delete
            enqueue undefined
        if record complete and select
            if accumulating
                assign new match to map value undefined
            else 
                assign new match true
            if new match
                enqueue record
                set match
            delete record
        if update and new relations has key TODO: remove relations and make sense of match partial
            enqueue lines
        assign first
        assign is match
    if passthrough and no match
        enqueue record
    if accumulating
        enqueue record and match map
    if update or delete
        for each line in queue
            append line to tmp
        write tmp to filename
    if insert
        for each relation in record
            return key,value
        append line to filename
```
