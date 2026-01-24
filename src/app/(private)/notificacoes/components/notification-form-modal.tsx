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
import { Notification } from '@/services/notification';
import { ButtonWithLoader } from '@/components/button-with-loader/button-with-loader';

type Props = {
  isSaving: boolean;
  onClose: () => void;
  onSave: (n: Notification) => void;
};

export function NotificationFormModal({ isSaving, onClose, onSave }: Props) {
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
    <Dialog open onOpenChange={onClose}>
      <DialogContent onOpenAutoFocus={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Nova notificação</DialogTitle>
        </DialogHeader>

        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <Textarea
            placeholder="Conteúdo da notificação"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-30"
          />

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>

            <ButtonWithLoader
              type="submit"
              disabled={isSaving}
              isLoading={isSaving}
              text="Salvar"
            />
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
