'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useTranslation } from 'next-i18next/pages'
import { trackCallClick } from '@/lib/analytics'

interface CTAProps {
  variant?: 'light' | 'dark'
}

const ease = [0.16, 1, 0.3, 1] as const

export function CTA({ variant = 'dark' }: CTAProps) {
  const { t } = useTranslation('common')
  const phone = process.env.NEXT_PUBLIC_PHONE ?? '+15140000000'
  const isDark = variant === 'dark'

  return (
    <section className={`relative py-28 overflow-hidden ${isDark ? 'bg-zinc-950' : 'bg-silver-light'}`}>
      {isDark && (
        <>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[800px] h-[400px] bg-silver/[0.04] rounded-full blur-[150px] animate-glow-pulse" />
          </div>
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
        </>
      )}
      {!isDark && (
        <>
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-200/50 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-200/50 to-transparent" />
        </>
      )}

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease }}
        >
          <h2 className={`font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-5 tracking-tight ${isDark ? 'text-white' : 'text-black'}`}>
            {t('cta.title')}
          </h2>
          <p className={`text-lg mb-14 max-w-2xl mx-auto leading-relaxed ${isDark ? 'text-zinc-500' : 'text-zinc-500'}`}>
            {t('cta.subtitle')}
          </p>

          <div className="flex flex-col sm:flex-row gap-3.5 justify-center mb-14">
            <a
              href={`tel:${phone}`}
              onClick={() => trackCallClick('cta_section')}
              className={`inline-flex items-center justify-center gap-2.5 font-bold py-4 px-10 rounded-2xl text-base transition-all duration-500 ease-out-expo active:scale-[0.97] group relative overflow-hidden ${
                isDark
                  ? 'bg-white text-black shadow-elevated'
                  : 'bg-zinc-950 text-white shadow-elevated'
              }`}
            >
              <svg className="w-4 h-4 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span className="relative z-10">{t('cta.call')}</span>
              {isDark && (
                <span className="absolute inset-0 bg-gradient-to-r from-silver to-white opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              )}
            </a>
            <Link
              href="/contact"
              className={`inline-flex items-center justify-center font-bold py-4 px-10 rounded-2xl text-base transition-all duration-500 ease-out-expo border ${
                isDark
                  ? 'border-white/[0.1] text-white hover:bg-white/[0.05] hover:border-white/[0.2]'
                  : 'border-zinc-200 text-zinc-800 hover:bg-white hover:border-zinc-300 hover:shadow-card'
              }`}
            >
              {t('cta.form')}
            </Link>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm">
            {[t('cta.trust1'), t('cta.trust2'), t('cta.trust3')].map((trust) => (
              <span
                key={trust}
                className={`flex items-center gap-2 ${isDark ? 'text-zinc-600' : 'text-zinc-400'}`}
              >
                <svg className={`w-3.5 h-3.5 ${isDark ? 'text-silver/40' : 'text-zinc-300'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
                {trust}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
