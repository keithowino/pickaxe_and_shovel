# TASK: Create a Blog page to the [Pickaxe and Shovel](https://pickaxe-and-shovel.vercel.app/) platform (v1)

You are extending an existing React (Vite) + Node/Express + MongoDB monorepo.
Do NOT restructure existing folders. Do NOT introduce a new application folder.
Mirror the existing `projects` module patterns exactly, both server-side and client-side.

Here is the current folder structure:

```text
├── client/
│   ├── public/
│   │   ├── bait_fusion.jfif
│   │   ├── code_generator.jfif
│   │   ├── favicon.svg
│   │   ├── keith_owino_resume.pdf
│   │   ├── metadata.json
│   │   └── my_portfolio.png
│   ├── src/
│   │   ├── app/
│   │   │   ├── config/
│   │   │   │   ├── env.js
│   │   │   │   └── index.js
│   │   │   ├── providers/
│   │   │   │   ├── AppProviders.jsx
│   │   │   │   └── index.js
│   │   │   ├── router/
│   │   │   │   ├── AppRouter.jsx
│   │   │   │   ├── index.js
│   │   │   │   └── RouteConfiguration.jsx
│   │   │   └── index.js
│   │   ├── applications/
│   │   │   ├── administration/
│   │   │   │   ├── components/
│   │   │   │   │   ├── AdministrationHeader.jsx
│   │   │   │   │   ├── GitHubConnect.jsx
│   │   │   │   │   ├── index.js
│   │   │   │   │   ├── ProjectsTable.jsx
│   │   │   │   │   └── RepoList.jsx
│   │   │   │   ├── layouts/
│   │   │   │   │   ├── AdministrationLayout.jsx
│   │   │   │   │   └── index.js
│   │   │   │   ├── pages/
│   │   │   │   │   ├── AdminGateway.jsx
│   │   │   │   │   ├── index.js
│   │   │   │   │   └── ProjectCategoriesPage.jsx
│   │   │   │   ├── routes/
│   │   │   │   │   ├── administration.routes.jsx
│   │   │   │   │   └── index.js
│   │   │   │   ├── services/
│   │   │   │   │   ├── github.settings.service.js
│   │   │   │   │   ├── index.js
│   │   │   │   │   ├── projects.category.service.js
│   │   │   │   │   └── projects.crud.service.js
│   │   │   │   └── index.js
│   │   │   ├── gateway/
│   │   │   │   ├── components/
│   │   │   │   │   ├── GatewayFooter.jsx
│   │   │   │   │   ├── GatewayHeader.jsx
│   │   │   │   │   ├── index.js
│   │   │   │   │   ├── ProjectCard.jsx
│   │   │   │   │   ├── ProjectHero.jsx
│   │   │   │   │   ├── ProjectNavigation.jsx
│   │   │   │   │   ├── ProjectOverview.jsx
│   │   │   │   │   ├── ProjectStats.jsx
│   │   │   │   │   ├── RelatedProjects.jsx
│   │   │   │   │   └── Timeline.jsx
│   │   │   │   ├── layouts/
│   │   │   │   │   ├── GatewayLayout.jsx
│   │   │   │   │   └── index.js
│   │   │   │   ├── pages/
│   │   │   │   │   ├── AboutPage.jsx
│   │   │   │   │   ├── ContactPage.jsx
│   │   │   │   │   ├── HomePage.jsx
│   │   │   │   │   ├── index.js
│   │   │   │   │   ├── PortfolioPage.jsx
│   │   │   │   │   ├── ProjectDetailPage.jsx
│   │   │   │   │   └── ServicePage.jsx
│   │   │   │   ├── routes/
│   │   │   │   │   ├── gateway.routes.jsx
│   │   │   │   │   └── index.js
│   │   │   │   ├── services/
│   │   │   │   │   ├── contact.service.js
│   │   │   │   │   ├── index.js
│   │   │   │   │   └── project.services.js
│   │   │   │   └── index.js
│   │   │   ├── platform/
│   │   │   │   ├── pages/
│   │   │   │   │   ├── index.js
│   │   │   │   │   └── PageNotFound.jsx
│   │   │   │   ├── routes/
│   │   │   │   │   ├── index.js
│   │   │   │   │   └── platform.routes.jsx
│   │   │   │   └── index.js
│   │   │   └── index.js
│   │   ├── lib/
│   │   │   ├── context/
│   │   │   │   ├── AuthContext.jsx
│   │   │   │   ├── index.js
│   │   │   │   └── ThemeContext.jsx
│   │   │   ├── apiClient.js
│   │   │   ├── index.js
│   │   │   └── MetaDataInsert.jsx
│   │   ├── platform/
│   │   │   ├── routing/
│   │   │   │   ├── components/
│   │   │   │   │   ├── AuthenticatedRoute.jsx
│   │   │   │   │   └── index.js
│   │   │   │   └── index.js
│   │   │   └── index.js
│   │   ├── shared/
│   │   │   ├── components/
│   │   │   │   ├── communication/
│   │   │   │   │   ├── index.js
│   │   │   │   │   └── ShowToastMessage.jsx
│   │   │   │   ├── marquee/
│   │   │   │   │   ├── index.js
│   │   │   │   │   └── skills.jsx
│   │   │   │   ├── notFound/
│   │   │   │   │   ├── BadProjectRequest.jsx
│   │   │   │   │   └── index.js
│   │   │   │   ├── templates/
│   │   │   │   │   ├── email/
│   │   │   │   │   │   ├── ContactMessage.jsx
│   │   │   │   │   │   └── index.js
│   │   │   │   │   └── index.js
│   │   │   │   ├── index.js
│   │   │   │   ├── Loader.jsx
│   │   │   │   ├── LoadFeaturedProjects.jsx
│   │   │   │   ├── LoadHeroCTA.jsx
│   │   │   │   ├── LoadHeroTitle.jsx
│   │   │   │   ├── LoadLogo.jsx
│   │   │   │   ├── LoadSerialMsg.jsx
│   │   │   │   ├── LoadSkillsGrid.jsx
│   │   │   │   └── LoadStats.jsx
│   │   │   ├── config/
│   │   │   │   ├── index.js
│   │   │   │   └── platform.config.js
│   │   │   ├── layout/
│   │   │   │   ├── appShell/
│   │   │   │   │   ├── AppShell.jsx
│   │   │   │   │   └── index.js
│   │   │   │   ├── featureGrid/
│   │   │   │   │   ├── FeatureGrid.jsx
│   │   │   │   │   └── index.js
│   │   │   │   ├── hero/
│   │   │   │   │   ├── Hero.jsx
│   │   │   │   │   └── index.js
│   │   │   │   ├── pageSection/
│   │   │   │   │   ├── index.js
│   │   │   │   │   └── PageSection.jsx
│   │   │   │   ├── sectionHeader/
│   │   │   │   │   ├── index.js
│   │   │   │   │   └── SectionHeader.jsx
│   │   │   │   ├── siteFooter/
│   │   │   │   │   ├── index.js
│   │   │   │   │   └── SiteFooter.jsx
│   │   │   │   ├── siteHeader/
│   │   │   │   │   ├── index.js
│   │   │   │   │   ├── SiteHeader.jsx
│   │   │   │   │   └── ThemeToggle.jsx
│   │   │   │   └── index.js
│   │   │   ├── ui/
│   │   │   │   ├── button/
│   │   │   │   │   ├── Button.jsx
│   │   │   │   │   ├── button.styles.js
│   │   │   │   │   └── index.js
│   │   │   │   ├── container/
│   │   │   │   │   ├── Container.jsx
│   │   │   │   │   └── index.js
│   │   │   │   ├── form/
│   │   │   │   │   ├── Form.jsx
│   │   │   │   │   ├── FormField.jsx
│   │   │   │   │   ├── FormInput.jsx
│   │   │   │   │   ├── FormLabel.jsx
│   │   │   │   │   ├── FormReaction.jsx
│   │   │   │   │   └── index.js
│   │   │   │   ├── input/
│   │   │   │   │   ├── index.js
│   │   │   │   │   └── TextInput.jsx
│   │   │   │   ├── paper/
│   │   │   │   │   ├── index.js
│   │   │   │   │   └── Paper.jsx
│   │   │   │   ├── section/
│   │   │   │   │   ├── index.js
│   │   │   │   │   └── Section.jsx
│   │   │   │   ├── typography/
│   │   │   │   │   ├── Heading.jsx
│   │   │   │   │   ├── index.js
│   │   │   │   │   └── Text.jsx
│   │   │   │   └── index.js
│   │   │   ├── utils/
│   │   │   │   ├── escapeHTML.js
│   │   │   │   └── index.js
│   │   │   └── index.js
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── .env.development
│   ├── .env.example
│   ├── .env.production
│   ├── .gitignore
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   ├── vercel.json
│   └── vite.config.js
├── scripts/
│   └── generate-structure.js
├── server/
│   ├── src/
│   │   ├── app/
│   │   │   ├── bootstrap/
│   │   │   │   ├── database.js
│   │   │   │   └── index.js
│   │   │   ├── config/
│   │   │   │   ├── cloudinary.js
│   │   │   │   ├── cors.js
│   │   │   │   ├── env.js
│   │   │   │   └── index.js
│   │   │   ├── routes/
│   │   │   │   ├── api.js
│   │   │   │   └── index.js
│   │   │   ├── app.js
│   │   │   ├── index.js
│   │   │   └── server.js
│   │   ├── modules/
│   │   │   ├── administration/
│   │   │   │   ├── controllers/
│   │   │   │   │   ├── githubRepositories.controller.js
│   │   │   │   │   ├── githubSettings.controller.js
│   │   │   │   │   ├── index.js
│   │   │   │   │   └── projects.controller.js
│   │   │   │   ├── routes/
│   │   │   │   │   ├── githubRepositories.routes.js
│   │   │   │   │   ├── githubSettings.routes.js
│   │   │   │   │   ├── index.js
│   │   │   │   │   └── projects.routes.js
│   │   │   │   ├── services/
│   │   │   │   │   ├── githubApi.service.js
│   │   │   │   │   ├── githubRepositories.service.js
│   │   │   │   │   ├── githubSettings.service.js
│   │   │   │   │   ├── index.js
│   │   │   │   │   └── projects.service.js
│   │   │   │   ├── validators/
│   │   │   │   │   ├── githubRepositories.validators.js
│   │   │   │   │   ├── index.js
│   │   │   │   │   └── projects.validators.js
│   │   │   │   └── index.js
│   │   │   ├── contact/
│   │   │   │   ├── controllers/
│   │   │   │   │   ├── contact.controller.js
│   │   │   │   │   └── index.js
│   │   │   │   ├── models/
│   │   │   │   │   ├── ContactMessage.js
│   │   │   │   │   └── index.js
│   │   │   │   ├── presenters/
│   │   │   │   │   ├── contact.message.presenter.js
│   │   │   │   │   └── index.js
│   │   │   │   ├── repositories/
│   │   │   │   │   ├── contact.repository.js
│   │   │   │   │   └── index.js
│   │   │   │   ├── routes/
│   │   │   │   │   ├── contact.routes.js
│   │   │   │   │   └── index.js
│   │   │   │   ├── services/
│   │   │   │   │   ├── contact.notification.service.js
│   │   │   │   │   ├── contact.service.js
│   │   │   │   │   └── index.js
│   │   │   │   ├── validators/
│   │   │   │   │   ├── contact.validators.js
│   │   │   │   │   └── index.js
│   │   │   │   └── index.js
│   │   │   ├── identity/
│   │   │   │   ├── constants/
│   │   │   │   │   ├── index.js
│   │   │   │   │   ├── roles.js
│   │   │   │   │   └── session.js
│   │   │   │   ├── controllers/
│   │   │   │   │   ├── auth.controller.js
│   │   │   │   │   └── index.js
│   │   │   │   ├── middleware/
│   │   │   │   │   ├── authenticate.js
│   │   │   │   │   ├── authorize.js
│   │   │   │   │   └── index.js
│   │   │   │   ├── models/
│   │   │   │   │   ├── index.js
│   │   │   │   │   ├── Session.js
│   │   │   │   │   └── User.js
│   │   │   │   ├── presenters/
│   │   │   │   │   ├── index.js
│   │   │   │   │   └── user.presenter.js
│   │   │   │   ├── repositories/
│   │   │   │   │   ├── index.js
│   │   │   │   │   ├── session.repository.js
│   │   │   │   │   └── user.repository.js
│   │   │   │   ├── routes/
│   │   │   │   │   ├── auth.routes.js
│   │   │   │   │   └── index.js
│   │   │   │   ├── security/
│   │   │   │   │   ├── accessToken.service.js
│   │   │   │   │   ├── authCookies.js
│   │   │   │   │   ├── githubTokenEncryption.js
│   │   │   │   │   ├── index.js
│   │   │   │   │   ├── password.service.js
│   │   │   │   │   ├── refreshToken.service.js
│   │   │   │   │   └── tokenHasher.js
│   │   │   │   ├── services/
│   │   │   │   │   ├── auth.service.js
│   │   │   │   │   ├── index.js
│   │   │   │   │   └── session.service.js
│   │   │   │   ├── validators/
│   │   │   │   │   ├── auth.validators.js
│   │   │   │   │   └── index.js
│   │   │   │   └── index.js
│   │   │   ├── projects/
│   │   │   │   ├── controllers/
│   │   │   │   │   ├── index.js
│   │   │   │   │   ├── project.controller.js
│   │   │   │   │   └── projectCategory.controller.js
│   │   │   │   ├── models/
│   │   │   │   │   ├── index.js
│   │   │   │   │   ├── Project.js
│   │   │   │   │   └── ProjectCategory.js
│   │   │   │   ├── presenters/
│   │   │   │   │   ├── index.js
│   │   │   │   │   ├── project-navigation.presenter.js
│   │   │   │   │   ├── project.presenter.js
│   │   │   │   │   └── projectCategory.presenter.js
│   │   │   │   ├── repositories/
│   │   │   │   │   ├── index.js
│   │   │   │   │   ├── project.repository.js
│   │   │   │   │   └── projectCategory.repository.js
│   │   │   │   ├── routes/
│   │   │   │   │   ├── index.js
│   │   │   │   │   ├── project.routes.js
│   │   │   │   │   └── projectCategory.routes.js
│   │   │   │   ├── services/
│   │   │   │   │   ├── index.js
│   │   │   │   │   ├── project.service.js
│   │   │   │   │   └── projectCategory.service.js
│   │   │   │   ├── validators/
│   │   │   │   │   ├── index.js
│   │   │   │   │   ├── project.validators.js
│   │   │   │   │   └── projectCategory.validators.js
│   │   │   │   ├── index.js
│   │   │   │   └── README.md
│   │   │   └── index.js
│   │   ├── scripts/
│   │   │   └── seedUsers.js
│   │   ├── shared/
│   │   │   ├── constants/
│   │   │   │   ├── contactMessageStatus.js
│   │   │   │   ├── httpStatus.js
│   │   │   │   └── index.js
│   │   │   ├── email/
│   │   │   │   ├── services/
│   │   │   │   │   ├── email.service.js
│   │   │   │   │   └── index.js
│   │   │   │   └── index.js
│   │   │   ├── errors/
│   │   │   │   ├── appError.js
│   │   │   │   ├── errorCodes.js
│   │   │   │   ├── errorHandler.js
│   │   │   │   ├── index.js
│   │   │   │   └── notFound.js
│   │   │   ├── http/
│   │   │   │   ├── index.js
│   │   │   │   └── requestMetadata.js
│   │   │   ├── utils/
│   │   │   │   ├── apiResponse.js
│   │   │   │   ├── asyncHandler.js
│   │   │   │   ├── index.js
│   │   │   │   ├── presenter.js
│   │   │   │   └── slugify.js
│   │   │   ├── validation/
│   │   │   │   ├── email.schema.js
│   │   │   │   ├── index.js
│   │   │   │   ├── objectId.schema.js
│   │   │   │   ├── paramsSchema.js
│   │   │   │   ├── password.schema.js
│   │   │   │   └── validateRequest.js
│   │   │   └── index.js
│   │   └── index.js
│   ├── .env.development
│   ├── .env.example
│   ├── .env.production
│   ├── .gitignore
│   └── package.json
├── .gitignore
├── package.json
└── README.md
```

