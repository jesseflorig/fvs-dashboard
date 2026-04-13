import type { VehicleSnapshot, StatusThreshold } from '../types/vehicle'
import { normalStateFixture } from '../data/fixtures'

interface VehicleService {
  getSnapshot(): Promise<VehicleSnapshot>
}

export const vehicleService: VehicleService = {
  getSnapshot: () => Promise.resolve(normalStateFixture),
}

export const THRESHOLDS: StatusThreshold = {
  fuelWarningBelow: 15,
  batteryWarningBelow: 11.8,
}
