# fvs-dashboard Development Guidelines

Auto-generated from all feature plans. Last updated: 2026-04-13

## Active Technologies
- TypeScript 5 (strict mode) + React 19, Vite 6, Tailwind CSS v4, Untitled UI (003-)
- Static fixture files in `src/data/` (003-)

- TypeScript 5 (strict mode), targeting ES2020 + React 19, Vite 6, Tailwind CSS v4, Untitled UI (CLI init), (001-initial-dashboard)

## Project Structure

```text
src/
├── types/          # TypeScript interfaces (vehicle.ts)
├── data/           # Static fixture files
├── services/       # Service layer (vehicleService.ts)
├── components/
│   ├── ui/         # Untitled UI primitives
│   └── panels/     # Dashboard status panels
├── App.tsx
└── main.tsx
specs/              # Feature specs, plans, and research
dist/               # Build output (static assets)
```

## Commands

```bash
npm run dev     # Start dev server
npm run build   # Build to dist/
npm run lint    # Lint
```

## Code Style

- TypeScript strict mode — no `any` without explicit justification comment
- All data shapes defined in `src/types/` before implementation
- Components call `vehicleService.getSnapshot()` — never import fixtures directly
- Follow Untitled UI design tokens (color, spacing, typography) for all UI

## Recent Changes
- 003-: Added TypeScript 5 (strict mode) + React 19, Vite 6, Tailwind CSS v4, Untitled UI

- 001-initial-dashboard: Added TypeScript 5 (strict mode), targeting ES2020 + React 19, Vite 6, Tailwind CSS v4, Untitled UI (CLI init),

<!-- MANUAL ADDITIONS START -->
<!-- MANUAL ADDITIONS END -->