If you need to confirm anything from the actual codebase just ask.

## HIGH-LEVEL INTENT

A first-class, primary-navigation Blog for a technical portfolio (software + mechatronics
engineer). Audience: recruiters, potential clients, learners. English only. The blog
demonstrates judgment, depth, and continuous learning — it is not a marketing blog.

## SCOPE — BUILD THIS (v1)

1. Server module: `server/src/modules/blog/` — Post model, CRUD, public read endpoints,
   admin write endpoints, slug generation, pagination, tag + category filtering, RSS feed.
2. Public client pages under `client/src/applications/gateway/pages/`:
    - `BlogListPage.jsx` at `/blog`
    - `BlogPostPage.jsx` at `/blog/:slug`
3. Public client components under `client/src/applications/gateway/components/`:
    - `BlogCard.jsx`
    - `BlogPostHeader.jsx` (title, cover, date, category, tags, reading time)
    - `BlogPostBody.jsx` (renders markdown)
    - `BlogPagination.jsx`
    - `BlogFilters.jsx` (category + tag filter)
    - `RelatedPosts.jsx` (same category, latest 3)
4. Public service: `client/src/applications/gateway/services/blog.service.js`
5. Admin page: `client/src/applications/administration/pages/BlogManagementPage.jsx`
   with a `PostsTable.jsx` component modeled on `ProjectsTable.jsx`.
