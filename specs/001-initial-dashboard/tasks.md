---
description: "Task list for Initial Vehicle Status Dashboard"
---

# Tasks: Initial Vehicle Status Dashboard

**Input**: Design documents from `/specs/001-initial-dashboard/`
**Prerequisites**: plan.md ✅ spec.md ✅ research.md ✅ data-model.md ✅ contracts/ ✅ quickstart.md ✅

**Tests**: Not requested in spec — no test tasks included.

**Organization**: Tasks are grouped by user story to enable independent implementation and
testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1, US2, US3)
- Exact file paths included in all descriptions

## Path Conventions

- Single-project web app: all source under `src/` at repository root
- Build output: `dist/`
- Specs: `specs/001-initial-dashboard/`

---

## Phase 1: Setup

**Purpose**: Project initialization, dependencies, and base configuration

- [x] T001 Bootstrap Vite React+TS project in repo root: `npm create vite@latest . -- --template react-ts`
- [x] T002 Install Tailwind CSS v4 for Vite: `npm install -D tailwindcss @tailwindcss/vite`
- [x] T003 Configure Vite with Tailwind plugin in `vite.config.ts`
- [x] T004 Set `"moduleResolution": "bundler"` and `"strict": true` in `tsconfig.json`
- [x] T005 Install react-leaflet and leaflet: `npm install react-leaflet leaflet && npm install -D @types/leaflet`
- [x] T006 Run Untitled UI CLI init: `npx untitledui@latest init` (select Gray base, Blue primary)
- [x] T007 Import `leaflet/dist/leaflet.css` at top of `src/main.tsx`
- [x] T008 Create `src/index.css` with Tailwind CSS v4 entry directive

---

## Phase 2: Foundational

**Purpose**: Core type definitions, fixture data, and service layer — MUST complete before any panel can be built

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T009 Create `src/types/vehicle.ts` with `OilLevelState`, `VehicleStatus`, `VehicleLocation`, `VehicleSnapshot`, `StatusThreshold` interfaces per `contracts/vehicle-service.md`
- [x] T010 [P] Create `src/data/fixtures.ts` with `normalStateFixture` and `warningStateFixture` per stub values in `data-model.md`
- [x] T011 Create `src/services/vehicleService.ts` implementing `VehicleService` interface with `getSnapshot()` returning `Promise.resolve(normalStateFixture)`; export `THRESHOLDS` constant (depends on T009, T010)
- [x] T012 Create `src/components/ui/StatusCard.tsx` — shared panel wrapper accepting `label`, `value`, `unit`, `warningState` props; styled with Untitled UI tokens (no app logic, no data fetching)

**Checkpoint**: Types, fixtures, service, and shared card primitive are in place — panel implementation can begin

---

## Phase 3: User Story 1 — View Full Vehicle Status at a Glance (Priority: P1) 🎯 MVP

**Goal**: All 8 status panels visible and populated on a single screen from stub data

**Independent Test**: Load `npm run dev` → all 8 panels render at 1280×800 with correct stub values; no navigation required

### Implementation for User Story 1

- [x] T013 [P] [US1] Create `src/components/panels/FuelPanel.tsx` — displays fuel level % with visual bar indicator; reads `status.fuelLevel`; shows "—" if null (FR-001, FR-012)
- [x] T014 [P] [US1] Create `src/components/panels/OilPanel.tsx` — displays `OilLevelState` label (OK / Low / Check); reads `status.oilLevel`; shows "—" if null (FR-002, FR-012)
- [x] T015 [P] [US1] Create `src/components/panels/DoorLockPanel.tsx` — displays Locked/Unlocked with icon; reads `status.doorLocked`; shows "—" if null (FR-003, FR-012)
- [x] T016 [P] [US1] Create `src/components/panels/BatteryPanel.tsx` — displays voltage value with "V" unit; reads `status.batteryVoltage`; shows "—" if null (FR-004, FR-012)
- [x] T017 [P] [US1] Create `src/components/panels/MileagePanel.tsx` — displays odometer value with "mi" unit; reads `status.mileage`; shows "—" if null (FR-005, FR-012)
- [x] T018 [P] [US1] Create `src/components/panels/TemperaturePanel.tsx` — accepts `label` prop ("Interior" / "Exterior") and `value` prop; displays value with "°C" unit; shows "—" if null (FR-006, FR-007, FR-012)
- [x] T019 [P] [US1] Create `src/components/panels/LocationPanel.tsx` — renders react-leaflet `MapContainer` with `TileLayer` (OpenStreetMap) and a `Marker` at stub coordinates; fixed container height; renders "Location unavailable" fallback if coordinates are null or invalid (FR-008, FR-012)
- [x] T020 [US1] Create `src/App.tsx` — calls `vehicleService.getSnapshot()` on mount; composes all 7 panel components in a grid layout; passes data props to each panel (depends on T013–T019)
- [x] T021 [US1] Apply dashboard grid layout in `src/App.tsx` using Tailwind CSS grid classes — 8 panels visible simultaneously at 1280×800 viewport without scrolling (SC-001)

**Checkpoint**: All 8 panels render at 1280×800 with correct stub data values — User Story 1 independently complete

---

## Phase 4: User Story 2 — Identify Vehicle Location on Map (Priority: P2)

**Goal**: Map panel renders with interactive pin at stub coordinates; user can pan and zoom

**Independent Test**: Verify `LocationPanel.tsx` in isolation — marker appears at (40.7128, -74.0060); pan/zoom responds without page reload; invalid coords show fallback message

### Implementation for User Story 2

