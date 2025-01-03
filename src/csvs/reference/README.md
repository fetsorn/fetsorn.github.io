# Reference

This reference describes a library for playing with csvs datasets. It lists data types, signatures and implementations for each function. Implementations are written in Program Design Language, or pseudocode.

It currently provides four methods - select, update, insert and delete, each with the same API of a transform web stream factory asking for access to the file system and the dataset directory. 

Each method is currently implemented in the same style of constant memory and nested streams. 

A top-level record stream accepts a query record and returns a record. It builds a list of tablets from each query - a strategy, - and builds a pipeline of tablet streams. 

A tablet stream accepts a query record and returns a record. It streams tablet lines to a line stream. During operation multiple records are queued in the tablet stream, passed to record stream and queued there for consumption.

 - [Data Types](./00_data_types.md)
 - [Sow & Mow](./01_sow_and_mow.md)
 - [Schema](./02_schema.md)
 - [Insert](./03_insert.md)
 - [Update](./04_update.md)
 - [Delete](./05_delete.md)
 - [Select](./06_select.md)

To learn more about the architecture of csvs, see other [User Guides](../user_guides/README.md), the [Specifications](../specs/README.md) and the [Requirements](../requirements.md).
