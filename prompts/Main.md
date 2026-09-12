I am just from performing this action:

```bash
pc@DESKTOP-5UIG07F MINGW64 /c/software_develpment/1_projects/pickaxe_and_shovel (improve-UI-UX)
$ git add .
```

Without remembering that i had not yet created a `.gitignore` file for the server, what measures should i take to remedy this?

I followed your instruction created the `.gitignore` file then `git add .`

Then `git status` here is a portion of the response:

```bash
new file:   node_modules/rxjs/src/internal/util/pipe.ts
new file:   node_modules/rxjs/src/internal/util/reportUnhandledError.ts
new file:   node_modules/rxjs/src/internal/util/subscribeToArray.ts
new file:   node_modules/rxjs/src/internal/util/throwUnobservableError.ts
new file:   node_modules/rxjs/src/internal/util/workarounds.ts
new file:   node_modules/rxjs/src/operators/index.ts
new file:   node_modules/rxjs/src/testing/index.ts
new file:   node_modules/rxjs/src/tsconfig.base.json
new file:   node_modules/rxjs/src/tsconfig.cjs.json
new file:   node_modules/rxjs/src/tsconfig.cjs.spec.json
new file:   node_modules/rxjs/src/tsconfig.esm.json
new file:   node_modules/rxjs/src/tsconfig.esm5.json
new file:   node_modules/rxjs/src/tsconfig.esm5.rollup.json
new file:   node_modules/rxjs/src/tsconfig.types.json
new file:   node_modules/rxjs/src/tsconfig.types.spec.json
new file:   node_modules/rxjs/src/webSocket/index.ts
new file:   node_modules/rxjs/testing/package.json
```

Then `git diff --cached --name-only`

```bash
pc@DESKTOP-5UIG07F MINGW64 /c/software_develpment/1_projects/pickaxe_and_shovel (improve-UI-UX)
$ git diff --cached --name-only
README.md
client/README.md
client/generate-sitemap.js
client/package.json
docs/folder-structure.md
node_modules/.bin/conc
node_modules/.bin/conc.cmd
node_modules/.bin/conc.ps1
node_modules/.bin/concurrently
node_modules/.bin/concurrently.cmd
node_modules/.bin/concurrently.ps1
node_modules/.bin/rimraf
node_modules/.bin/rimraf.cmd
node_modules/.bin/rimraf.ps1
node_modules/.bin/tree-kill
node_modules/.bin/tree-kill.cmd
node_modules/.bin/tree-kill.ps1
node_modules/.package-lock.json
node_modules/ansi-regex/index.d.ts
node_modules/ansi-regex/index.js
node_modules/ansi-regex/license
node_modules/ansi-regex/package.json
node_modules/ansi-regex/readme.md
```
