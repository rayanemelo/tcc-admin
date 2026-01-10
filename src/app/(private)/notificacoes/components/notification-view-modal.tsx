'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Notification } from '../page';

type Props = {
  open: boolean;
  notification: Notification | null;
  onClose: () => void;
};

export function NotificationViewModal({ open, notification, onClose }: Props) {
  if (!notification) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        onOpenAutoFocus={(e) => e.preventDefault()}
        className="max-w-lg"
        aria-describedby={undefined}
      >
        <DialogHeader>
          <DialogTitle>Visualizar notificação</DialogTitle>
        </DialogHeader>

        <p className="whitespace-pre-line text-sm">{notification.content}</p>
      </DialogContent>
    </Dialog>
  );
}
