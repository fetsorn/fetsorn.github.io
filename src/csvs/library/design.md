# Design

library for interacting with csvs datasets

competes: libraries for SQL, MongoDB

interacts: with arbitrary dataset storage that implements FS

constitutes: a library, a WASM reactor module

includes: a facade interface, query controller, record update controller, record delete controller, schema controller, dataset cache

patterns: facade

resembles: 

stakeholders: fetsorn, csvs-cli, evenor

Specification for dataset records

- [Record Object Notation](./record_object_notation.md)

Ways to update csvs datasets

- [Update](./update.md)
- [Delete](./delete.md)
- [Insert](./insert.md)

Specification for dataset queries

- [Query Object Notation](./query_object_notation.md)

Ways to parse csvs datasets

- [Select Core](./select_core.md) - walk the tablets one line at a time in parallel
- [Select Store](./select_store.md) - cache dataset into memory

Also see the [Requirements](./requirements.md).
