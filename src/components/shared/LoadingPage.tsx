'use client';

import { LoadingSpinner } from './LoadingSpinner';

export const LoadingPage = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black-bg">
      <div className="flex flex-col items-center gap-4">
        <LoadingSpinner size="lg" />
        <p className="text-white-secondary text-sm animate-pulse">
          Loading GetDockPay...
        </p>
      </div>
    </div>
  );
};
