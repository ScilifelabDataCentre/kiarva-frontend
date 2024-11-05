'use client';

import dynamic from 'next/dynamic'
import { ReactElement } from 'react';

const AAPlotPageComponent = dynamic(() => import('@/components/AAPlotPageComponent'), {
  ssr: false
})

// Main function to render the PlotPage component
export default function PlotPage(): ReactElement {
  return (
    <>
      <AAPlotPageComponent/>
    </>
  );
}
