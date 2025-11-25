// Probably leave as client component. Only consists of loading icon or showing a client component child.
// May be able to change to server component for optimization/SEO, but dunno if Suspense/Loading works
// on server

'use client';

import dynamic from 'next/dynamic'
import { ReactElement } from 'react';
import Loading from '@/components/Loading';
import { Suspense } from 'react';

const AAPlotPageComponent = dynamic(() => import('@/components/AAPlotPageComponent'), {
  ssr: false,
  loading: () => <Loading />,
})

// Main function to render the PlotPage component
export default function AminoAcidPlotPage(): ReactElement {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <AAPlotPageComponent/>
      </Suspense>
    </>
  );
}
