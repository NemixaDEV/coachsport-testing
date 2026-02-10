import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'positive' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  className,
  ...props
}) => {
  const variantStyles = {
    primary: 'bg-cinnabar hover:bg-[#E1322A] active:bg-[#C62822] text-foreground',
    secondary: 'bg-transparent border-2 border-cinnabar text-cinnabar hover:bg-cinnabar/10 active:bg-cinnabar/20',
    positive: 'bg-medium-jungle hover:bg-[#449D48] active:bg-[#3D8C41] text-foreground',
    outline: 'border-2 border-border text-foreground hover:opacity-80',
  };

  const sizeStyles = {
    sm: 'px-4 py-2 h-10 text-sm',
    md: 'px-6 py-3 h-12 text-base',
    lg: 'px-8 py-4 h-14 text-lg',
  };

  const getButtonStyle = () => {
    if (variant === 'outline') {
      return { backgroundColor: 'var(--button-background)' };
    }
    return {};
  };

  return (
    <button
      disabled={disabled || loading}
      className={cn(
        'rounded-lg font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-cinnabar focus:ring-offset-2 focus:ring-offset-primary',
        variantStyles[variant],
        sizeStyles[size],
        (disabled || loading) && 'opacity-50 cursor-not-allowed',
        className
      )}
      style={getButtonStyle()}
      {...props}
    >
      {loading ? (
        <span className="inline-block animate-spin mr-2">⏳</span>
      ) : null}
      {children}
    </button>
  );
};
