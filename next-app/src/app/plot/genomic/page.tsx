'use client';

import dynamic from 'next/dynamic'
import { ReactElement } from 'react';
import Loading from '@/components/Loading';
import { Suspense } from 'react';

const PlotPageComponent = dynamic(() => import('@/components/PlotPageComponent'), {
  ssr: false,
  loading: () => <Loading />,
})

// Main function to render the PlotPage component
export default function PlotPage(): ReactElement {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <PlotPageComponent/>
      </Suspense>
    </>
  );
}
