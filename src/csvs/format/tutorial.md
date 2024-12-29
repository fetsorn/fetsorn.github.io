# Tutorial

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
visited Japan,2001-01-01
```

Technically, this dataset represents three records:
 - `event` record that says `visited Japan in 2001-01-01`
 - `date` record that says `2001-01-01`
 - a `_` record, pronounced `schema record`, that says `"event" has a "date"`

Let's add another event about climbing the Everest in 2003

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
visited Japan,2001-01-01
climbed Everest,2003-03-03
```

Now, the dataset represents five records:
 - `event` record that says `visited Japan in 2001-01-01`
 - `event` record that says `climbed Everest in 2003-03-03`
 - `date` record that says `2001-01-01`
 - `date` record that says `2003-03-03`
 - a `_` record, pronounced `schema record`, that says `"event" has a "date"`
 
Let's add another value to the database to show that events happened to different people.

> `.csvs.csv`
``` csv
csvs,0.0.2
```

> `_-_.csv`
``` csv
event,date
event,name
```

> `event-date.csv`
``` csv
visited Japan,2001-01-01
climbed Everest,2003-03-03
```

> `event-name.csv`
``` csv
visited Japan,Donell
climbed Everest,Eva
```

Finally, the dataset represents seven records:
 - `event` record that says `Donell visited Japan in 2001-01-01`
 - `event` record that says `Eva climbed Everest in 2003-03-03`
 - `date` record that says `2001-01-01`
 - `date` record that says `2003-03-03`
 - `name` record that says `Eva`
 - `name` record that says `Donell`
 - a `_` record, pronounced `schema record`, that says `"event" has a "date" and a "name"`

To remove records from the dataset, delete corresponding lines from the tablets.

Learn more about csvs in the [User guides](./user_guides.md).
