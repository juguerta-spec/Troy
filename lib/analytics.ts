declare global {
  interface Window {
    gtag: (...args: unknown[]) => void
    fbq: (...args: unknown[]) => void
    dataLayer: unknown[]
  }
}

export function trackCallClick(location: string) {
  if (typeof window === 'undefined') return

  // GA4
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'call_click', {
      event_category: 'engagement',
      event_label: location,
    })
  }

  // Facebook Pixel
  if (typeof window.fbq === 'function') {
    window.fbq('track', 'Contact', { location })
  }
}

export function trackLead(service?: string) {
  if (typeof window === 'undefined') return

  if (typeof window.gtag === 'function') {
    window.gtag('event', 'lead', {
      event_category: 'conversion',
      event_label: service ?? 'general',
    })
    // Google Ads conversion
    const gtagId = process.env.NEXT_PUBLIC_GTAG_ID
    if (gtagId) {
      window.gtag('event', 'conversion', {
        send_to: `${gtagId}/lead`,
        event_label: service ?? 'general',
      })
    }
  }

  if (typeof window.fbq === 'function') {
    window.fbq('track', 'Lead', { service: service ?? 'general' })
  }
}

export function trackChatContact(name: string) {
  if (typeof window === 'undefined') return

  if (typeof window.gtag === 'function') {
    window.gtag('event', 'contact', {
      event_category: 'chatbot',
      event_label: name,
    })
  }

  if (typeof window.fbq === 'function') {
    window.fbq('track', 'Contact', { source: 'chatbot' })
  }
}

export function getUtmParams(): Record<string, string> {
  if (typeof window === 'undefined') return {}
  const params = new URLSearchParams(window.location.search)
  return {
    utm_source: params.get('utm_source') ?? '',
    utm_medium: params.get('utm_medium') ?? '',
    utm_campaign: params.get('utm_campaign') ?? '',
    utm_content: params.get('utm_content') ?? '',
  }
}
