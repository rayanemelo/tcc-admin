'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Notification } from '../page';

type Props = {
  open: boolean;
  onClose: () => void;
  onSave: (n: Notification) => void;
};

export function NotificationFormModal({ open, onClose, onSave }: Props) {
  const [content, setContent] = useState('');

  function handleSubmit() {
    const now = new Date().toLocaleDateString();

    onSave({
      id: crypto.randomUUID(),
      content,
      createdAt: now,
    });

    setContent('');
    onClose();
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent onOpenAutoFocus={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Nova notificação</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Textarea
            placeholder="Conteúdo da notificação"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[120px]"
          />

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>

            <Button onClick={handleSubmit} disabled={!content.trim()}>
              Enviar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
