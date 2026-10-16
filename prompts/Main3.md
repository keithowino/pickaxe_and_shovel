Step 2 — Implement in controlled increments
We'll work through the following implementation sequence, validating each layer before moving to the next.

1. Blog taxonomy: add the BlogCategory model, repository/service/API integration as appropriate, and migrate existing category assignments.
2. Administration validation: restore query validation, establish bounded pagination and safe search behavior, and align request schemas with Mongoose requirements.
3. Publication lifecycle: centralize draft, publish, and unpublish transitions, including consistent handling of publishedAt.
4. Immutable slugs: generate slugs during creation and reject slug changes in update requests. Handle duplicate slugs as conflicts.
5. Paginated results: return items and pagination metadata, including a total count, from the administration listing endpoint.
6. REST verification: test successful operations, invalid input, authorization, category relationships, lifecycle transitions, pagination boundaries, and slug immutability using VS Code REST Client.

Step 3 — Obtain the current source files
Before writing replacement code, I need the current versions of the relevant files so the implementation matches your actual exports, error conventions, and existing API contracts. The earlier source is sufficient for identifying the issues, but not for safely implementing all the cross-domain changes.
Please attach a Markdown file or ZIP containing the current versions of:

- server/src/modules/blog/ — model, repository, presenter, service, routes, controllers, validators, and barrel exports.
- server/src/modules/administration/ — blog routes, controller, service, validators, and exports.
- server/src/modules/projects/ — project-category implementation and relevant category model, repository, service, routes, and validators.
- server/src/shared/ — blog constants, validation utilities, error handling, pagination utilities, and slug utilities.
- server/src/modules/index.js and any relevant module-level exports.
- Existing blog-related REST tests or VS Code REST Client request files, if available.

Attach the current files below. You can omit unrelated modules, environment files, secrets, and credentials.
Once the source is available, I'll provide the changes with the intended file path above every code block, explain the purpose of each change, and keep the work in small, testable steps. We'll preserve existing behavior where appropriate, explicitly handle the category-data migration, and avoid moving to frontend integration until the backend contract is verified.
