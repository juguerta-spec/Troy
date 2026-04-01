'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useTranslation } from 'next-i18next/pages'

const ease = [0.16, 1, 0.3, 1] as const

interface StatItem {
  value: string
  label: string
}

export function StatsBar() {
  const { t } = useTranslation('common')
  const items = t('stats_bar.items', { returnObjects: true }) as StatItem[]

  return (
    <section className="bg-zinc-950 border-t border-white/[0.04] py-16 sm:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.04] rounded-2xl overflow-hidden border border-white/[0.06]">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08, ease }}
              className="bg-zinc-950 px-4 sm:px-8 py-8 sm:py-10 flex flex-col items-center justify-center text-center gap-2"
            >
              <span className="font-heading text-3xl sm:text-4xl font-extrabold text-gold tracking-tight leading-none">
                {item.value}
              </span>
              <span className="text-white/40 text-sm font-medium tracking-wide uppercase">
                {item.label}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Google reviews row */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.35, ease }}
          className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          {/* Stars */}
          <div className="flex items-center gap-3">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-5 h-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-white font-bold text-lg">5.0</span>
            <span className="text-white/30 text-sm">Google Reviews</span>
          </div>

          {/* RBQ badge */}
          <div className="flex items-center gap-2 bg-white/[0.04] border border-white/[0.07] rounded-full px-5 py-2.5">
            <svg className="w-4 h-4 text-gold shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
            </svg>
            <span className="text-white/60 text-sm font-semibold">RBQ {t('site.rbq')}</span>
          </div>

          {/* CTA */}
          <Link
            href="/contact"
            className="bg-white text-zinc-950 font-extrabold text-sm px-7 py-3 rounded-xl hover:shadow-[0_0_30px_rgba(192,192,192,0.2)] transition-all duration-500"
          >
            {t('stats_bar.cta')}
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
