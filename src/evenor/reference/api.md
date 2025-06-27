# API 
The `src/api/browser` and `src-tauri` directories hold implementations of the interprocess communication necessary for interaction with the filesystem.

## public
### select

UUID -> Query -> List Entry

searches and returns a list of records

 - call csvs [select record] and pass the return value

### select stream

UUID -> Query -> List Entry

begins a search, returns a handler to interrupt the stream

 - call csvs [select record stream] and pass the return value
 - interrupt the previous stream

### update record

UUID -> Record -> IO

writes a record to the csvs dataset

 - call csvs [update record]

### delete record

UUID -> Record -> IO

deletes a record from the csvs dataset

 - call csvs [delete record]

### zip

UUID -> File

shows a dialogue to save the current folder as a ZIP archive

 - calls saveAs

### create repo

UUID -> Name -> IO

creates a csvs dataset


 - creates directory
   - uuid
   - name
   - dataset
 - creates root
   - root
   - undefined
   - dataset root
 - throws when root exists
   - root
   - undefined
   - error
 - renames a directory
   - dir
   - name
   - dataset renamed

### commit 

UUID -> IO

records changes to the git repository

 - throws when no repo
 - adds

### clone

UUID -> Name -> URL -> Token -> IO

copies the folder from a remote git repository

 - throws if dir exists
 - calls git.clone

### list remotes

UUID -> List Remote

detects a list of git remotes in the current folder

 - throws when no repo
 - empty when no remotes
 - finds remotes

### add remote

UUID -> Remote -> URL -> Token -> IO

writes a git remote to the git config of the current folder

 - throws when no repo
 - calls git

### get remote

UUID -> Remote

detects the details of a git remote

 - throws when no repo
 - throws when remote undefined
 - calls git

### push

UUID -> Remote -> URL -> Token -> IO

sends changes to a remote git repository

 - throws if no repo
 - throws if remote is undefined
 - calls git

### pull 

UUID -> Remote -> URL -> Token -> IO

fetches changes from a remote git repository

 - throws if no repo
 - throws if remote is undefined
 - calls git

### create LFS

UUID -> IO

add LFS config to the repository

 - throws if no repo
 - writes git config

### add LFS

Dir -> Path -> IO

 - throws if not lfs dir
 - calls isogit-lfs

### fetch asset 

UUID -> Filename -> IO Uint8Array

returns Uint8Array contents of a file

 - throws if no repo
 - fetches a blob from pointer

### put asset

UUID -> Filename -> Content -> IO

writes Buffer content to a file

 - throws if no repo
 - calls io

### download asset

Content -> Filename -> IO

shows a dialogue to save a file to the filesystem

 - call saveAs

### upload file 

UUID -> IO

shows a dialogue to load a file

 - throws if no repo
 - uploads a file

### download URL from pointer

URL -> Token -> Pointer Info -> URL

fetches a blob URL for a Git Large File Storage pointer

 - downloads url
   - url
   - token
   - pointer
   - url

### upload blobs LFS

UUID -> URL -> Token -> List File -> IO

sends a list of blobs to a Git Large File Storage remote
 
 - throws if no repo
 - uploads files from parameters
 - uploads files from asset path

### list asset paths 

UUID -> List Asset Path

detects a list of local asset paths in the current folder

 - throws if no repo
 - calls git
 - reads asset path

### add asset path

UUID -> Asset Path -> IO

writes a local asset path to the git config of the current folder

 - throws if no repo
 - calls git.setConfig

## private
  
### name dir

UUID -> Name -> Path

 - throws if uuid is undefined
   - undefined
   - name
   - error
 - concatenates a name
   - uuid
   - name
   - dirpath
 - returns uuid when name is undefined
   - root
   - undefined
   - /root
   
### find dir

UUID -> Path

 - throws if no repo is found
 - finds the directory
   - uuid
   - dirpath

### fetch file

UUID -> Path -> File

 - throws if no repo
 - reads file
 - reads file recursive

### read file

UUID -> Path -> File

 - throws if no repo
 - reads file
 - reads file recursive

### write file

UUID -> Path -> Content

 - throws if no repo
 - writes file
 - writes file recursive
 
### rimraf

Path -> IO

 - removes a directory

### ls

Path -> String

 - find a directory

### pick file

IO File

 - find a directory

### add to zip

Dir -> Zip Dir -> IO

 - changes zip dir
