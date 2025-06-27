# Stack

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

The project directory is versioned by git. In the root there's configs for nix, yarn, eslint, prettier, editorconfig and vite. The license is GPLv3 with an exception for apple store distribution. The README holds installation instructions and a link to these docs.
