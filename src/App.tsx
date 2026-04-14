import { useEffect, useState } from 'react'
import type { VehicleSnapshot } from './types/vehicle'
import { vehicleService } from './services/vehicleService'
import { SAMPLE_LAYOUTS } from './data/grid-layouts'
import GridContainer from './components/layouts/GridContainer'
import PanelComponent from './components/panels/Panel'
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
  const layout = SAMPLE_LAYOUTS[0]

  // Map panel content IDs to actual components
  const panelContentMap: Record<string, JSX.Element> = {
    'fuel': <FuelPanel value={status.fuelLevel} />,
    'oil': <OilPanel value={status.oilLevel} />,
    'battery': <BatteryPanel value={status.batteryVoltage} />,
    'door-lock': <DoorLockPanel locked={status.doorLocked} />,
    'mileage': <MileagePanel value={status.mileage} />,
    'interiorTemp': <TemperaturePanel label="Interior Temp" value={status.interiorTemp} />,
    'exteriorTemp': <TemperaturePanel label="Outside Temp" value={status.exteriorTemp} />,
    'location': <LocationPanel location={location} />
  }

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
        <GridContainer layout={layout}>
          {layout.panels.map(panel => (
            <PanelComponent key={panel.id} panel={panel}>
              {panelContentMap[panel.contentId] || <div>Panel content not found</div>}
            </PanelComponent>
          ))}
        </GridContainer>
      </main>
    </div>
  )
}
