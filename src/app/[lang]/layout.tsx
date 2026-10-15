import type { Metadata, Viewport } from "next"
import { JetBrains_Mono } from "next/font/google"
import { getDictionary, hasLocale, locales } from "@/content/i18n"
import "../globals.css"

const mono = JetBrains_Mono({
  variable: "--font-mono-family",
  subsets: ["latin"],
  display: "swap",
})

// On Vercel, VERCEL_PROJECT_PRODUCTION_URL is set automatically.
// Set NEXT_PUBLIC_SITE_URL once you have a custom domain.
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000")

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

export async function generateMetadata({
  params,
}: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params
  if (!hasLocale(lang)) return {}
  const t = getDictionary(lang)

  return {
    metadataBase: new URL(siteUrl),
    title: t.meta.title,
    description: t.meta.description,
    alternates: {
      canonical: `/${lang}`,
      languages: { en: "/en", es: "/es", "x-default": "/en" },
    },
    openGraph: {
      title: t.meta.title,
      description: t.meta.description,
      url: `/${lang}`,
      siteName: t.hero.name,
      locale: lang === "es" ? "es_MX" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary",
      title: t.meta.title,
      description: t.meta.description,
    },
  }
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // Lets the page draw under the notch; gutters use env(safe-area-inset-*).
  viewportFit: "cover",
  themeColor: "#0f0d0b",
  colorScheme: "dark",
}

export default async function RootLayout({
  children,
  params,
}: LayoutProps<"/[lang]">) {
  const { lang } = await params

  return (
    <html lang={hasLocale(lang) ? lang : "en"} className={mono.variable}>
      <body className="min-h-dvh">{children}</body>
    </html>
  )
}
