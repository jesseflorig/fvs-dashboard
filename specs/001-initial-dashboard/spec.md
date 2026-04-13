# Feature Specification: Initial Vehicle Status Dashboard

**Feature Branch**: `001-initial-dashboard`
**Created**: 2026-04-11
**Status**: Draft
**Input**: User description: "Build an initial dashboard with the following information: fuel level, oil level, door lock state, current location (map), battery, mileage, interior temperature, exterior temperature"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - View Full Vehicle Status at a Glance (Priority: P1)

As a camper van owner, I want to open the dashboard and immediately see all key vehicle
status indicators in one view, so I can quickly assess the state of my van without
navigating between screens.

**Why this priority**: This is the core value of the dashboard. Every other story depends
on this foundational layout being in place.

**Independent Test**: Load the dashboard in a browser. All 8 status panels (fuel, oil,
door lock, battery, mileage, interior temp, exterior temp, and map) are visible and
populated with data. No navigation required to see any panel.

**Acceptance Scenarios**:

1. **Given** the dashboard is loaded, **When** the page finishes rendering, **Then** all
   8 status panels are visible on screen simultaneously.
2. **Given** all panels are visible, **When** a user reads each panel, **Then** each
   panel displays a clear label, a current value, and a unit of measure where applicable.
3. **Given** the dashboard is loaded with stub data, **When** a user views any panel,
   **Then** the displayed value matches the corresponding value in the stub data source.

---

### User Story 2 - Identify Vehicle Location on Map (Priority: P2)

As a camper van owner, I want to see a map showing my van's current position, so I can
confirm where the vehicle is parked or traveling.

**Why this priority**: Location context enriches the dashboard but is a distinct
interaction — a user can derive value from the status panels even if the map is not
present.

**Independent Test**: Load the dashboard. The map panel renders a map with a pin or marker
at the vehicle's current location (from stub data coordinates). The map is interactive
(pan/zoom).

**Acceptance Scenarios**:

1. **Given** the dashboard is loaded, **When** the map panel renders, **Then** a map
   is displayed with a visible location marker at the stub coordinates.
2. **Given** the map is rendered, **When** a user pans or zooms, **Then** the map
   responds interactively without requiring a page reload.
3. **Given** valid coordinates exist in the data source, **When** the map loads,
   **Then** the marker is positioned at those exact coordinates.

---

### User Story 3 - Recognize Critical Status at a Glance (Priority: P3)

As a camper van owner, I want status panels for fuel, battery, and door lock to use
visual cues (color or icon) to communicate whether a value is normal, low/warning, or
critical, so I can identify issues without reading every number.

**Why this priority**: Adds interpretive signal on top of raw values. The dashboard is
fully functional without this, but it meaningfully improves usability.

**Independent Test**: Set stub data to a low fuel value (e.g., 10%) and a critical
battery value. Load the dashboard. The fuel panel and battery panel show a distinct
visual state (e.g., amber/red color) compared to panels with normal values.

**Acceptance Scenarios**:

1. **Given** fuel level is below 15%, **When** the fuel panel renders, **Then** it
   displays a warning visual state (distinct from normal).
2. **Given** battery voltage is below threshold, **When** the battery panel renders,
   **Then** it displays a warning visual state.
3. **Given** door lock state is unlocked, **When** the door lock panel renders,
   **Then** it displays an unlocked visual indicator distinct from the locked state.
4. **Given** all values are within normal ranges, **When** the dashboard renders,
   **Then** all panels display their default (non-warning) visual state.

---

### Edge Cases

- What happens when a stub data field is missing or null? Each panel should display a
  "—" placeholder rather than crashing or showing undefined.
- What happens when coordinates in stub data are invalid (0,0 or out of range)? The map
  panel should show a fallback message rather than an incorrect location.
- What happens when the viewport is narrower than the full dashboard layout? Panels
  should reflow gracefully rather than overflow or overlap.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Dashboard MUST display fuel level as a percentage (0–100%) with a visual
  level indicator.
- **FR-002**: Dashboard MUST display oil level with a qualitative state (e.g., OK, Low,
  Check) derived from a value in the data source.
- **FR-003**: Dashboard MUST display door lock state as a binary indicator: Locked or
  Unlocked.
- **FR-004**: Dashboard MUST display vehicle battery voltage with a numeric value and
  unit (volts).
- **FR-005**: Dashboard MUST display total mileage as a numeric value with unit (miles).
- **FR-006**: Dashboard MUST display interior temperature with a numeric value and
  degree unit (°C).
- **FR-007**: Dashboard MUST display exterior temperature with a numeric value and
  degree unit (°C).
- **FR-008**: Dashboard MUST display a map panel showing the vehicle's current position
  with a location marker, based on coordinates from the data source.
- **FR-009**: All data displayed MUST be sourced through the application's data service
  layer backed by static stub data.
- **FR-010**: Fuel level and battery panels MUST apply a warning visual state when
  values fall below defined thresholds (fuel < 15%, battery < 11.8V).
- **FR-011**: Door lock panel MUST apply a distinct visual state for Unlocked vs Locked.
- **FR-012**: Any panel whose data value is null or missing MUST display a "—"
  placeholder without errors.

### Key Entities

- **VehicleStatus**: Represents the current snapshot of all vehicle metrics. Attributes:
  fuel level (%), oil level (qualitative state), door lock state (boolean), battery
  voltage (V), mileage (miles), interior temperature (°C), exterior temperature (°C).
- **VehicleLocation**: Represents the vehicle's position. Attributes: latitude,
  longitude, optional label string.
- **StatusThreshold**: Defines the boundary values that trigger warning visual states
  for a given metric (e.g., fuelWarningBelow: 15, batteryWarningBelow: 11.8).

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: All 8 status panels are visible simultaneously on a 1280×800 desktop
  viewport without scrolling or navigating between views.
- **SC-002**: The dashboard loads and displays all panels with stub data within 3 seconds
  on a standard broadband connection.
- **SC-003**: A first-time user can correctly identify the current state of any single
  panel (e.g., "fuel is low") within 5 seconds of viewing it.
- **SC-004**: The map panel renders and places the vehicle location marker within 3
  seconds of page load.
- **SC-005**: 100% of stub data fields are reflected accurately in their corresponding
  panels with no value transformation errors.

## Assumptions

- The dashboard is a read-only display; no user input or data editing is in scope.
- "Battery" refers to the vehicle starter battery, expressed as voltage (e.g., 12.6V).
  Leisure/house battery monitoring is out of scope for this feature.
- Temperatures are displayed in Celsius. Unit switching (°C/°F) is out of scope.
- Mileage is displayed in miles. Unit switching (miles/km) is out of scope.
- "Door lock state" represents a single, combined vehicle lock status (all doors).
  Per-door states are out of scope.
- The map uses a publicly available tile service accessible from the self-hosted
  environment; no API key management is in scope for this feature.
- The primary target display is a desktop browser at 1280px or wider. Mobile layout
  is out of scope.
- No authentication or login is required to access the dashboard.
- Real-time data updates (WebSocket, polling) are out of scope; stub data is loaded
  once on page load.
