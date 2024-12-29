# Select Store

this describes an algorithm to query csvs datasets that caches the dataset into memory

library exports: 
 - default: CSVS class, more below
 - randomUUID: generates a UUID, to be deprecated
 - digestMessage(message): generates a SHA-256 hashsum, to be deprecated
 - condense(schema, record): expresses each value in a data structure as a string literal where possible
 - expand(record): expresses each value in a data structure as array of objects
 - findCrown(schema, base): finds all branches that are connected to the base branch
 - isTwig(schema, branch): true if branch has no leaves

CSVS class is a facade interface with following methods
 - constructor({ fs, dir })
 - select(urlSearchParams): returns an array of records from the dataset
 - selectBaseKeys(urlSearchParams): returns a list of values for base branch
 - buildRecord(base, baseKey): returns a dataset record for a given value of base branch
 - selectStream(urlSearchParams): returns a readable stream that yields record objects
 - update(record): updates a dataset record
 - delete(record): deletes a dataset record
 
`fs` object compatible with the Node FS

each method provides implementation for csvs 0.0.1, to be deprecated, and 0.0.2. detectVersion checks if the dataset has a file "metadir.json", 0.0.1, or a file ".csvs.csv", 0.0.2

implementations are organized in classes: Store, Delete, Select, and Update. 

Store is shared by other classes. 
 - schema: dataset schema
 - cache: map of file paths to file contents
 - output: map of file paths to file contents that will be written
 - constructor({ fs, dir })
 - readSchema: returns the dataset schema
 - read(base): returns a map of file paths to file contents in the dataset
 - getCache(filePath): returns the contents of a filepath
 - getOutput(filePath): returns the contents of a filepath that will be written
 - appendOutput(filePath, lines): appends a line to the a filepath that will be written
 - setOutput(filePath, fileContents): sets contents of a filepath that will be written
 - write(): writes new file contents to the dataset

at the beginning of each algorithm, Store reads the entire dataset into memory with read(base). to be deprecated in favor of asynchronous file reader handles.

Select class represents a dataset query and implements several query methods
 - constructor({ fs, dir })
 - select(urlSearchParams): returns an array of records from the dataset
 - selectBaseKeys(urlSearchParams): returns a list of values for base branch
 - buildRecord(base, baseKey): returns a dataset record for a given value of base branch
 - selectStream(urlSearchParams): returns a readable stream that yields record objects
 - #selectSchema(query): returns the schema record for the dataset

url params are converted to a query object. url search params are to be deprecated in favor or the query object. each value in the query object is a regex. see [[query object]]

if query base is "_", `selectSchema` parses the `_-_.csv` file and returns a schema record.
 - _-_.csv: `event,description\nevent,date`
 - schema record: `{ _:_, event: [description, date]}`

Select parses each dataset two times, builds a list of base keys and a map of all associated leaf values. Then Select builds a record for each base key, returns a list of records.

selectBaseKeys and buildRecord follow the same algorithm as select(), but separate the last step while sharing the map of values. this provides support for streaming the records objects once a list of base keys is known.

selectStream is to be implemented for 0.0.2

Update class represents a mutable dataset record
 - constructor({ fs, dir })
 - update(record): updates a dataset record
 - #updateSchema(record): saves the schema to the dataset
 - #updateRecord(record): saves a record to the dataset

if query base is "_", `updateSchema` writes the schema record to the `_-_.csv` file.
 - schema record: `{ _:_, event: [description, date]}`
 - _-_.csv: `event,description\nevent,date`

updateRecord flattens the record into a mapping of key->value pairs for each tablet, then parses each tablet, prunes the old lines that match the new values and appends the new lines at the end of the file.

Delete class represents a mutable dataset record
 - constructor({ fs, dir })
 - delete(record): deletes a dataset record
 - #deleteRecord(record): deletes a record from the dataset
 
deleteRecord parses and prunes the trunk tablet for the record values, then parses and prunes each leaf tablet. 

To learn more about the architecture of evenor, see [Design](./design.md) and [Requirements](./requirements.md).
