import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ children, className, ...props }) => {
  return (
    <div
      className={cn(
        'text-card-foreground rounded-xl p-4 shadow-lg border border-border',
        className
      )}
      style={{ backgroundColor: 'var(--card-background)' }}
      {...props}
    >
      {children}
    </div>
  );
};
