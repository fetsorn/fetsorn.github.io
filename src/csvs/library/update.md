# Update

The update function takes a record object notation and mutates the dataset to add or overwrite lines.

 - update()
   - add relation between two data entities
     - { _: _, entity1: "entity2" }
     - _-_::"entity1,entity2"
   - add a bunch of relations at once
     - { _: _, entity1: "entity2", entity2: "entity3" }
     - _-_::"entity1,entity2\nentity2,entity3"
 - ignore in update()
   - ignore value without "_"
     - { entity1: "entity2" }
   - ignore value "_" in a schema relation file
     - _-_::"_,entity"
     - _-_::"entity,_"
   - writes two records for record when _ is array of two items
     - { _: [ "entity1", "entity2" ], "entity3": "value3" }
     - [{ _: "entity1", "entity3": "value3" }, { _: "value2", "entity3": "value3" }]
   - ignore fields that have no relation to declared base branch
     - { _: "entity1", entity2: "value1", entity2: "value", unrelated_entity: "ignored_value" }
   - ignore array items that have _ other than declared base branch
     - { _: "entity1", entity1: [ { _: "entity1", entity1: "value1"}, { _: "entity2", entity2: "ignored value" }] }

Each step passes a record to `csvs.update` and changes the state of the dataset.

## step 1: beginning 
> empty directory

## step 2: add a schema

> a record with base `_` holds the schema
``` javascript
{
  _: "_",
  event: [ "date", "filepath" ],
  filepath: [ "filehash" ]
}
```

> `.csvs.csv`
> - no changes
``` csv
csvs,0.0.2
```

> `_-_.csv`
> - added relation for each item in a value array
``` csv 
event, date
event, filepath
filepath, filehash
```

## step 3: add a branch to the schema

> a record holds a schema with new branch `filesize`
``` javascript
{
  _: "_",
  event: [ "date", "filepath" ],
  filepath: [ "filehash", "filesize" ]
}
```

> `.csvs.csv`
> - no changes
``` csv
csvs,0.0.2
```

> `_-_.csv`
> - added filepath, filesize
``` csv
event, date
event, filepath
filepath, filehash
filepath, filesize
```

## step 4: add a record

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

## step 5: add another record

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
cooked-lasagna,2002-02-02
visited-japan,2001-01-01
```

## step 6: edit attribute of a record

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
> - removed visited-japan,2001-01-01
> - added visited-japan,2001-12-12
``` csv
cooked-lasagna,2002-02-02
visited-japan,2001-12-12
```

## step 7: add another record

> a record about climbing Everest in 2003, with a photo
``` javascript
{
  _: "event",
  event: "climbed-everest",
  date: "2003-03-03",
  filepath: "photo-everest"
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
> - added climbed-everest,2003-03-03
``` csv
cooked-lasagna,2002-02-02
climbed-everest,2003-03-03
visited-japan,2001-12-12
```

> `event-filepath.csv`
> - added climbed-everest,photo-everest
``` csv
climbed-everest,photo-everest
```

## step 8: add an attribute

> a record with a hashsum for the photo of Everest
``` javascript
{
  _: "filepath",
  filepath: "photo-everest",
  filehash: "0x0000"
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
> - no changes
``` csv
cooked-lasagna,2002-02-02
climbed-everest,2003-03-03
visited-japan,2001-12-12
```

> no changes
> - `event-filepath.csv`
``` csv
climbed-everest,photo-everest
```

> `filepath-filehash.csv`
> - added photo-everest,0x0000
``` csv
photo-everest,0x0000
```

## step 9: add a record with a nested attribute

> a record about breaking a leg in 2004, with an X-ray photo
``` javascript
{
  _: "event",
  event: "broke-leg",
  date: "2004-04-04",
  filepath: {
    _: "filepath",
    filepath: "photo-xray",
    filehash: "0x4444"
  }
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
> - added broke-leg,2004-04-04
``` csv
broke-leg,2004-04-04
cooked-lasagna,2002-02-02
climbed-everest,2003-03-03
visited-japan,2001-12-12
```

> `event-filepath.csv`
> - added broke-leg,photo-xray
``` csv
broke-leg,photo-xray
climbed-everest,photo-everest
```

> `filepath-filehash.csv`
> - added broke-leg,0x4444
``` csv
photo-everest,0x0000
photo-xray,0x4444
```

## step 10: delete an attribute from a record

> a record that removes the photo from the event about Everest
``` javascript
{
  _: "event",
  event: "climbed-everest",
  date: "2003-03-03"
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
> - no changes
``` csv
broke-leg,2004-04-04
cooked-lasagna,2002-02-02
climbed-everest,2003-03-03
visited-japan,2001-12-12
```

> `event-filepath.csv`
> - removed climbed-everest,photo-everest
``` csv
broke-leg,photo-xray
```

> `filepath-filehash.csv`
> - no changes
``` csv
photo-everest,0x0000
photo-xray,0x4444
```

## step 11: add a record with an attribute list

> a record about a wedding, with two photos
``` javascript
{
  _: "event",
  event: "married",
  filepath: [ "photo-bride", "photo-groom" ]
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
> - no changes
``` csv
visited-japan,2001-12-12
cooked-lasagna,2002-02-02
climbed-everest,2003-03-03
broke-leg,2004-04-04
```

> `event-filepath.csv`
> - added married,photo-bride
> - added married,photo-groom
``` csv
broke-leg,photo-xray
married,photo-bride
married,photo-groom
```

> `filepath-filehash.csv`
> - no changes
``` csv
photo-everest,0x0000
photo-xray,0x4444
```

## step 12: edit an element of an attribute list

> a record that removes the photo of the groom, and duplicates the photo of the bride
``` javascript
{
  _: "event",
  event: "married",
  filepath: [ "photo-bride", "photo-bride" ]
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
> - no changes
``` csv
broke-leg,2004-04-04
cooked-lasagna,2002-02-02
climbed-everest,2003-03-03
visited-japan,2001-12-12
```

> `event-filepath.csv`
> - removed married,photo-groom
> - added married,photo-bride
``` csv
broke-leg,photo-xray
married,photo-bride
married,photo-bride
```

> `filepath-filehash.csv`
> - no changes
``` csv
photo-everest,0x0000
photo-xray,0x4444
```

To learn more about the architecture of evenor, see [Design](./design.md) and [Requirements](./requirements.md).
