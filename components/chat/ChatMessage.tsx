interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
}

interface ChatMessageProps {
  message: Message
  streaming?: boolean
}

export function ChatMessage({ message, streaming }: ChatMessageProps) {
  const isUser = message.role === 'user'

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <div className="w-6 h-6 bg-zinc-950 rounded-lg flex items-center justify-center text-silver text-[0.625rem] font-bold mr-2 mt-1 shrink-0">
          B
        </div>
      )}
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
          isUser
            ? 'bg-zinc-950 text-white rounded-br-lg'
            : 'bg-white text-zinc-700 rounded-bl-lg shadow-card border border-zinc-100/50'
        }`}
      >
        {message.content || (streaming ? (
          <div className="flex items-center gap-1 py-1">
            <span className="w-1.5 h-1.5 bg-zinc-300 rounded-full animate-pulse" style={{ animationDelay: '0ms' }} />
            <span className="w-1.5 h-1.5 bg-zinc-300 rounded-full animate-pulse" style={{ animationDelay: '150ms' }} />
            <span className="w-1.5 h-1.5 bg-zinc-300 rounded-full animate-pulse" style={{ animationDelay: '300ms' }} />
          </div>
        ) : '')}
      </div>
    </div>
  )
}
