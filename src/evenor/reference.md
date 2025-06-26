# Reference

## stack
The current stack is 
 - tauri: desktop and mobile distribution
 - solidjs, more correct than react
 - vite: state of the art bundler
 - csvs: for data interchange that is plain and naive
 - isogit + lightningfs: for emulating the git filesystem in browser memory
 - javascript: straightforward, easy to read for contributors
 - rust: state of the art zero overhead implementations
 - nix: state of the art packager
 - yarn: works well with nix
 - prettier: state of the art formatter 
 - eslint: state of the art linter
 - git: state of the art version control system
 - penpot: vector wireframes 

Among legacy stack is 
 - electron, electron-forge for desktop distribution, lacks mobile, currently being replaced by tauri
 - typescript, excessive
 - react: easy to read for contributors but slow and incorrect
 - zustand: light and sane, replaced by solidjs stores

The future stack could be 
 - pijul, if it improves conflict resolution and releases to browsers

## ui
user interface consists of

- overview with a list of records and a search bar
- profile with a single record

### overview
overview consists of a navigation bar, a search bar, and a set of paragraphs

overview updates on every change to the search bar

a paragraph provides short information about a record

confirm "Select?" at the end of the paragraph to open the profile with the given record

press "plus" to add a new record

chosen card must be highlighted

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

type in the input fields to add data to the record

confirm `Add?` to append new input fields. If a branch already has values, confirm `Add another?`.

confirm `Add file?` to attach a media file to a branch with `task: file`

## code
The project directory is versioned by git. In the root there's configs for nix, yarn, eslint, prettier, editorconfig and vite. The license is GPLv3 with an exception for apple store distribution. The README holds installation instructions and a link to these docs. The `src/api/browser` and `src-tauri` directories hold implementations of the interprocess communication necessary for interaction with the filesystem. 

 - `index.html`, `src/index.jsx` and `src/index.css` files initialize solid.js.
 - `src/i18n/`: localization strings for the interface 
 - `src/layout/`: the main screens
 - `src/store/`: a solid.js store with all the state variables and methods in the interface
 - `src/api/`: a facade for the interprocess communication calls, and implementations for various platforms
 
### src/layout
 - `overview`: screen with a list of records
   - `overview_item`: a short description of a single record
   - `overview_field`: list of branch values
   - `overview_field_item`: list of branch values
   - `overview_record`: object value
   - `overview_value`: string value
 - `filter`: component with a search bar
   - `filter_count`: a label with the number of search results
   - `filter_direction`: a switch for sorting direction
   - `filter_option`: a button with a search keyword
   - `filter_query`: an input with a search query
   - `filter_scroll`: a button to scroll to the top
 - `profile`: screen for changing details of a record
   - `profile_field`: list of branch values
   - `profile_field_item`: list of branch values
   - `profile_record`: object value
   - `profile_value`: input for a value
 - `components`: interface elements that are reused across the application. 
   - `asset_view`: media file of any format
   - `confirmation`: a dialogue for side-effects
   - `navigation_back`: button to the home screen
   - `navigation_new`: button to create
   - `navigation_revert`: button to cancel changes
   - `navigation_save`: button to save changes
   - `spoiler`: a dialogue to unfold details

### src/store/
 - StoreContext: solid.js component to interact with the store
 - store
   - `schema`: object, holds the structure of records in the current folder
   - `repo`: object, represents the currently viewed folder
   - `searchParams`: object, holds the state of the search bar
   - `records`: list of objects currently displayed in the overview
   - `record`: object, represents the currently viewed record
   - `spoilerMap`: a hash map with the state of unfolded spoilers
   - `loading`: a switch for loader animation
   - `abortPreviousStream()`: function, holds the handler to interrupt a search stream

 - public API
   - `onRecordEdit(path, value)`: function, handles data input during editing
   - `onRecordSave(recordOld, recordNew)`: function, writes a record to the folder
   - `onRecordWipe(record)`: function, removes a record from folder
   - `onRecordCreate()`: function, creates a record
   - `onRepoChange(pathname, search)`: function, changes the currently viewed folder
   - `onSearch(field, value)`: function, changes the state of the search bar
   - `setSpoilerOpen(index)`:
   - `getSpoilerOpen(index, isOpen)`:
   - `getFilterQueries()`:
   - `getFilterOptions()`:
   - `getSortedRecords()`:
   - `onClone(repouuid, reponame, remoteUrl, remoteToken)`:
   - `onPullRepo(repouuid, remoteName, remoteUrl, remoteToken)`:
   - `onPushRepo(repouuid, remoteName, remoteUrl, remoteToken)`:
   - `onZip(uuid)`:
   - `searchParamsToQuery(schema, searchParams)`: function, returns a csvs query from a query string
   
 - private API
   - `appendRecord(record)`:
   - `leapfrog(branch, value, cognate)`:
   - `backflip(branch, value, cognate)`:
   - `sidestep(branch, value, cognate)`:
   - `warp(branch, value, cognate)`:
   - `saveRecord(repouuid, base, records, recordOld, recordNew)`:
   - `wipeRecord(repo, base, records, record)`:
   - `changeRepo(pathname, search)`: 
 - `search(schema, searchParams, repo, reponame, field, value, appendRecord)`:
   - `updateRecord(repo, base, recordNew)`:
   - `createRecord(repo, base)`:
   - `selectStream(schema, repo, appendRecord, searchParams)`:
   - `onMergeRepo(schema, repo, reponame, search)`:
   - `find(uuid, reponame)`: 
   - `clone(repouuid, reponame, url, token)`:
   - `queryToSearchParams(query)`: function, converts state of the search bar to URLSearchParams
   - `ensureTrunk(schema, record, trunk, leaf)`: make sure record has trunk and all trunks of trunk until root
   - `enrichBranchRecords(schemaRecord, metaRecords)`:
   - `extractSchemaRecords(branchRecords)`:
   - `schemaToBranchRecords(schema)`: function, converts an evenor schema object to a list of csvs records
   - `recordsToSchema(schemaRecord, metaRecords)`: function, converts a list of csvs records to an evenor schema object
   - `changeSearchParams(searchParams, field, value)`:
   - `makeURL(searchParams, sortBy, repoUUID)`: prepare a new browser URL
   - `pickDefaultBase(schema)`: function, picks default base from a root branch of schema
   - `pickDefaultSortBy(schema, base)`: function, picks default sortBy from task === "date" of schema
   - `findFirstSortBy(branch, value)`: function, finds first available string value for sorting
   - `newUUID()`: function, returns a hashsum of a unique identifier
   - `deleteRecord()`:
   - `updateEntry()`:
   - `readSchema(uuid)`:
   - `createRoot()`:
   - `loadRepoRecord(record)`: function, loads the folder from storage
   - `saveRepoRecord(record)`: function, writes the folder to storage
   - `pull(repouuid, remoteName, remoteUrl, remoteToken)`:
   - `push(repouuid, remoteName, remoteUrl, remoteToken)`:
   - `readRemoteTags(uuid)`: function, detects git remotes in a folder
   - `readLocalTags(uuid)`: function, detects local asset paths in a folder
   - `writeRemoteTags(uuid, tags)`: function, writes git remotes to a folder
   - `writeLocalTags(uuid, tags)`: function, writes local asset paths to a folder
   - `schemaRoot`: object, describes the root folder that holds other folders
   - `defaultRepoRecord`: object, describes a default folder structure
