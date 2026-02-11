import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CustomSelectOption {
  value: string;
  label: string;
}

interface CustomSelectProps {
  options: CustomSelectOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  required?: boolean;
  className?: string;
}

export const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  value,
  onChange,
  placeholder = 'Selecciona una opción',
  label,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState<'bottom' | 'top'>('bottom');
  const selectRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      // Calcular posición del menú
      if (buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        const spaceBelow = window.innerHeight - rect.bottom;
        const spaceAbove = rect.top;
        const menuHeight = options.length * 48 + 8; // Aproximado
        
        if (spaceBelow < menuHeight && spaceAbove > spaceBelow) {
          setPosition('top');
        } else {
          setPosition('bottom');
        }
      }
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, options.length]);

  const selectedOption = options.find(opt => opt.value === value);
  const displayValue = selectedOption ? selectedOption.label : placeholder;

  const handleSelect = (optionValue: string) => {
    if (optionValue !== '') {
      onChange(optionValue);
    }
    setIsOpen(false);
  };

  return (
    <div className={cn('mb-4', className)}>
      {label && (
        <label className="block text-foreground text-sm font-medium mb-2">
          {label}
        </label>
      )}
      <div className="relative" ref={selectRef}>
        <button
          ref={buttonRef}
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            'w-full border border-border rounded-lg pl-4 pr-12 py-3 text-left text-foreground',
            'focus:outline-none focus:border-cinnabar focus:ring-2 focus:ring-cinnabar/20',
            'flex items-center justify-between',
            !selectedOption && 'text-muted-foreground'
          )}
          style={{ backgroundColor: 'var(--input-background)' }}
        >
          <span>{displayValue}</span>
          <ChevronDown
            size={20}
            className={cn(
              'text-muted-foreground absolute right-4 transition-transform duration-200',
              isOpen && 'rotate-180'
            )}
          />
        </button>

        {isOpen && (
          <div
            className={cn(
              'absolute z-50 w-full border border-border rounded-lg shadow-lg overflow-hidden',
              'max-h-60 overflow-y-auto',
              position === 'top' ? 'bottom-full mb-2' : 'top-full mt-2'
            )}
            style={{ backgroundColor: 'var(--input-background)' }}
          >
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => handleSelect(option.value)}
                className={cn(
                  'w-full px-4 py-3 text-left text-foreground hover:bg-muted transition-colors',
                  value === option.value && 'bg-cinnabar/20 text-cinnabar font-medium'
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
