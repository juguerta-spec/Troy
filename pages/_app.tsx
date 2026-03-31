import type { AppProps } from 'next/app'
import { appWithTranslation } from 'next-i18next/pages'
import { Inter, Montserrat } from 'next/font/google'
import Script from 'next/script'
import Head from 'next/head'
import '@/app/globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  weight: ['400', '500', '700', '800'],
  display: 'swap',
})

function App({ Component, pageProps }: AppProps) {
  const gtagId = process.env.NEXT_PUBLIC_GTAG_ID
  const fbPixelId = process.env.NEXT_PUBLIC_FB_PIXEL_ID

  return (
    <div className={`${inter.variable} ${montserrat.variable} font-body`}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      {/* Google Analytics / Google Ads */}
      {gtagId && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gtagId}`}
            strategy="afterInteractive"
          />
          <Script id="gtag-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gtagId}', { page_path: window.location.pathname });
            `}
          </Script>
        </>
      )}

      {/* Facebook Pixel */}
      {fbPixelId && (
        <Script id="fb-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${fbPixelId}');
            fbq('track', 'PageView');
          `}
        </Script>
      )}

      <Component {...pageProps} />
    </div>
  )
}

export default appWithTranslation(App)
