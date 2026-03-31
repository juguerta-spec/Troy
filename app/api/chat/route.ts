import Anthropic from '@anthropic-ai/sdk'
import { NextRequest, NextResponse } from 'next/server'
import { CHATBOT_SYSTEM_PROMPT } from '@/lib/chatbot-system'
import { postToWebhook } from '@/lib/webhook'

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

interface Message {
  role: 'user' | 'assistant'
  content: string
}

function isOutsideBusinessHours(): boolean {
  const now = new Date()
  const estOffset = -5 * 60
  const utcMinutes = now.getUTCHours() * 60 + now.getUTCMinutes()
  const estMinutes = (utcMinutes + estOffset + 24 * 60) % (24 * 60)
  const estHour = Math.floor(estMinutes / 60)
  return estHour < 8 || estHour >= 18
}

function extractLeadFromText(text: string): { name: string; phone: string } | null {
  const match = text.match(/\[LEAD_COLLECTED:\s*nom="([^"]+)",\s*phone="([^"]+)"\]/)
  if (match) {
    return { name: match[1], phone: match[2] }
  }
  return null
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as {
      messages: Message[]
      utm_source?: string
      utm_medium?: string
      utm_campaign?: string
      language?: string
    }

    const { messages, utm_source, utm_medium, utm_campaign, language } = body

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: 'Invalid messages' }, { status: 400 })
    }

    const systemPrompt = isOutsideBusinessHours()
      ? `${CHATBOT_SYSTEM_PROMPT}\n\nIMPORTANT: Il est actuellement en dehors des heures d'ouverture (8h-18h EST). Informe le client que tu enregistres sa demande et qu'ils seront rappelés dans les 24h.`
      : CHATBOT_SYSTEM_PROMPT

    const stream = await client.messages.stream({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 500,
      system: systemPrompt,
      messages: messages.map((m) => ({
        role: m.role,
        content: m.content,
      })),
    })

    const encoder = new TextEncoder()
    let fullText = ''

    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const event of stream) {
            if (
              event.type === 'content_block_delta' &&
              event.delta.type === 'text_delta'
            ) {
              const chunk = event.delta.text
              fullText += chunk
              controller.enqueue(encoder.encode(chunk))
            }
          }

          // Check for lead collection after stream completes
          const lead = extractLeadFromText(fullText)
          if (lead) {
            const payloadStr = JSON.stringify({
              type: 'LEAD_COLLECTED',
              name: lead.name,
              phone: lead.phone,
            })
            controller.enqueue(encoder.encode(`\n\n[DATA:${payloadStr}]`))

            // Post to webhook asynchronously
            postToWebhook({
              name: lead.name,
              phone: lead.phone,
              email: '',
              address: '',
              service: '',
              message: messages[messages.length - 1]?.content ?? '',
              photos_count: 0,
              source: 'chatbot',
              utm_source: utm_source ?? '',
              utm_medium: utm_medium ?? '',
              utm_campaign: utm_campaign ?? '',
              referral_source: '',
              timestamp: new Date().toISOString(),
              language: (language === 'en' ? 'en' : 'fr'),
            }).catch(console.error)
          }

          controller.close()
        } catch (err) {
          controller.error(err)
        }
      },
    })

    return new Response(readable, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Transfer-Encoding': 'chunked',
        'Cache-Control': 'no-cache',
      },
    })
  } catch (err) {
    console.error('Chat API error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
