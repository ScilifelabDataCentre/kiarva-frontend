'use client'
import { useEffect, useState } from 'react'

export default function FooterVersion() {
  const [frontendImage, setFrontendImage] = useState<string | null>(null)
  const [backendImage, setBackendImage] = useState<string | null>(null)

  useEffect(() => {
    fetch('/meta/version')
      .then((res) => res.json())
      .then((data) => {
        setFrontendImage(data.frontendImage)
        setBackendImage(data.backendImage)
      })
  }, [])

  return (
    <div className="flex flex-col">
      <nav>
        <a href={frontendImage || '/'}>
          <p className="text-info-content text-opacity-80 text-sm">
            Frontend version:{' '}
            {frontendImage?.split(':')[1] || 'Unable to find version'}
          </p>
        </a>
      </nav>
      <nav>
        <a href={backendImage || '/'}>
          <p className="text-info-content text-opacity-80 text-sm">
            Backend version:{' '}
            {backendImage?.split(':')[1] || 'Unable to find version'}
          </p>
        </a>
      </nav>
    </div>
  )
}
