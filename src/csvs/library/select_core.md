# Select Core

this describes an algorithm to query csvs datasets that does not cache the dataset into memory but keeps search results in memory

algo is divided into shell and core

The shell has access to i/o, the core has no access to i/o

The core is a pure function that maps a struct and a string to a struct

Together, core and shell search csvs tablets

The shell is an execution environment and the core is a reducer function

The shell passes one line at a time to the core along with return value of previous call to the core

The shell may choose to implement a pipeline of streams, eagerly passing values to the next tablet. O(1) memory

Otherwise the shell caches values, O(n) memory

The shell must sort the tablet before passing lines to the core

This enables support for array semantics

Shell should follow the order of tablets recommended by initial call to the core

Otherwise shell can parse all tablets in a loop until core completes

The core is a reducer function that transforms an intermediary data structure by enriching it with data from a tablet line

The data structure holds the algorithm state, among others

- name of tablet

- thing branch

- thing column

- trait branch

- trait column

- query record

- previous key

- push toggle

The core searches the line for thing by trait using regex from the query object and replaces the query thing field with found value

The core replaces A when it encounters B and knows the sorted array batch is complete

if line has duplicate key, array, core pushes found value to thing field instead of replacing. if previous step has the same key, thing and trait

if previous step has different key the previous directive is returned with push toggle and replaced value in query object, shell pushes record to next tablet stream or stores in memory

If shell implements streams it's O(1) memory multiplied by number of parallel streams

without streams it's O(n) memory

Computationally it's O(n)

Core can implement boyer-moore variant and direct shell to skip lines for O(n)

Core is in js, shell is in js

Core will be in rust wasm, shell in rust and js

query syntax now is js regex, will be rust regex

Update and delete algos are naive shell code now, can use core to edit sorted too.

To learn more about the architecture of evenor, see [Design](./design.md) and [Requirements](./requirements.md).
