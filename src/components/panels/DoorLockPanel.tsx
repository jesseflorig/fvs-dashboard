import { StatusCard } from '../ui/StatusCard'

interface DoorLockPanelProps {
  locked: boolean | null
}

function LockClosedIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
    </svg>
  )
}

function LockOpenIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M18 1c-2.76 0-5 2.24-5 5v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2h-1V6c0-1.66 1.34-3 3-3s3 1.34 3 3v2h2V6c0-2.76-2.24-5-5-5zm-6 15c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" />
    </svg>
  )
}

export function DoorLockPanel({ locked }: DoorLockPanelProps) {
  if (locked === null) {
    return (
      <StatusCard label="Door Lock">
        <span className="text-2xl font-semibold text-gray-400">—</span>
      </StatusCard>
    )
  }

  return (
    <StatusCard label="Door Lock" status={locked ? 'normal' : 'warning'}>
      <div className="flex items-center gap-2">
        {locked ? (
          <LockClosedIcon className="w-6 h-6 text-success-600" />
        ) : (
          <LockOpenIcon className="w-6 h-6 text-warning-600" />
        )}
        <span
          className={`text-2xl font-semibold ${locked ? 'text-gray-900' : 'text-warning-700'}`}
        >
          {locked ? 'Locked' : 'Unlocked'}
        </span>
      </div>
    </StatusCard>
  )
}
