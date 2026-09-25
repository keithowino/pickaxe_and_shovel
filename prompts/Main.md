```bash
pc@DESKTOP-5UIG07F MINGW64 /c/software_develpment/1_projects/pickaxe_and_shovel (feature-revamp-v3-db-migration)
$ npm run test:server

> pickaxe_and_shovel@1.0.0 test:server
> cd server && npm test


> server@1.0.0 test
> node --test

▶ Password Service
  ✔ hash returns a bcrypt hash (230.0162ms)
  ✔ compare returns true for the correct password (443.0218ms)
  ✔ compare returns false for an incorrect password (437.6311ms)
✔ Password Service (1111.891ms)
✅ Connected to MongoDB
▶ Session Service
  ✔ create creates an active session and returns access/refresh tokens (272.0027ms)
  ✔ validateAccessSession returns an active session (7.7609ms)
  ✔ rotate revokes the old session and creates a new session (14.3771ms)
  ✔ logout revokes the session (7.0066ms)
  ✔ validateAccessSession rejects a revoked session (6.2543ms)
  ✔ validateAccessSession rejects an expired session (2.5769ms)
🔌 Disconnected from MongoDB
✔ Session Service (342.6274ms)
ℹ tests 11
ℹ suites 0
ℹ pass 11
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 1843.3539

pc@DESKTOP-5UIG07F MINGW64 /c/software_develpment/1_projects/pickaxe_and_shovel (feature-revamp-v3-db-migration)
$
```

```http
POST {{baseUrl}}/auth/login
Content-Type: application/json

{
    "email": "{{testEmail}}",
    "password": "{{testPassword}}"
}
```

Response:

```json
{
	"success": true,
	"message": "Login successful.",
	"data": {
		"user": {
			"id": "6ab5dbaae68728ef9eb9264e",
			"email": "admin-test@example.com",
			"roles": ["admin"]
		}
	}
}
```

with the response headers containing:

```text
Set-Cookie: accessToken=..., refreshToken=...
```

Tests 7 - /me, 8 - refresh, 9 - /me after refresh, 10 - logout, 11 - /me after logout, 12 - invalid login all passed successfully and or returned the expected responses.