6. Admin service: `client/src/applications/administration/services/blog.admin.service.js`
7. Routes: add to `gateway.routes.jsx` and `administration.routes.jsx`.
8. Navigation: add "Blog" to the primary site header (`SiteHeader.jsx`), between
   Portfolio and About.
9. RSS: expose `GET /api/blog/rss.xml` returning valid RSS 2.0 XML.

## DO NOT BUILD (v2 territory)

- Comments, likes, reactions, bookmarks, share buttons.
- Full-text search.
- Series / multi-part posts.
- Multi-author support.
- Email newsletter integration.
- MDX or Git-backed content pipeline.
- Any new UI library. Use existing shared components.

## POST MODEL (`server/src/modules/blog/models/Post.js`)

Fields:

- `title: String, required, trim, max 160`
- `slug: String, unique, indexed, lowercase, generated from title via existing slugify util`
- `excerpt: String, required, max 300` — shown on cards and in RSS
- `content: String, required` — raw Markdown
- `coverImageUrl: String, required` — Cloudinary URL (existing `cloudinary.js` config)
- `category: String, required, enum`
- `tags: [String], default []` — free-form, lowercased, trimmed, deduped
- `type: String, required, enum: ["article", "note"]` — default "article"
- `status: String, required, enum: ["draft", "published"], default "draft"`
- `publishedAt: Date` — required when status === "published"; may be in the future
- `readingTimeMinutes: Number` — computed server-side on save from word count
  (200 wpm, min 1)
- `createdAt`, `updatedAt` — via timestamps

Indexes: `{ slug: 1 } unique`, `{ status: 1, publishedAt: -1 }`, `{ category: 1 }`,
`{ tags: 1 }`.

## SCHEDULED PUBLISHING — LAZY EVALUATION

Do NOT create cron jobs. Public endpoints filter with:
`{ status: "published", publishedAt: { $lte: new Date() } }`
The admin table shows a "Scheduled" badge when status === "published" but publishedAt
is in the future. Nothing else.

## SERVER FILES (mirror `modules/projects/` structure)

- `blog/models/Post.js`
- `blog/repositories/post.repository.js`
- `blog/services/post.service.js`
- `blog/services/rss.service.js`
- `blog/controllers/post.controller.js`
- `blog/presenters/post.presenter.js` (list view: no content; detail view: full content)
- `blog/validators/post.validators.js` (Joi/Zod — match existing validators)
- `blog/routes/post.routes.js`
- `blog/index.js`
- Register the blog module in `server/src/app/routes/api.js`.

### Public endpoints (no auth)

- `GET /api/blog/posts?page=1&limit=9&category=&tag=` — paginated, published only
- `GET /api/blog/posts/:slug` — published only; 404 otherwise
- `GET /api/blog/categories` — distinct categories in use (published only)
- `GET /api/blog/tags` — distinct tags in use (published only)
- `GET /api/blog/rss.xml` — RSS 2.0, latest 20 published

### Admin endpoints (require existing auth + admin authorize middleware)

- `GET    /api/admin/blog/posts?page=&limit=&status=&category=&tag=`
- `GET    /api/admin/blog/posts/:id`
- `POST   /api/admin/blog/posts`
- `PATCH  /api/admin/blog/posts/:id`
- `DELETE /api/admin/blog/posts/:id`

Reuse: `asyncHandler`, `apiResponse`, `AppError`, `errorCodes`, `authenticate`,
`authorize`, `validateRequest`, `slugify`, `presenter`.

## CLIENT — PUBLIC

### `BlogListPage.jsx`

- Uses existing `PageSection`, `Hero` (with `LoadHeroTitle`, serial "// FIELD NOTES"),
  `SectionHeader`, `Heading`, `Text`, `Loader`, `MetaDataInsert` (title "Blog").
- Renders `BlogFilters` (category + tag dropdowns, "All" default) above the grid.
- Grid of `BlogCard` (3 cols lg, 2 md, 1 sm).
- `BlogPagination` below.
- Empty state: dashed-border box, "No posts yet. Check back soon."

### `BlogCard.jsx`

- Cover image (aspect 16/9, object-cover), category badge, `type` badge when "note",
  title (Heading level 4), excerpt (line-clamp-2), footer row: date + reading time + tags.
- Whole card is a `<Link to={`/blog/${slug}`}>`.
- Match the visual language of `ProjectCard.jsx` — border, hover, no rounded corners
  beyond `--radius`.

### `BlogPostPage.jsx`

- Fetch by slug; 404 → render `BadRequest` or a simple not-found block.
- `MetaDataInsert` with post title + excerpt as description.
- `BlogPostHeader` (cover, category, type, title, date, reading time, tags).
- `BlogPostBody` renders `content` markdown via `react-markdown` + `remark-gfm`.
  Style with Tailwind Typography-equivalent manual classes (do NOT add
  `@tailwindcss/typography` unless already present — instead, style `prose` manually
  using existing `Text`/`Heading` components where reasonable, or add scoped CSS in
  `index.css` under a `.blog-content` class).
- `RelatedPosts` (same category, latest 3, exclude current).
- Back link to `/blog`.

### Routing

Add to `gateway.routes.jsx`:

- `{ path: "blog", element: <BlogListPage /> }`
- `{ path: "blog/:slug", element: <BlogPostPage /> }`

Add "Blog" link to `SiteHeader.jsx` between Portfolio and About.

## CLIENT — ADMIN

### `BlogManagementPage.jsx`

- Wrapped by existing `AdministrationLayout` and `AuthenticatedRoute`.
- Renders `PostsTable`.

### `PostsTable.jsx` (model on `ProjectsTable.jsx`)

- Header: `SectionHeader` "Blog Posts", serial "MODULE // 04", count "N IN DATABASE".
- Row: cover thumbnail (small), title, category badge, type badge, status badge
  (DRAFT / SCHEDULED / PUBLISHED), publishedAt, tags.
- Actions per row: Edit (toggles inline editor), Delete (confirm), and a
  "New Post" button at the top of the section.
- Inline editor fields: title, slug (auto from title, editable), excerpt, category
  (select), tags (comma-separated input → array), type (select), status (select),
  publishedAt (datetime-local input), coverImageUrl (text input; optionally a
  Cloudinary upload button if `GitHubConnect`-style uploads are already wired —
  otherwise text input only), content (textarea, min-height 400px).
- Split-pane live preview: left = markdown textarea, right = rendered preview using
  the same `react-markdown` setup as the public page. On mobile, stack vertically.
- Save via `blog.admin.service.js`; refresh list on success; show
  `ShowToastMessage` on error (do NOT use `alert()`).

### Admin routing

Add to `administration.routes.jsx`:

- `{ path: "blog", element: <BlogManagementPage /> }`

Add a link from `AdminGateway.jsx` to `/admin/blog` — mirror the existing
commented-out "Manage Project Categories" link pattern (uncomment-style, styled the
same), labeled "Manage Blog Posts →".

## RSS

`GET /api/blog/rss.xml` — RSS 2.0, latest 20 published posts.
Required elements: `<channel>` with title, link, description, language "en";
each `<item>` with title, link (`${CLIENT_URL}/blog/${slug}`), guid (slug),
pubDate (RFC 822 from publishedAt), description (excerpt).
Set `Content-Type: application/rss+xml; charset=utf-8`.
No new dependencies — hand-roll the XML with proper escaping, or use `rss` if you
prefer. Either is acceptable.

