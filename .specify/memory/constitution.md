<!--
  SYNC IMPACT REPORT
  ==================
  Version change: 1.0.0 → 1.1.0
  Modified principles: None renamed
  Added sections:
    - Principle VI. Untitled UI Design System (new)
    - Technology Stack: added Untitled UI row
  Removed sections: N/A
  Templates requiring updates:
    - .specify/templates/plan-template.md  ✅ — Constitution Check now covers Principles I–VI
    - .specify/templates/spec-template.md  ✅ — No mandatory section changes required
    - .specify/templates/tasks-template.md ✅ — No phase structure changes required
  Deferred TODOs: None
-->

# FVS Dashboard Constitution

## Core Principles

### I. Component-First UI

Every piece of UI MUST be expressed as a discrete, independently renderable React component.
Components MUST have a single, clearly named responsibility. Shared UI primitives (buttons,
cards, status indicators) MUST live in a `src/components/` directory and MUST NOT contain
application logic or data-fetching concerns.

**Rationale**: Camper van status panels are natural display units. Keeping them independent
makes each panel testable, replaceable, and composable without ripple effects.

### II. Type Safety (NON-NEGOTIABLE)

TypeScript strict mode (`"strict": true`) MUST be enabled and MUST NOT be disabled or
circumvented. The `any` type is prohibited except when wrapping a third-party boundary
with an explicit comment justifying the escape. All data shapes — including static fixtures
and future API payloads — MUST be defined as named TypeScript interfaces or types in
`src/types/`.

**Rationale**: Static data stubs that are typed today become the contract for a real backend
tomorrow. Retrofitting types into untyped code is expensive; enforcing types from day one
is not.

### III. Static-First Data Layer

The backend MUST be stubbed using static TypeScript fixture files. All data access MUST be
routed through a service layer (`src/services/`) that returns typed promises, mirroring the
interface a real API would provide. No component is permitted to import fixture data
directly — it MUST call through the service layer.

**Rationale**: Isolating fixture data behind a service layer means swapping in a real HTTP
client later requires changing only the service files, not every component that consumes data.

### IV. Simplicity & YAGNI

Code MUST solve the stated requirement and nothing else. Abstractions are only permitted
when the same pattern appears at least three times. No feature flags, no backwards-compat
shims, no speculative generalization. If a simpler approach exists, it MUST be chosen.
Complexity MUST be justified in the plan's Complexity Tracking table.

**Rationale**: A self-hosted personal dashboard has one stakeholder and one deployment
target. Gold-plating wastes time and creates maintenance burden with no audience to benefit.

### V. Self-Hosted, Static-Deployable Builds

The production build MUST consist entirely of static assets (HTML, CSS, JS) that can be
served by any static file server (Nginx, Caddy, `serve`, etc.) without a Node.js runtime
or server-side rendering layer. No runtime server process is permitted as a deployment
dependency. Build output MUST target the `dist/` directory.

**Rationale**: The project is self-hosted. Eliminating runtime server dependencies keeps the
deployment footprint minimal and the upgrade path simple.

### VI. Untitled UI Design System

All UI MUST be built using Untitled UI library components wherever the library provides
a suitable component. Custom components MUST follow Untitled UI's design language —
spacing scale, color tokens, typography scale, border radius, and shadow conventions —
so that custom work is visually indistinguishable from library components. Introducing
a visual pattern that diverges from the Untitled UI system (custom spacing values,
ad-hoc color choices, bespoke shadow values) is prohibited unless no Untitled UI
equivalent exists and the deviation is documented in the plan.

**Rationale**: A consistent design system reduces visual debt and decision fatigue. Using
Untitled UI as the single source of design truth means every component, whether from the
library or built custom, speaks the same visual language.

## Technology Stack

These choices are fixed for the life of this project. Changes require a constitution amendment.

| Concern | Choice |
|---------|--------|
| UI framework | React (latest stable) |
| Language | TypeScript — strict mode |
| Styling | Tailwind CSS |
| Component library | Untitled UI |
| Build tool | Vite |
| Package manager | npm |
| Test runner | Vitest (if tests are added) |
| Deployment target | Self-hosted static file server |
| Backend | Static TypeScript fixture files (stub) |

All new dependencies MUST be justified against this stack. Dependencies that require
a server-side runtime are prohibited.

## Development Workflow

- Features MUST be specified in a `specs/` directory before implementation begins.
- Each feature MUST have a corresponding `plan.md` and `spec.md` before tasks are written.
- The service layer (`src/services/`) MUST be updated before or alongside any component
  that consumes new data.
- TypeScript type definitions (`src/types/`) MUST be committed before the implementation
  that uses them.
- The `dist/` build MUST be reproducible via `npm run build` with no manual steps.
- The dev server MUST start via `npm run dev` on first checkout after `npm install`.

## Governance

This constitution supersedes all other project guidance. Amendments require:

1. A documented rationale explaining what changed and why.
2. A version bump per the semantic versioning policy below.
3. An updated `LAST_AMENDED_DATE`.
4. A review of all template files for alignment.

**Versioning policy**:
- MAJOR: A principle is removed, fundamentally redefined, or a technology stack choice is
  replaced.
- MINOR: A new principle or section is added, or guidance is materially expanded.
- PATCH: Wording clarifications, typo fixes, non-semantic refinements.

All implementation plans MUST include a Constitution Check section validating compliance
with Principles I–VI before Phase 0 research begins.

**Version**: 1.1.0 | **Ratified**: 2026-04-11 | **Last Amended**: 2026-04-11
