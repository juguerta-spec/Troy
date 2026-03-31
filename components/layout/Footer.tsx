'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useTranslation } from 'next-i18next/pages'
import { trackCallClick } from '@/lib/analytics'

export function Footer() {
  const { t, i18n } = useTranslation('common')
  const phone = process.env.NEXT_PUBLIC_PHONE ?? '+15140000000'
  const isFr = i18n.language !== 'en'

  const serviceLinks = isFr
    ? [
        { href: '/services/gouttières-soffites-fascias', label: t('services.gutters.name') },
        { href: '/services/revetement', label: t('services.siding.name') },
        { href: '/services/toiture', label: t('services.roofing.name') },
      ]
    : [
        { href: '/services/gutters-soffit-fascia', label: t('services.gutters.name') },
        { href: '/services/siding', label: t('services.siding.name') },
        { href: '/services/roofing', label: t('services.roofing.name') },
      ]

  return (
    <footer className="bg-zinc-950 text-white relative">
      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="h-16 w-28 overflow-hidden mb-6">
              <Image
                src="/logos/logo-main.png"
                alt="B&T Quality Construction"
                width={200}
                height={200}
                className="w-[180%] h-[180%] object-contain -mt-[40%] -ml-[40%]"
                style={{ filter: 'brightness(1.4) contrast(1.1) drop-shadow(0 0 10px rgba(192,192,192,0.25))' }}
              />
            </div>
            <p className="text-white/30 text-sm leading-relaxed mb-5">{t('site.tagline')}</p>
            <div className="inline-flex items-center gap-2 bg-white/[0.03] border border-white/[0.06] rounded-lg px-3 py-2">
              <svg className="w-3.5 h-3.5 text-silver/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
              <span className="text-silver/40 text-xs font-medium">
                {t('footer.rbq')}: {t('site.rbq')}
              </span>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white/60 font-semibold text-xs mb-7 tracking-[0.2em] uppercase">{t('footer.services')}</h3>
            <ul className="space-y-4">
              {serviceLinks.map((s) => (
                <li key={s.href}>
                  <Link href={s.href} className="text-white/30 hover:text-white transition-colors duration-300 text-sm">
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white/60 font-semibold text-xs mb-7 tracking-[0.2em] uppercase">{t('footer.company')}</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/blog" className="text-white/30 hover:text-white transition-colors duration-300 text-sm">
                  {t('nav.blog')}
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-white/30 hover:text-white transition-colors duration-300 text-sm">
                  {t('nav.about')}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-white/30 hover:text-white transition-colors duration-300 text-sm">
                  {t('nav.contact')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white/60 font-semibold text-xs mb-7 tracking-[0.2em] uppercase">{t('footer.contact')}</h3>
            <ul className="space-y-4">
              <li>
                <a
                  href={`tel:${phone}`}
                  onClick={() => trackCallClick('footer')}
                  className="text-silver/70 hover:text-white transition-colors duration-300 text-sm font-semibold flex items-center gap-2.5 group"
                >
                  <span className="w-7 h-7 rounded-lg bg-white/[0.03] border border-white/[0.06] flex items-center justify-center group-hover:bg-white/[0.06] group-hover:border-silver/15 transition-all duration-300">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </span>
                  {t('site.phone')}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${t('site.email')}`}
                  className="text-white/30 hover:text-white transition-colors duration-300 text-sm flex items-center gap-2.5 group"
                >
                  <span className="w-7 h-7 rounded-lg bg-white/[0.03] border border-white/[0.06] flex items-center justify-center group-hover:bg-white/[0.06] group-hover:border-silver/15 transition-all duration-300">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                  </span>
                  {t('site.email')}
                </a>
              </li>
              <li className="text-white/20 text-xs flex items-center gap-2.5 pt-1">
                <span className="w-7 h-7 rounded-lg bg-white/[0.03] border border-white/[0.06] flex items-center justify-center">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                </span>
                QC &amp; ON, Canada
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/[0.04] pt-8 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-white/15">
          <p>&copy; {new Date().getFullYear()} {t('site.name')}. {t('footer.rights')}</p>
          <p className="flex items-center gap-1.5">
            <svg className="w-3 h-3 text-silver/25" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
            </svg>
            {t('footer.rbq')}: {t('site.rbq')}
          </p>
        </div>
      </div>
    </footer>
  )
}
