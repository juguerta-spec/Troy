import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { serverSideTranslations } from 'next-i18next/pages/serverSideTranslations'
import { useTranslation } from 'next-i18next/pages'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { FAQ } from '@/components/sections/FAQ'
import { CTA } from '@/components/sections/CTA'
import { FloatingCTA } from '@/components/ui/FloatingCTA'
import { ChatWidget } from '@/components/chat/ChatWidget'
import { trackCallClick } from '@/lib/analytics'

interface Props {
  serviceKey: string
}

const logoMapFr: Record<string, string> = {
  gutters: '/logos/logo-gutters.png',
  siding: '/logos/logo-siding.png',
  roofing: '/logos/logo-roofing.png',
}
const logoMapEn: Record<string, string> = {
  gutters: '/logos/logo-gutters-en.png',
  siding: '/logos/logo-siding-en.png',
  roofing: '/logos/logo-roofing-en.png',
}

const bgMap: Record<string, string> = {
  gutters: '/images/ai-hero-gutters.jpg',
  siding: '/images/ai-hero-siding.jpg',
  roofing: '/images/ai-hero-roofing.jpg',
}

// Section images — fallback to project images if Gemini images not yet generated
const sectionImgMap: Record<string, { install: string; detail: string; extra: string }> = {
  gutters: {
    install: '/images/service-gutters-install.jpg',
    detail: '/images/service-gutters-closeup.jpg',
    extra: '/images/service-gutters-damage.jpg',
  },
  siding: {
    install: '/images/service-siding-install.jpg',
    detail: '/images/service-siding-modern.jpg',
    extra: '/images/service-siding-materials.jpg',
  },
  roofing: {
    install: '/images/service-roofing-install.jpg',
    detail: '/images/service-roofing-closeup.jpg',
    extra: '/images/service-roofing-aerial.jpg',
  },
}

const metaKeyMap: Record<string, string> = {
  gutters: 'gutters',
  siding: 'siding',
  roofing: 'roofing',
}

const ease = [0.16, 1, 0.3, 1] as const

