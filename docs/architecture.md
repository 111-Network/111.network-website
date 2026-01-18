# Architecture Overview

## Current State

- **Monorepo**: Turborepo structure (upcoming setup)
- **Database**: Supabase (upcoming integration)
- **Live App**: `apps/website` - Next.js 16 with App Router
- **Packages**: `packages/` for shared code (database, protocol, ui)

## Structure

- **apps/website**: Main Next.js application
- **packages/database**: Database utilities (upcoming)
- **packages/protocol**: Protocol implementation (upcoming)
- **packages/ui**: Shared UI components (upcoming)

## Backend

- **Database**: See [ADR-0001](adr/0001-vercel-postgres-nextjs-api-routes.md) for database decision
- **API**: Next.js API Routes in `apps/website/app/api/` (when implemented)

## Principles

- Modular, reusable components
- Mobile-first responsive design
- Full TypeScript coverage
- WCAG 2.1 AA accessibility target
