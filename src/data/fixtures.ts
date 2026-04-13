import type { VehicleSnapshot } from '../types/vehicle'

export const normalStateFixture: VehicleSnapshot = {
  status: {
    fuelLevel: 72,
    oilLevel: 'OK',
    doorLocked: true,
    batteryVoltage: 12.6,
    mileage: 48320,
    interiorTemp: 21,
    exteriorTemp: 14,
  },
  location: {
    latitude: 38.91001, 
    longitude: -77.03086,
    label: '1511 Kingman Pl NW',
  },
  fetchedAt: new Date().toISOString(),
}

export const warningStateFixture: VehicleSnapshot = {
  status: {
    fuelLevel: 8,
    oilLevel: 'Low',
    doorLocked: false,
    batteryVoltage: 11.2,
    mileage: 48320,
    interiorTemp: 19,
    exteriorTemp: 9,
  },
  location: {
    latitude: 38.91001, 
    longitude: -77.03086,
    label: '1511 Kingman Pl NW',
  },
  fetchedAt: new Date().toISOString(),
}
