# Quickstart: Initial Vehicle Status Dashboard

**Feature**: 001-initial-dashboard
**Date**: 2026-04-11

## Prerequisites

- Node.js 20+
- npm 10+

## 1. Bootstrap the Project

```bash
# From repo root — create Vite React+TS project in place
npm create vite@latest . -- --template react-ts

# Install base dependencies
npm install

# Install Tailwind CSS v4 for Vite
npm install -D tailwindcss @tailwindcss/vite

# Add map library
npm install react-leaflet leaflet
npm install -D @types/leaflet
```

## 2. Initialize Untitled UI

```bash
npx untitledui@latest init
```

Follow the prompts:
- **Base color**: Gray
- **Primary color**: choose project brand color (or Blue as default)
- **Components to install**: Badge, Button, Avatar (minimum for status panels)

This will:
- Update `tailwind.config.ts` with Untitled UI color tokens
- Copy component source into `src/components/ui/`

## 3. Configure Vite

In `vite.config.ts`:

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

In `tsconfig.json` — ensure `moduleResolution` is `"bundler"` (not `"NodeNext"`):

```json
{
  "compilerOptions": {
    "moduleResolution": "bundler",
    "strict": true
  }
}
```

## 4. Import Leaflet CSS

In `src/main.tsx`, add before any app imports:

```typescript
import 'leaflet/dist/leaflet.css'
```

## 5. Verify Dev Server

```bash
npm run dev
```

Dashboard should load at `http://localhost:5173` with all 8 panels visible.

## 6. Build for Deployment

```bash
npm run build
```

Output in `dist/`. Serve with any static file server:

```bash
# Example with Node serve:
npx serve dist

# Example with Nginx — point root to dist/
# Example with Caddy — `file_server` directive pointing to dist/
```

## 7. Validate Against Success Criteria

- [ ] SC-001: All 8 panels visible at 1280×800 without scrolling
- [ ] SC-002: Full load with stub data in < 3 seconds
- [ ] SC-003: Each panel's value and label are self-explanatory within 5 seconds
- [ ] SC-004: Map renders location pin within 3 seconds
- [ ] SC-005: Panel values exactly match `src/data/fixtures.ts` stub values

## 8. Test Warning States

Swap the active fixture in `src/services/vehicleService.ts` from `normalStateFixture`
to `warningStateFixture` and reload. Verify:

- Fuel panel shows warning visual (fuelLevel: 8%)
- Battery panel shows warning visual (batteryVoltage: 11.2V)
- Door lock panel shows Unlocked visual
- Oil panel shows "Low" state
