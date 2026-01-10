'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Faq } from '../page';

type Props = {
  open: boolean;
  faq: Faq | null;
  onClose: () => void;
  onSave: (faq: Faq) => void;
};

export function FaqFormModal({ open, faq, onClose, onSave }: Props) {
  const [question, setQuestion] = useState(faq?.question ?? '');
  const [answer, setAnswer] = useState(faq?.answer ?? '');

  function handleSubmit() {
    const now = new Date().toLocaleDateString();

    onSave({
      id: faq?.id ?? crypto.randomUUID(),
      question,
      answer,
      createdAt: faq?.createdAt ?? now,
      updatedAt: now,
    });

    onClose();
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        onOpenAutoFocus={(event) => event.preventDefault()}
        aria-describedby={undefined}
      >
        <DialogHeader>
          <DialogTitle>
            {faq ? 'Editar pergunta' : 'Adicionar pergunta'}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="Pergunta"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />

          <Textarea
            placeholder="Resposta"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="min-h-[120px]"
          />

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>

            <Button onClick={handleSubmit}>Salvar</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
