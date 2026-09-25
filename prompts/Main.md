```bash
pc@DESKTOP-5UIG07F MINGW64 /c/software_develpment/1_projects/pickaxe_and_shovel (feature-revamp-v3-db-migration)
$ npm run test:server

> pickaxe_and_shovel@1.0.0 test:server
> cd server && npm test


> server@1.0.0 test
> node --test

▶ Authorization Middleware
  ✔ allows a user with the required role (1.0032ms)
  ✔ allows a user with one of several permitted roles (0.2147ms)
  ✔ returns 401 when no authenticated user exists (0.3693ms)
  ✔ returns 403 when the user lacks the required role (0.2381ms)
✔ Authorization Middleware (3.3841ms)
▶ Password Service
  ✔ hash returns a bcrypt hash (250.2115ms)
  ✔ compare returns true for the correct password (476.81ms)
  ✔ compare returns false for an incorrect password (491.662ms)
✔ Password Service (1220.2084ms)
✅ Connected to MongoDB
▶ Session Service
  ✔ create creates an active session and returns access/refresh tokens (295.0109ms)
  ✔ validateAccessSession returns an active session (8.0587ms)
  ✔ rotate revokes the old session and creates a new session (14.1582ms)
  ✔ logout revokes the session (7.0415ms)
  ✔ validateAccessSession rejects a revoked session (6.7543ms)
  ✔ validateAccessSession rejects an expired session (2.7847ms)
🔌 Disconnected from MongoDB
✔ Session Service (360.6298ms)
ℹ tests 16
ℹ suites 0
ℹ pass 16
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 2291.825

pc@DESKTOP-5UIG07F MINGW64 /c/software_develpment/1_projects/pickaxe_and_shovel (feature-revamp-v3-db-migration)
```

```text
6. Authorization (covered)
   ├── Permission model
   ├── Authorization middleware
   └── 401/403 handling

7. Administrator authorization <- next
   ├── Administrator role/permission
   ├── Protected administrative routes
   └── Server-side enforcement
```
