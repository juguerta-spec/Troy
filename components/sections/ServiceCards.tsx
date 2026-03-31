'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useTranslation } from 'next-i18next/pages'

const services = [
  {
    key: 'gutters',
    logoFr: '/logos/logo-gutters.png',
    logoEn: '/logos/logo-gutters-en.png',
    href: '/services/gouttières-soffites-fascias',
    hrefEn: '/services/gutters-soffit-fascia',
    bg: '/images/ai-hero-gutters.jpg',
  },
  {
    key: 'siding',
    logoFr: '/logos/logo-siding.png',
    logoEn: '/logos/logo-siding-en.png',
    href: '/services/revetement',
    hrefEn: '/services/siding',
    bg: '/images/ai-hero-siding.jpg',
  },
  {
    key: 'roofing',
    logoFr: '/logos/logo-roofing.png',
    logoEn: '/logos/logo-roofing-en.png',
    href: '/services/toiture',
    hrefEn: '/services/roofing',
    bg: '/images/ai-hero-roofing.jpg',
  },
]

const ease = [0.16, 1, 0.3, 1] as const

export function ServiceCards() {
  const { t, i18n } = useTranslation('common')
  const isFr = i18n.language !== 'en'

  return (
    <section className="py-32 bg-silver-light relative overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-200/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease }}
          className="text-center mb-20"
        >
          <p className="text-silver-dark text-xs font-semibold uppercase tracking-[0.2em] mb-4">
            {t('services.subtitle')}
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-black tracking-tight">
            {t('services.title')}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
          {services.map((svc, i) => (
            <motion.div
              key={svc.key}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.7, delay: i * 0.12, ease }}
            >
              <Link
                href={isFr ? svc.href : svc.hrefEn}
                className="group block rounded-3xl overflow-hidden bg-zinc-950 shadow-premium hover:shadow-premium-hover transition-all duration-700 ease-out-expo hover:-translate-y-3"
              >
                {/* Image area */}
                <div className="relative h-72 overflow-hidden">
                  <Image
                    src={svc.bg}
                    alt={t(`services.${svc.key}.name`)}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-1000 ease-out-expo group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-700" />

                  {/* Logo transparent */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-48 h-32 flex items-center justify-center">
                      <Image
                        src={isFr ? svc.logoFr : svc.logoEn}
                        alt={t(`services.${svc.key}.name`)}
                        width={300}
                        height={200}
                        className="object-contain w-full h-full transition-transform duration-700 ease-out-expo group-hover:scale-110 drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)]"
                      />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="px-7 py-7 relative">
                  <div className="absolute top-0 left-7 right-7 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />

                  <h3 className="font-heading text-lg font-bold text-white mb-2.5 group-hover:text-gradient-silver transition-colors duration-300">
                    {t(`services.${svc.key}.name`)}
                  </h3>
                  <p className="text-zinc-500 text-sm mb-6 line-clamp-2 leading-relaxed group-hover:text-zinc-400 transition-colors duration-500">
                    {t(`services.${svc.key}.description`)}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-silver/40 text-xs font-medium flex items-center gap-1.5">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                      </svg>
                      {t('services.warranty_label')}
                    </span>
                    <span className="text-white/30 text-sm font-medium group-hover:text-white/80 transition-all duration-500 flex items-center gap-1.5">
                      {t('services.learn_more')}
                      <svg className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-500 ease-out-expo" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
