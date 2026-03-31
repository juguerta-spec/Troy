'use client'

import { motion } from 'framer-motion'
import { useTranslation } from 'next-i18next/pages'
import { trackCallClick } from '@/lib/analytics'

const ease = [0.16, 1, 0.3, 1] as const

export function FloatingCTA() {
  const { t } = useTranslation('common')
  const phone = process.env.NEXT_PUBLIC_PHONE ?? '+15140000000'

  return (
    <motion.a
      href={`tel:${phone}`}
      onClick={() => trackCallClick('floating_cta')}
      aria-label={t('floating_cta')}
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 2, duration: 0.6, ease }}
      className="fixed bottom-6 right-6 z-50 md:hidden flex items-center gap-2.5 bg-zinc-950 text-white font-bold px-5 py-3.5 rounded-2xl shadow-elevated border border-white/[0.06] active:scale-95 transition-transform duration-200 text-sm"
    >
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400/60 opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
      </span>
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
      {t('floating_cta')}
    </motion.a>
  )
}
