# Edit CSVS Schema

Each csvs dataset has a schema that describes what entry fields are allowed and how they relate to each other. 
You can see the schema with a --stats flag
```shell
csvs --stats -i /path/to/csvs-dataset
schema:
datum
 |---actdate
```

To change the schema, save it as json and open in a text editor.
```shell
csvs -i /path/to/csvs-dataset -q "?_=schema" | jq > schema.json
```
`schema.json`
```json
[
  {
    "_": "schema",
    "UUID": "...",
    "name": "datum",
    "type": "string"
  },
  {
    "_": "schema",
    "UUID": "...",
    "name": "actdate",
    "task": "date",
    "trunk": "datum"
  }
]
```

Let's add another field. The "trunk" field specifies that this is an attribute of "datum".
```json
  {
    "_": "schema",
    "UUID": "...",
    "name": "category",
    "type": "string",
    "trunk": "datum"
  }
```

Save the schema back to the dataset
```shell
csvs -i schema.json -o /path/to/csvs-dataset
schema:
datum
 |---actdate
 |---category
```

For a complete list of cli commands and flags, see [Reference](./reference.md). Learn more about csvs in the other [User Guides](./user_guides.md).

