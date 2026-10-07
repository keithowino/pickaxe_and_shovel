We may proceed to Phase 8 — Blog Foundation

- Blog API.
- Admin authoring interface.
- Public blog listing.
- Blog detail page.

A blog post could eventually have:

```text
Post
├── title
├── slug
├── excerpt
├── content
├── coverImage
├── category
├── tags
├── status
├── publishedAt
├── author
├── seo
├── createdAt
└── updatedAt
```

and possibly support:

- Posts
- Drafts
- Published posts
- Scheduled publication
- Featured posts
- Related posts

Then Admin:

```text
Blog
├── All Posts
├── New Post
├── Drafts
├── Published
├── Categories
├── Tags
└── ...
```

This makes the Blog a natural extension of the new administration system rather than an isolated feature.
