'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'next-i18next/pages'
import { trackCallClick } from '@/lib/analytics'

const STORAGE_KEY = 'bt_announcement_dismissed'

export function Navbar() {
  const { t, i18n } = useTranslation('common')
  const router = useRouter()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [announcementVisible, setAnnouncementVisible] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const phone = process.env.NEXT_PUBLIC_PHONE ?? '+15140000000'
  const phoneDisplay = t('site.phone')
  const isFr = i18n.language !== 'en'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) setAnnouncementVisible(true)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  function switchLocale() {
    const newLocale = i18n.language === 'fr' ? 'en' : 'fr'
    const slugToKey: Record<string, string> = {
      'gouttières-soffites-fascias': 'gutters',
      'revetement': 'siding',
      'toiture': 'roofing',
      'gutters-soffit-fascia': 'gutters',
      'siding': 'siding',
      'roofing': 'roofing',
    }
    const keyToSlug: Record<string, Record<string, string>> = {
      fr: { gutters: 'gouttières-soffites-fascias', siding: 'revetement', roofing: 'toiture' },
      en: { gutters: 'gutters-soffit-fascia', siding: 'siding', roofing: 'roofing' },
    }

    const serviceMatch = router.asPath.match(/^\/services\/([^?#]+)/)
    if (serviceMatch) {
      const currentSlug = decodeURIComponent(serviceMatch[1])
      const key = slugToKey[currentSlug]
      if (key) {
        const newSlug = keyToSlug[newLocale][key]
        router.push(`/services/${newSlug}`, `/services/${newSlug}`, { locale: newLocale })
        return
      }
    }

    const blogSlugMap: Record<string, string> = {
      'gouttières-remplacement-quand': 'gutters-when-to-replace',
      'revetement-exterieur-materiau-climat-canadien': 'exterior-siding-material-canadian-climate',
      'toiture-signes-remplacement-inspection': 'roof-replacement-signs-inspection',
      'preparation-hiver-exterieur-maison-quebec': 'winter-preparation-exterior-home-quebec',
      'gutters-when-to-replace': 'gouttières-remplacement-quand',
      'exterior-siding-material-canadian-climate': 'revetement-exterieur-materiau-climat-canadien',
      'roof-replacement-signs-inspection': 'toiture-signes-remplacement-inspection',
      'winter-preparation-exterior-home-quebec': 'preparation-hiver-exterieur-maison-quebec',
    }
    const blogMatch = router.asPath.match(/^\/blog\/([^?#]+)/)
    if (blogMatch) {
      const currentBlogSlug = decodeURIComponent(blogMatch[1])
      const mapped = blogSlugMap[currentBlogSlug]
      if (mapped) {
        router.push(`/blog/${mapped}`, `/blog/${mapped}`, { locale: newLocale })
        return
      }
    }

    router.push(router.asPath, router.asPath, { locale: newLocale })
  }

  function dismissAnnouncement() {
    localStorage.setItem(STORAGE_KEY, '1')
    setAnnouncementVisible(false)
  }

  const serviceLinks = isFr
    ? [
        { href: '/services/gouttières-soffites-fascias', label: t('services.gutters.name'), logo: '/logos/logo-gutters.png' },
        { href: '/services/revetement', label: t('services.siding.name'), logo: '/logos/logo-siding.png' },
        { href: '/services/toiture', label: t('services.roofing.name'), logo: '/logos/logo-roofing.png' },
      ]
    : [
        { href: '/services/gutters-soffit-fascia', label: t('services.gutters.name'), logo: '/logos/logo-gutters-en.png' },
        { href: '/services/siding', label: t('services.siding.name'), logo: '/logos/logo-siding-en.png' },
        { href: '/services/roofing', label: t('services.roofing.name'), logo: '/logos/logo-roofing-en.png' },
      ]

  const allLinks = [
    { href: '/', label: t('nav.home') },
    ...serviceLinks.map(({ href, label }) => ({ href, label })),
    { href: '/blog', label: t('nav.blog') },
    { href: '/about', label: t('nav.about') },
    { href: '/contact', label: t('nav.contact') },
  ]

  const isActive = (href: string) => {
    if (href === '/') return router.asPath === '/' || router.asPath === `/${i18n.language}`
    return router.asPath.startsWith(href)
  }

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50">
        {/* Announcement bar */}
        <AnimatePresence>
          {announcementVisible && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden bg-white border-b border-zinc-100"
            >
              <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-center gap-2.5 text-xs font-medium text-zinc-600 tracking-wide">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 animate-pulse" />
                <span>{t('announcement')}</span>
                <button
                  onClick={dismissAnnouncement}
                  aria-label="Fermer"
                  className="absolute right-4 w-5 h-5 flex items-center justify-center text-zinc-300 hover:text-zinc-600 transition-colors duration-300 rounded-full hover:bg-zinc-100"
                >
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main navbar */}
        <nav
          className={`transition-all duration-500 ease-out-expo border-b ${
            scrolled
              ? 'bg-zinc-950/95 glass border-white/[0.06] shadow-[0_4px_30px_rgba(0,0,0,0.4)]'
              : 'bg-zinc-950/80 glass border-transparent'
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className={`flex items-center justify-between transition-all duration-500 ease-out-expo ${scrolled ? 'h-[68px]' : 'h-20'}`}>

              <Link href="/" className="flex items-center shrink-0 relative">
                <div className={`flex items-center justify-center transition-all duration-500 ease-out-expo ${scrolled ? 'h-[52px] w-[90px]' : 'h-[60px] w-[104px]'}`}>
                  <Image
                    src="/logos/logo-main.png"
                    alt="B&T Quality Construction"
                    width={200}
                    height={150}
                    className="object-contain w-full h-full"
                    priority
                  />
                </div>
              </Link>

              {/* Desktop Nav */}
              <div className="hidden lg:flex items-center gap-0.5">
                {[
                  { href: '/', label: t('nav.home') },
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative text-sm font-semibold px-4 py-2 rounded-lg transition-all duration-300 ${
                      isActive(link.href)
                        ? 'text-white bg-white/[0.08]'
                        : 'text-white/70 hover:text-white hover:bg-white/[0.05]'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}

                {/* Services dropdown */}
                <div
                  className="relative"
                  onMouseEnter={() => setServicesOpen(true)}
                  onMouseLeave={() => setServicesOpen(false)}
                >
                  <Link href="/services" className={`flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-lg transition-all duration-300 ${
                    router.asPath.startsWith('/services')
                      ? 'text-white bg-white/[0.08]'
                      : 'text-white/70 hover:text-white hover:bg-white/[0.05]'
                  }`}>
                    {t('nav.services')}
                    <svg className={`w-3.5 h-3.5 opacity-50 transition-transform duration-400 ease-out-expo ${servicesOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </Link>

                  <AnimatePresence>
                    {servicesOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.97 }}
                        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-80 bg-zinc-900 border border-white/[0.08] rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.7)] overflow-hidden"
                      >
                        <div className="p-2">
                          {serviceLinks.map((s) => (
                            <Link
                              key={s.href}
                              href={s.href}
                              onClick={() => setServicesOpen(false)}
                              className="group/item flex items-center gap-4 px-4 py-3.5 text-white/70 hover:text-white rounded-xl transition-all duration-200 hover:bg-white/[0.06]"
                            >
                              {/* Mini logo in dropdown */}
                              <span className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center shrink-0 group-hover/item:bg-white/[0.08] group-hover/item:border-silver/20 transition-all duration-300">
                                <Image
                                  src={s.logo}
                                  alt={s.label}
                                  width={36}
                                  height={36}
                                  className="object-contain w-8 h-8"
                                />
                              </span>
                              <span className="flex-1">
                                <span className="block text-sm font-bold">{s.label}</span>
                                <span className="block text-xs text-white/30 mt-0.5">{t(`services.${s.href.includes('gouttières') || s.href.includes('gutters') ? 'gutters' : s.href.includes('revetement') || s.href.includes('siding') ? 'siding' : 'roofing'}.short`)}</span>
                              </span>
                              <svg className="w-4 h-4 opacity-0 -translate-x-2 group-hover/item:opacity-40 group-hover/item:translate-x-0 transition-all duration-300 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                              </svg>
                            </Link>
                          ))}
                        </div>
                        <div className="border-t border-white/[0.05] p-2">
                          <Link
                            href="/contact"
                            onClick={() => setServicesOpen(false)}
                            className="flex items-center justify-center gap-2 py-3 text-sm font-bold text-silver/70 hover:text-white rounded-xl transition-all duration-300 hover:bg-white/[0.04]"
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                            </svg>
                            {t('nav.cta')}
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <Link
                  href="/blog"
                  className={`text-sm font-semibold px-4 py-2 rounded-lg transition-all duration-300 ${
                    isActive('/blog')
                      ? 'text-white bg-white/[0.08]'
                      : 'text-white/70 hover:text-white hover:bg-white/[0.05]'
                  }`}
                >
                  {t('nav.blog')}
                </Link>
                <Link
                  href="/about"
                  className={`text-sm font-semibold px-4 py-2 rounded-lg transition-all duration-300 ${
                    isActive('/about')
                      ? 'text-white bg-white/[0.08]'
                      : 'text-white/70 hover:text-white hover:bg-white/[0.05]'
                  }`}
                >
                  {t('nav.about')}
                </Link>
                <Link
                  href="/contact"
                  className={`text-sm font-semibold px-4 py-2 rounded-lg transition-all duration-300 ${
                    isActive('/contact')
                      ? 'text-white bg-white/[0.08]'
                      : 'text-white/70 hover:text-white hover:bg-white/[0.05]'
                  }`}
                >
                  {t('nav.contact')}
                </Link>
              </div>

              {/* Right side */}
              <div className="hidden lg:flex items-center gap-3">
                {/* Phone */}
                <a
                  href={`tel:${phone}`}
                  onClick={() => trackCallClick('navbar')}
                  className="flex items-center gap-2.5 text-white hover:text-gold transition-all duration-300 text-sm font-bold group"
                >
                  <span className="w-9 h-9 rounded-xl bg-gold/[0.08] border border-gold/20 flex items-center justify-center group-hover:bg-gold/15 group-hover:border-gold/35 transition-all duration-300">
                    <svg className="w-4 h-4 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </span>
                  <span className="tracking-wide">{phoneDisplay}</span>
                </a>

                <div className="w-px h-6 bg-white/[0.1]" />

                {/* Language */}
                <button
                  onClick={switchLocale}
                  className="text-white/50 hover:text-white transition-all duration-300 text-xs font-extrabold tracking-wider border border-white/[0.1] hover:border-white/[0.25] px-3 py-2 rounded-lg hover:bg-white/[0.05]"
                >
                  {i18n.language === 'fr' ? 'EN' : 'FR'}
                </button>

                {/* CTA */}
                <Link
                  href="/contact"
                  className="relative bg-white text-zinc-950 font-extrabold text-sm px-7 py-2.5 rounded-xl hover:shadow-[0_0_30px_rgba(192,192,192,0.3)] transition-all duration-500 ease-out-expo overflow-hidden group"
                >
                  <span className="relative z-10">{t('nav.cta')}</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-zinc-100 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </Link>
              </div>

              {/* Mobile: phone + lang + hamburger */}
              <div className="flex lg:hidden items-center gap-2">
                <a
                  href={`tel:${phone}`}
                  onClick={() => trackCallClick('navbar_mobile')}
                  className="w-9 h-9 rounded-xl bg-white/[0.06] border border-white/[0.1] flex items-center justify-center text-silver"
                  aria-label="Appeler"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </a>
                <button
                  onClick={switchLocale}
                  className="text-white/50 text-xs border border-white/[0.1] px-2.5 py-2 rounded-lg font-extrabold tracking-wider hover:bg-white/[0.05] transition-all duration-300"
                >
                  {i18n.language === 'fr' ? 'EN' : 'FR'}
                </button>
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="text-white p-2 rounded-xl hover:bg-white/[0.05] transition-colors duration-300 ml-0.5"
                  aria-label="Menu"
                >
                  <div className="w-[18px] space-y-[5px]">
                    <span className={`block h-[2px] bg-white rounded-full transition-all duration-500 ease-out-expo origin-center ${menuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
                    <span className={`block h-[2px] bg-white rounded-full transition-all duration-500 ease-out-expo ${menuOpen ? 'opacity-0 scale-x-0' : ''}`} />
                    <span className={`block h-[2px] bg-white rounded-full transition-all duration-500 ease-out-expo origin-center ${menuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 lg:hidden bg-zinc-950/[0.98] glass-heavy"
          >
            <div className="flex flex-col h-full pt-28 pb-10">
              <div className="flex-1 overflow-y-auto px-6">
                {/* Logo centered at top */}
                <div className="flex justify-center mb-8">
                  <div className="h-16 w-28 flex items-center justify-center">
                    <Image
                      src="/logos/logo-main.png"
                      alt="B&T"
                      width={200}
                      height={150}
                      className="object-contain w-full h-full"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  {allLinks.map((link, i) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setMenuOpen(false)}
                        className={`flex items-center justify-between py-4 px-3 text-lg font-semibold rounded-xl transition-all duration-300 ${
                          isActive(link.href)
                            ? 'text-white bg-white/[0.05]'
                            : 'text-white/60 hover:text-white hover:bg-white/[0.03]'
                        }`}
                      >
                        {link.label}
                        <svg className="w-4 h-4 text-white/20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                      </Link>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="mt-10 space-y-3"
                >
                  <a
                    href={`tel:${phone}`}
                    onClick={() => { trackCallClick('navbar_mobile'); setMenuOpen(false) }}
                    className="flex items-center justify-center gap-3 w-full bg-white text-zinc-950 font-extrabold py-[18px] rounded-2xl text-base active:scale-[0.98] shadow-elevated transition-transform duration-200"
                  >
                    <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    {phoneDisplay}
                  </a>
                  <Link
                    href="/contact"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center justify-center w-full border border-white/[0.12] text-white font-bold py-4 rounded-2xl text-base hover:bg-white/[0.04] transition-all duration-300"
                  >
                    {t('nav.cta')}
                  </Link>
                </motion.div>

                {/* RBQ badge in mobile menu */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="mt-8 text-center"
                >
                  <p className="text-white/15 text-xs flex items-center justify-center gap-1.5">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                    </svg>
                    RBQ: 5839-7712-01
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
