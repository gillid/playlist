# AI_GUIDELINES.md

## Context

**Project name:** Playlist
**Purpose:** An app for creating shared ratable lists of games. The app lets users sign in with Steam, create
“playlists” of games, invite their Steam friends, add games (via Steam API), and vote (Yes / Maybe / No). Games are
sorted by aggregated votes to produce a “what to play” list.
**Deployment target:** Vercel

---

## Stack Overview

| Layer                    | Technology                               | Reasoning                                                                       |
| ------------------------ | ---------------------------------------- | ------------------------------------------------------------------------------- |
| **Framework**            | Next.js 15 (App Router)                  | Modern React architecture, supports Server Components and Server Actions.       |
| **Database**             | Prisma Postgres (via Vercel Marketplace) | Serverless PostgreSQL with built-in connection pooling and managed setup.       |
| **ORM**                  | Prisma ORM                               | Schema-first approach, type-safe client, easy migrations.                       |
| **Auth**                 | Better Auth + Custom Steam plugin        | Modern authServer framework with custom Steam OpenID plugin for authentication. |
| **Styling**              | Tailwind CSS + shadcn/ui                 | Consistent and fast UI development with composable components.                  |
| **Icons**                | lucide-react                             | Lightweight SVG icon library.                                                   |
| **Validation**           | Zod                                      | For schema and input validation.                                                |
| **Client data fetching** | SWR                                      | Used selectively for client-side revalidation and caching.                      |
| **External API**         | Steam Web API                            | Game search, details, and user data.                                            |
| **Language**             | TypeScript                               | End-to-end type safety.                                                         |
| **Package manager**      | pnpm                                     | Efficient, deterministic installs.                                              |

---

## Decisions

### Data Access

- All persistent data lives in **PostgreSQL** (Prisma Postgres via Vercel).
- Migrations managed through `prisma migrate`.
- Schemas and queries live in `src/libs/prisma`.

#### Prisma Configuration

The project uses a **custom Prisma setup** via `prisma.config.ts` at the project root:

- **Schema location**: `src/libs/prisma` (`schema.prisma` and nested `schema/*.prisma` files)
- **Migrations directory**: `src/libs/prisma/migrations/`
- **Generated client output**: `generated/prisma` (relative to the repo root; configured in `schema.prisma`)
- **Views directory**: `src/libs/prisma/views/`
- **TypedSQL queries**: `src/libs/prisma/queries/`

The Prisma client is exported as a singleton from `src/libs/prisma/index.ts` with:

- Global instance caching for Next.js hot-reload compatibility
- Development logging enabled (`query`, `error`, `warn`)
- Production logging limited to `error` only

### Server Logic

- All data mutations and reads should use **Server Actions**.
- **API routes** are allowed only when:
  - Required by external webhooks.
  - Exposing a public, unauthenticated endpoint.

### Authentication

- Authentication managed by **Better Auth**.
- Custom **Steam OpenID plugin** - `src/libs/steam/`.
- Sessions persisted in the database using Prisma adapter.

### External API Access

- All calls to the **Steam API** should occur server-side (in Server Actions or Route Handlers).
- Use `fetch` with `next: { revalidate: N }` for incremental caching.
- SWR may be used on the client for interactive features (e.g., game search).

### Client-side Logic

- Minimize Client Components usage.
- Use **SWR** for any live-updating UI or incremental revalidation.
- All other state should be server-driven.

### UI / Styling

- Tailwind CSS provides the styling foundation.
- `shadcn/ui` provides consistent, accessible React components.
- Default theme: dark mode.
- The website is responsive (starting from 375px width) and accessible.

### Folder Structure

```
src/app - app composition
src/components - ui components, design-system
src/libs/* - libraries
```

### Libraries Assembly (Singletons and Initialization Order)

Lint enforcement (mirrors eslint.config.mjs):

- In application and library code (`src/**/*.{ts,tsx,js,jsx}`), imports from `@/libs-origin/*` are forbidden. Use the public `@/libs/*` alias instead.
- In raw libraries (`src/libs/**/*.{ts,tsx,js,jsx}`), both `@/libs/*` and `@/libs-origin/*` are forbidden to prevent cross-lib coupling and accidental dependency on assembled singletons. Use relative imports within the same library. Integration happens only via the assembly layer.
- Inside the assembly overlay (`src/libs/_assembly/**`), importing from `@/libs/*` is forbidden to avoid self-referencing; use `@/libs-origin/*` to wire raw libs together.

To avoid ad-hoc singletons, circular dependencies, and inconsistent init order, the project uses an alias-based assembly overlay:

