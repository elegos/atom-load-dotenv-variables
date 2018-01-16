Load .env Variables
===

This plugin allows Atom users to personalise their environment variables inside
the editor on a per-project basis.

This is particularly useful when other plugins depend on these variables, but
you need to customise them project per project (i.e. go projects with GOPATH and GOBIN).

The plugin will search for dotenv files (configurable, by default `.env`) in the root directories of the current project at project open / window reload. In order to reload
the dotenv files manually, simply run the `Load Dotenv Variables: reload` command
(by default with the `alt+d` shortcut).
