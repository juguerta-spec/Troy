'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useTranslation } from 'next-i18next/pages'
import { Lightbox } from '@/components/ui/Lightbox'

const PHOTOS = [
  { src: '/images/project1.jpg', category: 'siding', altFr: 'Installation revêtement extérieur vinyle — maison résidentielle Vaudreuil-Dorion', altEn: 'Vinyl siding installation — residential home Vaudreuil-Dorion' },
  { src: '/images/project15.jpg', category: 'soffit', altFr: 'Remplacement soffites et fascias en aluminium — Rigaud QC', altEn: 'Aluminum soffit and fascia replacement — Rigaud QC' },
  { src: '/images/project3.jpg', category: 'siding', altFr: 'Revêtement extérieur neuf sur maison à Saint-Lazare', altEn: 'New exterior siding on home in Saint-Lazare' },
  { src: '/images/project4.jpg', category: 'roofing', altFr: 'Toiture architecturale bardeaux — remplacement complet', altEn: 'Architectural shingle roofing — full replacement' },
  { src: '/images/project16.jpg', category: 'soffit', altFr: 'Soffites ventilés et fascias aluminium blanc — Hudson QC', altEn: 'Ventilated soffits and white aluminum fascia — Hudson QC' },
  { src: '/images/project17.jpg', category: 'gutters', altFr: 'Gouttières sans soudure Alu-Rex installées — Hawkesbury ON', altEn: 'Seamless Alu-Rex gutters installed — Hawkesbury ON' },
  { src: '/images/project8.jpg', category: 'siding', altFr: 'Transformation extérieure complète revêtement — Kirkland', altEn: 'Full exterior siding transformation — Kirkland' },
  { src: '/images/project18.jpg', category: 'siding', altFr: 'Revêtement vinyle couleur moderne — Pointe-Claire QC', altEn: 'Modern color vinyl siding — Pointe-Claire QC' },
  { src: '/images/project19.jpg', category: 'soffit', altFr: 'Installation soffites sous avant-toit — Beaconsfield', altEn: 'Soffit installation under eaves — Beaconsfield' },
  { src: '/images/project12.jpg', category: 'roofing', altFr: 'Toiture résidentielle neuve — Châteauguay QC', altEn: 'New residential roofing — Châteauguay QC' },
  { src: '/images/project20.jpg', category: 'siding', altFr: 'Revêtement extérieur et finition — Dollard-des-Ormeaux', altEn: 'Exterior siding and trim — Dollard-des-Ormeaux' },
  { src: '/images/project14.jpg', category: 'gutters', altFr: 'Système gouttières DoublePro Alu-Rex — Casselman ON', altEn: 'DoublePro Alu-Rex gutter system — Casselman ON' },
]

const ease = [0.16, 1, 0.3, 1] as const

export function Gallery() {
  const { t, i18n } = useTranslation('common')
  const isFr = i18n.language !== 'en'
  const [selected, setSelected] = useState<string | null>(null)

  return (
    <section className="py-32 bg-zinc-950 relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] bg-silver/[0.02] rounded-full blur-[200px] pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease }}
          className="text-center mb-16"
        >
          <p className="text-silver/40 text-xs font-semibold uppercase tracking-[0.2em] mb-4">
            {t('gallery.subtitle')}
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            {t('gallery.title')}
          </h2>
        </motion.div>

        {/* Masonry grid */}
        <div className="columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3">
          {PHOTOS.map((photo, i) => (
            <motion.div
              key={photo.src}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.6, delay: (i % 4) * 0.08, ease }}
              className="break-inside-avoid cursor-pointer group overflow-hidden rounded-2xl"
              onClick={() => setSelected(photo.src)}
            >
              <div className="relative overflow-hidden">
                <Image
                  src={photo.src}
                  alt={isFr ? photo.altFr : photo.altEn}
                  width={600}
                  height={450}
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-1000 ease-out-expo"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-700 flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 scale-75 group-hover:scale-100 shadow-elevated">
                    <svg className="w-4 h-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {selected && (
        <Lightbox
          src={selected}
          alt={t('gallery.alt')}
          onClose={() => setSelected(null)}
        />
      )}
    </section>
  )
}
