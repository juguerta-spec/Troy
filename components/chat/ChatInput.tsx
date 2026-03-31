'use client'

import { useState, KeyboardEvent } from 'react'

interface ChatInputProps {
  onSend: (text: string) => void
  disabled?: boolean
  placeholder?: string
}

export function ChatInput({ onSend, disabled, placeholder }: ChatInputProps) {
  const [value, setValue] = useState('')

  function handleSend() {
    const trimmed = value.trim()
    if (!trimmed || disabled) return
    onSend(trimmed)
    setValue('')
  }

  function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="border-t border-zinc-100 p-3 flex gap-2 items-end bg-white">
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={disabled}
        rows={1}
        className="flex-1 resize-none border border-zinc-200/80 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-zinc-400 focus:ring-1 focus:ring-zinc-400/20 max-h-24 overflow-y-auto disabled:opacity-50 transition-all duration-200 bg-zinc-50/50 placeholder:text-zinc-300"
        style={{ height: 'auto' }}
        onInput={(e) => {
          const target = e.target as HTMLTextAreaElement
          target.style.height = 'auto'
          target.style.height = `${Math.min(target.scrollHeight, 96)}px`
        }}
      />
      <button
        onClick={handleSend}
        disabled={disabled || !value.trim()}
        className="bg-zinc-950 text-white rounded-xl w-9 h-9 flex items-center justify-center hover:bg-zinc-800 transition-all duration-300 disabled:opacity-30 shrink-0"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
        </svg>
      </button>
    </div>
  )
}
