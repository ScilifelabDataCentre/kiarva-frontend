// server component now, but env variables are public client env vars. Should try to change into private
// server env vars (not sensitive, but for optimization)

import { NextResponse } from 'next/server'

export function GET() {
  return NextResponse.json({
    frontendImage: process.env.NEXT_PUBLIC_FRONTEND_IMAGE || '',
    backendImage: process.env.NEXT_PUBLIC_BACKEND_IMAGE || '',
  })
}