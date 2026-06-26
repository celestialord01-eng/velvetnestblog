import { PageTransition } from "@/components/page-transition"
import GoogleAnalytics from "@/components/GoogleAnalytics"
import Clarity from "@/components/Clarity"
import type { Metadata, Viewport } from "next"
import AnalyticsWrapper from "@/components/AnalyticsWrapper"
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
  metadataBase: new URL(
    "https://velvetnestblog.vercel.app"
  ),
  

  title: {
    default:
      "VelvetNest | Luxury Fashion, Home & Lifestyle",
    template: "%s | VelvetNest",
  },

  description:
    "Discover elevated fashion inspiration, cozy home decor ideas, curated Amazon finds, beauty rituals, and elegant self-care living.",

  keywords: [
  "fashion blog",
  "fashion trends",
  "outfit ideas",
  "capsule wardrobe",
  "street style",
  "summer outfits",
  "winter outfits",
  "home decor",
  "living room decor",
  "bedroom decor",
  "small room decor",
  "luxury home decor",
  "amazon finds",
  "amazon fashion finds",
  "amazon home finds",
  "beauty tips",
  "skincare routine",
  "self care",
  "cozy home",
  "minimalist home",
  "lifestyle blog",
  "Pinterest fashion",
  "Pinterest home decor",
],

  authors: [
    {
      name: "VelvetNest",
      url: "https://velvetnestblog.vercel.app",
    },
  ],

  creator: "VelvetNest",

  publisher: "VelvetNest",

  category: "Lifestyle",

  applicationName: "VelvetNest",
  formatDetection: {
  telephone: false,
  email: false,
  address: false,
},
  appleWebApp: {
  capable: true,
  statusBarStyle: "black-translucent",
  title: "VelvetNest",
},

  verification: {
  google:
    "Nxjp-fOBqHLoS2smYE_TIJzSf_dh0_URnb-AZu3JeGg",

  other: {
    "p:domain_verify":
      "69d7bd25e2bed4760b6ebd58e1dee5ff",
  },
},
other: {
  "google-adsense-account":
    "ca-pub-4903920054540457",
},
  alternates: {
    canonical:
      "https://velvetnestblog.vercel.app",
  },

  openGraph: {
    type: "website",

    locale: "en_US",

    url: "https://velvetnestblog.vercel.app",

    siteName: "VelvetNest",

    title:
      "VelvetNest | Luxury Fashion, Home & Lifestyle",

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

    title:
      "VelvetNest | Luxury Fashion, Home & Lifestyle",

    description:
      "Fashion, home decor, beauty, and cozy luxury inspiration.",

    creator: "@velvetnestworld",

    images: ["/og-image.jpg"],
  },

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-video-preview": -1,
      "max-snippet": -1,
    },
  },
  referrer: "origin-when-cross-origin",

  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media:
          "(prefers-color-scheme: light)",
      },

      {
        url: "/icon-dark-32x32.png",
        media:
          "(prefers-color-scheme: dark)",
      },

      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],

    apple: "/apple-icon.png",

    shortcut: "/favicon.ico",
  },
}
export const viewport: Viewport = {
  themeColor: "#1f1a17",
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
  style={{ colorScheme: "light" }}
  className={`
    ${cormorant.variable}
    ${inter.variable}
  `}
>
      <body
        className="
          bg-background
          text-foreground
          antialiased
          overflow-x-hidden
        "
      >

        
        <AnalyticsWrapper />

<GoogleAnalytics />

<Clarity />
        <script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "VelvetNest",
      url: "https://velvetnestblog.vercel.app",
      logo:
        "https://velvetnestblog.vercel.app/logo.png",
      sameAs: [
        "https://www.pinterest.com/velvetnestworld"
      ]
    }),
  }}
/>
        <script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "VelvetNest",
      url: "https://velvetnestblog.vercel.app",
      potentialAction: {
        "@type": "SearchAction",
        target:
          "https://velvetnestblog.vercel.app/search?q={search_term_string}",
        "query-input":
          "required name=search_term_string",
      },
    }),
  }}
/>
        

        {/* PAGE TRANSITION */}

        <PageTransition>

          {children}

        </PageTransition>

        {/* VERCEL ANALYTICS */}

        {process.env.NODE_ENV ===
          "production" && <Analytics />}

      </body>

    </html>
  )
  }
