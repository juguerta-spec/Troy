import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { serverSideTranslations } from 'next-i18next/pages/serverSideTranslations'
import { useTranslation } from 'next-i18next/pages'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Hero } from '@/components/sections/Hero'
import { ServiceCards } from '@/components/sections/ServiceCards'
import { WhyUs } from '@/components/sections/WhyUs'
import { Gallery } from '@/components/sections/Gallery'
import { Reviews } from '@/components/sections/Reviews'
import { FAQ } from '@/components/sections/FAQ'
import { CTA } from '@/components/sections/CTA'
import { StatsBar } from '@/components/sections/StatsBar'
import { FloatingCTA } from '@/components/ui/FloatingCTA'
import { ChatWidget } from '@/components/chat/ChatWidget'

const serviceParamMap: Record<string, string> = {
  gutters: 'gutters',
  roofing: 'roofing',
  siding: 'siding',
}

const HomePage: NextPage = () => {
  const { t, i18n } = useTranslation('common')
  const { query } = useRouter()
  const serviceParam = typeof query.service === 'string' ? serviceParamMap[query.service] : undefined
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://btqualityconstruction.com'
  const locale = i18n.language

  const metaKey = serviceParam
    ? (serviceParam === 'gutters' ? 'gutters' : serviceParam === 'roofing' ? 'roofing' : 'siding')
    : 'home'

  return (
    <>
      <Head>
        <title>{t(`meta.${metaKey}.title`)}</title>
        <meta name="description" content={t(`meta.${metaKey}.description`)} />
        <meta property="og:title" content={t(`meta.${metaKey}.title`)} />
        <meta property="og:description" content={t(`meta.${metaKey}.description`)} />
        <meta property="og:image" content={`${siteUrl}/images/project1.jpg`} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${siteUrl}${locale === 'en' ? '/en' : ''}`} />
        <link rel="canonical" href={`${siteUrl}${locale === 'en' ? '/en' : ''}`} />
        <link rel="alternate" hrefLang="fr" href={siteUrl} />
        <link rel="alternate" hrefLang="en" href={`${siteUrl}/en`} />
        <link rel="alternate" hrefLang="x-default" href={siteUrl} />
        <meta name="robots" content="index, follow" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              name: 'B&T Quality Construction',
              description: t('meta.home.description'),
              url: siteUrl,
              telephone: process.env.NEXT_PUBLIC_PHONE,
              email: 'B.TQualityConstruction@Gmail.com',
              image: `${siteUrl}/images/project1.jpg`,
              areaServed: [
                { '@type': 'Province', name: 'Quebec' },
                { '@type': 'Province', name: 'Ontario' },
              ],
              hasCredential: {
                '@type': 'EducationalOccupationalCredential',
                credentialCategory: 'RBQ License',
                recognizedBy: { '@type': 'Organization', name: 'Régie du bâtiment du Québec' },
              },
              serviceType: ['Gutters', 'Siding', 'Roofing'],
              priceRange: '$$',
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: (t('faq.items', { returnObjects: true }) as Array<{ q: string; a: string }>).map((item) => ({
                '@type': 'Question',
                name: item.q,
                acceptedAnswer: { '@type': 'Answer', text: item.a },
              })),
            }),
          }}
        />
      </Head>
      <Navbar />

      <main className="pt-24">
        <Hero serviceOverride={serviceParam} />
        <ServiceCards />
        <WhyUs />
        <Gallery />
        <Reviews />
        <CTA variant="dark" />
        <FAQ />
        <div id="contact-form">
          <CTA variant="light" />
        </div>
        <StatsBar />
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

export default HomePage