## MARKDOWN RENDERING

Add `react-markdown` and `remark-gfm` to the client. Use them in both
`BlogPostBody.jsx` and the admin preview pane. Do NOT enable raw HTML
(`rehype-raw`) in v1 — safer, and Markdown is sufficient for technical writing.

Here are the current states of some of the files in the codebase:

```text
~\server\package.json
```

```json
{
	"name": "server",
	"version": "1.0.0",
	"description": "",
	"main": "src/app/server.js",
	"scripts": {
		"traceWarnings": "nodemon --exec \"node --trace-warnings\" src/app/server.js",
		"seedUsers": "node src/scripts/seedUsers.js",
		"start": "node src/app/server.js",
		"dev": "nodemon src/app/server.js",
		"build": "echo 'No build step needed for server'",
		"test": "node --test"
	},
	"keywords": [],
	"author": "Pickaxe & Shovel",
	"license": "PROPRIETARY",
	"type": "module",
	"dependencies": {
		"bcrypt": "^6.0.0",
		"cloudinary": "^1.41.3",
		"cookie-parser": "^1.4.7",
		"cors": "^2.8.6",
		"dotenv": "^17.4.2",
		"express": "^5.2.1",
		"jsonwebtoken": "^9.0.3",
		"mongoose": "^9.10.0",
		"ms": "^2.1.3",
		"multer": "^2.3.0",
		"multer-storage-cloudinary": "^4.0.0",
		"resend": "^6.32.0",
		"ua-parser-js": "^1.0.41",
		"zod": "^4.6.4"
	},
	"devDependencies": {
		"nodemon": "^3.1.14"
	}
}
```

```text
~\server\src\app\server.js
```

```js
import app from "./app.js";
import { env } from "./config/index.js";
import { database } from "./bootstrap/index.js";
/**
 * recommended for use only during development.
 * import dns from "dns";
 * dns.setServers(["8.8.8.8", "1.1.1.1"]);
 */

let server;

/**
 * Start the application.
 */
async function start() {
	try {
		await database.connectDatabase();

		server = app.listen(env.port, () => {
			console.log(
				`🚀 Server listening on port ${env.port} (${env.nodeEnv})`,
			);
		});
	} catch (error) {
		console.error("❌ Server startup failed:", error);

		await database.disconnectDatabase();

		process.exit(1);
	}
}

/**
 * Gracefully shut down the application.
 */
async function shutdown(signal) {
	console.log(`\n🛑 ${signal} received. Shutting down...`);

	try {
		if (server) {
			await new Promise((resolve, reject) => {
				server.close((error) => {
					if (error) {
						reject(error);
						return;
					}

					resolve();
				});
			});

			console.log("✅ HTTP server closed");
		}

		await database.disconnectDatabase();

		console.log("👋 Shutdown complete");

		process.exit(0);
	} catch (error) {
		console.error("❌ Error during shutdown:", error);

		process.exit(1);
	}
}
/**
 * #### process.on(event, callback):
 * - Tells Node.js to listen for a specific event on the running process.
 *
 * #### SIGINT:
 * This signal is sent when you press Ctrl+C in the terminal. It’s a way to interrupt the process.
 *
 * SIGTERM:
 * This signal is sent when the system or another process asks your app to terminate
 */
process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));

start();
```

```text
~\server\src\app\config\env.js
```

```js
import dotenv from "dotenv";
import { z } from "zod";

import emailSchema from "../../shared/validation/email.schema.js";

dotenv.config({
	path: `.env.${process.env.NODE_ENV || "development"}`,
});

const envSchema = z.object({
	NODE_ENV: z
		.enum(["development", "production", "test"])
		.default("development"),

	/**
	 * Environment variables arrive as strings hence the `z.coerce.number()`.
	 */
	PORT: z.coerce.number().int().positive().default(5000),

	MONGODB_URI: z.string().min(1, "MONGODB_URI is required."),

	CLIENT_URL: z.string().url().default("http://localhost:3000"),

	CLOUDINARY_CLOUD_NAME: z
		.string()
		.min(1, "CLOUDINARY_CLOUD_NAME is required."),

	CLOUDINARY_API_KEY: z.string().min(1, "CLOUDINARY_API_KEY is required."),

	CLOUDINARY_API_SECRET: z
		.string()
		.min(1, "CLOUDINARY_API_SECRET is required."),

	JWT_ACCESS_SECRET: z
		.string()
		.min(32, "JWT_ACCESS_SECRET must be at least 32 characters."),

	JWT_REFRESH_SECRET: z
		.string()
		.min(32, "JWT_REFRESH_SECRET must be at least 32 characters."),

	// JWT_ACCESS_EXPIRES: z.string().default("15m"),
	JWT_ACCESS_EXPIRES: z.string().default("1d"),

	JWT_REFRESH_EXPIRES: z.string().default("7d"),

	JWT_ISSUER: z.string().default("pickaxe-and-shovel"),

	JWT_AUDIENCE: z.string().default("pickaxe-and-shovel-client"),

	GITHUB_TOKEN_ENCRYPTION_KEY: z
		.string()
		.regex(
			/^[0-9a-fA-F]{64}$/,
			"GITHUB_TOKEN_ENCRYPTION_KEY must be a 32-byte hexadecimal key.",
		),

	RESEND_API_KEY: z.string().min(1, "RESEND_API_KEY is required."),

	CONTACT_NOTIFICATION_EMAIL: emailSchema,

	RESEND_FROM_EMAIL: z.string().min(1, "RESEND_FROM_EMAIL is required."),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
	console.error("❌ Invalid server environment configuration:");

	for (const issue of parsedEnv.error.issues) {
		console.error(`   - ${issue.path.join(".")}: ${issue.message}`);
	}

	process.exit(1);
}

export const env = {
	nodeEnv: parsedEnv.data.NODE_ENV,
	port: parsedEnv.data.PORT,
	mongoUri: parsedEnv.data.MONGODB_URI,
	clientUrl: parsedEnv.data.CLIENT_URL,

	cloudinary: {
		cloudName: parsedEnv.data.CLOUDINARY_CLOUD_NAME,
		apiKey: parsedEnv.data.CLOUDINARY_API_KEY,
		apiSecret: parsedEnv.data.CLOUDINARY_API_SECRET,
	},

	jwt: {
		accessSecret: parsedEnv.data.JWT_ACCESS_SECRET,
		refreshSecret: parsedEnv.data.JWT_REFRESH_SECRET,
		accessExpires: parsedEnv.data.JWT_ACCESS_EXPIRES,
		refreshExpires: parsedEnv.data.JWT_REFRESH_EXPIRES,
		issuer: parsedEnv.data.JWT_ISSUER,
		audience: parsedEnv.data.JWT_AUDIENCE,
	},

	github: {
		tokenEncryptionKey: parsedEnv.data.GITHUB_TOKEN_ENCRYPTION_KEY,
	},

	email: {
		resendApiKey: parsedEnv.data.RESEND_API_KEY,
		contactNotificationEmail: parsedEnv.data.CONTACT_NOTIFICATION_EMAIL,
		resendFromEmail: parsedEnv.data.RESEND_FROM_EMAIL,
	},
};
```

```text
~\server\src\app\app.js
```

```js
import express from "express";
import cookieParser from "cookie-parser";
import { cors } from "./config/index.js";
import routes from "./routes/api.js";
import { requestMetadata, notFound, errorHandler } from "../shared/index.js";

const app = express();

app.use(cors);

app.use(express.json());

app.use(cookieParser());

app.use(requestMetadata);

app.use("/api/v1", routes);

app.use(notFound);

app.use(errorHandler);

export default app;
```

```text
~\server\src\app\routes\api.js
```

```js
import { Router } from "express";

import { database } from "../bootstrap/index.js";
import { success } from "../../shared/index.js";

import {
	administrationProjectsRoutes,
	authRoutes,
	contactRoutes,
	githubRepositoriesRoutes,
	githubSettingsRoutes,
	projectCategoryRoutes,
	projectRoutes,
} from "../../modules/index.js";

const router = Router();

/**
 * Health check
 */
router.get("/health", (req, res) => {
	const databaseConnected = database.isDatabaseConnected();

	return success(
		res,
		{
			status: databaseConnected ? "healthy" : "degraded",
			api: "up",
			database: databaseConnected ? "connected" : "disconnected",
		},
		databaseConnected
			? "API is healthy."
			: "API is running but database is unavailable.",
	);
});

router.use("/auth", authRoutes);

router.use("/admin/github", githubSettingsRoutes);
router.use("/admin/github/repositories", githubRepositoriesRoutes);
router.use("/admin/projects", administrationProjectsRoutes);

router.use("/projects", projectRoutes);

router.use("/project-categories", projectCategoryRoutes);

router.use("/contact", contactRoutes);

export default router;
```

