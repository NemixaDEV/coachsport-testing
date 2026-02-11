import React from 'react';
import { Modal } from './Modal';
import { Button } from './Button';
import { AlertTriangle } from 'lucide-react';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Eliminar',
  cancelText = 'Cancelar',
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <div className="flex flex-col items-center text-center mb-6">
        <div className="w-16 h-16 rounded-full bg-cinnabar/20 flex items-center justify-center mb-4">
          <AlertTriangle size={32} className="text-cinnabar" />
        </div>
        <p className="text-foreground text-base">{message}</p>
        <p className="text-muted-foreground text-sm mt-2">Esta acción es irreversible.</p>
      </div>

      <div className="flex gap-3">
        <Button
          type="button"
          variant="outline"
          className="flex-1"
          onClick={onClose}
        >
          {cancelText}
        </Button>
        <Button
          type="button"
          className="flex-1"
          onClick={() => {
            onConfirm();
            onClose();
          }}
        >
          {confirmText}
        </Button>
      </div>
    </Modal>
  );
};
