```http
### List active blog categories

GET {{baseUrl}}/blog/categories
Accept: application/json
```

Response:

```json
{
	"success": true,
	"message": "Blog categories retrieved successfully.",
	"data": []
}
```

```http
### Create a blog category

POST {{baseUrl}}/admin/blog/categories
Content-Type: application/json
Accept: application/json
Cookie: accessToken={{adminCookie}}

{
  "name": "REST Testing",
  "description": "A temporary category used to verify the blog category API.",
  "displayOrder": 99,
  "active": true
}
```

Response:

```json
{
	"success": true,
	"message": "Blog category created successfully.",
	"data": {
		"id": "6ad09cdc7fdd31bf055a5b3c",
		"name": "REST Testing",
		"slug": "rest-testing",
		"description": "A temporary category used to verify the blog category API.",
		"displayOrder": 99,
		"active": true,
		"createdAt": "2026-10-15T09:29:00.309Z",
		"updatedAt": "2026-10-15T09:29:00.309Z"
	}
}
```

Tests 3 — List categories as administrator, includeInactive query parameter, 5 — Retrieve a category by ID, invalid ID test, 6 — Update a category, slug immutability test, 7 — Deactivate and reactivate a category, 8 — Reject invalid category input, 9 — Authorization all passed successfully and or returned the expected responses.