```text
~\server\src\modules\administration\routes\projects.routes.js
```

```js
import { Router } from "express";

import { authenticate, requireAdmin } from "../../identity/index.js";

import { administrationProjectsController } from "../controllers/index.js";

const router = Router();

// All project administration endpoints require an authenticated administrator.
router.use(authenticate, requireAdmin);

// Project administration
router.get("/", administrationProjectsController.list);
router.get("/stats", administrationProjectsController.getStats);
router.get("/:projectId", administrationProjectsController.getById);

router.post("/", administrationProjectsController.create);

// Project ordering — keep this before /:projectId.
router.patch("/order", administrationProjectsController.reorder);

router.patch("/:projectId", administrationProjectsController.update);

router.delete("/:projectId", administrationProjectsController.remove);

export default router;
```

```text
~\server\src\modules\administration\controllers\projects.controller.js
```

```js
import {
	asyncHandler,
	error,
	HTTP_STATUS,
	projectIdParamsSchema,
	success,
	validateRequest,
} from "../../../shared/index.js";

import {
	createProjectBodySchema,
	listProjectsQuerySchema,
	reorderProjectsBodySchema,
	updateProjectBodySchema,
} from "../validators/index.js";

import { administrationProjectsService } from "../services/index.js";

const list = asyncHandler(async (req, res) => {
	const { query } = validateRequest({ query: listProjectsQuerySchema }, req);

	const result = await administrationProjectsService.listProjects(query);

	return success(
		res,
		result,
		"Administrative projects retrieved successfully.",
	);
});

const getStats = asyncHandler(async (req, res) => {
	const stats = await administrationProjectsService.getProjectStats();

	return success(
		res,
		stats,
		"Administrative project statistics retrieved successfully.",
	);
});

const getById = asyncHandler(async (req, res) => {
	const { params } = validateRequest({ params: projectIdParamsSchema }, req);

	const project = await administrationProjectsService.getProjectById(
		params.projectId,
	);

	if (!project) {
		return error(res, "Project not found.", HTTP_STATUS.NOT_FOUND);
	}

	return success(
		res,
		project,
		"Administrative project retrieved successfully.",
	);
});

const create = asyncHandler(async (req, res) => {
	const { body } = validateRequest({ body: createProjectBodySchema }, req);

	const project = await administrationProjectsService.createProject(body);

	return success(
		res,
		project,
		"Project created successfully.",
		HTTP_STATUS.CREATED,
	);
});

const update = asyncHandler(async (req, res) => {
	const { params, body } = validateRequest(
		{
			params: projectIdParamsSchema,
			body: updateProjectBodySchema,
		},
		req,
	);

	const project = await administrationProjectsService.updateProject(
		params.projectId,
		body,
	);

	if (!project) {
		return error(res, "Project not found.", HTTP_STATUS.NOT_FOUND);
	}

	return success(res, project, "Project updated successfully.");
});

const reorder = asyncHandler(async (req, res) => {
	const { body } = validateRequest({ body: reorderProjectsBodySchema }, req);

	const result = await administrationProjectsService.reorderProjects(
		body.orderedProjectIds,
	);

	return success(res, result, "Projects reordered successfully.");
});

const remove = asyncHandler(async (req, res) => {
	const { params } = validateRequest({ params: projectIdParamsSchema }, req);

	const project = await administrationProjectsService.deleteProject(
		params.projectId,
	);

	if (!project) {
		return error(res, "Project not found.", HTTP_STATUS.NOT_FOUND);
	}

	return success(res, project, "Project deleted successfully.");
});

export default {
	list,
	getStats,
	getById,
	create,
	update,
	reorder,
	remove,
};
```

```text
~\server\src\shared\utils\asyncHandler.js
```

```js
export default function asyncHandler(handler) {
	return function (req, res, next) {
		Promise.resolve(handler(req, res, next)).catch(next);
	};
}
```

```text
~\server\src\shared\utils\apiResponse.js
```

```js
import { HTTP_STATUS } from "../constants/index.js";

export function success(
	res,
	data = null,
	message = "Success",
	status = HTTP_STATUS.OK,
) {
	return res.status(status).json({
		success: true,
		message,
		data,
	});
}

export function error(
	res,
	message = "Error",
	status = HTTP_STATUS.INTERNAL_SERVER_ERROR,
	code = null,
	details = null,
) {
	return res.status(status).json({
		success: false,
		error: {
			code,
			message,
			details,
		},
	});
}
```

```text
~\server\src\shared\validation\validateRequest.js
```

```js
export default function validateRequest({ body, params, query, headers }, req) {
	return {
		body: body ? body.parse(req.body) : req.body,
		params: params ? params.parse(req.params) : req.params,
		query: query ? query.parse(req.query) : req.query,
		headers: headers ? headers.parse(req.headers) : req.headers,
	};
}
```

```text
~\server\src\app\config\cloudinary.js
```

```js
import { v2 as cloudinary } from "cloudinary";

import { env } from "./env.js";

cloudinary.config({
	cloud_name: env.cloudinary.cloudName,
	api_key: env.cloudinary.apiKey,
	api_secret: env.cloudinary.apiSecret,
	secure: true,
});

export default cloudinary;
```

```text
~\server\src\shared\errors\appError.js
```

```js
import { HTTP_STATUS } from "../constants/index.js";
import ErrorCodes from "./errorCodes.js";

export class AppError extends Error {
	constructor(
		message,
		statusCode = HTTP_STATUS.INTERNAL_SERVER_ERROR,
		code = ErrorCodes.INTERNAL_SERVER_ERROR,
		details = null,
	) {
		super(message);
		this.name = "AppError";
		this.statusCode = statusCode;
		this.code = code;
		this.details = details;
		Error.captureStackTrace(this, this.constructor);
	}
}

export class GitHubApiError extends Error {
	constructor(message, statusCode = 502, code = "GITHUB_API_ERROR") {
		super(message);

		this.name = "GitHubApiError";
		this.statusCode = statusCode;
		this.code = code;
	}
}
```

```text
~\server\src\shared\utils\slugify.js
```

```js
export default function slugify(value) {
	return String(value ?? "")
		.normalize("NFKD")
		.replace(/[\u0300-\u036f]/g, "")
		.toLowerCase()
		.trim()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-+|-+$/g, "");
}
```

```text
~\client\package.json
```

```json
{
	"name": "client",
	"private": true,
	"version": "0.0.0",
	"type": "module",
	"scripts": {
		"dev": "vite",
		"sitemap": "node generate-sitemap.js",
		"build": "npm run sitemap && vite build",
		"traceWarnings": "echo 'I am yet to follow up on how to trace client warnings.'",
		"lint": "eslint .",
		"preview": "vite preview"
	},
	"dependencies": {
		"@tanstack/react-query": "^5.100.9",
		"clsx": "^2.1.1",
		"framer-motion": "^12.38.0",
		"lucide-react": "^1.8.0",
		"react": "^19.2.4",
		"react-dom": "^19.2.4",
		"react-helmet-async": "^3.0.0",
		"react-icons": "^5.6.0",
		"react-router-dom": "^7.14.1",
		"react-toastify": "^11.1.0",
		"tailwind-merge": "^3.5.0",
		"tailwindcss-animate": "^1.0.7",
		"zod": "^4.6.5"
	},
	"devDependencies": {
		"@eslint/js": "^9.39.4",
		"@types/react": "^19.2.14",
		"@types/react-dom": "^19.2.3",
		"@vitejs/plugin-react": "^6.0.1",
		"autoprefixer": "^10.5.0",
		"eslint": "^9.39.4",
		"eslint-plugin-react-hooks": "^7.0.1",
		"eslint-plugin-react-refresh": "^0.5.2",
		"globals": "^17.4.0",
		"postcss": "^8.5.10",
		"tailwindcss": "^3.4.19",
		"vite": "^8.0.4",
		"vite-plugin-sitemap": "^0.8.2"
	}
}
```

