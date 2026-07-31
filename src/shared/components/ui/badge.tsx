import React from 'react';
import { cn } from '@/core/utils/cn';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'green' | 'amber' | 'red' | 'blue' | 'purple' | 'neutral';
  hasDot?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  className,
  variant = 'blue',
  hasDot = false,
  ...props
}) => {
  const variants = {
    green: 'bg-[#ECFDF5] text-[#065F46] border border-[#10B981]/20',
    amber: 'bg-[#FFFBEB] text-[#D97706] border border-[#F59E0B]/20',
    red: 'bg-[#FEF2F2] text-[#EF4444] border border-[#EF4444]/20',
    blue: 'bg-[#EEF1F8] text-[#384E85] border border-[#384E85]/20',
    purple: 'bg-[#F5F3FF] text-[#7C3AED] border border-[#7C3AED]/20',
    neutral: 'bg-[#F4F5F8] text-[#7A8299] border border-[#7A8299]/20'
  };

  const dotColors = {
    green: 'bg-[#10B981]',
    amber: 'bg-[#F59E0B]',
    red: 'bg-[#EF4444]',
    blue: 'bg-[#384E85]',
    purple: 'bg-[#7C3AED]',
    neutral: 'bg-[#7A8299]'
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-tight',
        variants[variant],
        className
      )}
      {...props}
    >
      {hasDot && <span className={cn('w-1.5 h-1.5 rounded-full', dotColors[variant])} />}
      {children}
    </span>
  );
};
