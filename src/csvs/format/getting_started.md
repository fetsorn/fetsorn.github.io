# Getting Started

A csvs dataset is a directory that contains plain text files in the "comma-separated value" format, or CSV. Any directory that contains a `.csvs.csv` file is a valid CSVS dataset. Each CSV file represents a table with two columns and is called a "tablet". The first column is a `key`, and the second column is a `value`. You can store records by appending lines to the tablets. To represent complex objects and connect the tablets to each other, specify the relationships between values in the schema file `_-_.csv`.

Here's an example of the simplest CSVS dataset that contains a record about visiting Japan in 2001.

> `.csvs.csv`
``` csv
csvs,0.0.2
```

> `_-_.csv`
``` csv
event,date
```

> `event-date.csv`
``` csv
visited-japan,2001-01-01
```

To learn more about csvs, see the [Tutorial](./tutorial.md) and the [User guides](./user_guides.md).
