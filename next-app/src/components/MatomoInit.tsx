'use client'

import { useEffect } from 'react'
import { init } from "@socialgouv/matomo-next";

export default function MatomoInit() {
  useEffect(() => {
    if (window.location.origin === "https://kiarva.scilifelab.se") {
      init({
          url: 'https://matomo.dc.scilifelab.se/', 
          siteId: '12',
          disableCookies: true,
          excludeUrlsPatterns: [/^\/password/,],
      })
    }
  }, [])

  return null
}