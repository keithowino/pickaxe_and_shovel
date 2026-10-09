```text
~\server\src\modules\administration\controllers\blogPosts.controller.js
```

```js
import {
	asyncHandler,
	HTTP_STATUS,
	success,
	validateRequest,
} from "../../../shared/index.js";
import { blogPostService } from "../services/index.js";
import { createBlogPostBodySchema } from "../validators/index.js";

// const create = asyncHandler(async (req, res) => {
// 	const { body } = validateRequest(
// 		{
// 			body: createBlogPostBodySchema,
// 		},
// 		req,
// 	);

// 	const result = await blogPostService.create(body);

// 	return success(
// 		res,
// 		result,
// 		"Blog post created successfully.",
// 		HTTP_STATUS.CREATED,
// 	);
// });

// export default {
// 	create,
// };

import { z } from "zod";

const create = asyncHandler(async (req, res) => {
	try {
		const { body } = validateRequest(
			{ body: createBlogPostBodySchema },
			req,
		);

		const result = await blogPostService.create(body);

		return success(
			res,
			result,
			"Blog post created successfully.",
			HTTP_STATUS.CREATED,
		);
	} catch (err) {
		if (err instanceof z.ZodError) {
			console.error("ZOD ISSUES:", JSON.stringify(err.issues, null, 2));
			console.error("REQ BODY:", JSON.stringify(req.body, null, 2));
		}
		throw err;
	}
});

export default {
	create,
};
```

```bash
[🟦SERVER] ZOD ISSUES: [
[🟦SERVER]   {
[🟦SERVER]     "code": "invalid_value",
[🟦SERVER]     "values": [
[🟦SERVER]       "ARTICLE",
[🟦SERVER]       "NOTE"
[🟦SERVER]     ],
[🟦SERVER]     "path": [
[🟦SERVER]       "type"
[🟦SERVER]     ],
[🟦SERVER]     "message": "Invalid option: expected one of \"ARTICLE\"|\"NOTE\""
[🟦SERVER]   },
[🟦SERVER]   {
[🟦SERVER]     "code": "invalid_value",
[🟦SERVER]     "values": [
[🟦SERVER]       "DRAFT",
[🟦SERVER]       "PUBLISHED"
[🟦SERVER]     ],
[🟦SERVER]     "path": [
[🟦SERVER]       "status"
[🟦SERVER]     ],
[🟦SERVER]     "message": "Invalid option: expected one of \"DRAFT\"|\"PUBLISHED\""
[🟦SERVER]   }
[🟦SERVER] ]
[🟦SERVER] REQ BODY: {
[🟦SERVER]   "title": "Test the test",
[🟦SERVER]   "slug": "test-the-test",
[🟦SERVER]   "excerpt": "Long text",
[🟦SERVER]   "content": "Long message",
[🟦SERVER]   "coverImageUrl": "https://www.pixelstalk.net/wp-content/uploads/2016/07/Desktop-hd-3d-nature-images-download.jpg",
[🟦SERVER]   "category": "6ac12d93cc829113f2b9cf69",
[🟦SERVER]   "tags": [
[🟦SERVER]     "test",
[🟦SERVER]     "you"
[🟦SERVER]   ],
[🟦SERVER]   "type": "article",
[🟦SERVER]   "status": "published",
[🟦SERVER]   "publishedAt": "2026-10-09T12:26:40.581Z",
[🟦SERVER]   "readingTimeMinutes": 1
[🟦SERVER] }
```
