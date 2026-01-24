'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Notification } from '@/services/notification';

type Props = {
  notification: Notification | null;
  onClose: () => void;
};

export function NotificationViewModal({ notification, onClose }: Props) {
  if (!notification) return null;

  return (
    <Dialog open={true} onOpenChange={onClose}>
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
