'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

interface LightboxProps {
  src: string
  alt: string
  onClose: () => void
}

const ease = [0.16, 1, 0.3, 1] as const

export function Lightbox({ src, alt, onClose }: LightboxProps) {
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-[100] bg-black/95 glass-heavy flex items-center justify-center p-4 cursor-zoom-out"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.92, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.92, opacity: 0 }}
          transition={{ duration: 0.3, ease }}
          className="relative max-w-5xl w-full max-h-[90vh]"
          onClick={(e) => e.stopPropagation()}
        >
          <Image
            src={src}
            alt={alt}
            width={1200}
            height={800}
            className="w-full h-auto max-h-[85vh] object-contain rounded-xl"
          />
          <button
            onClick={onClose}
            className="absolute -top-3 -right-3 bg-zinc-900 border border-white/[0.1] text-white/60 hover:text-white rounded-xl w-10 h-10 flex items-center justify-center hover:bg-zinc-800 transition-all duration-300 shadow-elevated"
            aria-label="Fermer"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