const ServicePage: NextPage<Props> = ({ serviceKey }) => {
  const { t, i18n } = useTranslation('common')
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://btqualityconstruction.com'
  const phone = process.env.NEXT_PUBLIC_PHONE ?? '+15140000000'
  const locale = i18n.language
  const isFr = locale !== 'en'
  const logoMap = isFr ? logoMapFr : logoMapEn
  const metaKey = metaKeyMap[serviceKey] ?? 'home'

  const benefits = t(`services.${serviceKey}.benefits`, { returnObjects: true }) as string[]
  const steps = t(`services.${serviceKey}.steps`, { returnObjects: true }) as Array<{ title: string; desc: string }>
  const faqItems = t(`services.${serviceKey}.faq`, { returnObjects: true }) as Array<{ q: string; a: string }>
  const stats = t(`services.${serviceKey}.stats`, { returnObjects: true }) as Array<{ value: string; label: string }>
  const materials = t(`services.${serviceKey}.materials`, { returnObjects: true }) as Array<{ name: string; desc: string }>
  const testimonial = t(`services.${serviceKey}.testimonial`, { returnObjects: true }) as { text: string; name: string; location: string; service: string }
  const sectionImgs = sectionImgMap[serviceKey]

  const slugFr = serviceKey === 'gutters' ? 'gouttières-soffites-fascias' : serviceKey === 'siding' ? 'revetement' : 'toiture'
  const slugEn = serviceKey === 'gutters' ? 'gutters-soffit-fascia' : serviceKey === 'siding' ? 'siding' : 'roofing'

  return (
    <>
      <Head>
        <title>{t(`meta.${metaKey}.title`)}</title>
        <meta name="description" content={t(`meta.${metaKey}.description`)} />
        <meta property="og:title" content={t(`meta.${metaKey}.title`)} />
        <meta property="og:description" content={t(`meta.${metaKey}.description`)} />
        <meta property="og:image" content={`${siteUrl}${bgMap[serviceKey]}`} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${siteUrl}/services/${locale === 'en' ? slugEn : slugFr}`} />
        <link rel="canonical" href={`${siteUrl}/services/${locale === 'en' ? slugEn : slugFr}`} />
        <link rel="alternate" hrefLang="fr" href={`${siteUrl}/services/${slugFr}`} />
        <link rel="alternate" hrefLang="en" href={`${siteUrl}/en/services/${slugEn}`} />
        <link rel="alternate" hrefLang="x-default" href={`${siteUrl}/services/${slugFr}`} />
        <meta name="robots" content="index, follow" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Service',
              name: t(`services.${serviceKey}.name`),
              description: t(`services.${serviceKey}.description`),
              url: `${siteUrl}/services/${locale === 'en' ? slugEn : slugFr}`,
              image: `${siteUrl}${bgMap[serviceKey]}`,
              provider: {
                '@type': 'LocalBusiness',
                name: 'B&T Quality Construction',
                telephone: process.env.NEXT_PUBLIC_PHONE,
                email: 'B.TQualityConstruction@Gmail.com',
                url: siteUrl,
              },
              areaServed: [
                { '@type': 'Province', name: 'Quebec' },
                { '@type': 'Province', name: 'Ontario' },
              ],
              hasOfferCatalog: {
                '@type': 'OfferCatalog',
                name: t(`services.${serviceKey}.name`),
                itemListElement: [{
                  '@type': 'Offer',
                  itemOffered: { '@type': 'Service', name: t(`services.${serviceKey}.name`) },
                }],
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: faqItems.map((item) => ({
                '@type': 'Question',
                name: item.q,
                acceptedAnswer: { '@type': 'Answer', text: item.a },
              })),
            }),
          }}
        />
      </Head>
      <Navbar />

      <main className="pt-20">

        {/* ─── HERO ──────────────────────────────────────────────── */}
        <section className="relative bg-zinc-950 text-white min-h-[80vh] flex items-center overflow-hidden">
          <div className="absolute inset-0">
            <motion.div
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 15, ease: 'linear' }}
              className="absolute inset-0"
            >
              <Image
                src={bgMap[serviceKey] ?? '/images/project1.jpg'}
                alt={t(`services.${serviceKey}.name`)}
                fill
                priority
                sizes="100vw"
                className="object-cover opacity-35"
              />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black/20" />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-zinc-950/50" />
          </div>
          <div className="absolute top-1/3 left-[20%] w-[500px] h-[500px] bg-silver/[0.03] rounded-full blur-[140px] pointer-events-none" />

          <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease }}
            >
              <div className="mb-8 w-36 h-20 sm:w-56 sm:h-32 flex items-center">
                <Image
                  src={logoMap[serviceKey] ?? '/logos/logo-main.png'}
                  alt={t(`services.${serviceKey}.name`)}
                  width={400}
                  height={250}
                  className="object-contain w-full h-full drop-shadow-[0_2px_16px_rgba(0,0,0,0.6)]"
                />
              </div>
              {/* SEO H1 — keyword-rich, readable size */}
              <h1 className="font-heading text-xl sm:text-2xl font-semibold text-white/60 mb-4 tracking-tight leading-snug max-w-2xl">
                {t(`services.${serviceKey}.hero_h1`)}
              </h1>
              {/* Emotional hook — large display text */}
              <p className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-5 leading-[1.1] text-balance tracking-tight max-w-3xl">
                {t(`services.${serviceKey}.hero_problem`)}
              </p>
              <p className="text-base text-white/45 mb-12 max-w-xl leading-relaxed">
                {t(`services.${serviceKey}.hero_solution`)}
              </p>
              <div className="flex flex-col sm:flex-row gap-3.5">
                <a
                  href={`tel:${phone}`}
                  onClick={() => trackCallClick(`service_${serviceKey}_hero`)}
                  className="inline-flex items-center justify-center gap-2.5 bg-white text-black font-bold py-4 px-10 rounded-2xl text-base hover:shadow-glow transition-all duration-500 ease-out-expo shadow-elevated text-center group relative overflow-hidden"
                >
                  <svg className="w-4 h-4 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="relative z-10">{t('hero.cta_call')}</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-silver to-white opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center border border-white/[0.1] text-white font-semibold py-4 px-10 rounded-2xl text-base hover:bg-white/[0.05] hover:border-white/[0.2] transition-all duration-500 ease-out-expo text-center"
                >
                  {t('hero.cta_form')}
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ─── STATS BAND ─────────────────────────────────────────── */}
        <section className="bg-zinc-950 border-t border-white/[0.04]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08, ease }}
                  className="text-center"
                >
                  <p className="font-heading text-3xl sm:text-4xl font-extrabold text-white mb-1 tracking-tight">{stat.value}</p>
                  <p className="text-zinc-500 text-xs font-semibold uppercase tracking-[0.12em]">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── INTRO + INSTALL IMAGE ──────────────────────────────── */}
        <section className="py-28 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease }}
              >
                <p className="text-silver-dark text-xs font-semibold uppercase tracking-[0.2em] mb-4">{t('services.intro_label')}</p>
                <h2 className="font-heading text-3xl sm:text-4xl font-bold text-black mb-6 tracking-tight">
                  {t(`services.${serviceKey}.name`)}
                </h2>
                <p className="text-zinc-500 leading-[1.85] text-[0.9375rem]">
                  {t(`services.${serviceKey}.intro`)}
                </p>
                <div className="mt-8 flex gap-3">
                  <a
                    href={`tel:${phone}`}
                    onClick={() => trackCallClick(`service_${serviceKey}_intro`)}
                    className="inline-flex items-center gap-2 bg-zinc-950 text-white font-bold py-3.5 px-7 rounded-2xl text-sm hover:bg-zinc-800 transition-all duration-300 shadow-elevated"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    {t('hero.cta_call')}
                  </a>
                  <Link
                    href="/contact"
                    className="inline-flex items-center border border-zinc-200 text-zinc-700 font-semibold py-3.5 px-7 rounded-2xl text-sm hover:border-zinc-400 hover:bg-zinc-50 transition-all duration-300"
                  >
                    {t('hero.cta_form')}
                  </Link>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease }}
                className="relative h-80 lg:h-[440px] rounded-3xl overflow-hidden shadow-premium"
              >
                <Image
                  src={sectionImgs.install}
                  alt={t(`services.${serviceKey}.name`)}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  onError={(e) => { (e.target as HTMLImageElement).src = bgMap[serviceKey] }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/30 to-transparent" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* ─── BENEFITS ───────────────────────────────────────────── */}
        <section className="py-28 bg-silver-light relative">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-200/50 to-transparent" />
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease }}
              >
                <p className="text-silver-dark text-xs font-semibold uppercase tracking-[0.2em] mb-4">{t(`services.${serviceKey}.name`)}</p>
                <h2 className="font-heading text-3xl sm:text-4xl font-bold text-black mb-10 tracking-tight">
                  {t(`services.${serviceKey}.description`)}
                </h2>
                <ul className="space-y-4">
                  {benefits.map((benefit, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.05, ease }}
                      className="flex items-start gap-4"
                    >
                      <span className="shrink-0 w-6 h-6 rounded-lg bg-zinc-950 flex items-center justify-center mt-0.5">
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      <span className="text-zinc-600 text-[0.9375rem] leading-relaxed">{benefit}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              {/* Detail image */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.15, ease }}
                className="space-y-4"
              >
                <div className="relative h-64 rounded-2xl overflow-hidden shadow-premium">
                  <Image
                    src={sectionImgs.detail}
                    alt={t(`services.${serviceKey}.name`)}
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover"
                    onError={(e) => { (e.target as HTMLImageElement).src = bgMap[serviceKey] }}
                  />
                </div>
                <div className="relative h-40 rounded-2xl overflow-hidden shadow-premium">
                  <Image
                    src={sectionImgs.extra}
                    alt={t(`services.${serviceKey}.name`)}
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover"
                    onError={(e) => { (e.target as HTMLImageElement).src = bgMap[serviceKey] }}
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ─── CTA DARK ───────────────────────────────────────────── */}
        <CTA variant="dark" />

        {/* ─── HOW IT WORKS ───────────────────────────────────────── */}
        <section className="py-28 bg-white relative">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-100 to-transparent" />
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease }}
              className="text-center mb-20"
            >
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-black tracking-tight">
                {t('services.how_it_works')}
              </h2>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {steps.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.12, ease }}
                  className="bg-zinc-50 rounded-3xl p-8 text-center hover:bg-white hover:shadow-premium transition-all duration-700 ease-out-expo hover:-translate-y-2 group border border-zinc-100/80"
                >
                  <div className="w-12 h-12 bg-zinc-950 text-white rounded-2xl flex items-center justify-center text-sm font-bold mx-auto mb-7 group-hover:scale-110 transition-transform duration-500">
                    {i + 1}
                  </div>
                  <h3 className="font-heading text-base font-bold text-black mb-3">{step.title}</h3>
                  <p className="text-zinc-500 text-sm leading-relaxed">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── MATERIALS ──────────────────────────────────────────── */}
        <section className="py-28 bg-zinc-950 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(192,192,192,0.04),transparent_60%)]" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease }}
              className="mb-16"
            >
              <p className="text-silver/40 text-xs font-semibold uppercase tracking-[0.2em] mb-4">{t('services.materials_label', { defaultValue: 'Matériaux' })}</p>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight mb-4">
                {t(`services.${serviceKey}.materials_title`)}
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {materials.map((mat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1, ease }}
                  className="bg-white/[0.03] border border-white/[0.07] rounded-3xl p-8 hover:bg-white/[0.06] hover:border-white/[0.12] transition-all duration-500 ease-out-expo group"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/[0.06] border border-white/[0.08] flex items-center justify-center mb-6 group-hover:bg-white/[0.1] transition-colors duration-300">
                    <svg className="w-[18px] h-[18px] text-silver/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                    </svg>
                  </div>
                  <h3 className="font-heading text-base font-bold text-white mb-3">{mat.name}</h3>
                  <p className="text-zinc-500 text-sm leading-relaxed group-hover:text-zinc-400 transition-colors duration-300">{mat.desc}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3, ease }}
              className="mt-12 text-center"
            >
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-white text-black font-bold py-4 px-10 rounded-2xl text-sm hover:shadow-glow transition-all duration-500 ease-out-expo shadow-elevated group relative overflow-hidden"
              >
                <span className="relative z-10">{t('services.materials_cta')}</span>
                <svg className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
                <span className="absolute inset-0 bg-gradient-to-r from-silver to-white opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* ─── WARRANTY BLOCK ─────────────────────────────────────── */}
        <section className="py-20 bg-zinc-950 border-t border-white/[0.04] relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(192,192,192,0.04),transparent_60%)]" />
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease }}
            className="relative max-w-3xl mx-auto px-4 text-center"
          >
            <div className="w-16 h-16 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center mx-auto mb-7">
              <svg className="w-7 h-7 text-silver/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 tracking-tight">
              {serviceKey === 'roofing' ? t('services.warranty_roofing') : t('services.warranty_standard')}
            </h2>
            <p className="text-zinc-600 text-sm">{t('footer.rbq')}: {t('site.rbq')}</p>
          </motion.div>
        </section>

        {/* ─── TESTIMONIAL ────────────────────────────────────────── */}
        <section className="py-24 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease }}
              className="bg-zinc-950 rounded-3xl p-10 sm:p-14 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(192,192,192,0.05),transparent_60%)]" />
              <div className="relative">
                <div className="flex gap-1 mb-8">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  ))}
                </div>
                <p className="text-xl text-white/80 font-light leading-[1.75] mb-10 italic">
                  &ldquo;{testimonial.text}&rdquo;
                </p>
                <div className="flex items-center gap-4 border-t border-white/[0.08] pt-7">
                  <div className="w-10 h-10 rounded-full bg-white/[0.06] border border-white/[0.1] flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-silver/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">{testimonial.name}</p>
                    <p className="text-zinc-500 text-xs">{testimonial.location} — {testimonial.service}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ─── CTA LIGHT ──────────────────────────────────────────── */}
        <CTA variant="light" />

        {/* ─── FAQ ────────────────────────────────────────────────── */}
        <FAQ items={faqItems} />

        {/* ─── CTA DARK ───────────────────────────────────────────── */}
        <CTA variant="dark" />

      </main>

      <Footer />
      <FloatingCTA />
      <ChatWidget />
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const slugsByLocale: Record<string, Record<string, string>> = {
    fr: {
      'gouttières-soffites-fascias': 'gutters',
      'revetement': 'siding',
      'toiture': 'roofing',
    },
    en: {
      'gutters-soffit-fascia': 'gutters',
      'siding': 'siding',
      'roofing': 'roofing',
    },
  }

  const paths: { params: { slug: string }; locale: string }[] = []

  for (const locale of (locales ?? ['fr', 'en'])) {
    const slugs = slugsByLocale[locale] ?? {}
    for (const slug of Object.keys(slugs)) {
      paths.push({ params: { slug }, locale })
    }
  }

  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps<Props> = async ({ params, locale }) => {
  const slug = params?.slug as string

  const slugToKey: Record<string, string> = {
    'gouttières-soffites-fascias': 'gutters',
    'revetement': 'siding',
    'toiture': 'roofing',
    'gutters-soffit-fascia': 'gutters',
    'siding': 'siding',
    'roofing': 'roofing',
  }

  const serviceKey = slugToKey[slug]
  if (!serviceKey) return { notFound: true }

  return {
    props: {
      serviceKey,
      ...(await serverSideTranslations(locale ?? 'fr', ['common'])),
    },
  }
}

export default ServicePage
