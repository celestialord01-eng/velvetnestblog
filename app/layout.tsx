import { PageTransition } from "@/components/page-transition"
  import GoogleAnalytics from "@/components/GoogleAnalytics"

import type { Metadata } from "next"

import {
  Cormorant_Garamond,
  Inter,
} from "next/font/google"

import { Analytics } from "@vercel/analytics/react"

import "./globals.css"

/* ===================================================
   FONTS
=================================================== */

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

/* ===================================================
   SEO
=================================================== */

export const metadata: Metadata = {
  metadataBase: new URL("https://velvetnestblog.vercel.app"),

  title: {
    default: "VelvetNest | Luxury Fashion, Home & Lifestyle",
    template: "%s | VelvetNest",
  },

  description:
    "Discover elevated fashion inspiration, cozy home decor ideas, curated Amazon finds, beauty rituals, and elegant self-care living.",

  keywords: [
    "fashion blog",
    "luxury lifestyle blog",
    "home decor ideas",
    "amazon finds",
    "outfit ideas",
    "beauty tips",
    "self care",
    "minimal fashion",
    "cozy home decor",
    "capsule wardrobe",
  ],

  authors: [{ name: "VelvetNest" }],

  creator: "VelvetNest",

  verification: {
    google: "VNIYacXcf0rmfRE85E2TvSMkC_kWkblDkteJXIMavCk",
  },

  openGraph: {
    type: "website",
    locale: "en_US",

    url: "https://yourdomain.com",

    siteName: "VelvetNest",

    title: "VelvetNest | Luxury Fashion, Home & Lifestyle",

    description:
      "Curated fashion inspiration, cozy interiors, beauty finds, and elevated everyday living.",

    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "VelvetNest",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: "VelvetNest",

    description:
      "Fashion, home decor, beauty, and cozy luxury inspiration.",

    images: ["/og-image.jpg"],
  },

  robots: {
    index: true,
    follow: true,
  },

  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },

      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },

      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],

    apple: "/apple-icon.png",
  },
}

/* ===================================================
   ROOT LAYOUT
=================================================== */

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${cormorant.variable} ${inter.variable}`}
    >
      <body className="bg-background text-foreground antialiased">
        <GoogleAnalytics />
        <PageTransition>
           {children}
          </PageTransition>

       {process.env.NODE_ENV === "production" && (
          <Analytics />
        )}
      </body>
    </html>
  )
}
