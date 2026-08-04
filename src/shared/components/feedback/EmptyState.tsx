import React from 'react';
import { PackageOpen } from 'lucide-react';

interface EmptyStateProps {
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No records found',
  description = 'There are no items matching your criteria.',
  actionLabel,
  onAction,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center bg-white rounded-[16px] border border-[rgba(56,78,133,0.08)]">
      <div className="w-12 h-12 rounded-[12px] bg-[#EEF1F8] text-[#384E85] flex items-center justify-center mb-3">
        <PackageOpen className="w-6 h-6" />
      </div>
      <h3 className="text-[15px] font-bold text-[#0F1629] mb-1">{title}</h3>
      <p className="text-[12px] text-[#7A8299] max-w-sm mb-4">{description}</p>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="px-4 py-2 bg-[#384E85] text-white text-[12.5px] font-semibold rounded-[10px] hover:bg-[#2A3A65] transition cursor-pointer border-none"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
};
