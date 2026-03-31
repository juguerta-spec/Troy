import { NextRequest, NextResponse } from 'next/server'
import { postToWebhook, WebhookPayload } from '@/lib/webhook'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as WebhookPayload

    const required: (keyof WebhookPayload)[] = ['name', 'phone', 'email', 'address']
    for (const field of required) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        )
      }
    }

    const payload: WebhookPayload = {
      name: String(body.name),
      phone: String(body.phone),
      email: String(body.email),
      address: String(body.address),
      service: String(body.service ?? ''),
      message: String(body.message ?? ''),
      photos_count: Number(body.photos_count ?? 0),
      source: 'website',
      utm_source: String(body.utm_source ?? ''),
      utm_medium: String(body.utm_medium ?? ''),
      utm_campaign: String(body.utm_campaign ?? ''),
      referral_source: String(body.referral_source ?? ''),
      timestamp: new Date().toISOString(),
      language: body.language === 'en' ? 'en' : 'fr',
    }

    await postToWebhook(payload)

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (err) {
    console.error('Contact API error:', err)
    return NextResponse.json(
      { error: 'Failed to submit form. Please try again.' },
      { status: 500 }
    )
  }
}
