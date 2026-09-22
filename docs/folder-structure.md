# Pickaxe & Shovel Folder Structure

Generated on: 2026-09-22

```bash
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
│   │   │   │   │   └── index.js
│   │   │   │   ├── routes/
│   │   │   │   │   ├── administration.routes.jsx
│   │   │   │   │   └── index.js
│   │   │   │   └── index.js
│   │   │   ├── gateway/
│   │   │   │   ├── components/
│   │   │   │   │   ├── GatewayFooter.jsx
│   │   │   │   │   ├── GatewayHeader.jsx
│   │   │   │   │   ├── index.js
│   │   │   │   │   ├── ProjectCard.jsx
│   │   │   │   │   ├── ProjectModal.jsx
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
│   │   │   │   │   └── ServicePage.jsx
│   │   │   │   ├── routes/
│   │   │   │   │   ├── gateway.routes.jsx
│   │   │   │   │   └── index.js
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
│   │   │   │   └── AuthContext.jsx
│   │   │   ├── pages/
│   │   │   │   └── TestFirebase.jsx
│   │   │   ├── firebase.config.js
│   │   │   ├── github.js
│   │   │   ├── MetaDataInsert.jsx
│   │   │   ├── supabase.js
│   │   │   └── ThemeContext.jsx
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
│   │   │   └── index.js
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── .env.development
│   ├── .env.production
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
│   │   ├── client.md
│   │   └── main.md
│   ├── copy.jsx
│   ├── Main.md
│   ├── Main2.md
│   └── Main3.md
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
│   ├── .env.production
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
