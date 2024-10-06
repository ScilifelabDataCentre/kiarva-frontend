'use client';

import dynamic from 'next/dynamic'
import { ReactElement } from 'react';

// Main function to render the PlotPage component
export default function PlotPage(): ReactElement {
  const PlotPageComponent = dynamic(() => import('@/components/PlotPageComponent'), {
    ssr: false
  })
  return (
    <PlotPageComponent/>
  )
}
