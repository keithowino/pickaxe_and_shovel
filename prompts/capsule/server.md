MongoDB becomes the primary application data store.

Eventually:

```text
MongoDB
├── users
├── sessions
├── projects
├── projectCategories
├── blogPosts
├── blogCategories
├── contactMessages
├── siteSettings
└── auditLogs
```

---

```text
credentialService
    ↓
"Can I verify this password?"

sessionService
    ↓
"Can I create/find/delete this session?"

authService
    ↓
"Does this user have valid credentials, and if so,
 should I establish an authenticated session?"
```

## What authService will eventually do

The login operation will conceptually be:

```text
login(email, password)
        │
        ▼
Find user
        │
        ├── no user ───────────────┐
        │                          │
        ▼                          ▼
Verify password               Authentication
        │                       failure
        ├── invalid ───────────────┘
        │
        ▼
Check account status
        │
        ├── disabled ──────────────┐
        │                          │
        ▼                          ▼
Create session               Authentication
        │                       failure
        ▼
Return session
```

---

> NB: **_A design issue we should address here:_**

Because we're putting the refresh token into an HTTP-only cookie, requiring the client to send:

```json
{
	"refreshToken": "..."
}
```

defeats one of the advantages of HTTP-only cookies.

So this controller is intentionally a transitional implementation until we finish the cookie boundary.

The final design should actually be:

```text
POST /refresh
     │
     ▼
req.cookies.refreshToken
```

rather than putting the refresh token in the request body.

Therefore, I recommend we make that correction now instead of carrying the transitional design forward.

---

## How administrator-only routes will work

When we build the Projects administration endpoints, the route will follow this pattern:

```js
router.post("/projects", authenticate, requireAdmin, projectController.create);
```

---

> **NB:** The `reorderProjects` project.repository.js function, assumes the IDs have already been validated. The service layer will handle duplicate IDs and verify that the projects exist before invoking the repository. We'll also ensure that the operation's scope is clear so that projects outside the submitted ordering list are not accidentally treated as reordered.

---

## GitHub repository import endpoints

We'll extend the existing administration module and reuse the GitHub API and settings services already in place.

### The proposed workflow is:

Step 1 — Fetch repositories (covered)
Retrieve repositories from the connected GitHub account and return the data needed for the admin interface.

Step 2 — Select repositories (covered)
The administrator chooses which repositories to import.

Step 3 — Import into Pickaxe (covered)
The backend creates or updates the corresponding project records in MongoDB.

### Implementation roadmap

We'll build and test the functionality in this order:

1. Fetch repositories from the connected GitHub account.
2. Import selected repositories into MongoDB, handling duplicates and preserving existing project settings.
3. Refresh a project using its latest GitHub metadata.
4. Update a project's GitHub-related data through an administrative endpoint.
5. Delete a GitHub-linked project through the administrative endpoint.

---

```text
1. Review current Projects module
          ↓
2. Review current Administration module
          ↓
3. Identify duplicated responsibilities
          ↓
4. Decide ownership of each responsibility
          ↓
5. Restructure routes/controllers/services
          ↓
6. Remove duplicated functionality
          ↓
7. Confirm final API surface
          ↓
8. THEN implement request validation
```

I also agree with this structure:

```text
server/src/modules/

├── administration/
│   ├── controllers/
│   │   ├── githubRepositories.controller.js
│   │   ├── githubSettings.controller.js
│   │   └── projects.controller.js
│   │
│   ├── repositories/
│   │   └── ...
│   │
│   ├── routes/
│   │   ├── githubRepositories.routes.js
│   │   ├── githubSettings.routes.js
│   │   └── projects.routes.js
│   │
│   ├── services/
│   │   ├── githubApi.service.js
│   │   ├── githubRepositories.service.js
│   │   ├── githubSettings.service.js
│   │   └── projects.service.js
│   │
│   └── validators/
│       └── projects.validators.js
│
├── identity/
│   └── ...
│
└── projects/
    ├── models/
    │   └── Project.js
    ├── repositories/
    │   └── project.repository.js
    ├── services/
    │   └── project.service.js
    └── ...
```

---

## I would introduce operation-specific schemas

Conceptually:

```text
Project persistence shape
        │
        ├── Public query schema
        ├── Admin create schema
        ├── Admin update schema
        ├── Admin reorder schema
        └── GitHub import schema
```

---

## The clearest ownership model

I would now formalize the boundary as:

```text
projects/
    Project resource
    ├── model
    ├── repository
    ├── domain-level service
    └── public project API

administration/
    Administrative use cases
    ├── project administration
    ├── GitHub administration
    └── GitHub settings
```

giving us:

```text
/api/v1/projects
    GET    /                       Public project listing
    GET    /stats                  Public project statistics
    GET    /:projectId             Public project details


/api/v1/admin/projects
    GET    /                       Admin project listing
    GET    /stats                  Admin statistics
    GET    /:projectId             Admin project details
    POST   /                       Admin project creation
    PATCH  /:projectId             Admin project editing
    PATCH  /order                  Admin project ordering
    DELETE /:projectId             Admin project deletion


/api/v1/admin/github
    ...                            GitHub settings


/api/v1/admin/github/repositories
    GET    /                       GitHub repository listing
    POST   /import                 Import GitHub repositories
    POST   /:projectId/refresh     Refresh GitHub-backed data
```

---

## Responsibility mapping

| Current functionality     | Current location | Eventual owner   |
| ------------------------- | ---------------- | ---------------- |
| Public project listing    | `projects`       | `projects`       |
| Public project stats      | `projects`       | `projects`       |
| Public project detail     | `projects`       | `projects`       |
| Admin project listing     | `projects`       | `administration` |
| Admin project stats       | `projects`       | `administration` |
| Admin project detail      | `projects`       | `administration` |
| Admin project creation    | `projects`       | `administration` |
| Admin project update      | duplicated       | `administration` |
| Admin project reorder     | `projects`       | `administration` |
| Admin project deletion    | duplicated       | `administration` |
| GitHub repository listing | `administration` | `administration` |
| GitHub repository import  | `administration` | `administration` |
| GitHub repository refresh | `administration` | `administration` |
| GitHub settings           | `administration` | `administration` |
| Project persistence       | `projects`       | `projects`       |

---

## One issue we should deliberately postpone

There is one architectural question exposed by the current refreshRepository() implementation:

```text
GitHub refresh
    ↓
updates name
description
githubUrl
primaryLanguage
topics
stars
forks
```

But we've also established that an administrator can override some Project metadata.

That creates a potential conflict:

```text
Admin changes description
        ↓
GitHub refresh
        ↓
description comes from GitHub again
        ↓
admin override disappears
```

---

## Proposed implementation order

Phase 1 — Create the new administration Project surface

Create:

```text
administration/
├── controllers/projects.controller.js
├── routes/projects.routes.js
└── services/projects.service.js
```

Phase 2 — Move administrative route ownership

Phase 3 — Move administrative controller responsibilities

Phase 4 — Move GitHub Project mutations

Phase 5 — Update exports and api.js

Phase 6 — Remove obsolete code

Phase 7 — Validation redesign

Create the operation-specific Zod schemas and enforce the editable/protected field rules.

Phase 8 — Final API audit

---
