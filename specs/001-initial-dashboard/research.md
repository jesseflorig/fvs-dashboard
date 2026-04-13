# Research: Initial Vehicle Status Dashboard

**Feature**: 001-initial-dashboard
**Date**: 2026-04-11

## Decision 1: Map Library

**Decision**: `react-leaflet` v5 + OpenStreetMap tile layer

**Rationale**: The dashboard needs a simple interactive map with a single location pin.
react-leaflet is the lightest React-native map library (~46 KB gzipped), has no API key
requirement (uses OpenStreetMap tiles by default), ships with full TypeScript support,
and produces a static bundle compatible with Vite. No server-side component is involved.

**Alternatives considered**:
- `react-map-gl` + MapLibre GL — vector tiles, WebGL rendering, more powerful styling,
  but ~750 KB gzipped. Bundle cost is not justified for a single location pin display.
- Mapbox GL — requires a paid API key; ruled out immediately.

**Gotchas**:
- Leaflet CSS must be imported explicitly in `main.tsx` (`leaflet/dist/leaflet.css`).
- The map container `<div>` must have an explicit height (CSS `h-[Xpx]` or `h-full` with
  a sized parent) or the map renders at zero height.
- Vite: use `"moduleResolution": "bundler"` in `tsconfig.json`, not `"NodeNext"`.
- Default marker icons reference image assets that Vite path-transforms. Use a custom
  divIcon or re-point the default icon URLs explicitly.

## Decision 2: Untitled UI Integration

**Decision**: Untitled UI CLI copy/paste model — `npx untitledui@latest init`

**Rationale**: Untitled UI has no standalone npm package. Components are initialized into
the project via CLI and owned outright (MIT license). This aligns with Constitution
Principle VI (design system compliance) and Principle IV (YAGNI) — no abstraction layer,
no version lock, no vendored runtime dependency.

The CLI installs:
- A Tailwind CSS v4 configuration extended with Untitled UI color tokens
- Copied component source files in `src/components/ui/`
- React 19 + TypeScript 5

**Color token system** (relevant to this feature):
- `gray-{25–950}` — text, backgrounds, borders, dividers
- `primary-{25–950}` — interactive elements
- `error-{25–950}` — warning/critical states (low fuel, low battery)
- `warning-{25–950}` — caution states
- `success-{25–950}` — normal/ok states

**Typography**: Standard Tailwind `text-*` scale, augmented with Untitled UI's named
hierarchy (`text-display-*`, `text-xl`, `text-sm`, etc.).

**Alternatives considered**:
- shadcn/ui — different design language; ruled out (not Untitled UI).
- Manual Tailwind config without CLI — possible but requires manually transcribing all
  color token values; the CLI is faster and authoritative.

## Decision 3: Project Initialization Order

**Decision**: Initialize Vite project first, then run Untitled UI CLI on top of it.

**Rationale**: Untitled UI CLI (`npx untitledui@latest init`) expects an existing React +
Tailwind project and layers its tokens and components on top. The correct sequence is:

1. `npm create vite@latest . -- --template react-ts`
2. Install Tailwind CSS v4 per Vite guide
3. `npx untitledui@latest init` (select gray base + primary color)
4. Install `react-leaflet` and `leaflet`

## Decision 4: No Test Setup in This Feature

**Decision**: Tests are not included in this feature.

**Rationale**: The spec does not request tests. Per Constitution Principle IV (YAGNI) and
the tasks template guidance, tests are optional and only added when explicitly requested.
Vitest remains available as the designated test runner if tests are added later.