```text
~\client\tailwind.config.js
```

```js
/** @type {import('tailwindcss').Config} */
export default {
	darkMode: ["class"],
	content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
	theme: {
		extend: {
			fontFamily: {
				heading: ["Space Grotesk", "sans-serif"],
				body: ["Inter", "sans-serif"],
				sans: ["Inter", "sans-serif"],
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
			},
			colors: {
				background: "hsl(var(--background))",
				foreground: "hsl(var(--foreground))",
				card: {
					DEFAULT: "hsl(var(--card))",
					foreground: "hsl(var(--card-foreground))",
				},
				popover: {
					DEFAULT: "hsl(var(--popover))",
					foreground: "hsl(var(--popover-foreground))",
				},
				primary: {
					DEFAULT: "hsl(var(--primary))",
					foreground: "hsl(var(--primary-foreground))",
				},
				secondary: {
					DEFAULT: "hsl(var(--secondary))",
					foreground: "hsl(var(--secondary-foreground))",
				},
				muted: {
					DEFAULT: "hsl(var(--muted))",
					foreground: "hsl(var(--muted-foreground))",
				},
				accent: {
					DEFAULT: "hsl(var(--accent))",
					foreground: "hsl(var(--accent-foreground))",
				},
				destructive: {
					DEFAULT: "hsl(var(--destructive))",
					foreground: "hsl(var(--destructive-foreground))",
				},
				border: "hsl(var(--border))",
				input: "hsl(var(--input))",
				ring: "hsl(var(--ring))",
			},
			keyframes: {
				"accordion-down": {
					from: { height: "0" },
					to: { height: "var(--radix-accordion-content-height)" },
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: "0" },
				},
				marquee: {
					"0%": { transform: "translateX(0)" },
					"100%": { transform: "translateX(-50%)" },
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
				marquee: "marquee 30s linear infinite",
			},
			// Note: xs: isn't a default Tailwind breakpoint
			screens: { xs: "420px" },
		},
	},
	plugins: [require("tailwindcss-animate")],
};
```

```text
~\client\src\index.css
```

```css
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Rye&family=Vollkorn:ital,wght@0,400..900;1,400..900&family=Space+Grotesk:wght@400;500;600;700&display=swap");

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
	:root {
		--background: 36 56% 93%;
		--foreground: 222 47% 11%;
		--card: 36 50% 97%;
		--card-foreground: 222 47% 11%;
		--popover: 36 50% 97%;
		--popover-foreground: 222 47% 11%;
		--primary: 25 95% 44%;
		--primary-foreground: 36 56% 96%;
		--secondary: 142 64% 24%;
		--secondary-foreground: 36 56% 96%;
		--muted: 36 30% 88%;
		--muted-foreground: 215 16% 35%;
		--accent: 142 64% 24%;
		--accent-foreground: 36 56% 96%;
		--destructive: 0 84% 55%;
		--destructive-foreground: 36 56% 96%;
		--border: 36 20% 82%;
		--input: 36 20% 82%;
		--ring: 25 95% 44%;
		--radius: 0.375rem;
		--font-heading: "Space Grotesk", sans-serif;
		--font-body: "Inter", sans-serif;
		/* --font-heading: "Rye", serif;
		--font-body: "Vollkorn", serif; */
	}

	.dark {
		--background: 222 47% 8%;
		--foreground: 36 56% 93%;
		--card: 222 47% 11%;
		--card-foreground: 36 56% 93%;
		--popover: 222 47% 11%;
		--popover-foreground: 36 56% 93%;
		--primary: 25 95% 53%;
		--primary-foreground: 222 47% 8%;
		--secondary: 142 64% 32%;
		--secondary-foreground: 36 56% 93%;
		--muted: 222 30% 16%;
		--muted-foreground: 215 16% 65%;
		--accent: 142 64% 32%;
		--accent-foreground: 36 56% 93%;
		--destructive: 0 72% 50%;
		--destructive-foreground: 36 56% 93%;
		--border: 222 30% 18%;
		--input: 222 30% 18%;
		--ring: 25 95% 53%;
	}
}

@layer base {
	* {
		@apply border-border outline-ring/50;
	}
	body {
		@apply bg-background text-foreground;
		font-family: var(--font-body);
		-webkit-font-smoothing: antialiased;
	}
	h1,
	h2,
	h3,
	h4,
	h5,
	h6 {
		font-family: var(--font-heading);
		letter-spacing: -0.02em;
		/* Rye styles */
		/* font-weight: 400;
		font-style: normal; */
	}
	*:focus-visible {
		outline: 2px solid hsl(var(--primary));
		outline-offset: 2px;
	}
	@media (prefers-reduced-motion: reduce) {
		*,
		*::before,
		*::after {
			animation-duration: 0.01ms !important;
			transition-duration: 0.01ms !important;
		}
	}
}

@layer utilities {
	.font-heading {
		font-family: var(--font-heading);
		/* Rye styles */
		/* font-weight: 400;
		font-style: normal; */
	}
	.font-body {
		font-family: var(--font-body);
		/* Vollkorn styles */
		/* font-optical-sizing: auto;
		font-weight: 400;
		font-style: normal; */
	}
	.text-balance {
		text-wrap: balance;
	}
	.serial-number {
		font-family: "Space Grotesk", monospace;
		/* font-family: "Rye", monospace; */
		letter-spacing: 0.1em;
		text-transform: uppercase;
		font-size: 0.7rem;
	}

	.line-clamp-1 {
		display: -webkit-box;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.blueprint-grid {
		background-image:
			linear-gradient(
				to right,
				hsl(var(--border) / 1) 1px,
				transparent 1px
			),
			linear-gradient(
				to bottom,
				hsl(var(--border) / 1) 1px,
				transparent 1px
			);
		background-size: 40px 40px;
	}

	.scrollbar-hide {
		scrollbar-width: none;
		-ms-overflow-style: none;
	}
	.scrollbar-hide::-webkit-scrollbar {
		display: none;
	}

	.fade-edges-x {
		mask-image: linear-gradient(
			to right,
			transparent,
			black 24px,
			black calc(100% - 24px),
			transparent
		);
		-webkit-mask-image: linear-gradient(
			to right,
			transparent,
			black 24px,
			black calc(100% - 24px),
			transparent
		);
	}
}
```

```text
~\client\src\App.jsx
```

```jsx
import { AppProviders, AppRouter } from "./app/index.js";

export default function App() {
	return (
		<AppProviders>
			<AppRouter />
		</AppProviders>
	);
}
```

```text
~\client\src\app\providers\AppProviders.jsx
```

```jsx
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider, ThemeProvider } from "../../lib/index.js";

export function AppProviders({ children }) {
	return (
		<AuthProvider>
			<HelmetProvider>
				<ThemeProvider>{children}</ThemeProvider>
			</HelmetProvider>
		</AuthProvider>
	);
}
```

```text
~\client\src\app\router\AppRouter.jsx
```

```jsx
import { BrowserRouter } from "react-router-dom";
import RouterConfiguration from "./RouteConfiguration";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function AppRouter() {
	return (
		<BrowserRouter>
			<RouterConfiguration />
			<ToastContainer
				position="top-right"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick={false}
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="colored"
			/>
		</BrowserRouter>
	);
}
```

```text
~\client\src\app\router\RouteConfiguration.jsx
```

```jsx
import { useRoutes } from "react-router-dom";
import {
	administrationRoutes,
	gatewayRoutes,
	platformRoutes,
} from "../../applications/index.js";
import { useAuth } from "../../lib/index.js";
import { Loader } from "../../shared/index.js";

function AuthReadyGate() {
	const { isLoadingAuth, authChecked } = useAuth();

	if (isLoadingAuth || !authChecked) {
		return <Loader type="page" />;
	}

	return <ApplicationRoutes />;
}

/**
 * When authentication is ready this function is called.
 *
 * It either exists or doesn't exist as a component.
 * But when it renders, useRoutes() is always called.
 */
function ApplicationRoutes() {
	/**
	 * `useRoutes()` is being called conditionally.
	 * - Hooks must be called in the same order on every render.
	 */
	return useRoutes([
		...administrationRoutes,
		...gatewayRoutes,
		...platformRoutes,
	]);
}

export default function RouterConfiguration() {
	return <AuthReadyGate />;
}
```

```text
~\client\src\applications\administration\routes\administration.routes.jsx
```

