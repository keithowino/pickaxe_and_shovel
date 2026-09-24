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

---
