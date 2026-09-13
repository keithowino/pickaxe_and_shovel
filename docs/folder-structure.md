# Pickaxe & Shovel Folder Structure

Generated on: 2026-09-13

```bash
├── client/
│   ├── public/
│   │   ├── bait_fusion.jfif
│   │   ├── code_generator.jfif
│   │   ├── favicon.svg
│   │   ├── keith_owino_resume.pdf
│   │   ├── metadata.json
│   │   └── my_portfolio.png
│   ├── shared/
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
│   │   │   ├── gateway/
│   │   │   │   ├── components/
│   │   │   │   │   ├── GatewayFooter.jsx
│   │   │   │   │   ├── GatewayHeader.jsx
│   │   │   │   │   ├── Hero.jsx
│   │   │   │   │   └── index.js
│   │   │   │   ├── layouts/
│   │   │   │   │   ├── GatewayLayout.jsx
│   │   │   │   │   └── index.js
│   │   │   │   ├── pages/
│   │   │   │   │   ├── AboutPage.jsx
│   │   │   │   │   ├── AdminPage.jsx
│   │   │   │   │   ├── ContactPage.jsx
│   │   │   │   │   ├── HomePage.jsx
│   │   │   │   │   ├── index.js
│   │   │   │   │   ├── PortfolioPage.jsx
│   │   │   │   │   └── ServicePage.jsx
│   │   │   │   ├── routes/
│   │   │   │   │   ├── gateway.routes.jsx
│   │   │   │   │   └── index.js
│   │   │   │   └── index.js
│   │   │   └── index.js
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── about/
│   │   │   │   ├── SkillsGrid.jsx
│   │   │   │   └── Timeline.jsx
│   │   │   ├── admin/
│   │   │   │   ├── GitHubConnect.jsx
│   │   │   │   ├── ProjectsTable.jsx
│   │   │   │   └── RepoList.jsx
│   │   │   └── portfolio/
│   │   │       ├── ProjectCard.jsx
│   │   │       └── ProjectModal.jsx
│   │   ├── lib/
│   │   │   ├── context/
│   │   │   │   └── AuthContext.jsx
│   │   │   ├── DynamicData.jsx
│   │   │   ├── firebase.config.js
│   │   │   ├── github.js
│   │   │   ├── MetaDataInsert.jsx
│   │   │   ├── PageNotFound.jsx
│   │   │   ├── supabase.js
│   │   │   └── ThemeContext.jsx
│   │   ├── pages/
│   │   │   ├── About.jsx
│   │   │   ├── Contact.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── Portfolio.jsx
│   │   │   ├── Services.jsx
│   │   │   └── TestFirebase.jsx
│   │   ├── platform/
│   │   │   ├── routing/
│   │   │   │   ├── components/
│   │   │   │   │   ├── AuthenticatedRoute.jsx
│   │   │   │   │   └── index.js
│   │   │   │   └── index.js
│   │   │   └── index.js
│   │   ├── services/
│   │   │   └── projectServices.js
│   │   ├── shared/
│   │   │   ├── components/
│   │   │   │   ├── marquee/
│   │   │   │   │   ├── index.js
│   │   │   │   │   └── skills.jsx
│   │   │   │   ├── index.js
│   │   │   │   ├── LoadFeaturedProjects.jsx
│   │   │   │   ├── LoadLogo.jsx
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
│   │   │   │   ├── siteFooter/
│   │   │   │   │   ├── index.js
│   │   │   │   │   └── SiteFooter.jsx
│   │   │   │   ├── siteHeader/
│   │   │   │   │   ├── index.js
│   │   │   │   │   ├── SiteHeader.jsx
│   │   │   │   │   └── ThemeToggle.jsx
│   │   │   │   └── index.js
│   │   │   ├── ui/
│   │   │   │   ├── container/
│   │   │   │   │   ├── Container.jsx
│   │   │   │   │   └── index.js
│   │   │   │   └── index.js
│   │   │   └── index.js
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── .gitignore
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   ├── vercel.json
│   └── vite.config.js
├── prompts/
│   ├── capsule/
│   │   └── main.md
│   └── Main.md
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
│   │   ├── shared/
│   │   │   ├── constants/
│   │   │   │   ├── httpStatus.js
│   │   │   │   └── index.js
│   │   │   ├── errors/
│   │   │   │   ├── appError.js
│   │   │   │   ├── errorCodes.js
│   │   │   │   ├── index.js
│   │   │   │   └── notFound.js
│   │   │   ├── http/
│   │   │   │   ├── index.js
│   │   │   │   └── requestMetadata.js
│   │   │   └── index.js
│   │   └── index.js
│   ├── .env.development
│   ├── .gitignore
│   └── package.json
├── supabase/
│   ├── .temp/
│   │   ├── cli-latest
│   │   ├── gotrue-version
│   │   ├── linked-project.json
│   │   ├── pooler-url
│   │   ├── postgres-version
│   │   ├── project-ref
│   │   ├── rest-version
│   │   ├── storage-migration
│   │   └── storage-version
│   ├── functions/
│   │   └── notify-contact/
│   │       ├── .npmrc
│   │       ├── deno.json
│   │       └── index.ts
│   ├── .gitignore
│   └── config.toml
├── .gitignore
├── package.json
└── README.md
```
