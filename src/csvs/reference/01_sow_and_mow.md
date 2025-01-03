# Common

 - [sow](#sow)
 - [mow](#mow)

To learn more about the architecture of csvs, see other [User Guides](./user_guides.md), the [Reference](./reference.md) and the [Requirements](./requirements.md).

## sow
Entry -> Grain -> Trait -> Thing -> Entry

puts one field from Grain into Record

Entry is a JSON in Entry Object Notation

grain is a record with only _ field, base field and leaf field.

Trait and Thing are Strings

Trait is the branch what we look for, Thing is the branch we insert

sow will find a place in Record that has the same value of Trait as Grain, and insert a Thing nearby.

how it can tell whether to insert the thing as leaf or trunk is beyond me. i guess it assumes thing is always leaf of trait? 

```pdl
base = record._

if base equals thing
  append grain.thing to record.thing
if base equals trait
  append grain.thing to record.thing
if record has trait
  for each item of record.trait
    if item.trait equals grain.trait
      append grain.thing to item.thing
otherwise 
  for each field of record
    for each item of record.field
      sow grain to item
```

## mow
Entry -> Trait -> Thing -> List Grain

Break Record down into grains of Trait and Thing

Entry is a JSON in Entry Object Notation

grain is a record with only _ field, base field and leaf field.

Trait and Thing are Strings

Trait is the branch what we look for, Thing is the branch we insert

mow will find all individual trait-thing relations in the record

```pdl
base = record._

<!-- TODO: weird trait/thing mix here -->
if base equals thing
  for each item of record.trait
    return { _: base, base: record.base, trait: item.trait }
<!-- TODO: weird trait/thing mix here -->
if base equals trait
  for each item of record.thing
    return { _: base, base: record.base, thing: item.thing }
if record has trait
  for each trunk of record.trait
    for each leaf of item.thing
      return { _: trait, trait: trunk, thing: leaf }
otherwise 
  for each field of record
    mow each item of record.field
```

