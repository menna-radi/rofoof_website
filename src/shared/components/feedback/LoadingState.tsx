import React from 'react';

interface LoadingStateProps {
  message?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({ message = 'Loading...' }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 min-h-[200px]">
      <div className="w-8 h-8 border-3 border-[#384E85]/20 border-t-[#384E85] rounded-full animate-spin mb-3" />
      <p className="text-[13px] font-medium text-[#7A8299]">{message}</p>
    </div>
  );
};
