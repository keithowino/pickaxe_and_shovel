# Pickaxe & Shovel

> **Pickaxe & Shovel Revamp v3** — the ongoing evolution of the Pickaxe & Shovel portfolio and professional web platform.

Pickaxe & Shovel is a professional portfolio and digital presence platform for showcasing projects, services, technical work, and selected content. Revamp v3 is transitioning the application from a predominantly serverless Firebase/Supabase implementation to a dedicated Express/Node.js backend backed by MongoDB.

The project is being developed with a focus on maintainability, clear frontend/backend boundaries, administrator control, scalable content management, and a stronger foundation for future features such as blogging and richer project pages.

---

## Table of Contents

- [Overview](#overview)
- [Project Status](#project-status)
- [Features](#features)
    - [Current](#current)
    - [Planned](#planned)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
    - [1. Fork the Repository](#1-fork-the-repository)
    - [2. Clone Your Fork](#2-clone-your-fork)
    - [3. Install Dependencies](#3-install-dependencies)
    - [4. Configure Environment Variables](#4-configure-environment-variables)
    - [5. Start the Development Environment](#5-start-the-development-environment)
    - [6. Verify the Backend](#6-verify-the-backend)
- [Environment Variables](#environment-variables)
- [Development Workflow](#development-workflow)
- [Production Deployment](#production-deployment)
- [Project Structure](#project-structure)
- [API Direction](#api-direction)
- [Data and Content Model](#data-and-content-model)
- [Administration](#administration)
- [Portfolio and Project Pages](#portfolio-and-project-pages)
- [Blog](#blog)
- [Migration from Firebase and Supabase](#migration-from-firebase-and-supabase)
- [Testing](#testing)
- [Linting and Code Quality](#linting-and-code-quality)
- [Git Workflow](#git-workflow)
- [Security Notes](#security-notes)
- [Troubleshooting](#troubleshooting)
- [Roadmap](#roadmap)
- [License](#license)
- [Acknowledgments](#acknowledgments)
- [Contact](#contact)
- [Support](#support)

---

## Overview

Pickaxe & Shovel is a portfolio-oriented web application intended to present professional work in a structured, visually engaging way.

The public-facing application currently includes areas such as:

- Home
- About
- Services
- Portfolio
- Contact

The administrative side provides project-management functionality and is being expanded into a broader content and platform administration area.

Revamp v3 introduces a dedicated backend so that application data, authentication, authorization, project management, content management, and future features can be handled through a controlled API rather than relying directly on client-side Firebase/Supabase services.

### Project Goals

The v3 direction is centered around:

1. A maintainable full-stack architecture.
2. A dedicated Node.js/Express API.
3. MongoDB as the primary application database.
4. Clear separation between frontend applications, shared UI, backend modules, and infrastructure.
5. Stronger administrator control over portfolio and site content.
6. Richer project detail pages.
7. Better project ordering, categorization, filtering, and pagination.
8. A foundation for publishing a blog.
9. Safer handling of credentials, uploads, and privileged operations.

---

## Project Status

**Status:** Active development — Revamp v3

The backend foundation has been introduced and MongoDB/Mongoose dependencies are present. The migration from the existing Firebase + Supabase implementation is not yet complete.

During the migration, the application may temporarily contain both legacy serverless code and the new backend. Legacy services should be removed only after their functionality has been successfully replaced and verified through the new API.

---

## Features

### Current

- Responsive portfolio website
- Home page
- About page
- Services page
- Portfolio page
- Contact page
- Project administration
- Project importing
- Project editing
- Project categories
- GitHub-related project management functionality
- Theme switching
- Shared layout and UI components
- React Router-based application routing
- Express backend foundation
- MongoDB/Mongoose backend foundation
- Cloudinary integration foundation
- Request metadata middleware
- API health-check endpoint
- Zod available for backend validation
- Authentication/authorization foundation on the frontend

### Planned

The following features are part of the Revamp v3 direction and may be implemented incrementally:

- Dedicated project detail pages
- Project slugs and shareable URLs
- Project pagination
- Project filtering and search
- Explicit project ordering/positioning
- Featured and pinned projects
- Editable project categories
- Category administration
- Expanded administration dashboard
- Site/content settings
- Media management
- Contact-message administration
- Blog
- Blog categories/tags
- Draft/published blog states
- SEO metadata management
- Project analytics/statistics
- Audit logging
- Improved authentication and authorization
- Server-side contact email delivery
- Removal of Firebase
- Removal of Supabase Edge Functions
- Production deployment of the Node.js API and MongoDB-backed application

---

## Tech Stack

### Frontend

- React
- Vite
- React Router
- Tailwind CSS
- Framer Motion
- JavaScript / JSX
- ESLint

### Backend

- Node.js
- Express
- MongoDB
- Mongoose
- Zod
- JSON Web Tokens
- bcrypt
- cookie-parser
- CORS
- Multer
- Cloudinary
- ua-parser-js

### Development

- Git
- GitHub
- VS Code
- Nodemon

### Legacy / Migration Components

The current codebase still contains legacy integrations that are being migrated:

- Firebase Authentication
- Firebase Firestore
- Supabase
- Supabase Edge Functions
- Resend integration through the Supabase contact function

These should not be treated as the target architecture for v3.

---

## Architecture

The target architecture is a client/server application:

```text
┌─────────────────────────────┐
│           Client            │
│      React + Vite           │
│                             │
│ Pages / Components / UI     │
└──────────────┬──────────────┘
               │ HTTP / JSON
               ▼
┌─────────────────────────────┐
│           Server            │
│      Node.js + Express      │
│                             │
│ Routes                      │
│ Controllers                 │
│ Services                    │
│ Repositories                │
│ Validators                  │
│ Models                      │
└──────────────┬──────────────┘
               │
        ┌──────┴───────┐
        ▼              ▼
   MongoDB          Cloudinary
   Database         Media Storage
```

The backend should become the authoritative application boundary. The React client should communicate with application data through the API rather than directly accessing MongoDB, Firebase, Supabase, or privileged third-party services.

---

## Prerequisites

Before running the project locally, install:

- Node.js 20+ recommended
- npm
- Git
- MongoDB access
- A GitHub account for repository access and optional GitHub integration

Optional services used by specific features:

- Cloudinary account for media storage
- Resend account/API access for transactional email

---

## Getting Started

### 1. Fork the Repository

Fork the repository from GitHub: [repository](https://github.com/keithowino/pickaxe_and_shovel)

1. Open the repository.
2. Click **Fork**.
3. Select your GitHub account.
4. GitHub will create a copy of the repository under your account.

A fork gives you your own remote repository where you can make changes without directly modifying the original repository.

---

### 2. Clone Your Fork

Open Git Bash or a terminal and run:

```bash
git clone https://github.com/keithowino/pickaxe_and_shovel.git
```

Move into the project:

```bash
cd pickaxe_and_shovel
```

Check the configured remote:

```bash
git remote -v
```

If desired, add the original repository as an upstream remote:

```bash
git remote add upstream https://github.com/keithowino/pickaxe_and_shovel.git
```

Verify:

```bash
git remote -v
```

You should then have:

```text
origin    -> your fork
upstream  -> original repository
```

---

### 3. Install Dependencies

The project contains separate frontend and backend applications.

Install frontend dependencies:

```bash
cd client
npm install
```

Install backend dependencies:

```bash
cd ../server
npm install
```

Return to the project root when finished:

```bash
cd ..
```

Do not commit generated `node_modules` directories.

---

### 4. Configure Environment Variables

The client and server use separate environment files.

#### Client

Create or configure:

```text
client/.env.development
```

and, when required for production:

```text
client/.env.production
```

The client environment should contain only values that are safe to expose to the browser. Vite variables normally use the `VITE_` prefix.

Legacy Firebase/Supabase variables should remain only while the migration requires them.

#### Server

Create:

```text
server/.env.development
```

and configure production values separately in:

```text
server/.env.production
```

The backend currently expects values corresponding to:

```text
NODE_ENV
PORT
MONGODB_URI
CLIENT_URL

CLOUDINARY_CLOUD_NAME
CLOUDINARY_API_KEY
CLOUDINARY_API_SECRET
```

Additional secrets will be introduced as the backend migration replaces authentication, email delivery, GitHub integration, and other serverless functionality.

**Never commit `.env` files or production secrets to Git.**

---

### 5. Start the Development Environment

Start the backend:

```bash
cd server
npm run dev
```

The server uses:

```text
server/src/app/server.js
```

and the development script is:

```bash
npm run dev
```

Start the frontend in a separate terminal:

```bash
cd client
npm run dev
```

Vite will print the local frontend URL in the terminal.

The exact port may vary according to the local configuration.

---

### 6. Verify the Backend

The backend exposes a health endpoint:

```http
GET /api/v1/health
```

For a local server running on port `5000`, for example:

```http
GET http://localhost:5000/api/v1/health
```

Expected response:

```json
{
	"success": true,
	"message": "API is healthy"
}
```

The actual port is determined by the server's `PORT` environment variable.

---

## Environment Variables

A simplified server configuration currently looks like:

```text
NODE_ENV=development
PORT=5000
MONGODB_URI=<your-mongodb-connection-string>
CLIENT_URL=http://localhost:5173

CLOUDINARY_CLOUD_NAME=<your-cloudinary-cloud-name>
CLOUDINARY_API_KEY=<your-cloudinary-api-key>
CLOUDINARY_API_SECRET=<your-cloudinary-api-secret>
```

Do not copy production secrets into a public repository.

When new integrations are introduced, update `.env.example` files so that other developers know which variables are required without exposing their values.

---

## Development Workflow

The recommended workflow is:

```text
1. Create a feature branch
2. Understand the affected application/domain
3. Implement one workflow at a time
4. Test the backend API
5. Test the frontend integration
6. Run lint/tests
7. Commit the completed change
8. Push the feature branch
9. Review the change
10. Merge into the main branch
```

Example:

```bash
git checkout main
git pull origin main
git checkout -b feature/project-detail-pages
```

After implementation:

```bash
git add .
git commit -m "feat: add project detail pages"
git push -u origin feature/project-detail-pages
```

---

## Production Deployment

The target production deployment consists of independently deployable frontend and backend applications.

### Frontend

The current production frontend is deployed through Vercel: [live preview](https://pickaxe-and-shovel.vercel.app)

The frontend must be configured with the production API base URL after the Express backend is deployed.

### Backend

The Node.js/Express server requires a hosting environment capable of running a persistent Node.js process or an equivalent supported server deployment.

The backend production environment must provide:

- Node.js runtime
- MongoDB connectivity
- Environment variables/secrets
- CORS configuration for the production client
- Cloudinary credentials where media uploads are enabled
- Email provider credentials where contact email delivery is enabled

### Database

MongoDB is the target application database.

Database credentials should never be placed in frontend environment variables.

---

## Project Structure

The repository is organized into separate frontend and backend applications.

```text
pickaxe_and_shovel/
│
├── client/
│   ├── src/
│   │   ├── app/
│   │   ├── applications/
│   │   │   ├── administration/
│   │   │   ├── gateway/
│   │   │   └── platform/
│   │   ├── lib/
│   │   ├── platform/
│   │   ├── services/
│   │   ├── shared/
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── .env.development
│   ├── .env.production
│   ├── package.json
│   └── vite.config.js
│
├── server/
│   ├── src/
│   │   ├── app/
│   │   │   ├── bootstrap/
│   │   │   ├── config/
│   │   │   ├── routes/
│   │   │   ├── app.js
│   │   │   └── server.js
│   │   ├── shared/
│   │   └── index.js
│   ├── .env.development
│   ├── .env.production
│   └── package.json
│
├── supabase/
│   └── functions/
│       └── notify-contact/
│
├── .gitignore
├── package.json
└── README.md
```

### Domain-Oriented Structure

As backend functionality grows, application domains should be isolated rather than creating a large collection of unrelated controllers and services.

A domain may follow:

```text
<domain-name>/
├── controllers/
├── models/
├── presenters/
├── repositories/
├── routes/
├── services/
├── validators/
├── index.js
└── ...
```

Frontend application domains may follow:

```text
<domain-name>/
├── components/
├── layouts/
├── pages/
├── routes/
├── index.js
└── ...
```

The structure should be adopted where it improves ownership and boundaries rather than adding folders purely for symmetry.

---

## API Direction

The backend API is versioned under:

```text
/api/v1
```

The current health endpoint is:

```text
GET /api/v1/health
```

As the migration progresses, functionality should move behind domain-specific API routes.

A possible direction is:

```text
/api/v1/auth
/api/v1/projects
/api/v1/project-categories
/api/v1/admin
/api/v1/contact
/api/v1/media
/api/v1/blog
/api/v1/settings
```

Exact endpoints should be defined when each domain is implemented.

---

## Data and Content Model

The application is moving toward explicit content models rather than treating Firestore documents as the implicit schema.

### Projects

A project should eventually support concepts such as:

```text
title
slug
description
content
category
technologies
image/media
repositoryUrl
liveUrl
featured
pinned
published
displayOrder
createdAt
updatedAt
publishedAt
```

The exact schema will be determined during the project-domain migration.

### Project Categories

Categories should be treated as managed taxonomy rather than arbitrary strings embedded in every project.

A category can eventually have:

```text
name
slug
description
displayOrder
active
createdAt
updatedAt
```

This allows the administrator to add, rename, reorder, disable, and manage categories without modifying application code.

---

## Administration

The administration area is being expanded from a project editor into a lightweight content-management and platform-management interface.

The planned administration areas include:

```text
Dashboard
Projects
Project Categories
Media
Blog
Contact Messages
Site Settings
GitHub Integration
Administration / Users
Audit / Activity
```

Not every area needs to be implemented at once. Features should be introduced according to the v3 roadmap.

---

## Portfolio and Project Pages

Portfolio projects are intended to become first-class resources rather than simple modal records.

The planned direction is:

```text
/portfolio
/portfolio/<project-slug>
```

A project detail page can provide:

- Project overview
- Problem/context
- Solution
- Technologies used
- Screenshots/media
- Key features
- Architecture or implementation notes where appropriate
- GitHub repository
- Live application
- Related projects
- Project category
- Project metadata
- Navigation to previous/next projects

The existing modal may remain useful as a lightweight preview, but the detailed project experience should not be constrained by a modal.

---

## Blog

A blog is planned as a content-publishing capability rather than merely another static page.

A future blog system may support:

- Posts
- Drafts
- Published posts
- Scheduled publication
- Categories
- Tags
- Featured posts
- Cover images
- Author information
- Slugs
- SEO metadata
- Related posts

The blog should be introduced only after the content-management foundations are sufficiently stable.

---

## Migration from Firebase and Supabase

The migration is intended to replace direct client-side/serverless data handling with the dedicated backend.

### Legacy

```text
React
 │
 ├── Firebase Auth
 ├── Firebase Firestore
 └── Supabase Edge Function
```

### Target

```text
React
 │
 ▼
Express API
 │
 ├── Authentication
 ├── Authorization
 ├── Project services
 ├── Content services
 ├── Contact services
 └── Other application domains
 │
 ├── MongoDB
 ├── Cloudinary
 └── Email provider
```

Migration should happen feature-by-feature.

Do not remove Firebase or Supabase merely because MongoDB has been introduced. Remove each legacy integration only after its responsibilities have been migrated and tested.

---

## Testing

The server currently exposes a Node test script:

```bash
cd server
npm test
```

API functionality should additionally be tested using HTTP requests.

For development, the preferred manual API-testing workflow is a REST client such as the VS Code REST Client extension.

Example:

```http
GET http://localhost:5000/api/v1/health
```

As the backend grows, automated tests should be added around:

- Validators
- Services
- Repositories
- Authentication
- Authorization
- Project CRUD
- Project ordering
- Categories
- Blog publishing
- Contact handling

---

## Linting and Code Quality

The client uses ESLint.

Run the configured client lint command from:

```bash
cd client
```

and use the project's configured npm script.

Backend code should maintain:

- ESM syntax
- Clear module boundaries
- Validation at API boundaries
- Centralized error handling
- Consistent HTTP status handling
- Environment-based configuration
- No secrets committed to source control

---

## Git Workflow

The `main` branch should represent the stable application.

Feature work should be developed in dedicated branches:

```text
main
│
├── feature/project-detail-pages
├── feature/admin-dashboard
├── feature/project-categories
├── feature/blog
└── migration/mongodb-projects
```

Before starting feature work:

```bash
git checkout main
git pull origin main
git checkout -b feature/<feature-name>
```

After completing the work:

```bash
git add .
git commit -m "feat: <description>"
git push -u origin feature/<feature-name>
```

Create a pull request or merge the branch only after the feature has been tested.

---

## Security Notes

The backend is responsible for protecting privileged operations.

Important rules:

- Never expose MongoDB credentials to the client.
- Never expose Cloudinary API secrets to the client.
- Never expose email-provider API keys to the client.
- Do not trust administrator status supplied by the browser.
- Validate request bodies on the server.
- Authenticate protected routes.
- Authorize administrative operations on the server.
- Sanitize or safely render user-generated content.
- Restrict upload types and sizes.
- Avoid logging credentials or sensitive tokens.
- Configure production CORS explicitly.
- Keep `.env` files out of Git.

---

## Troubleshooting

### MongoDB connection fails

Check:

1. `MONGODB_URI` is present.
2. The URI is valid.
3. The MongoDB server/cluster is reachable.
4. Network access is configured correctly.
5. The server is loading the intended environment file.

### Frontend cannot reach the backend

Check:

1. The Express server is running.
2. The API base URL is correct.
3. CORS allows the frontend origin.
4. The requested route exists.
5. Browser developer tools show the expected request.

### Environment variables appear undefined

Check:

- The variable name.
- Whether it belongs to the client or server.
- Whether Vite requires the `VITE_` prefix.
- Whether the correct `.env.*` file is being loaded.
- Whether the development server was restarted after changing environment variables.

---

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
- Add featured/pinned semantics.
- Add pagination.
- Replace client-side Firebase project access.

### Phase 3 — Project Taxonomy

- Define the project-category model.
- Create category CRUD.
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

- Blog post model.
- Categories/tags.
- Draft/published state.
- Slugs.
- Cover media.
- Blog API.
- Admin authoring interface.
- Public blog listing.
- Blog detail page.
- SEO metadata.

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

## License

Copyright © Pickaxe & Shovel.

This project is **proprietary**. The source code, design, content, assets, and other project materials are not licensed for unrestricted redistribution, commercial use, or modification without permission from the copyright holder.

For licensing or usage inquiries, contact:

**designsolutions1629@gmail.com**

---

## Acknowledgments

Pickaxe & Shovel Revamp v3 builds on the following open-source technologies and services:

- React
- Vite
- React Router
- Tailwind CSS
- Framer Motion
- Node.js
- Express
- MongoDB
- Mongoose
- Zod
- Cloudinary
- GitHub
- Vercel

Thanks to the maintainers and contributors of these projects for making the underlying technologies available to developers.

---

## Contact

For professional inquiries, project discussions, or other business communication:

**Pickaxe & Shovel**  
Email: **designsolutions1629@gmail.com**

Live application:

[https://pickaxe-and-shovel.vercel.app](https://pickaxe-and-shovel.vercel.app)

Repository:

[https://github.com/keithowino/pickaxe_and_shovel](https://github.com/keithowino/pickaxe_and_shovel)

---

## Support

For support, bug reports, feature discussions, or development questions, use the project's GitHub repository and provide:

- A clear description of the issue.
- Steps to reproduce it.
- The affected environment.
- Relevant browser/server console output.
- The branch or commit where the issue occurs.

For private business or project inquiries, contact:

**designsolutions1629@gmail.com**
