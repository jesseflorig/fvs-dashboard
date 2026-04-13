import { StatusCard } from '../ui/StatusCard'

interface TemperaturePanelProps {
  label: string
  value: number | null
}

export function TemperaturePanel({ label, value }: TemperaturePanelProps) {
  const displayValue = value !== null ? value.toString() : '—'

  return (
    <StatusCard label={label}>
      <div className="flex items-baseline gap-1">
        <span className="text-2xl font-semibold text-gray-900">{displayValue}</span>
        {value !== null && (
          <span className="text-sm font-medium text-gray-500">°C</span>
        )}
      </div>
    </StatusCard>
  )
}
