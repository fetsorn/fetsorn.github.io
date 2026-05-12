# 7. Description blobs with tilde operator

- Status: proposed
- Date: 2026-05-12

## Context

CSVS values must be small for fast parsing and hexastore indexing. But
any value in the graph may need a large text description attached to it
-- a prose explanation, a long comment, a body of content. ADR-0006
rejected sidecar storage because it broke the SPARQL contract with
one-to-many naming and storage-coupled updates.

The problem remains: there is no way to associate large text with a
value without putting it in a CSV cell.

Earlier CSVS datasets used a convention called "datum" -- a schema
branch (e.g. `event-datum.csv`) that held long text values as regular
CSV fields. This worked but had no special semantics: datum was just
another predicate, its values were indexed in the hexastore like any
other, nothing prevented them from being used as subjects, and
querying event keys required parsing through large datum cells in the
same tablet, slowing down every search. The
tilde operator evolves the datum pattern into a first-class feature
with proper constraints.

In RDF, literals are terminal (can only be objects, never subjects).
CSVS values are arbitrary unicode strings that can appear in either
column. Rather than imposing the IRI/literal split, we introduce a
parallel blob store accessible through a reserved SON operator.

## Decision

Every CSVS value can optionally have a single large text description,
stored in a content-addressed blob store outside the CSV tablets. The
blob store is a parallel layer -- it does not add predicates to `_-_.csv`
or triples to the hexastore.

### Storage

Descriptions are stored as content-addressed blobs on disk at
`store/{sha256(value)}`. The path is derived from the sha256 hash of
the value itself, so each value has at most one description -- the same
way each record has at most one base value.

### SON operator

The tilde character `~` is a reserved field key in SON records.

**Write** -- a data record with `~` stores the blob:

```
{ "_": "event", "event": "visited-japan", "~": "We visited Tokyo and Kyoto in spring..." }
```

**Query** -- a query record with `~` retrieves the blob. The `~` value
is a regex filter on blob content, consistent with other SON query
fields:

```
{ "_": "event", "event": "visited-japan", "~": "" }
```

Returns the record with `~` populated with the blob text (or omitted if
no blob exists).

**Nested** -- to access the description of a specific field value rather
than the base value, expand the field to a SON record:

```
{ "_": "event", "date": { "_": "date", "date": "2024", "~": "" } }
```

**Search** -- `~` with a non-empty string in a query filters by blob
content:

```
{ "_": "event", "~": "Tokyo" }
```

Returns records whose base value has a description matching "Tokyo".

### Example

An event has a date, and both the event and the date have descriptions:

RDF:

```turtle
ex:visited-japan  a            ex:Event ;
                  ex:date      ex:2001-01-01 ;
                  rdfs:comment "We visited Tokyo and Kyoto in spring" .

ex:2001-01-01     rdfs:comment "Cherry blossom season" .
```

SON:

```
{ "_": "event", "event": "visited-japan", "~": "We visited Tokyo and Kyoto in spring",
  "date": { "_": "date", "date": "2001-01-01", "~": "Cherry blossom season" } }
```

### SPARQL mapping

At the SPARQL boundary, `~` maps to `rdfs:comment`. A query like:

```sparql
SELECT ?event WHERE {
  ?event a :event ;
         rdfs:comment ?desc .
  FILTER(contains(?desc, "Tokyo"))
}
```

resolves `rdfs:comment` triples from the blob store, not from CSV
tablets.

## Consequences

- CSV tablets stay unchanged -- small values only, hexastore unaffected
- Supersedes ADR-0006: blobs are not sidecar files per predicate but a
  global content-addressed store keyed by value hash
- `~` is added to the set of reserved SON field keys alongside `_`
- Any value can have at most one description
- Blob content is never indexed in the hexastore, only searched via
  grep at query time
- The blob store is optional -- a CSVS dataset without blobs works
  exactly as before
