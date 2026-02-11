import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Edit, Trash2, Copy, MoreVertical } from 'lucide-react';

interface DropdownMenuProps {
  onEdit?: () => void;
  onDelete?: () => void;
  onDuplicate?: () => void;
  className?: string;
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({
  onEdit,
  onDelete,
  onDuplicate,
  className
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState<'bottom' | 'top'>('bottom');
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      
      // Calcular si el menú debe aparecer arriba o abajo
      if (buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        const spaceBelow = window.innerHeight - rect.bottom;
        const spaceAbove = rect.top;
        const menuHeight = 200; // Altura aproximada del menú
        
        // Si no hay suficiente espacio abajo pero sí arriba, mostrar arriba
        if (spaceBelow < menuHeight && spaceAbove > menuHeight) {
          setPosition('top');
        } else {
          setPosition('bottom');
        }
      }
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleOptionClick = (callback?: () => void) => {
    if (callback) {
      callback();
    }
    setIsOpen(false);
  };

  return (
    <div className={cn('relative', className)} ref={menuRef}>
      <button
        ref={buttonRef}
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        className="p-1 rounded-full hover:bg-muted/50 transition-colors"
      >
        <MoreVertical size={24} className="text-muted-foreground" />
      </button>

      {isOpen && (
        <div
          className={cn(
            'absolute right-0 z-[100] min-w-[160px] rounded-lg shadow-lg border border-border overflow-hidden',
            position === 'top' ? 'bottom-10' : 'top-10'
          )}
          style={{ backgroundColor: 'var(--card-background)', zIndex: 100 }}
          onClick={(e) => e.stopPropagation()}
        >
          {onEdit && (
            <button
              onClick={() => handleOptionClick(onEdit)}
              className="w-full px-4 py-3 text-left text-sm text-foreground hover:bg-muted/50 transition-colors flex items-center gap-3"
            >
              <Edit size={16} className="text-muted-foreground" />
              <span>Editar</span>
            </button>
          )}
          {onDuplicate && (
            <button
              onClick={() => handleOptionClick(onDuplicate)}
              className="w-full px-4 py-3 text-left text-sm text-foreground hover:bg-muted/50 transition-colors flex items-center gap-3"
            >
              <Copy size={16} className="text-muted-foreground" />
              <span>Duplicar</span>
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => handleOptionClick(onDelete)}
              className="w-full px-4 py-3 text-left text-sm text-cinnabar hover:bg-muted/50 transition-colors flex items-center gap-3"
            >
              <Trash2 size={16} className="text-cinnabar" />
              <span>Eliminar</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
};
