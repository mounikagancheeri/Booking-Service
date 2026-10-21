# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project state

Freshly generated Angular 21 CLI app (`bookservices`). There is no domain code yet: `src/app/app.html` is still the CLI placeholder template, and `src/app/app.routes.ts` is empty. The git repository root is the parent `projects/` directory, which also holds unrelated projects (`FamilyMate/`, `myapp/`); keep commits scoped to `bookservices/`.

## Commands

- `npm start` / `ng serve` — dev server at http://localhost:4200
- `npm run build` — production build to `dist/bookservices/` (default configuration is `production`)
- `npm run watch` — development build in watch mode
- `npm test` / `ng test` — unit tests via Vitest (`@angular/build:unit-test` builder, jsdom environment)
- Run a single spec file: `ng test --include src/app/app.spec.ts`
- Scaffold: `ng generate component <name>` (components default to SCSS)

No linter is configured. Formatting uses Prettier (`printWidth: 100`, single quotes, Angular parser for `.html`): `npx prettier --write <files>`.

## Architecture and conventions

- Standalone-component app, no NgModules. Bootstrapped in `src/main.ts` via `bootstrapApplication(App, appConfig)`; app-wide providers (router, global error listeners) live in `src/app/app.config.ts`.
- Root component is `App` in `src/app/app.ts` (class names have no `Component` suffix, files are `app.ts` / `app.html` / `app.scss`, which is the Angular 20+ naming style). Follow this style for new components.
- State uses signals (`signal(...)`); the app is zoneless (no `zone.js` dependency), so rely on signals or other explicit change-detection triggers rather than zone-based updates.
- Tests use Vitest globals (`describe`/`it`/`expect`) with Angular `TestBed`; specs sit next to their source as `*.spec.ts`.
- TypeScript is strict, including `strictTemplates`, `noPropertyAccessFromIndexSignature`, and `strictInputAccessModifiers`.
- Production budgets: initial bundle warns at 500kB and errors at 1MB; per-component styles warn at 4kB and error at 8kB.
- Static assets go in `public/` (copied as-is into the build).
