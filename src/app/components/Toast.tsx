'use client'

import type { Toast, ToastType } from '@/hooks/useToast'

const COLOURS: Record<ToastType, string> = {
  success: 'bg-[#EAF3DE] text-[#27500A] border-[#c2dba8]',
  error: 'bg-[#fdf0ec] text-clay border-[#f5c9b9]',
  info: 'bg-cream text-text-body border-border',
}

const ICONS: Record<ToastType, string> = {
  success: '✓',
  error: '✕',
  info: 'ℹ',
}

export function ToastContainer({ toasts, onDismiss }: { toasts: Toast[]; onDismiss: (id: number) => void }) {
  if (toasts.length === 0) return null
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm w-full">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`flex items-start gap-3 px-4 py-3 border rounded-[14px] shadow-lg text-[14px] leading-snug ${COLOURS[t.type]}`}
        >
          <span className="font-bold text-[15px] mt-0.5 shrink-0">{ICONS[t.type]}</span>
          <span className="flex-1">{t.message}</span>
          <button
            onClick={() => onDismiss(t.id)}
            aria-label="Dismiss notification"
            className="text-[16px] opacity-50 hover:opacity-100 transition-opacity shrink-0"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  )
}
