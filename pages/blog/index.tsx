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

interface Article {
  slug: string
  title: string
  meta_title: string
  meta_description: string
  excerpt: string
  date: string
  category: string
  read_time: string
  image: string
  image_alt: string
}

const BlogPage: NextPage = () => {
  const { t, i18n } = useTranslation('common')
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://btqualityconstruction.com'
  const isFr = i18n.language !== 'en'

  const articles = t('blog.articles', { returnObjects: true }) as Article[]
  const canonicalPath = isFr ? '/blog' : '/en/blog'

  function formatDate(dateStr: string) {
    const date = new Date(dateStr)
    return date.toLocaleDateString(isFr ? 'fr-CA' : 'en-CA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <>
      <Head>
        <title>{t('blog.meta_title')}</title>
        <meta name="description" content={t('blog.meta_description')} />
        <meta property="og:title" content={t('blog.meta_title')} />
        <meta property="og:description" content={t('blog.meta_description')} />
        <meta property="og:image" content={`${siteUrl}/images/blog-roofing.jpg`} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${siteUrl}${canonicalPath}`} />
        <link rel="canonical" href={`${siteUrl}${canonicalPath}`} />
        <link rel="alternate" hrefLang="fr" href={`${siteUrl}/blog`} />
        <link rel="alternate" hrefLang="en" href={`${siteUrl}/en/blog`} />
        <link rel="alternate" hrefLang="x-default" href={`${siteUrl}/blog`} />
        <meta name="robots" content="index, follow" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Blog',
              name: t('blog.title'),
              description: t('blog.meta_description'),
              url: `${siteUrl}${canonicalPath}`,
              publisher: {
                '@type': 'Organization',
                name: 'B&T Quality Construction',
                url: siteUrl,
              },
              blogPost: articles.map((a) => ({
                '@type': 'BlogPosting',
                headline: a.title,
                url: `${siteUrl}/blog/${a.slug}`,
                datePublished: a.date,
                image: `${siteUrl}${a.image}`,
                description: a.excerpt,
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
              B&T Quality Construction
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.05, ease }}
              className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-[1.1] tracking-tight text-balance mb-6"
            >
              {t('blog.title')}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease }}
              className="text-white/50 text-lg max-w-2xl mx-auto"
            >
              {t('blog.subtitle')}
            </motion.p>
          </div>
        </section>

        {/* Articles grid */}
        <section className="py-16 sm:py-24 bg-zinc-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
              {articles.map((article, i) => (
                <motion.article
                  key={article.slug}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.08, ease }}
                  className="bg-white rounded-2xl overflow-hidden border border-zinc-100 hover:border-zinc-200 hover:shadow-[0_8px_40px_rgba(0,0,0,0.08)] transition-all duration-500 group"
                >
                  <Link href={`/blog/${article.slug}`} className="block">
                    {/* Image */}
                    <div className="relative h-52 overflow-hidden bg-zinc-100">
                      <Image
                        src={article.image}
                        alt={article.image_alt}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                      <span className="absolute top-3 left-3 bg-zinc-950/80 backdrop-blur text-white/80 text-xs font-semibold px-3 py-1 rounded-full border border-white/10">
                        {article.category}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-center gap-3 text-xs text-zinc-400 mb-3">
                        <span>{formatDate(article.date)}</span>
                        <span className="w-1 h-1 rounded-full bg-zinc-200" />
                        <span>{article.read_time}</span>
                      </div>
                      <h2 className="font-heading text-lg font-extrabold text-zinc-900 mb-3 leading-snug group-hover:text-zinc-700 transition-colors duration-300 line-clamp-2">
                        {article.title}
                      </h2>
                      <p className="text-zinc-500 text-sm leading-relaxed line-clamp-3 mb-5">
                        {article.excerpt}
                      </p>
                      <span className="inline-flex items-center gap-1.5 text-sm font-bold text-zinc-900 group-hover:gap-2.5 transition-all duration-300">
                        {t('blog.read_more')}
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                      </span>
                    </div>
                  </Link>
                </motion.article>
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

export default BlogPage
