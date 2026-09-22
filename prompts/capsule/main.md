## Roadmap

Revamp v3 is intentionally being developed in stages.

### Phase 0 — Baseline and Documentation

- Establish the official README.
- Establish the v3 architectural direction.
- Create/verify development and production environment conventions.
- Establish the backend API foundation.
- Verify MongoDB connectivity.
- Establish Git branching workflow.

### Phase 1 — Backend Foundation

- Complete Express application configuration.
- Complete MongoDB connection handling.
- Establish centralized error handling.
- Establish request validation.
- Establish API response conventions.
- Establish authentication and authorization.
- Establish administrator authorization.

The next task should be to establish the conventions that the rest of the backend will follow.

For example, eventually:

```text
server/src/modules/
│
├── identity/
├── projects/
├── categories/
├── administration/
├── contact/
├── blog/
└── ...
```

### Phase 2 — Project Domain Migration

- Create Project model.
- Create Project repository.
- Create Project service.
- Create Project controller.
- Create Project validators.
- Create Project routes.
- Migrate project CRUD from Firestore.
- Migrate project statistics.
- Migrate project filtering.
- Add explicit project ordering.

    We would introduce:

    ```text
    displayOrder
    ```

    combined with the following semantics:

    ```text
    pinned
    featured
    published
    ```

    Producing a conceptual ordering:

    ```text
    Pinned projects
        ↓
    Explicit display order
        ↓
    Featured projects
        ↓
    Normal projects
        ↓
    Publication date
    ```

    But we should define the semantics precisely rather than allowing these flags to interact unpredictably.

    For example, an Admin could see:

    ```text
    PROJECT ORDER

    ☰  Pickaxe Website          #1
    ☰  Job Portal               #2
    ☰  Firebase Demo            #3
    ☰  MCP Project              #4
    ☰  Chat Application         #5
    ```

    and simply drag projects into the desired order.

- Add pagination.

    We can have:

    ```text
    GET /api/v1/projects?page=1&limit=9
    ```

    or eventually use cursor pagination if the dataset warrants it.

- Replace client-side Firebase project access.

### Phase 3 — Project Taxonomy

- Define the project-category model.

    Something along these lines:

    ```text
    Project
    │
    ├── identity
    │   ├── title
    │   ├── slug
    │   └── description
    │
    ├── presentation
    │   ├── thumbnail
    │   ├── images
    │   ├── featured
    │   └── pinned
    │
    ├── classification
    │   ├── category
    │   ├── technologies
    │   └── tags
    │
    ├── content
    │   ├── overview
    │   ├── challenge
    │   ├── solution
    │   └── outcome
    │
    ├── links
    │   ├── repository
    │   └── live
    │
    └── publication
        ├── published
        ├── publishedAt
        ├── displayOrder
        ├── createdAt
        └── updatedAt
    ```

- Create category CRUD.

    > "what are categories when it comes to the projects?"

    Current projects are categorized according to the following:

    ```text
    "Web"
    "Mechatronics"
    "IoT"
    "Robotics"
    "In Progress"
    "Agentic Programming"
    "Other"
    ```

    You mentioned, we should not continue with them being arbitrary strings they are inside each project.

    Instead:

    ```text
    ProjectCategory
    ```

    becomes its own managed resource.

    For example:

    ```text
    ProjectCategory
    ├── name
    ├── slug
    ├── description
    ├── displayOrder
    ├── active
    ├── createdAt
    └── updatedAt
    ```

    Then the Admin can manage:

    ```text
    Project Categories

    01  Web Development
    02  Frontend
    03  Backend
    04  Full Stack
    05  Mobile
    06  UI/UX
    07  Experiments

    and also depending with what we decide

    08  Mechatronics
    09  IoT
    10  Robotics
    11  Agentic Programming
    ```

- Add category administration.
- Add category ordering.
- Add active/inactive state.
- Update project references to use the managed taxonomy.
- Update portfolio filtering.

### Phase 4 — Portfolio Experience

