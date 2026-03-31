export interface WebhookPayload {
  name: string
  phone: string
  email: string
  address: string
  service: string
  message: string
  photos_count: number
  source: 'website' | 'chatbot'
  utm_source: string
  utm_medium: string
  utm_campaign: string
  referral_source: string
  timestamp: string
  language: 'fr' | 'en'
}

const MAX_RETRIES = 2
const RETRY_DELAY_MS = 1000

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export async function postToWebhook(payload: WebhookPayload): Promise<void> {
  const url = process.env.NEXT_PUBLIC_WEBHOOK_URL
  if (!url) {
    console.warn('NEXT_PUBLIC_WEBHOOK_URL is not set — skipping webhook')
    return
  }

  let lastError: Error | null = null

  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        throw new Error(`Webhook returned ${response.status}: ${response.statusText}`)
      }

      return
    } catch (err) {
      lastError = err instanceof Error ? err : new Error(String(err))
      if (attempt < MAX_RETRIES) {
        await sleep(RETRY_DELAY_MS * (attempt + 1))
      }
    }
  }

  throw lastError ?? new Error('Webhook failed after retries')
}
