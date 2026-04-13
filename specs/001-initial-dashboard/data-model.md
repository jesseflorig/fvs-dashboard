# Data Model: Initial Vehicle Status Dashboard

**Feature**: 001-initial-dashboard
**Date**: 2026-04-11

## Entities

### VehicleStatus

The current snapshot of all measurable vehicle metrics.

| Field | Type | Unit | Notes |
|-------|------|------|-------|
| `fuelLevel` | `number` | % (0–100) | Warning threshold: < 15 |
| `oilLevel` | `OilLevelState` | enum | Derived qualitative state |
| `doorLocked` | `boolean` | — | true = Locked, false = Unlocked |
| `batteryVoltage` | `number` | V | Warning threshold: < 11.8 |
| `mileage` | `number` | miles | Odometer reading, non-negative |
| `interiorTemp` | `number` | °C | Can be negative |
| `exteriorTemp` | `number` | °C | Can be negative |

**Nullable policy**: Any field may be `null` when data is unavailable. The UI renders "—"
for null fields (FR-012).

### OilLevelState

Qualitative oil level derived from a raw sensor value.

```
enum OilLevelState {
  OK = "OK",
  LOW = "Low",
  CHECK = "Check"
}
```

### VehicleLocation

The vehicle's current geographic position.

| Field | Type | Notes |
|-------|------|-------|
| `latitude` | `number` | WGS84 decimal degrees |
| `longitude` | `number` | WGS84 decimal degrees |
| `label` | `string \| null` | Optional human-readable place name |

**Validity rule**: latitude must be in [-90, 90], longitude in [-180, 180]. If coordinates
are invalid or null, the map panel renders a "Location unavailable" fallback.

### StatusThreshold

Static configuration defining the boundaries that trigger warning visual states. Not
persisted; defined as a constant in the data layer.

| Field | Type | Default |
|-------|------|---------|
| `fuelWarningBelow` | `number` | 15 (%) |
| `batteryWarningBelow` | `number` | 11.8 (V) |

### VehicleSnapshot

Top-level aggregate returned by the service layer — combines status and location into
a single fetch.

| Field | Type |
|-------|------|
| `status` | `VehicleStatus` |
| `location` | `VehicleLocation` |
| `fetchedAt` | `string` (ISO 8601) |

## State Transitions

### Door Lock Panel

```
Locked (doorLocked: true)  ⟷  Unlocked (doorLocked: false)
```

Display only; no user interaction in this feature.

### Warning States (Fuel, Battery)

```
Normal  →  Warning
  fuelLevel >= 15          →  fuelLevel < 15
  batteryVoltage >= 11.8V  →  batteryVoltage < 11.8V
```

Visual state is computed at render time from the live value vs. threshold. No persisted
state machine required.

## Stub Data Contract

The static fixture MUST provide a complete `VehicleSnapshot` with all fields populated.
One stub scenario for normal state and one for warning state SHOULD be provided to
support visual verification of both display modes.

**Normal state stub** (all values within thresholds):
```
fuelLevel: 72, oilLevel: OK, doorLocked: true,
batteryVoltage: 12.6, mileage: 48320,
interiorTemp: 21, exteriorTemp: 14,
location: { latitude: 40.7128, longitude: -74.0060, label: "New York, NY" }
```

**Warning state stub** (fuel and battery below threshold, door unlocked):
```
fuelLevel: 8, oilLevel: LOW, doorLocked: false,
batteryVoltage: 11.2, mileage: 48320,
interiorTemp: 19, exteriorTemp: 9,
location: { latitude: 40.7128, longitude: -74.0060, label: "New York, NY" }
```
