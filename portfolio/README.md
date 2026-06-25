# Portfolio with Supabase + Prisma CMS

This project is a Next.js portfolio with a custom CMS backed by Supabase Postgres and Prisma.

## Setup

1. Install dependencies:

```bash
npm install
```

2. Copy environment template and fill values:

```bash
cp .env.example .env.local
```

Required values:

- `DATABASE_URL`
- `DIRECT_URL`
- `CMS_ADMIN_TOKEN`
- `NEXT_PUBLIC_SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

3. Run the SQL bootstrap script in Supabase (creates `cms_content`):

- Open SQL Editor in Supabase.
- Run [supabase/schema.sql](supabase/schema.sql).

4. Start dev server:

```bash
npm run dev
```

5. Generate Prisma client:

```bash
npm run prisma:generate
```

6. Sync Prisma schema to your Supabase database when needed:

```bash
npm run prisma:push
```

## CMS Usage

- Public portfolio reads content from `public.cms_content` (row with `id = 1`).
- Content queries and updates are handled by Prisma ORM.
- Admin editor is available at `/admin` and is protected behind login.
- Login page is available at `/login`.
- Login uses `CMS_ADMIN_TOKEN` as the admin password and creates an HTTP-only session cookie.
- API endpoints:
	- `GET /api/content`
	- `PUT /api/content` (requires valid admin session or `x-cms-token` header)
	- `POST /api/admin/login`
	- `POST /api/admin/logout`

## Code Map

- CMS schema and normalization: [src/lib/cms/schema.ts](src/lib/cms/schema.ts)
- Prisma client: [src/lib/prisma.ts](src/lib/prisma.ts)
- Prisma schema: [prisma/schema.prisma](prisma/schema.prisma)
- Content data layer: [src/lib/cms/content.ts](src/lib/cms/content.ts)
- API route: [src/app/api/content/route.ts](src/app/api/content/route.ts)
- Admin UI: [src/components/CmsAdmin.tsx](src/components/CmsAdmin.tsx)
- Admin page: [src/app/admin/page.tsx](src/app/admin/page.tsx)