```jsx
import { AdminGateway, ProjectCategoriesPage } from "../pages/index.js";
import { AuthenticatedRoute } from "../../../platform/index.js";
import { AdministrationLayout } from "../layouts/index.js";

const administrationRoutes = [
	{
		element: (
			<AuthenticatedRoute requireAdmin={true} showLoginScreen={true} />
		),
		children: [
			{
				path: "/admin",
				element: <AdministrationLayout />,
				children: [
					{
						index: true,
						element: <AdminGateway />,
					},
					{
						path: "categories",
						element: <ProjectCategoriesPage />,
					},
				],
			},
		],
	},
];

export default administrationRoutes;
```

```text
~\client\src\applications\gateway\routes\gateway.routes.jsx
```

```jsx
import { GatewayLayout } from "../layouts/index.js";
import {
	AboutPage,
	ContactPage,
	HomePage,
	PortfolioPage,
	ProjectDetailPage,
	ServicePage,
} from "../pages/index.js";

const gatewayRoutes = [
	{
		element: <GatewayLayout />,
		children: [
			{
				path: "/",
				element: <HomePage />,
			},
			{
				path: "/about",
				element: <AboutPage />,
			},
			{
				path: "/services",
				element: <ServicePage />,
			},
			{
				path: "/portfolio",
				element: <PortfolioPage />,
			},
			{
				path: "/portfolio/:slug",
				element: <ProjectDetailPage />,
			},
			{
				path: "/contact",
				element: <ContactPage />,
			},
		],
	},
];

export default gatewayRoutes;
```

```text
~\client\src\lib\apiClient.js
```

```js
import env from "../app/config/env.js";

const API_URL = `${env.apiUrl}/api/v1`;

const request = async (path, options = {}) => {
	const { method = "GET", headers = {}, body, ...rest } = options;

	return fetch(`${API_URL}${path}`, {
		...rest,
		method,
		credentials: "include",
		headers: {
			...(body !== undefined
				? { "Content-Type": "application/json" }
				: {}),
			...headers,
		},
		...(body !== undefined ? { body: JSON.stringify(body) } : {}),
	});
};

const parseResponse = async (response) => {
	if (response.status === 204) return null;

	const contentType = response.headers.get("content-type");

	return contentType?.includes("application/json")
		? response.json()
		: response.text();
};

/**
 * Wen i get the chance, i will have to look in to this
 * because in some cases 'API request failed.' which is not
 * user friendly or does not tell what actually happened.
 */
const createApiError = (response, data) => {
	const error = new Error(
		typeof data === "object" && data !== null
			? data.message || "API request failed."
			: data || "API request failed.",
	);

	error.status = response.status;
	error.data = data;

	return error;
};

const apiRequest = async (path, options = {}) => {
	let response = await request(path, options);

	const isAuthEndpoint = path.startsWith("/auth/");

	if (response.status === 401 && !isAuthEndpoint) {
		const refreshResponse = await request("/auth/refresh", {
			method: "POST",
		});

		if (refreshResponse.ok) {
			response = await request(path, options);
		}
	}

	const data = await parseResponse(response);

	if (!response.ok) {
		throw createApiError(response, data);
	}

	return data;
};

export default apiRequest;
```

```text
~\client\src\shared\components\Loader.jsx
```

```jsx
import { Loader2 } from "lucide-react";
import { PageSection } from "../layout/index.js";

const LoaderChild = ({ className, loaderClassName, loadTypeStyles, msg }) => {
	return (
		<div
			className={[
				loadTypeStyles,
				"flex items-center justify-center",
				msg && "gap-2",
				className,
			].join(" ")}
		>
			<Loader2
				className={[
					"h-8 w-8 animate-spin text-primary",
					loaderClassName,
				].join(" ")}
			/>{" "}
			{msg && <span>{msg}</span>}
		</div>
	);
};

/**
 * type can or would be set to either
 * - inline: as inline element loader
 * - component: as component loader
 * - or page: as page loader
 */
export const Loader = ({ className, msg, type }) => {
	let loadTypeStyles;
	let loaderClassName;
	let blockType = false;

	switch (type) {
		case "inline":
			loadTypeStyles = "";
			loaderClassName = "!h-4 !w-4";
			break;

		case "page":
			loadTypeStyles =
				"border border-border animate-pulse bg-muted min-h-[100svh]";
			blockType = true;
			break;

		default:
			loadTypeStyles =
				"border border-border h-72 animate-pulse bg-muted gap-2 py-10";
			blockType = true;
			break;
	}

	return (
		<>
			{blockType ? (
				<PageSection>
					<LoaderChild
						className={className}
						loaderClassName={loaderClassName}
						loadTypeStyles={loadTypeStyles}
						msg={msg}
					/>
				</PageSection>
			) : (
				<LoaderChild
					className={className}
					loaderClassName={loaderClassName}
					loadTypeStyles={loadTypeStyles}
					msg={msg}
				/>
			)}
		</>
	);
};
```

```text
~\client\src\shared\layout\hero\Hero.jsx
```

```jsx
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { LoadHeroCTA, LoadSerialMsg } from "../../components/index.js";
import { Mouse } from "lucide-react";
import PageSection from "../pageSection/PageSection.jsx";
import { Text } from "../../ui/index.js";

const CornerBrackets = () => (
	<>
		<div className="absolute top-6 left-6 h-6 w-6 border-l-2 border-t-2 border-primary/40" />
		<div className="absolute top-6 right-6 h-6 w-6 border-r-2 border-t-2 border-primary/40" />
		<div className="absolute bottom-6 left-6 h-6 w-6 border-l-2 border-b-2 border-primary/40" />
		<div className="absolute bottom-6 right-6 h-6 w-6 border-r-2 border-b-2 border-primary/40" />
	</>
);

const Hero = ({ metadata }) => {
	const {
		callToAction,
		description,
		floatingTools,
		serial,
		showQuickStats = true,
		title,
	} = metadata;

	const ref = useRef(null);
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ["start start", "end start"],
	});
	const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 90]);
	const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -90]);

	/**
	 * Full-bleed hero only for the flagship (homepage-style) variant;
	 * sub-page "spec sheet" heroes take only as much room as their content needs.
	 */
	const heightClass = floatingTools
		? "min-h-[100svh]"
		: "min-h-[55svh] sm:min-h-[60svh] lg:min-h-[65svh]";

	return (
		<PageSection
			ref={ref}
			/**
			 * min-h (not max-h), height scales by variant so the About hero doesn't leave a dead gap, !py-0 on the section cancels the new Section default padding since this component manages its own vertical rhythm via the inner
			 */
			className={`relative ${heightClass} overflow-hidden flex items-center !py-0`}
		>
			{/* Blueprint grid */}
			<div className="absolute inset-0 blueprint-grid opacity-40 pointer-events-none" />
			<CornerBrackets />

			{floatingTools && (
				<>
					{/* Floating pickaxe — smaller & further back on mobile so it never competes with the heading */}
					<motion.div
						style={{ rotate: rotate1 }}
						className="absolute -top-4 right-2 sm:top-16 sm:right-8 lg:right-28 opacity-[0.08] sm:opacity-15 lg:opacity-20 pointer-events-none select-none z-0 scale-75 sm:scale-100"
					>
						<svg
							width="200"
							height="200"
							viewBox="0 0 48 48"
							fill="none"
						>
							<g transform="rotate(-35 24 24)">
								{/* Handle (shaft) */}
								<rect
									x="22"
									y="10"
									width="4"
									height="26"
									rx="2"
									fill="hsl(var(--primary))"
								/>

								{/* Head (main bar) */}
								<rect
									x="14"
									y="10"
									width="20"
									height="4"
									rx="2"
									fill="hsl(var(--primary))"
								/>

								{/* Left spike */}
								<path
									d="M14 12 L8 16 L14 14 Z"
									fill="hsl(var(--primary))"
								/>

								{/* Right spike */}
								<path
									d="M34 12 L40 16 L34 14 Z"
									fill="hsl(var(--primary))"
								/>
							</g>
						</svg>
					</motion.div>

					{/* Floating shovel */}
					<motion.div
						style={{ rotate: rotate2 }}
						className="absolute bottom-40 right-2 sm:bottom-28 sm:right-8 lg:right-28 opacity-[0.08] sm:opacity-15 lg:opacity-20 pointer-events-none select-none z-0 scale-75 sm:scale-100"
					>
						<svg
							width="160"
							height="160"
							viewBox="0 0 48 48"
							fill="none"
						>
							<g transform="rotate(-35 24 24)">
								{/* Handle grip (D-shape) */}
								<path
									d="M20 4 C16 4, 14 8, 18 10 L30 10 C34 8, 32 4, 28 4 Z"
									fill="hsl(var(--secondary))"
								/>

								{/* Shaft */}
								<rect
									x="22"
									y="10"
									width="4"
									height="18"
									rx="2"
									fill="hsl(var(--secondary))"
								/>

								{/* Metal connector */}
								<rect
									x="21"
									y="28"
									width="6"
									height="3"
									rx="1"
									fill="hsl(var(--secondary))"
								/>

								{/* Blade (more realistic spade shape) */}
								<path
									d="M16 31 C16 46, 32 46, 32 31 C32 29, 28 27, 24 27 C20 27, 16 29, 16 31 Z"
									fill="hsl(var(--secondary))"
								/>

								{/* Blade center ridge */}
								<path
									d="M24 27 L24 36"
									stroke="hsl(var(--background))"
									strokeWidth="0.7"
								/>
							</g>
						</svg>
					</motion.div>
				</>
			)}

			<div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 py-16 sm:py-20 w-full">
				<LoadSerialMsg serial={serial} showAccent={floatingTools} />

				{title}

				<Text visuals>{description}</Text>

				{callToAction && <LoadHeroCTA callToAction={callToAction} />}

				{/* Quick stat pills */}
				{showQuickStats && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.6, delay: 0.5 }}
						className="mt-10 sm:mt-14 flex flex-wrap gap-2"
					>
						{[
							"Based in Nairobi 🇰🇪",
							"Web → Mechatronics",
							"Available for Projects",
						].map((s) => (
							<span
								key={s}
								className="serial-number border border-border px-3 py-2 bg-card/50"
							>
								{s}
							</span>
						))}
					</motion.div>
				)}
			</div>

			{floatingTools && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 1 }}
					className="hidden sm:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-muted-foreground z-10"
				>
					<Mouse className="h-4 w-4 animate-bounce" />
					<motion.div
						animate={{ y: [0, 6, 0] }}
						transition={{ duration: 1.6, repeat: Infinity }}
						className="h-8 w-px bg-border"
					/>
				</motion.div>
			)}
		</PageSection>
	);
};

export default Hero;
```