- [x] T022 [US2] Update `src/components/panels/LocationPanel.tsx` — fix Leaflet default marker icon asset paths (re-point `L.Icon.Default` prototype `iconUrl` / `shadowUrl` to avoid Vite asset transformation issue per research.md)
- [x] T023 [US2] Verify pan and zoom interaction works in dev environment (`npm run dev`) — no further code changes if react-leaflet defaults are sufficient
- [x] T024 [US2] Add coordinate validity check in `src/components/panels/LocationPanel.tsx` — lat must be in [-90, 90], lng in [-180, 180]; render "Location unavailable" fallback for invalid values per data-model.md

**Checkpoint**: Map panel fully interactive with valid coords and graceful fallback for invalid coords — User Story 2 independently complete

---

## Phase 5: User Story 3 — Recognize Critical Status at a Glance (Priority: P3)

**Goal**: Fuel, battery, and door lock panels show distinct warning visuals when values breach thresholds; all other panels stay in normal state

**Independent Test**: Switch active fixture in `src/services/vehicleService.ts` to `warningStateFixture`; reload; verify fuel panel (8%), battery panel (11.2V), and door lock panel (Unlocked) each show a warning visual distinct from normal state

### Implementation for User Story 3

- [x] T025 [US3] Update `src/components/panels/FuelPanel.tsx` — import `THRESHOLDS` from `src/services/vehicleService.ts`; apply Untitled UI `error-*` color tokens when `fuelLevel < THRESHOLDS.fuelWarningBelow` (FR-010)
- [x] T026 [US3] Update `src/components/panels/BatteryPanel.tsx` — import `THRESHOLDS`; apply Untitled UI `error-*` color tokens when `batteryVoltage < THRESHOLDS.batteryWarningBelow` (FR-010)
- [x] T027 [US3] Update `src/components/panels/DoorLockPanel.tsx` — apply distinct Untitled UI `warning-*` color tokens and unlocked icon when `doorLocked === false` (FR-011)
- [x] T028 [US3] Update `src/components/panels/OilPanel.tsx` — apply `warning-*` color tokens when `oilLevel === "Low"` and `error-*` tokens when `oilLevel === "Check"` for visual hierarchy

**Checkpoint**: All warning states render correctly for both `normalStateFixture` and `warningStateFixture` — User Story 3 independently complete

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Final validation, null-state verification, and build confirmation

- [ ] T029 [P] Verify all 8 panels display "—" placeholder when their data field is `null` — test by temporarily nulling individual fields in `src/data/fixtures.ts` (FR-012)
- [ ] T030 [P] Verify dashboard reflows gracefully at viewports narrower than 1280px (edge case from spec.md) — adjust Tailwind grid breakpoints in `src/App.tsx` if needed
- [x] T031 Confirm production build succeeds: `npm run build` → `dist/` directory contains only static assets (HTML, CSS, JS) with no server-side runtime (V. Self-Hosted Static Build)
- [ ] T032 Run quickstart.md validation checklist — verify all 5 success criteria (SC-001 through SC-005) against dev server
- [ ] T033 [P] Switch `vehicleService.ts` to `warningStateFixture` and verify all warning states render as expected, then restore to `normalStateFixture`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — start immediately
- **Foundational (Phase 2)**: Depends on Setup completion — BLOCKS all user story work
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - US1 (Phase 3) → US2 (Phase 4) → US3 (Phase 5) should run sequentially (US2 and US3 extend Phase 3 components)
- **Polish (Phase 6)**: Depends on all user stories complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational — no dependencies on other stories
- **User Story 2 (P2)**: Extends `LocationPanel.tsx` from US1 — start after US1 checkpoint
- **User Story 3 (P3)**: Extends panel components from US1 — start after US1 checkpoint; independent of US2

### Within Each User Story

- Types (T009) before service (T011) before panels (T013–T019)
- All panels before App composition (T020, T021)
- Warning-state updates (T025–T028) after base panels exist (T013–T016)

### Parallel Opportunities

- T013–T019 (all 7 panels): All parallel within Phase 3 — separate files, no cross-dependencies
- T010 (fixtures) parallel with T009 (types) — different files
- T025–T028 (warning states): All parallel within Phase 5 — each touches a different panel file

---

## Parallel Example: User Story 1 Panel Implementation

```bash
# Launch all 7 panel tasks together (no cross-dependencies):
Task: "Create src/components/panels/FuelPanel.tsx"           # T013
Task: "Create src/components/panels/OilPanel.tsx"            # T014
Task: "Create src/components/panels/DoorLockPanel.tsx"       # T015
Task: "Create src/components/panels/BatteryPanel.tsx"        # T016
Task: "Create src/components/panels/MileagePanel.tsx"        # T017
Task: "Create src/components/panels/TemperaturePanel.tsx"    # T018
Task: "Create src/components/panels/LocationPanel.tsx"       # T019

# Then compose:
Task: "Create src/App.tsx composing all panels"              # T020
Task: "Apply dashboard grid layout in src/App.tsx"           # T021
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL — blocks all stories)
3. Complete Phase 3: User Story 1 (T013–T021)
4. **STOP and VALIDATE**: All 8 panels render at 1280×800 with correct stub values
5. Demo / deploy MVP

### Incremental Delivery

1. Setup + Foundational → Foundation ready
2. User Story 1 → All panels visible → MVP
3. User Story 2 → Map interactive with marker and fallback
4. User Story 3 → Warning states for fuel, battery, door lock, oil
5. Polish → Build confirmed, edge cases verified

---

## Notes

- [P] tasks = different files, no cross-dependencies — safe to run in parallel
- [Story] label maps each task to its user story for traceability
- No test tasks — not requested in spec (Vitest available if added later)
- Commit after each phase checkpoint or logical group
- Validate quickstart.md success criteria after Phase 3 before proceeding
- Untitled UI color tokens to use: `error-*` for critical (low fuel, low battery), `warning-*` for caution (door unlocked, oil low), `success-*` for normal states
