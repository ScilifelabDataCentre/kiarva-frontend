'use client';

import dynamic from 'next/dynamic'
import { ReactElement } from 'react';

const PlotPageComponent = dynamic(() => import('@/components/PlotPageComponent'), {
  ssr: false
})

// Main function to render the PlotPage component
export default function PlotPage(): ReactElement {
  return (
    <>
      <PlotPageComponent/>
    </>
  );
}
