# 6. Sidecar storage for large literals

Date: 2026-05-09

## Status

Proposed

## Context

Some RDF literals (e.g. issue descriptions, prose content) are too large
for CSV cells. They need to participate in SPARQL queries like any other
triple, but storing multi-paragraph text in a CSV row is impractical.

## Decision

For a branch whose values are large text, csvs stores them as files
in a folder instead of rows in a CSV. The folder is named after the
relation (same as the CSV file), each file is named after the trunk,
and the file content is the leaf value:

- Normal: `csvs/trunk-leaf.csv` → `trunk1,value1`
- Sidecar: `csvs/trunk-leaf/trunk1.md` → file content is `value1`

The `_-_.csv` schema declares the `trunk,leaf` relation as usual
regardless of storage format.

Priority rule: if `csvs/trunk-leaf.csv` exists, it is the source of
truth and the folder is ignored. If there is no `.csv` file but
`csvs/trunk-leaf/` exists as a directory, csvs reads from sidecar files.

The folder's existence is the declaration. No metadata tablets or
configuration needed. On write, csvs checks: does the folder exist?
Write there. Does the `.csv` exist? Write there. Neither? Default to
`.csv`.

Csvs exposes operations to convert between formats:

- `csvs optimize trunk-leaf` — creates `csvs/trunk-leaf/`, writes each
  row as `csvs/trunk-leaf/{trunk}.md`, deletes `csvs/trunk-leaf.csv`
- `csvs compact trunk-leaf` — reads folder back into a `.csv`, removes
  the folder

The SPARQL query layer treats sidecar values identically to CSV cell
values. For leaf-keyed index lookups (searching by content), csvs does
a naive file scan. This is slow but correct, acceptable for small datasets.

## Consequences

- Large text literals are first-class triples, queryable via SPARQL
- No new top-level directories; everything stays inside `csvs/`
- Hexastore indexing for the content-keyed direction is a naive scan
- Caller controls storage format via optimize/compact operations
- Enables issue tracking, prose content, and other rich text use cases
  with NIP-34 aligned schema
- Sidecar filenames derive from arbitrary trunk values in the tablet.
  `csvs optimize` must validate trunk values as safe filenames (no path
  traversal, no special characters, length limit). This concern already exists with
  `_-_.csv` where branch names become tablet filenames and needs
  consistent validation across both paths
