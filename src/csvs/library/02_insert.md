# Insert

The update function takes a record object notation and mutates the dataset to append lines.

## step 1: beginning 
> empty directory
> `.csvs.csv`
> - no changes
``` csv
csvs,0.0.2
```

> `_-_.csv`
> - no changes
``` csv
event, date
event, filepath
filepath, filehash
filepath, filesize
```

## step 2: add a record

> a record about vising Japan in 2001
``` javascript
{
  _: "event",
  event: "visited-japan",
  date: "2001-01-01"
}
```

> `.csvs.csv`
> - no changes
``` csv
csvs,0.0.2
```

> `_-_.csv`
> - no changes
``` csv
event, date
event, filepath
filepath, filehash
filepath, filesize
```

> `event-date.csv`
> - added visited-japan,2001-01-01
``` csv
visited-japan,2001-01-01
```

## step 3: add another record

> a record about cooking a lasagna in 2002
``` javascript
{
  _: "event",
  event: "cooked-lasagna",
  date: "2002-02-02"
}
```

> `.csvs.csv`
> - no changes
``` csv
csvs,0.0.2
```

> `_-_.csv`
> - no changes
``` csv
event, date
event, filepath
filepath, filehash
filepath, filesize
```

> `event-date.csv`
> - added cooked-lasagna,2002-02-02
``` csv
visited-japan,2001-01-01
cooked-lasagna,2002-02-02
```

## step 4: add attribute of a record

> a record that fixes the date for vising Japan to December 2001
``` javascript
{
  _: "event",
  event: "visited-japan",
  date: "2001-12-12"
}
```

> `.csvs.csv`
> - no changes
``` csv
csvs,0.0.2
```

> `_-_.csv`
> - no changes
``` csv
event, date
event, filepath
filepath, filehash
filepath, filesize
```

> `event-date.csv`
> - added visited-japan,2001-12-12
``` csv
cooked-lasagna,2002-02-02
visited-japan,2001-01-01
visited-japan,2001-12-12
```

To learn more about the architecture of csvs, see other [User Guides](./user_guides.md), the [Reference](./reference.md) and the [Requirements](./requirements.md).
