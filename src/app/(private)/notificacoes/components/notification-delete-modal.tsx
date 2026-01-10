'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

type Props = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export function NotificationDeleteModal({ open, onClose, onConfirm }: Props) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Deseja realmente excluir esta notificação?</DialogTitle>
        </DialogHeader>

        <div className="flex justify-end gap-2 pt-4">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>

          <Button variant="destructive" onClick={onConfirm}>
            Excluir
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
