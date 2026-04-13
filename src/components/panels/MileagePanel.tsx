import { StatusCard } from '../ui/StatusCard'

interface MileagePanelProps {
  value: number | null
}

export function MileagePanel({ value }: MileagePanelProps) {
  const displayValue =
    value !== null ? value.toLocaleString('en-US') : '—'

  return (
    <StatusCard label="Mileage">
      <div className="flex items-baseline gap-1">
        <span className="text-2xl font-semibold text-gray-900">{displayValue}</span>
        {value !== null && (
          <span className="text-sm font-medium text-gray-500">mi</span>
        )}
      </div>
    </StatusCard>
  )
}
