import Map, { Marker } from 'react-map-gl/maplibre'
import type { VehicleLocation } from '../../types/vehicle'

const MAP_STYLE = 'https://tiles.openfreemap.org/styles/liberty'

function isValidCoordinate(lat: number, lng: number): boolean {
  return lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180
}

function VanPin() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 32"
      width="28"
      height="36"
      aria-hidden="true"
    >
      <path
        fill="#2970FF"
        stroke="#ffffff"
        strokeWidth="1.5"
        d="M12 1C7.86 1 4.5 4.36 4.5 8.5c0 6.19 7.5 15.5 7.5 15.5S19.5 14.69 19.5 8.5C19.5 4.36 16.14 1 12 1z"
      />
      <circle cx="12" cy="8.5" r="3" fill="#ffffff" />
    </svg>
  )
}

interface LocationPanelProps {
  location: VehicleLocation | null
}

export function LocationPanel({ location }: LocationPanelProps) {
  const isValid =
    location !== null && isValidCoordinate(location.latitude, location.longitude)

  if (!isValid) {
    return (
      <div className="h-full rounded-xl border border-gray-200 bg-gray-50 flex items-center justify-center">
        <span className="text-sm text-gray-400">Location unavailable</span>
      </div>
    )
  }

  return (
    <div className="h-full rounded-xl border border-gray-200 overflow-hidden">
      <Map
        initialViewState={{
          longitude: location.longitude,
          latitude: location.latitude,
          zoom: 16,
        }}
        style={{ width: '100%', height: '100%' }}
        mapStyle={MAP_STYLE}
      >
        <Marker
          longitude={location.longitude}
          latitude={location.latitude}
          anchor="bottom"
        >
          <VanPin />
        </Marker>
      </Map>
    </div>
  )
}