#### default root schema
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
   
### src/api/
- `api`: a class for interprocess communication
  - `browser`: clientside implementation 
  - `tauri`: desktop and mobile implementation

#### public api
- csvs
  - `select(uuid, query)`: searches and returns a list of records
  - `selectStream(uuid, query)`: begins a search, returns a handler to interrupt the stream
  - `updateRecord(uuid, record)`: writes a record to the csvs dataset
  - `deleteRecord(uuid, record)`: deletes a record from the csvs dataset

- zip
  - `zip(uuid)`: shows a dialogue to save the current folder as a ZIP archive

- git
  - `createRepo(uuid, name)`: creates a csvs dataset
  - `commit(uuid)`: records changes to the git repository
  - `clone(uuid, name, remoteUrl, remoteToken)`: copies the folder from a remote git repository
  - `listRemotes(uuid)`: detects a list of git remotes in the current folder
  - `addRemote(uuid, remoteName, remoteUrl, remoteToken)`: writes a git remote to the git config of the current folder
  - `getRemote(uuid, remote)`: detects the details of a git remote
  - `push(uuid, remoteName, remoteUrl, remoteToken)`: sends changes to a remote git repository
  - `pull(uuid, remoteName, remoteUrl, remoteToken)`: fetches changes from a remote git repository

- lfs
  - `createLFS(uuid)`: 
  - `fetchAsset(uuid, filename)`: returns Uint8Array contents of a file
  - `putAsset(uuid, filename, content)`: writes Buffer content to a file
  - `downloadAsset(content, filename)`: shows a dialogue to save a file to the filesystem
  - `uploadFile(uuid)`: shows a dialogue to load a file to evenor
  - `downloadUrlFromPointer(url, token, pointerInfo)`: fetches a blob url for a Git Large File Storage pointer
  - `uploadBlobsLFS(uuid, remoteUrl, remoteToken, files)`: sends a list of blobs to a Git Large File Storage remote
  - `listAssetPaths(uuid)`: detects a list of local asset paths in the current folder
  - `addAssetPath(uuid, assetPath)`: writes a local asset path to the git config of the current folder
  
#### private API
 - git 
   - `nameDir(uuid, name)`:
   
 - io
   - `findDir(uuid)`:
   - `fetchFile(uuid, filepath)`:
   - `readFile(uuid, filepath)`:
   - `writeFile(uuid, filepath, content)`:
   - `rimraf(rimrafpath)`:
   - `ls(lspath)`:
   - `pickFile()`:
   
 - lightningfs
   - `fs`:
   - `createReadStream(filepath)`:
   - `createWriteStream(filepath)`:
   - `mkdtemp(filepath)`:
   - `appendFile(filepath, tail)`:
   
 - zip
   - `addToZip(dir, zipDir)`:

## questions

what if i _want_ to clone a repo with a duplicate uuid in csvs.csv? well, i need to change the uuid locally then. can evenor do that? no. so any disambiguation based on uuids is bound eventually fail on clone. what happens if evenor clones a repo with existing uuid?

what happens if evenor clones a non-csvs repo?

 - default today ISO date in edit inputs with `default: today` in schema
 - plain text query section
 - dropdown in base query and sort query instead of a text input with options
 - kill ring: deleting an entry goes to bin and can be undone
 - show current commit of the repo in ui
