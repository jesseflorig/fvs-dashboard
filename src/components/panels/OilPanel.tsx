import type { OilLevelState } from '../../types/vehicle'
import { StatusCard } from '../ui/StatusCard'

interface OilPanelProps {
  value: OilLevelState | null
}

type CardStatus = 'normal' | 'warning' | 'error'

const oilCardStatus: Record<OilLevelState, CardStatus> = {
  OK: 'normal',
  Low: 'warning',
  Check: 'error',
}

const oilValueStyle: Record<OilLevelState, string> = {
  OK: 'text-gray-900',
  Low: 'text-warning-700',
  Check: 'text-error-700',
}

export function OilPanel({ value }: OilPanelProps) {
  const cardStatus: CardStatus = value ? oilCardStatus[value] : 'normal'
  const valueStyle = value ? oilValueStyle[value] : 'text-gray-400'
  const displayValue = value ?? '—'

  return (
    <StatusCard label="Oil Level" status={cardStatus}>
      <span className={`text-2xl font-semibold ${valueStyle}`}>{displayValue}</span>
    </StatusCard>
  )
}
