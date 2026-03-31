import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { serverSideTranslations } from 'next-i18next/pages/serverSideTranslations'
import { useTranslation } from 'next-i18next/pages'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { CTA } from '@/components/sections/CTA'
import { FloatingCTA } from '@/components/ui/FloatingCTA'
import { ChatWidget } from '@/components/chat/ChatWidget'

const ease = [0.16, 1, 0.3, 1] as const

const ServicesPage: NextPage = () => {
  const { t, i18n } = useTranslation('common')
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://btqualityconstruction.com'
  const isFr = i18n.language !== 'en'

  const services = [
    {
      key: 'gutters',
      slug: isFr ? 'gouttières-soffites-fascias' : 'gutters-soffit-fascia',
      logo: '/logos/logo-gutters.png',
      image: '/images/service-gutters-install.jpg',
      warranty: t('services.warranty_standard'),
    },
    {
      key: 'siding',
      slug: isFr ? 'revetement' : 'siding',
      logo: '/logos/logo-siding.png',
      image: '/images/service-siding-modern.jpg',
      warranty: t('services.warranty_standard'),
    },
    {
      key: 'roofing',
      slug: isFr ? 'toiture' : 'roofing',
      logo: '/logos/logo-roofing.png',
      image: '/images/service-roofing-install.jpg',
      warranty: t('services.warranty_roofing'),
    },
  ]

  const trustItems = t('services_page.trust_items', { returnObjects: true }) as string[]

  const canonicalPath = isFr ? '/services' : '/en/services'

  return (
    <>
      <Head>
        <title>{t('services_page.meta_title')}</title>
        <meta name="description" content={t('services_page.meta_description')} />
        <meta property="og:title" content={t('services_page.meta_title')} />
        <meta property="og:description" content={t('services_page.meta_description')} />
        <meta property="og:image" content={`${siteUrl}/images/service-roofing-install.jpg`} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${siteUrl}${canonicalPath}`} />
        <link rel="canonical" href={`${siteUrl}${canonicalPath}`} />
        <link rel="alternate" hrefLang="fr" href={`${siteUrl}/services`} />
        <link rel="alternate" hrefLang="en" href={`${siteUrl}/en/services`} />
        <link rel="alternate" hrefLang="x-default" href={`${siteUrl}/services`} />
        <meta name="robots" content="index, follow" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'ItemList',
              name: t('services_page.title'),
              url: `${siteUrl}${canonicalPath}`,
              itemListElement: services.map((s, i) => ({
                '@type': 'ListItem',
                position: i + 1,
                name: t(`services.${s.key}.name`),
                url: `${siteUrl}/services/${s.slug}`,
              })),
            }),
          }}
        />
      </Head>

      <Navbar />

      <main className="bg-white pt-20">
        {/* Hero */}
        <section className="bg-zinc-950 py-20 sm:py-28 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(192,192,192,0.06)_0%,transparent_60%)]" />
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease }}
              className="text-silver/50 text-sm font-semibold tracking-widest uppercase mb-4"
            >
              {t('services_page.all_services')}
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.05, ease }}
              className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-[1.1] tracking-tight text-balance mb-6"
            >
              {t('services_page.title')}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease }}
              className="text-white/50 text-lg max-w-2xl mx-auto"
            >
              {t('services_page.subtitle')}
            </motion.p>
          </div>
        </section>

        {/* Service cards */}
        <section className="py-16 sm:py-24 bg-zinc-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((service, i) => (
                <motion.article
                  key={service.key}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1, ease }}
                >
                  <Link
                    href={`/services/${service.slug}`}
                    className="group block bg-white rounded-2xl overflow-hidden border border-zinc-100 hover:border-zinc-200 hover:shadow-[0_8px_40px_rgba(0,0,0,0.08)] transition-all duration-500"
                  >
                    {/* Image */}
                    <div className="relative h-52 overflow-hidden bg-zinc-100">
                      <Image
                        src={service.image}
                        alt={t(`services.${service.key}.name`)}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                      {/* Logo badge */}
                      <div className="absolute bottom-4 left-4 w-12 h-12 rounded-xl bg-zinc-950/80 backdrop-blur border border-white/10 overflow-hidden flex items-center justify-center">
                        <Image
                          src={service.logo}
                          alt=""
                          width={60}
                          height={60}
                          className="w-[180%] h-[180%] object-contain brightness-150"
                          style={{ filter: 'brightness(1.6) contrast(1.15)' }}
                        />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h2 className="font-heading text-xl font-extrabold text-zinc-900 mb-2 group-hover:text-zinc-700 transition-colors duration-300">
                        {t(`services.${service.key}.name`)}
                      </h2>
                      <p className="text-zinc-500 text-sm leading-relaxed mb-5 line-clamp-3">
                        {t(`services.${service.key}.description`)}
                      </p>

                      {/* Warranty badge */}
                      <div className="flex items-center justify-between">
                        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-full px-3 py-1">
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                          </svg>
                          {service.warranty}
                        </span>
                        <span className="flex items-center gap-1 text-sm font-bold text-zinc-900 group-hover:gap-2 transition-all duration-300">
                          {t('services_page.cta_service')}
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* Trust section */}
        <section className="py-16 bg-zinc-950">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease }}
              className="font-heading text-2xl sm:text-3xl font-extrabold text-white mb-10"
            >
              {t('services_page.trust_title')}
            </motion.h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {trustItems.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08, ease }}
                  className="flex items-start gap-3 bg-white/[0.04] border border-white/[0.07] rounded-xl px-5 py-4 text-left"
                >
                  <svg className="w-5 h-5 text-emerald-400 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  <span className="text-white/70 text-sm font-medium">{item}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <CTA />
      </main>

      <Footer />
      <FloatingCTA />
      <ChatWidget />
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'fr', ['common'])),
  },
})

export default ServicesPage
