# Branch Metadata

If you want to describe each branch in detail, you can create a set of tablets for the "branch" branch.

> `.csvs.csv`
``` csv
csvs,0.0.2
```

> `_-_.csv`
``` csv
event,date
event,name
branch,description
```

> `branch-description.csv`
``` csv
event,something that happened
date,something happened at this time
name,something happened to this person
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

By default, a csvs dataset represents lists of objects of strings. You can define custom value types based on details about each branch. For example, define a tablet called `branch-datatype.csv` and specify an `age` branch with type `number`. Just make sure to check that `age` values are really numbers.

> `.csvs.csv`
``` csv
csvs,0.0.2
```

> `_-_.csv`
``` csv
event,date
event,name
name,age
branch,datatype
```

> `branch-datatype.csv`
``` csv
age,number
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

> `name-age.csv`
``` csv
Donell,35
Eva,70
```

To learn more about csvs, see other [User Guides](./user_guides.md) and the [Requirements](./requirements.md).
