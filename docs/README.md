# 111 Network Web - Documentation

**Version**: v0.1.0 (Pre-MVP)  
**Status**: Monorepo structure, preparing for Turborepo and Supabase integration

## Current State

- **Monorepo Structure**: Turborepo setup upcoming
- **Live App**: `apps/website` - Next.js 16 application
- **Packages**: `packages/` directory structure in place (database, protocol, ui)
- **Database**: Supabase integration upcoming
- **Build System**: Turborepo configuration upcoming

## Structure

```
111-network-web/
├── apps/
│   └── website/          # Main Next.js application (live)
├── packages/
│   ├── database/         # Database utilities (upcoming)
│   ├── protocol/         # Protocol implementation (upcoming)
│   └── ui/               # Shared UI components (upcoming)
└── docs/                  # Documentation
```

## Documentation

- **Development**: Setup, contributing, testing guides
- **Specs**: Feature specifications (spec-driven development)
- **ADR**: Architecture Decision Records
- **Architecture**: High-level system architecture

## Important Notes

- Main `README.md` in root should not be modified by AI agents
- All development docs are in `docs/`
- Version is tracked in root `package.json`
