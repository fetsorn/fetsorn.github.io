# Reference

- [User Interface](./ui.md)
- [Stack](./stack.md)
- [Layout](./layout.md) - the main screens
- [Store](./store.md) - a solid.js store with all the state variables and methods in the interface
- Localization - localization strings for the interface 
- [API](./api.md) - a facade for the interprocess communication calls, and implementations for various platforms

## questions

what if i _want_ to clone a repo with a duplicate uuid in csvs.csv? well, i need to change the uuid locally then. can evenor do that? no. so any disambiguation based on uuids is bound to eventually fail on clone. what happens if evenor clones a repo with existing uuid?

what happens if evenor clones a non-csvs repo?

 - default today ISO date in edit inputs with `default: today` in schema
 - plain text query section
 - dropdown in base query and sort query instead of a text input with options
 - kill ring: deleting an entry goes to bin and can be undone
 - show current commit of the repo in ui
