import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { serverSideTranslations } from 'next-i18next/pages/serverSideTranslations'
import { useTranslation } from 'next-i18next/pages'
import { useRouter } from 'next/router'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { FloatingCTA } from '@/components/ui/FloatingCTA'
import { ChatWidget } from '@/components/chat/ChatWidget'

const ease = [0.16, 1, 0.3, 1] as const

interface ArticleSection {
  heading: string
  body: string
  list: string[] | null
}

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
  intro: string
  sections: ArticleSection[]
}

const BlogArticlePage: NextPage = () => {
  const { t, i18n } = useTranslation('common')
  const router = useRouter()
  const { slug } = router.query
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://btqualityconstruction.com'
  const isFr = i18n.language !== 'en'

  const articles = t('blog.articles', { returnObjects: true }) as Article[]
  const article = articles.find((a) => a.slug === slug)

  if (!article) return null

  const canonicalPath = isFr ? `/blog/${article.slug}` : `/en/blog/${article.slug}`

  // Find matching article index for hreflang alternate
  const articleIndex = articles.findIndex((a) => a.slug === slug)
  const frArticles = t('blog.articles', { returnObjects: true, lng: 'fr' }) as Article[]
  const enArticles = t('blog.articles', { returnObjects: true, lng: 'en' }) as Article[]
  const frSlug = frArticles[articleIndex]?.slug ?? article.slug
  const enSlug = enArticles[articleIndex]?.slug ?? article.slug

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
        <title>{article.meta_title}</title>
        <meta name="description" content={article.meta_description} />
        <meta property="og:title" content={article.meta_title} />
        <meta property="og:description" content={article.meta_description} />
        <meta property="og:image" content={`${siteUrl}${article.image}`} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`${siteUrl}${canonicalPath}`} />
        <meta property="article:published_time" content={article.date} />
        <link rel="canonical" href={`${siteUrl}${canonicalPath}`} />
        <link rel="alternate" hrefLang="fr" href={`${siteUrl}/blog/${frSlug}`} />
        <link rel="alternate" hrefLang="en" href={`${siteUrl}/en/blog/${enSlug}`} />
        <link rel="alternate" hrefLang="x-default" href={`${siteUrl}/blog/${frSlug}`} />
        <meta name="robots" content="index, follow" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'BlogPosting',
              headline: article.title,
              description: article.meta_description,
              image: `${siteUrl}${article.image}`,
              datePublished: article.date,
              dateModified: article.date,
              url: `${siteUrl}${canonicalPath}`,
              author: {
                '@type': 'Organization',
                name: 'B&T Quality Construction',
                url: siteUrl,
              },
              publisher: {
                '@type': 'Organization',
                name: 'B&T Quality Construction',
                url: siteUrl,
              },
            }),
          }}
        />
      </Head>

      <Navbar />

      <main className="bg-white pt-20">
        {/* Hero image */}
        <div className="relative h-[50vh] min-h-[320px] max-h-[520px] bg-zinc-900 overflow-hidden">
          <Image
            src={article.image}
            alt={article.image_alt}
            fill
            className="object-cover opacity-70"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 max-w-3xl mx-auto px-4 sm:px-6 pb-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease }}
            >
              <span className="inline-block bg-white/10 backdrop-blur border border-white/10 text-white/70 text-xs font-semibold px-3 py-1 rounded-full mb-4">
                {article.category}
              </span>
              <h1 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-[1.15] tracking-tight text-balance">
                {article.title}
              </h1>
            </motion.div>
          </div>
        </div>

        {/* Article body */}
        <article className="max-w-3xl mx-auto px-4 sm:px-6 py-14">
          {/* Meta */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease }}
            className="flex flex-wrap items-center gap-4 text-sm text-zinc-400 mb-8 pb-8 border-b border-zinc-100"
          >
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {formatDate(article.date)}
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {article.read_time}
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
              {t('blog.by')} {t('blog.author')}
            </span>
          </motion.div>

          {/* Intro */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease }}
            className="text-zinc-600 text-lg leading-relaxed mb-10"
          >
            {article.intro}
          </motion.p>

          {/* Sections */}
          <div className="space-y-10">
            {article.sections.map((section, i) => (
              <motion.section
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, ease }}
              >
                <h2 className="font-heading text-xl sm:text-2xl font-extrabold text-zinc-900 mb-4 leading-snug">
                  {section.heading}
                </h2>
                <p className="text-zinc-600 leading-relaxed mb-4">{section.body}</p>
                {section.list && (
                  <ul className="space-y-2 mt-3">
                    {section.list.map((item, j) => (
                      <li key={j} className="flex items-start gap-3 text-zinc-600">
                        <svg className="w-5 h-5 text-emerald-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </motion.section>
            ))}
          </div>

          {/* Back link */}
          <div className="mt-16 pt-8 border-t border-zinc-100">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-500 hover:text-zinc-900 transition-colors duration-300"
            >
              {t('blog.back')}
            </Link>
          </div>
        </article>

        {/* CTA box */}
        <section className="bg-zinc-950 py-16">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease }}
              className="font-heading text-2xl sm:text-3xl font-extrabold text-white mb-4"
            >
              {t('blog.cta_title')}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.08, ease }}
              className="text-white/50 mb-8"
            >
              {t('blog.cta_text')}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.14, ease }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                href="/contact"
                className="bg-white text-zinc-950 font-extrabold px-8 py-3.5 rounded-xl hover:shadow-[0_0_30px_rgba(192,192,192,0.25)] transition-all duration-500 text-sm"
              >
                {t('cta.form')}
              </Link>
              <a
                href={`tel:${process.env.NEXT_PUBLIC_PHONE ?? '+15140000000'}`}
                className="border border-white/[0.15] text-white font-bold px-8 py-3.5 rounded-xl hover:bg-white/[0.05] transition-all duration-300 text-sm"
              >
                {t('cta.call')}
              </a>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingCTA />
      <ChatWidget />
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const frArticleSlugs = [
    'gouttières-remplacement-quand',
    'revetement-exterieur-materiau-climat-canadien',
    'toiture-signes-remplacement-inspection',
    'preparation-hiver-exterieur-maison-quebec',
  ]
  const enArticleSlugs = [
    'gutters-when-to-replace',
    'exterior-siding-material-canadian-climate',
    'roof-replacement-signs-inspection',
    'winter-preparation-exterior-home-quebec',
  ]

  const paths = [
    ...frArticleSlugs.map((slug) => ({ params: { slug }, locale: 'fr' })),
    ...enArticleSlugs.map((slug) => ({ params: { slug }, locale: 'en' })),
  ]

  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'fr', ['common'])),
  },
})

export default BlogArticlePage
