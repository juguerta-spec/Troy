'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'next-i18next/pages'

interface FAQItem {
  q: string
  a: string
}

interface FAQProps {
  items?: FAQItem[]
  title?: string
  subtitle?: string
}

const ease = [0.16, 1, 0.3, 1] as const

export function FAQ({ items, title, subtitle }: FAQProps) {
  const { t } = useTranslation('common')
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqItems = items ?? (t('faq.items', { returnObjects: true }) as FAQItem[])
  const faqTitle = title ?? t('faq.title')
  const faqSubtitle = subtitle ?? t('faq.subtitle')

  return (
    <section className="py-32 bg-white relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-100 to-transparent" />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-black mb-5 tracking-tight">
            {faqTitle}
          </h2>
          <p className="text-zinc-400 text-lg">{faqSubtitle}</p>
        </motion.div>

        <div className="space-y-2">
          {faqItems.map((item, i) => {
            const isOpen = openIndex === i
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.04, ease }}
                className={`border rounded-2xl overflow-hidden transition-all duration-500 ease-out-expo ${
                  isOpen
                    ? 'border-zinc-200 bg-zinc-50/50 shadow-card'
                    : 'border-zinc-100/80 bg-white hover:border-zinc-200'
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full text-left px-7 py-6 flex justify-between items-center gap-4"
                  aria-expanded={isOpen}
                >
                  <span className="font-semibold text-zinc-900 text-[0.9375rem] leading-snug pr-2">
                    {item.q}
                  </span>
                  <span className={`shrink-0 w-7 h-7 rounded-full border flex items-center justify-center transition-all duration-500 ease-out-expo ${
                    isOpen
                      ? 'bg-zinc-900 border-zinc-900 rotate-180'
                      : 'border-zinc-200'
                  }`}>
                    <svg
                      className={`w-3 h-3 transition-colors duration-300 ${isOpen ? 'text-white' : 'text-zinc-400'}`}
                      fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease }}
                      className="overflow-hidden"
                    >
                      <div className="px-7 pb-7 text-zinc-500 text-[0.9375rem] leading-[1.75] border-t border-zinc-100 pt-4">
                        {item.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
