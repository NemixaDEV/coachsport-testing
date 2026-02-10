import React from 'react';
import { cn } from '@/lib/utils';

interface TabProps {
  label: string;
  active: boolean;
  onPress: () => void;
}

export const Tab: React.FC<TabProps> = ({ label, active, onPress }) => {
  return (
    <button
      onClick={onPress}
      className={cn(
        'px-4 py-2 border-b-2 transition-colors font-semibold',
        active 
          ? 'border-secondary text-foreground' 
          : 'border-transparent text-muted-foreground hover:text-foreground'
      )}
      style={{ backgroundColor: 'var(--tab-background)' }}
    >
      <span className="text-base">{label}</span>
    </button>
  );
};
