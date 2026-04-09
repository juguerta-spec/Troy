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
import { ServiceAreaMap } from '@/components/sections/ServiceAreaMap'

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
        <meta property="og:image" content={`${siteUrl}/logos/logo-main.png`} />
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
              image: `${siteUrl}/logos/logo-main.png`,
              logo: `${siteUrl}/logos/logo-main.png`,
              address: {
                '@type': 'PostalAddress',
                streetAddress: '20 Rue Pagé',
                addressLocality: 'Rigaud',
                addressRegion: 'QC',
                postalCode: 'J0P 1P0',
                addressCountry: 'CA',
              },
              geo: {
                '@type': 'GeoCoordinates',
                latitude: 45.4769,
                longitude: -74.2998,
              },
              openingHoursSpecification: [
                {
                  '@type': 'OpeningHoursSpecification',
                  dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
                  opens: '08:00',
                  closes: '19:00',
                },
              ],
              location: [
                {
                  '@type': 'Place',
                  name: 'B&T Quality Construction — Rigaud',
                  address: { '@type': 'PostalAddress', streetAddress: '20 Rue Pagé', addressLocality: 'Rigaud', addressRegion: 'QC', postalCode: 'J0P 1P0', addressCountry: 'CA' },
                },
                {
                  '@type': 'Place',
                  name: 'B&T Quality Construction — Salaberry-de-Valleyfield',
                  address: { '@type': 'PostalAddress', streetAddress: '18 Rue Haineault', addressLocality: 'Salaberry-de-Valleyfield', addressRegion: 'QC', postalCode: 'J6T 5B4', addressCountry: 'CA' },
                },
                {
                  '@type': 'Place',
                  name: 'B&T Quality Construction — Saint-Lazare',
                  address: { '@type': 'PostalAddress', streetAddress: '1697 Rue Du Bordelais', addressLocality: 'Saint-Lazare', addressRegion: 'QC', postalCode: 'J7T 2C1', addressCountry: 'CA' },
                },
                {
                  '@type': 'Place',
                  name: 'B&T Quality Construction — Pierrefonds-Roxboro',
                  address: { '@type': 'PostalAddress', streetAddress: '5045 Des Cageux', addressLocality: 'Pierrefonds-Roxboro', addressRegion: 'QC', postalCode: 'H9J 3C2', addressCountry: 'CA' },
                },
                {
                  '@type': 'Place',
                  name: 'B&T Quality Construction — Pointe-Fortune',
                  address: { '@type': 'PostalAddress', streetAddress: '125 QC-342', addressLocality: 'Pointe-Fortune', addressRegion: 'QC', postalCode: 'J0P 1N0', addressCountry: 'CA' },
                },
              ],
              areaServed: [
                { '@type': 'City', name: 'Vaudreuil-Dorion', containedInPlace: { '@type': 'Province', name: 'Quebec' } },
                { '@type': 'City', name: 'Pointe-Claire', containedInPlace: { '@type': 'Province', name: 'Quebec' } },
                { '@type': 'City', name: 'Dollard-des-Ormeaux', containedInPlace: { '@type': 'Province', name: 'Quebec' } },
                { '@type': 'City', name: 'Kirkland', containedInPlace: { '@type': 'Province', name: 'Quebec' } },
                { '@type': 'City', name: 'Beaconsfield', containedInPlace: { '@type': 'Province', name: 'Quebec' } },
                { '@type': 'City', name: 'Châteauguay', containedInPlace: { '@type': 'Province', name: 'Quebec' } },
                { '@type': 'City', name: 'Hawkesbury', containedInPlace: { '@type': 'Province', name: 'Ontario' } },
                { '@type': 'City', name: 'Alexandria', containedInPlace: { '@type': 'Province', name: 'Ontario' } },
                { '@type': 'City', name: 'Rockland', containedInPlace: { '@type': 'Province', name: 'Ontario' } },
                { '@type': 'City', name: 'Embrun', containedInPlace: { '@type': 'Province', name: 'Ontario' } },
              ],
              sameAs: [
                'https://www.google.com/maps/place/Les+Gouttieres+Quali-T+Eavestroughing',
              ],
              hasCredential: {
                '@type': 'EducationalOccupationalCredential',
                credentialCategory: 'RBQ License 5839-7712-01',
                recognizedBy: { '@type': 'Organization', name: 'Régie du bâtiment du Québec' },
              },
              serviceType: ['Gutters', 'Soffit', 'Fascia', 'Siding', 'Roofing'],
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
        <ServiceAreaMap />
        <Gallery />
        <div id="contact-form">
          <CTA variant="dark" />
        </div>
        <WhyUs />
        <Reviews />
        <FAQ />
        <CTA variant="light" />
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
