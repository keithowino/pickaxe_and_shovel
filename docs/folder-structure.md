# Pickaxe & Shovel Folder Structure

Generated on: 2026-10-07

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