- Location: `src/libs/_assembly/`
  - `assembly.server.ts` — constructs server-only singletons (e.g., logger, Steam API, auth server) using environment, Prisma, etc.
  - `assembly.client.ts` — constructs client-only singletons (e.g., auth client).
  - Subfolders mirror public library paths to override specific entry points, e.g.:
    - `src/libs/_assembly/auth/server.ts` → re-exports `authServer` from `assembly.server.ts`.
    - `src/libs/_assembly/auth/client.ts` → re-exports `authClient` from `assembly.client.ts`.
    - `src/libs/_assembly/logger/index.ts` → re-exports `logger` from `assembly.server.ts`.
- Current assembled libs: `logger`, `steam`, `authServer`, `authClient`.

#### Path alias overlay (proxy without modifying raw libraries)

Libraries remain assembly-agnostic in `src/libs/*`. We expose assembled instances by placing override files in `src/libs/_assembly/*` and using TypeScript path priority:

- tsconfig paths:
  - `@/libs/*` → `src/libs/_assembly/*` (first) then falls back to `src/libs/*`
  - `@/libs-origin/*` → `src/libs/*` (for assembly internals only)
- How it resolves:
  - If a matching file exists under `_assembly`, it is used (assembled override).
  - Otherwise, it automatically falls back to the raw library under `src/libs/*`.

Examples:

```ts
// Public imports (prefer these):
import { authServer } from '@/libs/auth/server'; // overridden by _assembly/auth/server.ts
import { authClient } from '@/libs/auth/client'; // overridden by _assembly/auth/client.ts
import { logger } from '@/libs/logger'; // overridden by _assembly/logger/index.ts
// Deep types/utilities untouched:
import type { GetPlayerSummaries } from '@/libs/steam/APIResponseTypes'; // falls back to raw file
```

Notes:

- If your code imports a path like `@/libs/logger/server` but only `_assembly/logger/index.ts` exists, it will fall back to the raw `src/libs/logger/server.ts`. Prefer importing `@/libs/logger` for the assembled logger, or add an override at `_assembly/logger/server.ts` if you need that exact path.
- This pattern lets you override only what you need. Deep files like `APIResponseTypes.ts` are automatically forwarded to the raw library when no override exists.

Guidelines:

- Initialize cross-cutting libs (e.g., logger, external API clients) inside `assembly.server.ts` (server) or `assembly.client.ts` (client) and re-export them via small `_assembly` entry points that mirror the desired public import path.
- Use the public `@/libs/...` paths in application code; avoid importing from `@/libs-origin/...` outside of the assembly.
- In raw libraries, keep modules self-contained and use relative imports only; never depend on assembled singletons.
- Be mindful of top-level side effects. If you encounter circular init, move usage into functions or split responsibilities to break cycles.

### Environment Variables

| Variable                | Description                                                               |
| ----------------------- | ------------------------------------------------------------------------- |
| `NEXT_PUBLIC_APP_URL`   | App URL (e.g. http://localhost:3000 or your Vercel domain).               |
| `NEXT_PUBLIC_AUTH_PATH` | Auth base path (e.g. `/api/auth`).                                        |
| `DATABASE_URL`          | Prisma connection string (Vercel Postgres).                               |
| `POSTGRES_URL`          | (Optional) Vercel pooled Postgres URL; exposed by the Vercel integration. |
| `PRISMA_DATABASE_URL`   | (Optional) Overrides Prisma's datasource URL when needed.                 |
| `BETTER_AUTH_SECRET`    | Secret for Better Auth session/JWT signing.                               |
| `STEAM_API_KEY`         | Steam Web API key.                                                        |
| `VERCEL_OIDC_TOKEN`     | (Optional) Vercel OIDC token for service-to-service auth if applicable.   |

---

## Rules for AI Agents

1. **Use Server Actions** for all business logic and database operations.
2. **Do not create new API routes** unless required for external integration.
3. **Always use Prisma Client** for database access.
4. **Validate all user input** with Zod.
5. **Use SWR only** for client-side caching or live UI updates.
6. **Keep UI consistent** with Tailwind + shadcn.
7. **Write strictly typed code** (`.tsx` + TypeScript).
8. **Place integration logic** (Steam API, helpers, etc.) inside `src/libs/`.
9. **Update this file** when architectural decisions change or new systems are introduced.
10. **Follow naming conventions** and structure as defined in this document.
11. **Run terminal commands one by one** - do not chain commands with `&&`, `||`, or `;`. Execute each command separately.

---
