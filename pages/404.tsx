import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { serverSideTranslations } from 'next-i18next/pages/serverSideTranslations'
import { useTranslation } from 'next-i18next/pages'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'

const NotFoundPage: NextPage = () => {
  const { t } = useTranslation('common')

  return (
    <>
      <Head>
        <title>404 | B&T Quality Construction</title>
      </Head>
      <Navbar />
      <main className="pt-16 min-h-screen flex items-center justify-center bg-white">
        <div className="text-center px-4">
          <p className="text-8xl font-extrabold text-black mb-4">404</p>
          <h1 className="text-2xl font-bold text-black mb-4">{t('error.404_title')}</h1>
          <p className="text-gray-500 mb-8">{t('error.404_message')}</p>
          <Link href="/" className="bg-black text-white font-bold px-8 py-3 rounded-lg hover:bg-dark transition-colors">
            {t('nav.home')}
          </Link>
        </div>
      </main>
      <Footer />
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

export default NotFoundPage
