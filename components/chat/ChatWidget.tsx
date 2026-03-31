'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'next-i18next/pages'
import { ChatMessage } from './ChatMessage'
import { ChatInput } from './ChatInput'
import { trackChatContact } from '@/lib/analytics'
import { getUtmParams } from '@/lib/analytics'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
}

const STORAGE_KEY = 'bt_chat_history'

function isOutsideHours(): boolean {
  const now = new Date()
  const estOffset = -5 * 60
  const utcMin = now.getUTCHours() * 60 + now.getUTCMinutes()
  const estMin = (utcMin + estOffset + 24 * 60) % (24 * 60)
  const estHour = Math.floor(estMin / 60)
  return estHour < 8 || estHour >= 18
}

const ease = [0.16, 1, 0.3, 1] as const

export function ChatWidget() {
  const { t, i18n } = useTranslation('common')
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [streaming, setStreaming] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const outside = isOutsideHours()

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        setMessages(JSON.parse(saved) as Message[])
      } else {
        setMessages([
          {
            id: 'welcome',
            role: 'assistant',
            content: outside ? t('chat.offline') : t('chat.welcome'),
          },
        ])
      }
    } catch {
      setMessages([{ id: 'welcome', role: 'assistant', content: t('chat.welcome') }])
    }
  }, [t, outside])

  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages))
    }
  }, [messages])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  async function sendMessage(text: string) {
    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: text }
    const newMessages = [...messages, userMsg]
    setMessages(newMessages)
    setStreaming(true)

    const assistantId = (Date.now() + 1).toString()
    setMessages((prev) => [
      ...prev,
      { id: assistantId, role: 'assistant', content: '' },
    ])

    try {
      const utms = getUtmParams()
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({ role: m.role, content: m.content })),
          language: i18n.language,
          ...utms,
        }),
      })

      if (!res.ok || !res.body) throw new Error('Stream failed')

      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let fullText = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        const chunk = decoder.decode(value, { stream: true })

        if (chunk.includes('[DATA:')) {
          const dataMatch = chunk.match(/\[DATA:(.+?)\]/)
          if (dataMatch) {
            try {
              const data = JSON.parse(dataMatch[1]) as { type: string; name: string; phone: string }
              if (data.type === 'LEAD_COLLECTED') {
                trackChatContact(data.name)
              }
            } catch { /* ignore parse errors */ }
          }
          const textChunk = chunk.replace(/\n\n\[DATA:.+?\]/, '').replace(/\[LEAD_COLLECTED:[^\]]+\]/g, '')
          fullText += textChunk
        } else {
          const cleanChunk = chunk.replace(/\[LEAD_COLLECTED:[^\]]+\]/g, '')
          fullText += cleanChunk
        }

        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId
              ? { ...m, content: fullText.trim() }
              : m
          )
        )
      }
    } catch {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantId ? { ...m, content: t('chat.error') } : m
        )
      )
    } finally {
      setStreaming(false)
    }
  }

  return (
    <>
      {/* Chat bubble button */}
      <motion.button
        onClick={() => setOpen(!open)}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, duration: 0.5, ease }}
        className="fixed bottom-6 right-6 z-50 hidden md:flex items-center justify-center w-14 h-14 bg-zinc-950 border border-white/[0.08] rounded-2xl shadow-elevated hover:shadow-elevated-lg hover:border-white/[0.15] transition-all duration-500 ease-out-expo group"
        aria-label={open ? 'Fermer le chat' : 'Ouvrir le chat'}
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span
              key="close"
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 90 }}
              transition={{ duration: 0.2 }}
              className="text-white/60"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </motion.span>
          ) : (
            <motion.span
              key="chat"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ duration: 0.2 }}
              className="text-white/70 group-hover:text-white transition-colors duration-300"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
              </svg>
            </motion.span>
          )}
        </AnimatePresence>
        {!open && (
          <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full border-2 border-zinc-950" />
        )}
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.95 }}
            transition={{ duration: 0.3, ease }}
            className="fixed bottom-24 right-6 z-50 hidden md:flex flex-col w-[360px] h-[520px] bg-white rounded-2xl shadow-elevated-lg border border-zinc-200/50 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-zinc-950 text-white px-5 py-4 flex items-center gap-3">
              <div className="w-9 h-9 bg-white/[0.08] border border-white/[0.08] rounded-xl flex items-center justify-center text-silver text-sm font-bold">
                B
              </div>
              <div className="flex-1">
                <p className="font-semibold text-sm">{t('chat.title')}</p>
                <p className="text-xs text-white/30">
                  {outside ? t('chat.offline') : t('chat.subtitle')}
                </p>
              </div>
              <div className={`w-2 h-2 rounded-full ${outside ? 'bg-amber-400' : 'bg-emerald-400'}`} />
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-zinc-50/50">
              {messages.map((msg) => (
                <ChatMessage key={msg.id} message={msg} streaming={streaming && msg.id === messages[messages.length - 1]?.id && msg.role === 'assistant'} />
              ))}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <ChatInput onSend={sendMessage} disabled={streaming} placeholder={t('chat.placeholder')} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
