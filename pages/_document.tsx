import { Html, Head, Main, NextScript } from 'next/document'
import { type DocumentProps } from 'next/document'

export default function Document(props: DocumentProps) {
  const locale = props.__NEXT_DATA__.locale ?? 'fr'

  return (
    <Html lang={locale}>
      <Head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#000000" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
