'use client'

import { useState, useEffect } from 'react'
import { useTranslation } from 'next-i18next/pages'

const STORAGE_KEY = 'bt_announcement_dismissed'

export function AnnouncementBar() {
  const { t } = useTranslation('common')
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const dismissed = localStorage.getItem(STORAGE_KEY)
    if (!dismissed) setVisible(true)
  }, [])

  function dismiss() {
    localStorage.setItem(STORAGE_KEY, '1')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="relative z-50 bg-zinc-950 border-b border-white/6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-center gap-2 text-xs font-medium text-white/70 tracking-wide">
        <span className="w-1.5 h-1.5 rounded-full bg-silver/60 shrink-0" />
        <span>{t('announcement')}</span>
        <button
          onClick={dismiss}
          aria-label="Fermer"
          className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center text-white/40 hover:text-white/80 transition-colors rounded"
        >
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  )
}
