# user interface
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
