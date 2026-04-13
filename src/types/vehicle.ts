export type OilLevelState = 'OK' | 'Low' | 'Check'

export interface VehicleStatus {
  fuelLevel: number | null       // percentage 0–100
  oilLevel: OilLevelState | null
  doorLocked: boolean | null
  batteryVoltage: number | null  // volts
  mileage: number | null         // miles
  interiorTemp: number | null    // °C
  exteriorTemp: number | null    // °C
}

export interface VehicleLocation {
  latitude: number
  longitude: number
  label: string | null
}

export interface VehicleSnapshot {
  status: VehicleStatus
  location: VehicleLocation | null
  fetchedAt: string              // ISO 8601
}

export interface StatusThreshold {
  fuelWarningBelow: number       // default: 15 (%)
  batteryWarningBelow: number    // default: 11.8 (V)
}
