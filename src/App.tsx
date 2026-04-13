import { useEffect, useState } from 'react'
import type { VehicleSnapshot } from './types/vehicle'
import { vehicleService } from './services/vehicleService'
import { FuelPanel } from './components/panels/FuelPanel'
import { OilPanel } from './components/panels/OilPanel'
import { DoorLockPanel } from './components/panels/DoorLockPanel'
import { BatteryPanel } from './components/panels/BatteryPanel'
import { MileagePanel } from './components/panels/MileagePanel'
import { TemperaturePanel } from './components/panels/TemperaturePanel'
import { LocationPanel } from './components/panels/LocationPanel'

export function App() {
  const [snapshot, setSnapshot] = useState<VehicleSnapshot | null>(null)

  useEffect(() => {
    vehicleService.getSnapshot().then(setSnapshot)
  }, [])

  if (!snapshot) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <span className="text-sm text-gray-400">Loading…</span>
      </div>
    )
  }

  const { status, location } = snapshot

  return (
    <div className="h-screen overflow-hidden bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 shrink-0">
        <div className="flex items-center gap-3">
          <h1 className="text-lg font-semibold text-gray-900">Fleet 1</h1>
        </div>
      </header>

      {/* Dashboard — fills remaining viewport height */}
      <main className="flex-1 flex flex-col gap-4 p-6 min-h-0">
        {/* Row 1: Fuel, Oil, Battery, Door Lock */}
        <div className="grid grid-cols-4 gap-4 shrink-0">
          <FuelPanel value={status.fuelLevel} />
          <OilPanel value={status.oilLevel} />
          <BatteryPanel value={status.batteryVoltage} />
          <DoorLockPanel locked={status.doorLocked} />
        </div>

        {/* Row 2: Mileage, Interior Temp, Exterior Temp */}
        <div className="grid grid-cols-4 gap-4 shrink-0">
          <MileagePanel value={status.mileage} />
          <TemperaturePanel label="Interior Temp" value={status.interiorTemp} />
          <TemperaturePanel label="Exterior Temp" value={status.exteriorTemp} />
        </div>

        {/* Row 3: Map — fills remaining space */}
        <div className="flex-1 min-h-0">
          <LocationPanel location={location} />
        </div>
      </main>
    </div>
  )
}
