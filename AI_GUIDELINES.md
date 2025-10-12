# AI_GUIDELINES.md

## Context

**Project name:** Playlist
**Purpose:** An app for creating shared ratable lists of games. The app lets users sign in with Steam, create
“playlists” of games, invite their Steam friends, add games (via Steam API), and vote (Yes / Maybe / No). Games are
sorted by aggregated votes to produce a “what to play” list.
**Deployment target:** Vercel

---

## Stack Overview

| Layer                    | Technology                               | Reasoning                                                                 |
| ------------------------ | ---------------------------------------- | ------------------------------------------------------------------------- |
| **Framework**            | Next.js 15 (App Router)                  | Modern React architecture, supports Server Components and Server Actions. |
| **Database**             | Prisma Postgres (via Vercel Marketplace) | Serverless PostgreSQL with built-in connection pooling and managed setup. |
| **ORM**                  | Prisma ORM                               | Schema-first approach, type-safe client, easy migrations.                 |
| **Auth**                 | NextAuth (v5) + Custom Steam provider    | Handles sessions, cookies, and OpenID-based login via Steam.              |
| **Styling**              | Tailwind CSS + shadcn/ui                 | Consistent and fast UI development with composable components.            |
| **Icons**                | lucide-react                             | Lightweight SVG icon library.                                             |
| **Validation**           | Zod                                      | For schema and input validation.                                          |
| **Client data fetching** | SWR                                      | Used selectively for client-side revalidation and caching.                |
| **External API**         | Steam Web API                            | Game search, details, and user data.                                      |
| **Language**             | TypeScript                               | End-to-end type safety.                                                   |
| **Package manager**      | pnpm                                     | Efficient, deterministic installs.                                        |

---

## Decisions

### Data Access

- All persistent data lives in **PostgreSQL** (Prisma Postgres via Vercel).
- Migrations managed through `prisma migrate`.
- Schemas and queries live in `src/libs/prisma`.

### Server Logic

- All data mutations and reads should use **Server Actions**.
- **API routes** are allowed only when:
  - Required by external webhooks.
  - Exposing a public, unauthenticated endpoint.

### Authentication

- Authentication managed by **NextAuth**.
- Custom **Steam OpenID provider** - `src/libs/steam/`.
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

### Environment Variables

| Variable          | Description                                                |
| ----------------- | ---------------------------------------------------------- |
| `DATABASE_URL`    | Connection string (managed by Vercel Prisma integration).  |
| `NEXTAUTH_URL`    | Deployment URL (e.g. `https://steamplaylists.vercel.app`). |
| `NEXTAUTH_SECRET` | Secret for JWT/session signing.                            |
| `STEAM_API_KEY`   | Steam Web API key.                                         |

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

---