```text
~\client\src\shared\components\LoadHeroCTA.jsx
```

```jsx
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "../ui/index.js";

const LoadHeroCTA = ({ callToAction }) => {
	const actions = callToAction.map((intent) => {
		return (
			<Button
				key={intent.label}
				as={intent?.as}
				variant={intent?.variant}
				to={intent?.to}
				onClick={intent?.onClick}
				className={[intent.className].join(" ")}
				fullWidthMobile
			>
				{intent.redirect === "back" && (
					<ArrowLeft className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
				)}
				{intent.icon}
				{intent.label}
				{intent.redirect === "forward" && (
					<ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
				)}
			</Button>
		);
	});

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.6, delay: 0.3 }}
			className="mt-8 sm:mt-10 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4"
		>
			{actions}
		</motion.div>
	);
};

export default LoadHeroCTA;
```

```text
~\client\src\shared\ui\button\Button.jsx
```

```jsx
import clsx from "clsx";
import { buttonVariants, buttonSizes, buttonLayouts } from "./button.styles.js";

export default function Button({
	as: Component = "button",
	variant = "primary",
	size = "md",
	fullWidthMobile = false,
	className = "",
	children,
	...props
}) {
	return (
		<Component
			className={clsx(
				"inline-flex items-center justify-center gap-2 font-medium transition-all active:scale-[0.98]",
				"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
				"disabled:opacity-50 disabled:pointer-events-none disabled:active:scale-100",
				buttonVariants[variant],
				buttonSizes[size],
				fullWidthMobile && buttonLayouts.responsive,
				className,
			)}
			{...props}
		>
			{children}
		</Component>
	);
}
```

```text
\client\src\shared\ui\button\button.styles.js
```

```js
export const buttonVariants = {
	primary: "bg-primary hover:bg-primary/90 text-primary-foreground",
	secondary: "bg-secondary hover:bg-secondary/90 text-secondary-foreground",
	outline:
		"border border-border hover:border-primary hover:text-primary bg-transparent",
	ghost: "hover:bg-primary/10 hover:text-primary bg-transparent",
	destructive:
		"bg-destructive hover:bg-destructive/90 text-destructive-foreground",
};

export const buttonSizes = {
	sm: "px-3 py-1.5 text-xs sm:px-3 sm:py-2 sm:text-sm",
	md: "px-4 py-2.5 text-sm sm:px-5 sm:py-3 sm:text-base",
	lg: "px-6 py-3 text-base sm:px-8 sm:py-4 sm:text-lg",
};

export const buttonLayouts = {
	responsive: "w-full sm:w-auto",
};
```

```text
~\client\src\shared\components\LoadSerialMsg.jsx
```

```jsx
import { motion } from "framer-motion";

const LoadSerialMsg = ({ serial, showAccent = false }) => {
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			className="flex items-center mb-4 sm:mb-6 flex-wrap gap-3"
		>
			{showAccent && <div className="h-px w-12 bg-primary shrink-0" />}
			<span className="serial-number text-primary">{serial}</span>
		</motion.div>
	);
};

export default LoadSerialMsg;
```

```text
~\client\src\shared\layout\pageSection\PageSection.jsx
```

```jsx
import { forwardRef } from "react";
import { Section, Container } from "../../ui/index.js";

const PageSection = forwardRef(function PageSection(
	{ children, className = "", containerClassName = "" },
	ref,
) {
	return (
		<Section ref={ref} className={className}>
			<Container className={containerClassName}>{children}</Container>
		</Section>
	);
});

export default PageSection;
```

```text
~\client\src\shared\ui\section\Section.jsx
```

```jsx
import { forwardRef } from "react";

const Section = forwardRef(function Section({ children, className = "" }, ref) {
	return (
		<section ref={ref} className={`py-5 sm:py-8 ${className}`}>
			{children}
		</section>
	);
});

export default Section;
```

```text
~\client\src\shared\ui\container\Container.jsx
```

```jsx
export default function Container({ children, className = "" }) {
	return (
		<div
			className={[
				"container mx-auto",
				"px-6",
				"lg:px-10",
				className,
			].join(" ")}
		>
			{children}
		</div>
	);
}
```

```text
~\client\src\shared\layout\sectionHeader\SectionHeader.jsx
```

```jsx
import { LoadSerialMsg } from "../../components/index.js";
import { Heading } from "../../ui/index.js";

export default function SectionHeader({
	serial,
	title,
	align = "center",
	className = "",
	spacing = "mb-8 sm:mb-12",
	header = 2,
}) {
	const hasIcon = title && typeof title === "object" && title.icon;

	return (
		<div
			className={[
				spacing,
				align === "center" ? "text-center" : "text-left",
				className,
			].join(" ")}
		>
			<LoadSerialMsg serial={serial} />

			<Heading
				level={header}
				className={hasIcon ? "flex items-center gap-3" : ""}
			>
				{hasIcon && title.icon}
				{hasIcon ? title.msg : title}
			</Heading>
		</div>
	);
}
```

## DELIVERABLES CHECKLIST

Server:
[ ] Post model + indexes
[ ] Repository, service, controller, presenter, validators
[ ] Public routes + admin routes registered in `api.js`
[ ] RSS endpoint
[ ] Lazy scheduled-publishing filter on public endpoints

Client (public):
[ ] `BlogListPage`, `BlogPostPage`
[ ] `BlogCard`, `BlogPostHeader`, `BlogPostBody`, `BlogPagination`, `BlogFilters`,
`RelatedPosts`
[ ] `blog.service.js`
[ ] Routes in `gateway.routes.jsx`
[ ] "Blog" in `SiteHeader.jsx`

Client (admin):
[ ] `BlogManagementPage`, `PostsTable`
[ ] `blog.admin.service.js`
[ ] Route in `administration.routes.jsx`
[ ] Link from `AdminGateway.jsx`

Verify: no `alert()` calls in new code; no new UI libraries beyond `react-markdown`
and `remark-gfm`; no restructuring of existing folders.

When done, output a short summary of files created/modified and any assumptions made.
