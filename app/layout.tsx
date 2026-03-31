// This layout is only used for the App Router API routes.
// Pages are served via the Pages Router (pages/ directory).
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  )
}
