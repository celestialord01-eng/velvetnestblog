"use client"

import { usePathname } from "next/navigation"
import GoogleAnalytics from "@/components/GoogleAnalytics"
import Clarity from "@/components/Clarity"

export default function AnalyticsWrapper() {
  const pathname = usePathname()

  if (pathname.startsWith("/studio")) {
    return null
  }

  return (
    <>
      <GoogleAnalytics />
      <Clarity />
    </>
  )
}
