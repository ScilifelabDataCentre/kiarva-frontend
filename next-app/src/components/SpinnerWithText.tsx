import React from 'react';
import { Spinner } from '@/components/ui/spinner';

const SpinnerWithText = () => {
  return (
    <div className="content-center">
      <Spinner>Loading</Spinner>
    </div>
  );
};

export default SpinnerWithText;
