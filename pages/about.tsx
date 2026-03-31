import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { serverSideTranslations } from 'next-i18next/pages/serverSideTranslations'
import { useTranslation } from 'next-i18next/pages'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { CTA } from '@/components/sections/CTA'
import { FloatingCTA } from '@/components/ui/FloatingCTA'
import { ChatWidget } from '@/components/chat/ChatWidget'

const ease = [0.16, 1, 0.3, 1] as const

const AboutPage: NextPage = () => {
  const { t } = useTranslation('common')
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://btqualityconstruction.com'

  const values = t('about.values', { returnObjects: true }) as Array<{ title: string; desc: string }>

  return (
    <>
      <Head>
        <title>{t('meta.about.title')}</title>
        <meta name="description" content={t('meta.about.description')} />
        <meta property="og:title" content={t('meta.about.title')} />
        <meta property="og:description" content={t('meta.about.description')} />
        <meta property="og:image" content={`${siteUrl}/images/project5.jpg`} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${siteUrl}/about`} />
        <link rel="canonical" href={`${siteUrl}/about`} />
        <link rel="alternate" hrefLang="fr" href={`${siteUrl}/about`} />
        <link rel="alternate" hrefLang="en" href={`${siteUrl}/en/about`} />
        <link rel="alternate" hrefLang="x-default" href={`${siteUrl}/about`} />
        <meta name="robots" content="index, follow" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              name: 'B&T Quality Construction',
              url: siteUrl,
              telephone: process.env.NEXT_PUBLIC_PHONE,
              email: 'B.TQualityConstruction@Gmail.com',
              description: t('meta.about.description'),
              image: `${siteUrl}/images/project5.jpg`,
              areaServed: [
                { '@type': 'Province', name: 'Quebec' },
                { '@type': 'Province', name: 'Ontario' },
              ],
              priceRange: '$$',
              hasCredential: {
                '@type': 'EducationalOccupationalCredential',
                credentialCategory: 'RBQ License',
                recognizedBy: { '@type': 'Organization', name: 'Régie du bâtiment du Québec' },
              },
            }),
          }}
        />
      </Head>
      <Navbar />

      <main className="pt-20">
        {/* Hero */}
        <section className="relative bg-zinc-950 text-white py-20 sm:py-32 px-4 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(192,192,192,0.04),transparent_70%)]" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

          <div className="relative max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease }}
            >
              <p className="text-silver/40 text-xs font-semibold uppercase tracking-[0.2em] mb-5">B&T Quality Construction</p>
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 tracking-tight">{t('about.title')}</h1>
              <p className="text-zinc-500 text-lg max-w-2xl mx-auto leading-relaxed">{t('about.subtitle')}</p>
            </motion.div>
          </div>
        </section>

        {/* Story */}
        <section className="py-28 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease }}
              >
                <p className="text-silver-dark text-xs font-semibold uppercase tracking-[0.2em] mb-4">B&T Quality Construction</p>
                <h2 className="font-heading text-3xl sm:text-4xl font-bold text-black mb-6 tracking-tight">{t('about.story_title')}</h2>
                <p className="text-zinc-500 leading-[1.8] text-[0.9375rem]">{t('about.story')}</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease }}
                className="relative h-80 rounded-3xl overflow-hidden shadow-premium"
              >
                <Image
                  src="/images/project5.jpg"
                  alt={t('about.team_alt')}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-28 bg-zinc-950 text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(192,192,192,0.03),transparent_60%)]" />

          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease }}
              className="font-heading text-3xl sm:text-4xl font-bold text-center mb-16 tracking-tight"
            >
              {t('about.values_title')}
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {values.map((val, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1, ease }}
                  className="group bg-white/[0.02] border border-white/[0.05] rounded-3xl p-8 text-center hover:bg-white/[0.05] hover:border-white/[0.1] transition-all duration-700 ease-out-expo"
                >
                  <h3 className="font-heading text-lg font-bold text-silver mb-4">{val.title}</h3>
                  <p className="text-zinc-600 text-sm leading-relaxed">{val.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Service Area + RBQ */}
        <section className="py-28 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease }}
            >
              <h2 className="font-heading text-2xl font-bold text-black mb-5 tracking-tight">{t('about.area_title')}</h2>
              <p className="text-zinc-500 leading-[1.8] text-[0.9375rem]">{t('about.area')}</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1, ease }}
            >
              <h2 className="font-heading text-2xl font-bold text-black mb-5 tracking-tight">{t('about.rbq_title')}</h2>
              <div className="bg-zinc-950 text-white rounded-3xl p-8 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(192,192,192,0.05),transparent_70%)]" />
                <div className="relative">
                  <p className="text-silver font-mono text-3xl font-bold mb-3 tracking-wider">{t('site.rbq')}</p>
                  <p className="text-zinc-500 text-sm leading-relaxed">{t('about.rbq_text')}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <CTA variant="dark" />
      </main>

      <Footer />
      <FloatingCTA />
      <ChatWidget />
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'fr', ['common'])),
    },
  }
}

export default AboutPage
