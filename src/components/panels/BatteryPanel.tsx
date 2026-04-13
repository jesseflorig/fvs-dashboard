import { StatusCard } from '../ui/StatusCard'
import { THRESHOLDS } from '../../services/vehicleService'

interface BatteryPanelProps {
  value: number | null
}

export function BatteryPanel({ value }: BatteryPanelProps) {
  const isWarning = value !== null && value < THRESHOLDS.batteryWarningBelow
  const cardStatus = isWarning ? 'error' : 'normal'
  const displayValue = value !== null ? value.toFixed(1) : '—'

  return (
    <StatusCard label="Battery" status={cardStatus}>
      <div className="flex items-baseline gap-1">
        <span
          className={`text-2xl font-semibold ${isWarning ? 'text-error-700' : 'text-gray-900'}`}
        >
          {displayValue}
        </span>
        {value !== null && (
          <span className={`text-sm font-medium ${isWarning ? 'text-error-500' : 'text-gray-500'}`}>
            V
          </span>
        )}
      </div>
    </StatusCard>
  )
}
