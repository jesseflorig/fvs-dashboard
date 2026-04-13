# Contract: VehicleService

**Feature**: 001-initial-dashboard
**Type**: TypeScript service interface (internal, frontend-only)
**Date**: 2026-04-11

## Overview

The `VehicleService` is the sole data access boundary in the application. All components
MUST call through this interface. The stub implementation returns static fixture data.
Future implementations may replace it with HTTP calls without changing any component.

## Interface

```typescript
interface VehicleService {
  /**
   * Returns the current vehicle snapshot (status + location).
   * Resolves with null fields for any unavailable metric.
   * Never rejects — returns a partial snapshot with nulls on error.
   */
  getSnapshot(): Promise<VehicleSnapshot>;
}
```

## Types (defined in src/types/vehicle.ts)

```typescript
type OilLevelState = "OK" | "Low" | "Check";

interface VehicleStatus {
  fuelLevel:       number | null;   // % 0–100
  oilLevel:        OilLevelState | null;
  doorLocked:      boolean | null;
  batteryVoltage:  number | null;   // volts
  mileage:         number | null;   // miles
  interiorTemp:    number | null;   // °C
  exteriorTemp:    number | null;   // °C
}

interface VehicleLocation {
  latitude:  number;
  longitude: number;
  label:     string | null;
}

interface VehicleSnapshot {
  status:    VehicleStatus;
  location:  VehicleLocation | null;
  fetchedAt: string;               // ISO 8601
}

interface StatusThreshold {
  fuelWarningBelow:    number;     // default: 15
  batteryWarningBelow: number;     // default: 11.8
}
```

## Stub Implementation Contract

The stub MUST implement `VehicleService` and return a resolved `Promise<VehicleSnapshot>`
synchronously (i.e., `Promise.resolve(fixture)`). It MUST export a constant
`THRESHOLDS: StatusThreshold` alongside the service instance.

```typescript
// src/services/vehicleService.ts
export const vehicleService: VehicleService = {
  getSnapshot: () => Promise.resolve(normalStateFixture),
};

export const THRESHOLDS: StatusThreshold = {
  fuelWarningBelow: 15,
  batteryWarningBelow: 11.8,
};
```

## Consumption Rules

- Components MUST NOT import from `src/data/` directly.
- Components call `vehicleService.getSnapshot()` once on mount.
- No polling or subscription is implemented in this feature.
- The `THRESHOLDS` constant is imported alongside the service for computing warning states.
