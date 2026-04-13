import { StatusCard } from '../ui/StatusCard'
import { THRESHOLDS } from '../../services/vehicleService'

interface FuelPanelProps {
  value: number | null
}

export function FuelPanel({ value }: FuelPanelProps) {
  const isWarning = value !== null && value < THRESHOLDS.fuelWarningBelow
  const cardStatus = isWarning ? 'error' : 'normal'
  const fillColor = isWarning ? 'bg-error-500' : 'bg-primary-500'
  const displayValue = value !== null ? `${value}%` : '—'

  return (
    <StatusCard label="Fuel Level" status={cardStatus}>
      <span className={`text-2xl font-semibold ${isWarning ? 'text-error-700' : 'text-gray-900'}`}>
        {displayValue}
      </span>
      {value !== null && (
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all ${fillColor}`}
            style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
          />
        </div>
      )}
    </StatusCard>
  )
}
