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

---

> **NB:** The `reorderProjects` project.repository.js function, assumes the IDs have already been validated. The service layer will handle duplicate IDs and verify that the projects exist before invoking the repository. We'll also ensure that the operation's scope is clear so that projects outside the submitted ordering list are not accidentally treated as reordered.

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

If you don't currently own a custom domain, we don't need to stop the migration. We can continue development/testing with onboarding@resend.dev, and configure the authenticated domain later.

---

## Step 2 — Implement in controlled increments

We'll work through the following implementation sequence, validating each layer before moving to the next.

1. Blog taxonomy: add the BlogCategory model, repository/service/API integration as appropriate, and migrate existing category assignments.
2. Administration validation: restore query validation, establish bounded pagination and safe search behavior, and align request schemas with Mongoose requirements.
3. Publication lifecycle: centralize draft, publish, and unpublish transitions, including consistent handling of publishedAt.
4. Immutable slugs: generate slugs during creation and reject slug changes in update requests. Handle duplicate slugs as conflicts.
5. Paginated results: return items and pagination metadata, including a total count, from the administration listing endpoint.
6. REST verification: test successful operations, invalid input, authorization, category relationships, lifecycle transitions, pagination boundaries, and slug immutability using VS Code REST Client.

---
