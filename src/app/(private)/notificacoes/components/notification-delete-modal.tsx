'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ButtonWithLoader } from '@/components/button-with-loader/button-with-loader';

type Props = {
  onClose: () => void;
  onConfirm: () => Promise<void>;
  isDeleting: boolean;
};

export function NotificationDeleteModal({
  onClose,
  onConfirm,
  isDeleting,
}: Props) {
  async function handleConfirm() {
    await onConfirm();
    onClose();
  }
  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Deseja realmente excluir esta notificação?</DialogTitle>
        </DialogHeader>

        <div className="flex justify-end gap-2 pt-4">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>

          <ButtonWithLoader
            onClick={handleConfirm}
            disabled={isDeleting}
            isLoading={isDeleting}
            text="Excluir"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
