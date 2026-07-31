import React from 'react';
import { cn } from '@/core/utils/cn';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  isHoverable?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  isHoverable = false,
  ...props
}) => {
  return (
    <div
      className={cn(
        'bg-white border border-[#384E85]/7 rounded-[20px] p-5 shadow-[0px_8px_30px_rgba(0,0,0,0.06)] transition-all duration-200',
        isHoverable && 'hover:shadow-[0px_12px_36px_rgba(0,0,0,0.1)] hover:-translate-y-0.5',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
