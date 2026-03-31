'use client'

import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { serverSideTranslations } from 'next-i18next/pages/serverSideTranslations'
import { useTranslation } from 'next-i18next/pages'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { FloatingCTA } from '@/components/ui/FloatingCTA'
import { ChatWidget } from '@/components/chat/ChatWidget'
import { trackLead, getUtmParams } from '@/lib/analytics'

const schema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  phone: z.string().min(7),
  email: z.string().email(),
  address: z.string().min(5),
  service: z.string().min(1),
  message: z.string().optional(),
  referral: z.string().optional(),
})

type FormData = z.infer<typeof schema>

const ease = [0.16, 1, 0.3, 1] as const

const ContactPage: NextPage = () => {
  const { t, i18n } = useTranslation('common')
  const { query } = useRouter()
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://btqualityconstruction.com'
  const phone = process.env.NEXT_PUBLIC_PHONE ?? '+15140000000'
  const locale = i18n.language

  const [photos, setPhotos] = useState<File[]>([])
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  const serviceFromParam = typeof query.service === 'string' ? query.service : ''

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { service: serviceFromParam },
  })

  useEffect(() => {
    if (serviceFromParam) setValue('service', serviceFromParam)
  }, [serviceFromParam, setValue])

  async function onSubmit(data: FormData) {
    setStatus('submitting')
    const utms = getUtmParams()

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `${data.firstName} ${data.lastName}`,
          phone: data.phone,
          email: data.email,
          address: data.address,
          service: data.service,
          message: data.message ?? '',
          photos_count: photos.length,
          source: 'website',
          ...utms,
          referral_source: data.referral ?? '',
          timestamp: new Date().toISOString(),
          language: locale === 'en' ? 'en' : 'fr',
        }),
      })

      if (!res.ok) throw new Error('Submit failed')

      trackLead(data.service)
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  const inputClass = 'w-full border border-zinc-200 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900/10 transition-all duration-300 bg-white placeholder:text-zinc-300'
  const errorClass = 'text-red-500 text-xs mt-1.5 font-medium'
  const labelClass = 'block text-sm font-semibold text-zinc-800 mb-1.5'

  return (
    <>
      <Head>
        <title>{t('meta.contact.title')}</title>
        <meta name="description" content={t('meta.contact.description')} />
        <meta property="og:title" content={t('meta.contact.title')} />
        <meta property="og:description" content={t('meta.contact.description')} />
        <meta property="og:image" content={`${siteUrl}/images/project1.jpg`} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${siteUrl}/contact`} />
        <link rel="canonical" href={`${siteUrl}/contact`} />
        <link rel="alternate" hrefLang="fr" href={`${siteUrl}/contact`} />
        <link rel="alternate" hrefLang="en" href={`${siteUrl}/en/contact`} />
        <link rel="alternate" hrefLang="x-default" href={`${siteUrl}/contact`} />
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
              description: t('meta.contact.description'),
              image: `${siteUrl}/images/project1.jpg`,
              areaServed: [
                { '@type': 'Province', name: 'Quebec' },
                { '@type': 'Province', name: 'Ontario' },
              ],
              priceRange: '$$',
            }),
          }}
        />
      </Head>
      <Navbar />

      <main className="pt-20 min-h-screen bg-silver-light">
        {/* Header */}
        <section className="relative bg-zinc-950 text-white py-16 sm:py-24 px-4 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(192,192,192,0.04),transparent_70%)]" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease }}
            className="relative max-w-3xl mx-auto text-center"
          >
            <p className="text-silver/40 text-xs font-semibold uppercase tracking-[0.2em] mb-5">B&T Quality Construction</p>
            <h1 className="font-heading text-4xl sm:text-5xl font-extrabold mb-4 tracking-tight">{t('contact.title')}</h1>
            <p className="text-zinc-500 text-lg">{t('contact.subtitle')}</p>
          </motion.div>
        </section>

        <section className="max-w-2xl mx-auto px-4 py-16">
          {status === 'success' ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease }}
              className="text-center py-16 bg-white rounded-3xl shadow-premium p-12"
            >
              <div className="w-16 h-16 rounded-2xl bg-emerald-50 flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="font-heading text-2xl font-bold text-black mb-3">{t('contact.success.title')}</h2>
              <p className="text-zinc-500 mb-8 leading-relaxed">{t('contact.success.message')}</p>
              <a
                href={`tel:${phone}`}
                className="inline-flex items-center gap-2 bg-zinc-950 text-white font-bold px-8 py-4 rounded-2xl hover:bg-zinc-800 transition-all duration-300 shadow-elevated"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {t('contact.success.cta_call')}
              </a>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease }}
              className="bg-white rounded-3xl shadow-premium p-8 sm:p-10"
            >
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {/* Name row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>{t('contact.form.firstName')} *</label>
                    <input {...register('firstName')} className={inputClass} />
                    {errors.firstName && <p className={errorClass}>{t('contact.form.required')}</p>}
                  </div>
                  <div>
                    <label className={labelClass}>{t('contact.form.lastName')} *</label>
                    <input {...register('lastName')} className={inputClass} />
                    {errors.lastName && <p className={errorClass}>{t('contact.form.required')}</p>}
                  </div>
                </div>

                {/* Phone + Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>{t('contact.form.phone')} *</label>
                    <input {...register('phone')} type="tel" placeholder="(514) 000-0000" className={inputClass} />
                    {errors.phone && <p className={errorClass}>{t('contact.form.phone_format')}</p>}
                  </div>
                  <div>
                    <label className={labelClass}>{t('contact.form.email')} *</label>
                    <input {...register('email')} type="email" className={inputClass} />
                    {errors.email && <p className={errorClass}>{t('contact.form.email_invalid')}</p>}
                  </div>
                </div>

                {/* Address */}
                <div>
                  <label className={labelClass}>{t('contact.form.address')} *</label>
                  <input {...register('address')} className={inputClass} />
                  {errors.address && <p className={errorClass}>{t('contact.form.required')}</p>}
                </div>

                {/* Service */}
                <div>
                  <label className={labelClass}>{t('contact.form.service')} *</label>
                  <select {...register('service')} className={inputClass}>
                    <option value="">{t('contact.form.service_placeholder')}</option>
                    <option value="gutters">{t('contact.form.service_gutters')}</option>
                    <option value="siding">{t('contact.form.service_siding')}</option>
                    <option value="roofing">{t('contact.form.service_roofing')}</option>
                    <option value="other">{t('contact.form.service_other')}</option>
                  </select>
                  {errors.service && <p className={errorClass}>{t('contact.form.required')}</p>}
                </div>

                {/* Message */}
                <div>
                  <label className={labelClass}>{t('contact.form.message')}</label>
                  <textarea
                    {...register('message')}
                    rows={4}
                    placeholder={t('contact.form.message_placeholder')}
                    className={inputClass}
                  />
                </div>

                {/* Photos */}
                <div>
                  <label className={labelClass}>{t('contact.form.photos')}</label>
                  <p className="text-xs text-zinc-400 mb-2">{t('contact.form.photos_hint')}</p>
                  <div className="border-2 border-dashed border-zinc-200 rounded-2xl p-6 text-center hover:border-zinc-300 transition-colors duration-300">
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={(e) => {
                        if (e.target.files) setPhotos(Array.from(e.target.files))
                      }}
                      className="block w-full text-sm text-zinc-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-zinc-950 file:text-white hover:file:bg-zinc-800 file:transition-colors file:duration-300 file:cursor-pointer"
                    />
                  </div>
                  {photos.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {photos.map((file, i) => (
                        <div key={i} className="flex items-center gap-1.5 bg-zinc-100 rounded-lg px-3 py-1.5 text-xs">
                          <span className="text-zinc-600">{file.name}</span>
                          <button
                            type="button"
                            onClick={() => setPhotos((prev) => prev.filter((_, j) => j !== i))}
                            className="text-zinc-400 hover:text-zinc-700 transition-colors duration-200 ml-1"
                          >
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Referral */}
                <div>
                  <label className={labelClass}>{t('contact.form.referral')}</label>
                  <select {...register('referral')} className={inputClass}>
                    <option value="">{t('contact.form.service_placeholder')}</option>
                    <option value="google">{t('contact.form.referral_google')}</option>
                    <option value="facebook">{t('contact.form.referral_facebook')}</option>
                    <option value="reference">{t('contact.form.referral_reference')}</option>
                    <option value="other">{t('contact.form.referral_other')}</option>
                  </select>
                </div>

                {status === 'error' && (
                  <div className="bg-red-50 border border-red-100 rounded-2xl p-5">
                    <p className="text-red-700 font-semibold text-sm">{t('contact.error.title')}</p>
                    <p className="text-red-500 text-sm mt-1">{t('contact.error.message')}</p>
                    <a href={`tel:${phone}`} className="text-red-700 font-bold text-sm underline mt-2 inline-block">
                      {t('site.phone')}
                    </a>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full bg-zinc-950 text-white font-bold py-4 rounded-2xl text-base hover:bg-zinc-800 transition-all duration-300 disabled:opacity-50 shadow-elevated hover:shadow-elevated-lg group relative overflow-hidden"
                >
                  <span className="relative z-10">
                    {status === 'submitting' ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        {t('contact.form.submitting')}
                      </span>
                    ) : t('contact.form.submit')}
                  </span>
                </button>
              </form>
            </motion.div>
          )}
        </section>
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

export default ContactPage
