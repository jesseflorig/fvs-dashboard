interface StatusCardProps {
  label: string
  children: React.ReactNode
  status?: 'normal' | 'warning' | 'error'
  className?: string
}

const statusStyles: Record<NonNullable<StatusCardProps['status']>, string> = {
  normal: 'bg-white border-gray-200',
  warning: 'bg-warning-50 border-warning-200',
  error: 'bg-error-50 border-error-200',
}

const labelStyles: Record<NonNullable<StatusCardProps['status']>, string> = {
  normal: 'text-gray-500',
  warning: 'text-warning-700',
  error: 'text-error-700',
}

export function StatusCard({
  label,
  children,
  status = 'normal',
  className = '',
}: StatusCardProps) {
  return (
    <div
      className={`rounded-xl border p-4 flex flex-col gap-2 ${statusStyles[status]} ${className}`}
    >
      <span className={`text-xs font-medium uppercase tracking-wide ${labelStyles[status]}`}>
        {label}
      </span>
      {children}
    </div>
  )
}
