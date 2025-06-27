# Store

## public

### StoreContext
solid.js component to interact with the store

### store
 - `schema`: object, holds the structure of records in the current folder
 - `repo`: object, represents the currently viewed folder
 - `searchParams`: object, holds the state of the search bar
 - `records`: list of objects currently displayed in the overview
 - `record`: object, represents the currently viewed record
 - `spoilerMap`: a hash map with the state of unfolded spoilers
 - `loading`: a switch for loader animation
 - `abortPreviousStream()`: function, holds the handler to interrupt a search stream

### on record edit
Path -> Value -> IO

handles data input during editing

### on record save
Record -> Record -> IO

writes a record to the folder

### on record wipe
Record -> IO

removes a record from folder

### on record create
IO

creates a record

### on repo change
Path -> Search -> IO

changes the currently viewed folder

### on search 
Field -> Value -> IO

changes the state of the search bar

### set spoiler open
Index -> Boolean -> IO

### get spoiler open
Index -> Boolean

### get filter queries

### get filter options

### get sorted records

### on clone
UUID -> Name -> URL -> Token -> IO

### on pull repo
UUID -> Remote -> URL -> Token -> IO

### on push repo
UUID -> Remote -> URL -> Token -> IO

### on zip
UUID -> IO

### search params to query
Schema -> Search Params

returns a csvs query from a query string
   
## private

### append record
Record -> IO

### leapfrog 
Branch -> Value -> Cognate -> IO

### backflip
Branch -> Value -> Cognate -> IO

### sidestep
Branch -> Value -> Cognate -> IO

### warp
Branch -> Value -> Cognate -> IO

### save record
UUID -> Base -> List Record -> Record -> Record -> IO

### wipe record
Repo -> Base -> List Record -> Record

### change repo 
Path -> Search Params

### search
Schema -> Search Params -> Repo -> Name -> Field -> Value -> (Record -> IO)

### update record 
Repo -> Base -> Record -> Record

### create record 
Repo -> Base -> Record

### select stream
Schema -> Repo -> (Record -> IO) -> Search Params

### on merge repo
Schea -> Repo -> Name -> Search Params

### find 
UUID -> Name

### clone
UUID -> Name -> URL -> Token

### query to search params
Query -> Search Params

converts state of the search bar to URLSearchParams

### ensure trunk
Schema -> Record -> Trunk -> Leaf -> IO 

make sure record has trunk and all trunks of trunk until root

### enrich branch records
Record -> List Record

### extract schema records 
List Record -> Record

### schema to branch records
Schema -> List Record

converts an evenor schema object to a list of csvs records

### records to schema
Record -> List Record -> Record

converts a list of csvs records to an evenor schema object

### change search params
Search Params -> Field -> Value

### make URL
Search Params -> Branch -> UUID

prepare a new browser URL

### pick default base 
Schema -> Base

picks default base from a root branch of schema

### pick default sort by
Schema -> Base -> Branch

picks default sortBy from task === "date" of schema

### find first sort by
Branch -> Value -> 

finds first available string value for sorting

### new UUID
UUID

returns a hashsum of a unique identifier

### delete record
Repo -> Record -> IO

calls api delete record

### update entry
Repo -> Record -> IO

calls api update record

### read schema
UUID -> Schema

### create root
IO

### load repo record
Record -> Record

loads the folder from storage

### save repo record
Record -> IO

writes the folder to storage

### pull 
UUID -> Remote -> URL -> Token -> IO

### push
UUID -> Remote -> URL -> Token -> IO

### read remote tags
UUID -> List Record 

detects git remotes in a folder

### read local tags
UUID -> List Record

### write remote tags
UUID -> List Record -> IO

writes git remotes to a folder

### write local tags
UUID -> List Record -> IO

writes local asset paths to a folder

### default root schema
object, describes the root folder that holds other folders
 - `repo`: unique identifier of the current folder
   - `reponame`: name of a folder
   - `category`: optional, kind of a folder
   - `branch`: a piece of structure of a record in a folder
     - `trunk`: optional, what other branch this describes 
     - `task`: optional, what special data type this branch holds
     - `description_en`: optional, description of the branch in English
     - `description_ru`: optional, description of the branch in Russian
   - `local_tag`: local asset path 
   - `remote_tag`: a git remote
     - `remote_url`: address of the git remote
     - `remote_token`: access token for the git remote
   - `sync_tag`: the name of a folder to merge with the current folder
     - `sync_tag_search`: constraints for the subset of records to merge 
   
### default folder schema
object, describes a default folder structure

 - `event`: unique identifier of an event
   - `datum`: text, description of an event
   - `actdate`: date, date an event happened
   - `actname`: name of the person who experienced the event
   - `saydate`: date, date when a record was made
   - `sayname`: name of the person who made the record
   - `category`: kind of event
   - `privacy`: level of access to the record
   - `file`: file, unique identifier of a digital asset
     - `filename`: filename, name of the file
     - `fileext`: fileext, extension of the file
     - `filehash`: filehash, hashsum of the file contents
   - `branch`: a piece of structure of a record in the folder
     - `trunk`: optional, what other branch this describes 
     - `task`: optional, what special data type this branch holds
     - `description_en`: optional, description of the branch in English
     - `description_ru`: optional, description of the branch in Russian