- Decide and implement project-detail route.
- Introduce project slugs.
- Design the project detail page.
- Decide whether a lightweight preview modal remains.
- Add related projects.
- Add previous/next navigation.
- Improve project media presentation.
- Update SEO metadata.

The project page could contain:

```text
┌──────────────────────────────────────────────┐
│ Project Hero                                 │
│                                              │
│ Pickaxe & Shovel                             │
│ Portfolio / Full Stack                       │
│                                              │
│ [Live Project] [GitHub]                      │
└──────────────────────────────────────────────┘

Overview

The problem

The approach

Key features

Technology stack

Architecture / implementation

Screenshots

Challenges & solutions

Related projects

← Previous project       Next project →
```

### Phase 5 — Administration Re-imagination

- Admin dashboard.
- Project management.
- Category management.
- Ordering/featured/pinned controls.
- Media management.
- Site settings.
- Contact messages.
- GitHub integration controls.
- Activity/audit information.
- Administrator account management.

You mentioned you see the Admin eventually becoming something like:

```text
Administration
│
├── Dashboard
│
├── Portfolio
│   ├── Projects
│   ├── Categories
│   └── Ordering
│
├── Content
│   ├── Blog
│   └── Pages
│
├── Media
│
├── Communications
│   └── Contact Messages
│
├── Integrations
│   └── GitHub
│
├── Site
│   ├── General Settings
│   ├── SEO
│   └── Appearance
│
└── System
    ├── Administrators
    ├── Activity
    └── System Information
```

The dashboard itself could eventually show:

```text
Projects             24
Published            21
Drafts                3

Categories            7

Featured              5

Blog Posts            12
Draft Posts            2

Messages               8
Unread                 3
```

### Phase 6 — PageSection and Design System

- Audit `PageSection`.
- Audit `Section`, `Container`, `Paper`, typography, and layout primitives.
- Identify sizing/overflow/positioning conflicts.
- Establish predictable section width and spacing rules.
- Test all major pages after the layout changes.
- Remove component-specific CSS workarounds where the shared layout system should solve the problem.

### Phase 7 — Contact Migration

- Move contact submission from Supabase Edge Functions to the Express API.
- Validate contact requests server-side.
- Integrate the email provider from the backend.
- Add abuse/rate-limiting protections where appropriate.
- Remove the Supabase contact function after successful migration.

### Phase 8 — Blog Foundation

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

And Admin:

```text
Blog
├── All Posts
├── New Post
├── Drafts
├── Published
├── Categories
└── Tags
```

This makes the Blog a natural extension of the new administration system rather than an isolated feature.

### Phase 9 — Legacy Removal

After all functionality has been migrated and verified:

- Remove Firebase configuration.
- Remove Firebase project services.
- Remove Firebase dependencies.
- Remove Supabase client.
- Remove Supabase Edge Functions.
- Remove obsolete environment variables.
- Remove obsolete test pages and migration code.
- Verify the application contains no accidental legacy dependencies.

### Phase 10 — Production Hardening

- Automated tests.
- Authentication hardening.
- Authorization review.
- Input validation review.
- Upload security review.
- Rate limiting.
- Logging.
- Error monitoring.
- Database indexes.
- Production environment configuration.
- API deployment.
- Frontend/API integration.
- Backup/recovery strategy.

---

```text
                    PICKAXE & SHOVEL v3

                         FOUNDATION
                            │
             ┌──────────────┴──────────────┐
             ▼                             ▼
       Backend/API                    Design System
             │                             │
             ▼                             ▼
       Project Domain                PageSection Fix
             │
       ┌─────┴───────────┐
       ▼                 ▼
   Categories       Project Ordering
       │                 │
       └────────┬────────┘
                ▼
         Portfolio Detail
                │
                ▼
        Administration v2
                │
                ▼
          Contact Migration
                │
                ▼
             Blog
                │
                ▼
       Firebase/Supabase Removal
                │
                ▼
       Production Hardening
```

---
