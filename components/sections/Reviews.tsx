'use client'

import { motion } from 'framer-motion'
import { useTranslation } from 'next-i18next/pages'

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i < count ? 'text-amber-400' : 'text-zinc-200'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

const ease = [0.16, 1, 0.3, 1] as const

export function Reviews() {
  const { t } = useTranslation('common')
  const items = t('reviews.items', { returnObjects: true }) as Array<{
    name: string
    location: string
    text: string
    rating: number
  }>

  return (
    <section className="py-32 bg-white relative overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-100 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-silver/[0.03] rounded-full blur-[200px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease }}
          className="text-center mb-20"
        >
          <p className="text-silver-dark text-xs font-semibold uppercase tracking-[0.2em] mb-4">
            {t('reviews.subtitle')}
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-black tracking-tight">
            {t('reviews.title')}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((review, i) => {
            const initials = review.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: i * 0.1, ease }}
                className="group relative bg-white border border-zinc-100/80 rounded-3xl p-8 shadow-card hover:shadow-premium transition-all duration-700 ease-out-expo hover:-translate-y-1"
              >
                {/* Top accent line */}
                <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-zinc-100 to-transparent group-hover:via-silver/30 transition-colors duration-700" />

                <div className="relative">
                  <Stars count={review.rating} />

                  <p className="text-zinc-600 mt-6 mb-8 text-[0.9375rem] leading-[1.75] font-light">
                    &ldquo;{review.text}&rdquo;
                  </p>

                  <div className="flex items-center gap-3.5 pt-6 border-t border-zinc-50">
                    <div className="w-10 h-10 rounded-full bg-zinc-950 text-white text-[0.6875rem] font-bold flex items-center justify-center shrink-0">
                      {initials}
                    </div>
                    <div>
                      <p className="font-semibold text-black text-sm leading-tight">{review.name}</p>
                      <p className="text-zinc-400 text-xs mt-0.5">{review.location}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
