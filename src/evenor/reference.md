# Reference

## stack
The current stack is 
 - tauri: desktop and mobile distribution
 - react: easy to read for contributors
 - vite: state of the art bundler
 - csvs: for data interchange that is plain and naive
 - isogit + lightningfs: for emulating the git filesystem in browser memory
 - zustand: light and sane
 - javascript: straightforward, easy to read for contributors
 - nix: state of the art packager
 - yarn: works well with nix
 - prettier: state of the art formatter 
 - eslint: state of the art linter
 - git: state of the art version control system

Among legacy stack is 
 - electron, electron-forge for desktop distribution, lacks mobile, currently being replaced by tauri
 - typescript, excessive

The future stack could be 
 - solidjs, if it measures significantly faster than react on benchmarks
 - zenfs, if it's better maintained than lightningfs and is equivalent
 - flow, if contributors insist on type checking
 - pijul, if it improves conflict resolution and releases to browsers

## ui
Wireframes are at [Penpot](https://design.penpot.app/#/view/af8aaf7c-05e6-8124-8003-b6d16df3e6e2?page-id=427ab418-76d5-8026-8004-ce42d5c3054d&section=interactions&index=0&interactions-mode=show&share-id=c0ee57fd-603e-804a-8004-ce43a30d4c57)

user interface consists of
- overview with a list of records and a search bar
- profile with a single record
### overview
overview consists of a navigation bar, a search bar, and a set of paragraphs

overview updates on every change to the search bar

a paragraph provides short information about a record

confirm "Select?" at the end of the paragraph to open the profile with the given record

press "plus" to add a new record

chosen card must be higlighted

chosen record value should synchronize with the browser url

confirm "Delete?" a paragraph to delete a record

confirm "Search cognate?" to list cognate queries
### search bar
search bar appears above overview 

the search bar must synchronize with the browser url. when browser url changes, search bar changes. when search bar changes, browser url changes and browser history is appended

click back navigation button to search previous query

keywords: sortby, all branches in the folder
### profile
profile consists of a navigation bar and a set of paragraphs

profile appears as a full screen on mobile and as a side screen on desktop

#### view
press edit to change the record

press back to close the profile and open the overview

confirm `Select?` to open overview with records of a chosen base branch

confirm `Push?` or `Pull` to synchronize with a git remote on a branch with `task: remote`

confirm "Search cognate?" to list cognate queries

media files on each branch with `task: file` are shown beside the text
#### edit
press save to update the record

press back to revert changes and open the overview

type in the input fieds to add data to the record

confirm `Add?` to append new input fields. If a branch already has values, confirm `Add another?`.

confirm `Add file?` to attach a media file to a branch with `task: file`
## code
The project directory is versioned by git. In the root there's configs for nix, yarn, eslint, prettier, editorconfig and vite. The license is GPLv3 with an exception for apple store distribution. The README holds installation instructions and a link to these docs. The `src-electron`, `src-server` and `src-tauri` directories hold implementations of the interprocess communication necessary for interaction with the filesystem. 
 - `src/main.jsx` and `src/index.html`, `src/index.css` files initialize React.
 - `src/i18n/`: localization strings for the interface 
 - `src/layout/`: the main screens
 - `src/store/`: a zustand reducer with all the state variables and methods in the interface
 - `src/api/`: a facade for the interprocess communication calls, and implementations for various platforms
 
### src/layout
 - `overview`: screen with a list of records
   - `overview_item`: a short description of a single record
   - `overview_virtual_scroll`: renders a subset of records that are visible in the viewport
   - `overview_search_bar`: text input with keywords
 - `profile_view`: screen for reading details about a record
   - `view_field`: list of branch values
   - `view_record`: object value
   - `view_value`: string value
   - `view_remote`: git remote
   - `view_sync`: local sync setting
 - `profile_edit`: screen for changing details of a record
   - `edit_field`: list of branch values
   - `edit_record`: object value
   - `edit_input`: input for a value
   - `input_text`: string value
   - `input_textarea`: large string value
   - `input_date`: date picker
 - `components`: interface elements that are reused across the application. 
   - `link`: navigate between screens
   - `title`: a heading text
   - `button`: perform actions
   - `paragraph`: a piece of text
   - `asset_view`: media file of any format
### src/store/
 - `schema`: object, holds the structure of records in the current folder
 - `repo`: object, represents the currently viewed folder
 - `queries`: object, holds the state of the search bar
 - `records`: list of objects currently displayed in the overview
 - `abortPreviousStream()`: function, holds the handler to interrupt a search stream
 - `initialize()`: function, bootstraps the state and reads the URL on application launch
 - `setRepoUUID(repoUUID)`: function, changes the currently viewed folder
 - `setQuery(queryField, queryValue)`: function, changes the state of the search bar
 
 - `record`: object, represents the currently viewed record
 - `isEdit`: boolean, whether the record is being edited
 - `onRecordUpdate(recordOld, recordNew)`: function, writes a record to the folder
 - `onRecordSelect(recordNew)`: function, selects a record for viewing
 - `onRecordInput(recordNew)`: function, handles data input during editing
 - `onRecordDelete()`: function, removes a record from folder

 - `getDefaultBase(schema)`: function, determines a base branch in a folder
 - `getDefaultSortBy(schema, base, records)`: function, determines a sorting branch in a folder
 - `queriesToParams(queriesObject)`: function, converts state of the search bar to URLSearchParams
 - `setURL(queries, base, sortBy, repoUUID, reponame)`: function, changes the browser URL
 - `loadRepoRecord(record)`: function, loads the folder from storage
   - `readRemotes(api)`: function, detectes git remotes in a folder
   - `readLocals(api)`: function, detects local asset paths in a folder
 - `saveRepoRecord(record)`: function, writes the folder to storage
   - `writeRemotes(api, tags)`: function, writes git remotes to a folder
   - `writeLocals(api, tags)`: function, writes local asset paths to a folder
### src/api/
- `api`: a class for interprocess communication
  - `browser`: clientside implementation 
  - `browser.worker`: a Web Worker to offload searching
  - `server`: a local server implementation, complements the browser class
  - `electron`: main thread implementation
  - `electron.worker`: a Node Worker to offload searching
- `schema`: helpers to interact with the schema
   - `schemaRoot`: object, describes the root folder that holds other folders
   - `defaultRepoRecord`: object, describes a default folder structure
   - `newUUID()`: function, returns a hashsum of a unique identifier
   - `schemaToBranchRecords(schema)`: function, converts an evenor schema object to a list of csvs records
   - `branchRecordsToSchema(schemaRecord, branchRecords)`: function, converts a list of csvs records to an evenor schema object

#### api
- `uuid`: string, identifier of the current folder
- `fetchAsset(filename)`: returns Uint8Array contents of a file
- `putAsset(filename, content)`: writes Buffer content to a file
- `downloadAsset(content, filename)`: shows a dialogue to save a file to the filesystem
- `uploadFile()`: shows a dialogue to load a file to evenor
- `select(searchParams)`: searches and returns a list of records
- `selectStream(searchParams)`: begins a search, returns a handler to interrupt the stream
- `updateRecord(record)`: writes a record to the csvs dataset
- `deleteRecord(record)`: deletes a record from the csvs dataset
- `ensure(schema, name)`: creates a csvs dataset
- `commit()`: records changes to the git repository
- `clone(remoteUrl, remoteToken, name)`: copies the folder from a remote git repository
- `push(remote)`: sends changes to a remote git repository
- `pull(remote)`: fetches changes from a remote git repository
- `readSchema()`: finds the structure of the current folder
- `zip()`: shows a dialogue to save the current folder as a ZIP archive
- `listRemotes()`: detects a list of git remotes in the current folder
- `addRemote(remoteName, remoteUrl, remoteToken)`: writes a git remote to the git config of the current folder
- `getRemote(remote)`: detects the details of a git remote
- `listAssetPaths()`: detects a list of local asset paths in the current folder
- `addAssetPath(assetPath)`: writes a local asset path to the git config of the current folder
- `uploadBlobsLFS(remote, files)`: sends a list of blobs to a Git Large File Storage remote
- `downloadUrlFromPointer(url, token, pointerInfo)`: fetches a blob url for a Git Large File Storage pointer

#### root schema
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
   
#### default folder schema
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



## questions

what if i _want_ to clone a repo with a duplicate uuid in csvs.csv? well, i need to change the uuid locally then. can evenor do that? no. so any disambiguation based on uuids is bound eventually fail on clone. what happens if evenor clones a repo with existing uuid?

what happens if evenor clones a non-csvs repo?

 - default today ISO date in edit inputs with `default: today` in schema
 - plain text query section
 - dropdown in base query and sort query instead of a text input with options
 - kill ring: deleting an entry goes to bin and can be undone
 - show current commit of the repo in ui
