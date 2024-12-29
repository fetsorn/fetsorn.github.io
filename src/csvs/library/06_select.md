# dataset

select must take query object notation

TODO add dataset tablets

> .csvs.csv
``` csv
csvs,0.0.2
```

> _-_.csv
``` csv
datum, date
datum, filepath
filepath, filehash
filepath, filetype
filepath, filesize
```

> datum-date.csv
```  csv
datum1,date1Overwrite
datum2,date2
datum3,date3
datum4,date4
```

> datum-filepath.csv
``` csv
datum4,filepath4
datum5,filepath5a
datum5,filepath5a
```

> filepath-filehash.csv
``` csv
filepath3,filehash3
filepath4,filehash4
```

# query(queryDatum, fs)

> queryDatum
``` javascript
{
  _: "datum",
  datum: "value1"
}
```

> resultDatum
``` javascript
[
  {
    _: "datum",
    datum: "datum1",
    date: "date1Overwrite"
  }
]
```

# query(queryRegex, fs)

> queryRegex
``` javascript
{
  _: "datum",
  datum: "value[12]"
}
```

> resultRegex
``` javascript
[
  {
    _: "datum",
    datum: "datum1",
    date: "date1Overwrite"
  },
  {
    _: "datum",
    datum: "datum2",
    date: "date2"
  },
]
```

# query(queryOptions, fs)

> queryOptions
``` javascript
{
  _: "datum",
}
```

> resultOptions
``` javascript
[
  {
    _: "datum",
    datum: "datum1",
    date: "date1Overwrite"
  },
  {
    _: "datum",
    datum: "datum2",
    date: "date2"
  },
  {
    _: "datum",
    datum: "datum3",
    date: "date3"
  },
  {
    _: "datum",
    datum: "datum4",
    date: "date4"
    filepath: {
      _: "filepath",
      filepath: "filepath4",
      filehash: "filehash4"
    }
  },
]
```

# query(queryFilter, fs)

> queryfilter
``` javascript
{
  _: "datum",
  filepath: "filepath4"
}
```

> resultFilter
``` javascript
[
  {
    _: "datum",
    datum: "datum4",
    date: "date4"
    filepath: {
      _: "filepath",
      filepath: "filepath4",
      filehash: "filehash4"
    }
  },
]
```

# query(queryFilterNested, fs)

> queryfilterNested
``` javascript
{
  _: "datum",
  filehash: "filehash4"
}
```

> resultFilterNested
``` javascript
[
  {
    _: "datum",
    datum: "datum4",
    date: "date4"
    filepath: {
      _: "filepath",
      filepath: "filepath4",
      filehash: "filehash4"
    }
  },
]
```

To learn more about the architecture of csvs, see other [User Guides](./user_guides.md), the [Reference](./reference.md) and the [Requirements](./requirements.md).
