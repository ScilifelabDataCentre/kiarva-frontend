import React from 'react';
import { Spinner } from '@/components/ui/spinner';

export default function Loading() {
    return (
      <div className="content-center">
        <Spinner>Loading</Spinner>
      </div>
    );
  }