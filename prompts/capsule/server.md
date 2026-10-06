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
