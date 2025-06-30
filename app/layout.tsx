import './globals.css'

export const metadata = {
  title: 'Boardgame Planner',
  description: 'Sammlung und Planung für Spieleabende',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  )
}