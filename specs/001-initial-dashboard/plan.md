# Implementation Plan: Initial Vehicle Status Dashboard

**Branch**: `001-initial-dashboard` | **Date**: 2026-04-11 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `/specs/001-initial-dashboard/spec.md`

## Summary

Build a read-only, single-page dashboard that displays 8 camper van status panels
(fuel level, oil level, door lock state, battery voltage, mileage, interior temperature,
exterior temperature, and a live location map) sourced from static stub data via a typed
service layer. Built with React 19, TypeScript strict mode, Tailwind CSS v4, and Untitled
UI components. The map uses react-leaflet with OpenStreetMap tiles — no API key required.

## Technical Context

**Language/Version**: TypeScript 5 (strict mode), targeting ES2020
**Primary Dependencies**: React 19, Vite 6, Tailwind CSS v4, Untitled UI (CLI init),
  react-leaflet v5 + leaflet 1.9
**Storage**: N/A — stub data only (static TypeScript fixture files)
**Testing**: Not in scope for this feature (Vitest available if added later)
**Target Platform**: Desktop browser (Chromium/Firefox/Safari), 1280px+ viewport,
  served as static files (Nginx, Caddy, or any static file server)
**Project Type**: Single-project web application (Vite SPA)
**Performance Goals**: Full load with stub data < 3 seconds; map pin renders < 3 seconds
**Constraints**: No server-side runtime; no API keys; static build output to `dist/`
**Scale/Scope**: Single user, single vehicle, single page, 8 panels

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Gate | Status | Notes |
|-----------|------|--------|-------|
| I. Component-First UI | Each panel is a discrete, single-responsibility component in `src/components/panels/`; no app logic in UI primitives | ✅ PASS | 7 panel components + 1 shared StatusCard primitive |
| II. Type Safety | TypeScript strict mode; all data shapes in `src/types/vehicle.ts`; no `any` | ✅ PASS | Interface defined in contracts; strict: true in tsconfig |
| III. Static-First Data Layer | All data via `vehicleService.getSnapshot()`; no direct fixture imports in components | ✅ PASS | Service layer contract defined; components call service only |
| IV. Simplicity & YAGNI | No polling, no auth, no unit switching, no per-door states, no mobile layout | ✅ PASS | Scope bounded in spec assumptions; no speculative features |
| V. Self-Hosted Static Build | Vite SPA → `dist/`; no Node runtime; no SSR | ✅ PASS | Vite config produces static assets only |
| VI. Untitled UI Design System | Untitled UI CLI init; all panels built with Untitled UI component patterns + tokens | ✅ PASS | research.md confirms MIT CLI model; color tokens mapped |

All gates pass. No violations to justify.

## Project Structure

### Documentation (this feature)

```text
specs/001-initial-dashboard/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/
│   └── vehicle-service.md   # Service interface contract
└── tasks.md             # Phase 2 output (/speckit-tasks command)
```

### Source Code (repository root)

```text
src/
├── types/
│   └── vehicle.ts              # VehicleStatus, VehicleLocation, VehicleSnapshot,
│                               # OilLevelState, StatusThreshold interfaces
├── data/
│   └── fixtures.ts             # normalStateFixture, warningStateFixture
├── services/
│   └── vehicleService.ts       # VehicleService interface + stub implementation
│                               # + THRESHOLDS constant
├── components/
│   ├── ui/                     # Untitled UI primitives (CLI-generated)
│   │   └── StatusCard.tsx      # Shared panel wrapper (label, value, optional unit)
│   └── panels/
│       ├── FuelPanel.tsx        # FR-001, FR-010
│       ├── OilPanel.tsx         # FR-002
│       ├── DoorLockPanel.tsx    # FR-003, FR-011
│       ├── BatteryPanel.tsx     # FR-004, FR-010
│       ├── MileagePanel.tsx     # FR-005
│       ├── TemperaturePanel.tsx # FR-006, FR-007 (interior + exterior, shared component)
│       └── LocationPanel.tsx    # FR-008
├── App.tsx                     # Dashboard layout — composes all panels
├── main.tsx                    # Entry point; imports leaflet CSS
└── index.css                   # Tailwind CSS v4 entry
```

**Structure Decision**: Single-project web application. No backend folder — backend is
stubbed via static fixtures in `src/data/`. All UI in `src/components/panels/`. Shared
Untitled UI primitives in `src/components/ui/`.

## Complexity Tracking

> No Constitution Check violations — section not applicable.
