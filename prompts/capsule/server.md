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

## Let's adopt the proven Identity architecture

I would now establish this as the Pickaxe identity structure:

```text
server/src/modules/identity/
│
├── constants/
│   ├── index.js
│   └── session.js
│
├── controllers/
│   └── auth.controller.js
│
├── middleware/
│   └── authenticate.js
│
├── models/
│   ├── index.js
│   ├── User.js
│   └── Session.js
│
├── presenters/
│   ├── index.js
│   ├── user.presenter.js
│   └── session.presenter.js
│
├── repositories/
│   ├── index.js
│   ├── user.repository.js
│   └── session.repository.js
│
├── routes/
│   ├── index.js
│   └── auth.routes.js
│
├── security/
│   ├── index.js
│   ├── password.service.js
│   ├── accessToken.service.js
│   ├── refreshToken.service.js
│   └── tokenHasher.js
│
├── services/
│   ├── index.js
│   ├── auth.service.js
│   └── session.service.js
│
├── validators/
│   ├── index.js
│   └── auth.validators.js
│
└── index.js
```

---

## The revised Phase 1.5A architecture

```text
Phase 1.5A — Authentication

                    ┌─────────────────────┐
                    │       Routes        │
                    └──────────┬──────────┘
                               ↓
                    ┌─────────────────────┐
                    │    Controllers      │
                    └──────────┬──────────┘
                               ↓
                    ┌─────────────────────┐
                    │    Validators       │
                    └─────────────────────┘

                               ↓

                    ┌─────────────────────┐
                    │     AuthService     │
                    └──────┬────────┬─────┘
                           │        │
               ┌───────────┘        └───────────┐
               ↓                                ↓
       ┌─────────────────┐              ┌─────────────────┐
       │ PasswordService │              │ SessionService  │
       └────────┬────────┘              └────────┬────────┘
                ↓                                ↓
             bcrypt                       Token Services
                                                 │
                                                 ↓
                                         Session Repository
                                                 │
                                                 ↓
                                              MongoDB

Authentication middleware
        │
        ├── AccessTokenService
        ├── SessionService
        ├── UserRepository
        │
        └── req.user
            req.sessionId
```

## Our immediate sequence becomes:

```text
Phase 1.5A
│
├── Authentication architecture      ✅
├── User model                       ✅
├── Credential strategy              ✅
├── Session architecture             🔄 REFINING
│
├── Token strategy                   ← next
├── Session model refinement
├── Session repository refinement
├── Auth service
├── Auth validators
├── Auth presenter
├── Auth controller
├── Auth routes
├── Authentication middleware
├── Authenticated request context
└── Integration tests
```

## Target authentication flow

For Pickaxe, the resulting flow will be:

```text
                    LOGIN
                      │
                      ▼
              AuthController
                      │
                      ▼
                AuthService
                 │       │
                 │       └── PasswordService
                 │
                 ▼
             SessionService
              │         │
              │         ├── RefreshTokenService
              │         ├── TokenHasher
              │         └── SessionRepository
              │
              ▼
        MongoDB Session
              │
              ▼
       access + refresh tokens
```

## Revised authentication flow

```text
                         LOGIN
                           │
                           ▼
                    Auth Controller
                           │
                           ▼
                      Auth Service
                           │
                           ▼
                    Session Service
                     │           │
                     ▼           ▼
              Access Token   Refresh Token
                 JWT             JWT
                     │           │
                     └─────┬─────┘
                           │
                           ▼
                    HTTP-only cookies
                           │
                           ▼
                  Browser / React app
```

---

## The next recommended implementation sequence

1.  Step A — Cookie configuration
2.  Step B — Authentication controller
3.  Step C — Routes

- Later:

```text
GET    /me
GET    /sessions
DELETE /sessions/:sessionId
DELETE /sessions/:sessionId/others
```

4.  Step D — Authentication middleware
5.  Step E — Authenticated request context

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

Step 1 — Fetch repositories
Retrieve repositories from the connected GitHub account and return the data needed for the admin interface.

Step 2 — Select repositories
The administrator chooses which repositories to import.

Step 3 — Import into Pickaxe
The backend creates or updates the corresponding project records in MongoDB.

### Implementation roadmap

We'll build and test the functionality in this order:

1. Fetch repositories from the connected GitHub account.
2. Import selected repositories into MongoDB, handling duplicates and preserving existing project settings.
3. Refresh a project using its latest GitHub metadata.
4. Update a project's GitHub-related data through an administrative endpoint.
5. Delete a GitHub-linked project through the administrative endpoint.

---
