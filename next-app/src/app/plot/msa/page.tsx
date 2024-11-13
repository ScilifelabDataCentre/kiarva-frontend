'use client';

import dynamic from 'next/dynamic'
import { ReactElement } from 'react';

const MSAPlotPageComponent = dynamic(() => import('@/components/MSAPlotPageComponent'), {
  ssr: false
})

// Main function to render the PlotPage component
export default function AminoAcidPlotPage(): ReactElement {
  return (
    <>
      <MSAPlotPageComponent/>
    </>
  );
}
