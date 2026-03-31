'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useTranslation } from 'next-i18next/pages'
import { trackCallClick } from '@/lib/analytics'

interface HeroProps {
  serviceOverride?: string
}

const ease = [0.16, 1, 0.3, 1] as const

export function Hero({ serviceOverride }: HeroProps) {
  const { t } = useTranslation('common')
  const phone = process.env.NEXT_PUBLIC_PHONE ?? '+15140000000'

  const headline = serviceOverride
    ? t(`services.${serviceOverride}.hero_problem`)
    : t('hero.headline')
  const subline = serviceOverride
    ? t(`services.${serviceOverride}.hero_solution`)
    : t('hero.subline')

  return (
    <section className="relative min-h-[100vh] flex items-center overflow-hidden bg-zinc-950">
      {/* Background image with ken burns */}
      <div className="absolute inset-0">
        <motion.div
          initial={{ scale: 1.15 }}
          animate={{ scale: 1 }}
          transition={{ duration: 20, ease: 'linear' }}
          className="absolute inset-0"
        >
          <Image
            src="/images/ai-hero-home.jpg"
            alt="B&T Quality Construction"
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-40"
          />
        </motion.div>

        {/* Premium multi-layer gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-zinc-950/60" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,transparent_40%,rgba(0,0,0,0.7))]" />
      </div>

      {/* Ambient glow orbs */}
      <div className="absolute top-1/4 left-[15%] w-[600px] h-[600px] bg-silver/[0.03] rounded-full blur-[160px] animate-glow-pulse pointer-events-none" />
      <div className="absolute bottom-1/4 right-[10%] w-[500px] h-[500px] bg-white/[0.02] rounded-full blur-[140px] animate-glow-pulse pointer-events-none" style={{ animationDelay: '2.5s' }} />

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-40 lg:py-48">
        <div className="max-w-3xl">
          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease }}
            className="flex flex-wrap gap-2.5 mb-10"
          >
            {[t('hero.badge_rbq'), t('hero.badge_warranty'), t('hero.badge_projects')].map((badge, i) => (
              <motion.span
                key={badge}
                initial={{ opacity: 0, scale: 0.9, filter: 'blur(4px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.1, ease }}
                className="inline-flex items-center gap-2 bg-white/[0.04] border border-white/[0.08] text-white/50 text-xs font-medium px-4 py-2 rounded-full backdrop-blur-sm"
              >
                <span className="w-1 h-1 rounded-full bg-silver/50" />
                {badge}
              </motion.span>
            ))}
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease }}
            className="font-heading text-4xl sm:text-5xl lg:text-6xl xl:text-[4.25rem] font-extrabold text-white leading-[1.05] mb-8 text-balance tracking-tight"
          >
            {headline}
          </motion.h1>

          {/* Subline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease }}
            className="text-lg sm:text-xl text-white/40 mb-14 leading-relaxed max-w-xl"
          >
            {subline}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7, ease }}
            className="flex flex-col sm:flex-row gap-3.5"
          >
            {/* Mobile primary: call */}
            <a
              href={`tel:${phone}`}
              onClick={() => trackCallClick('hero')}
              className="sm:hidden flex items-center justify-center gap-2.5 bg-white text-black font-bold py-4 px-8 rounded-2xl text-base active:scale-[0.97] shadow-elevated transition-transform duration-200"
            >
              <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              {t('hero.cta_call')}
            </a>
            {/* Desktop primary: form */}
            <Link
              href="#contact-form"
              className="hidden sm:inline-flex items-center justify-center bg-white text-black font-bold py-4 px-10 rounded-2xl text-base hover:shadow-glow transition-all duration-500 ease-out-expo active:scale-[0.97] shadow-elevated group relative overflow-hidden"
            >
              <span className="relative z-10">{t('hero.cta_form')}</span>
              <span className="absolute inset-0 bg-gradient-to-r from-silver to-white opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </Link>
            {/* Desktop secondary: call */}
            <a
              href={`tel:${phone}`}
              onClick={() => trackCallClick('hero')}
              className="hidden sm:inline-flex items-center justify-center gap-2.5 border border-white/[0.12] text-white font-semibold py-4 px-10 rounded-2xl text-base hover:bg-white/[0.06] hover:border-white/[0.25] transition-all duration-500 ease-out-expo"
            >
              <svg className="w-4 h-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              {t('hero.cta_call')}
            </a>
            {/* Mobile secondary: form */}
            <Link
              href="#contact-form"
              className="sm:hidden flex items-center justify-center border border-white/[0.12] text-white font-semibold py-4 px-8 rounded-2xl text-base hover:bg-white/[0.06] transition-all duration-300"
            >
              {t('hero.cta_form')}
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient fade into next section */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-silver-light to-transparent pointer-events-none" />

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1.5 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-5 h-9 rounded-full border border-white/15 flex items-start justify-center p-1.5"
        >
          <motion.div
            animate={{ height: ['6px', '12px', '6px'], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-0.5 bg-white/40 rounded-full"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
