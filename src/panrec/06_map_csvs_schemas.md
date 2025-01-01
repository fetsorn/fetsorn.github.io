# Map CSVS Schemas

The recommended way to merge csvs datasets with different schemas is by using jq filters.

```shell
panrec -i /path/to/source-dataset | jq '.' | -o /path/to/target-dataset
```

For a complete list of cli commands and flags, see [Reference](./reference.md). Learn more about panrec in other [User Guides](./user_guides.md) and the [Requirements](./requirements.md).
