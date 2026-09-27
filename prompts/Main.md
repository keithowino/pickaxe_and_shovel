## Test 1: Successfully reorder projects

Response:

```json
{
	"success": true,
	"message": "Projects reordered successfully.",
	"data": {
		"insertedCount": 0,
		"matchedCount": 3,
		"modifiedCount": 3,
		"deletedCount": 0,
		"upsertedCount": 0,
		"upsertedIds": {},
		"insertedIds": {}
	}
}
```

Tests 2: Reject duplicate project IDs, 3: Reject invalid project ID format, 4: Reject an empty ordering array, 5: Reject a nonexistent project ID, 6: Reject unauthenticated request, 7: Reject authenticated non-admin user, 8: Verify project order, 9: Verify public project ordering and 10: Reject missing orderedProjectIds all passed successfully and or returned the expected responses.
