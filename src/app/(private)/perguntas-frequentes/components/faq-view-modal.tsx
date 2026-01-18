'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Faq } from '@/services/faq';
import { formatDateTime } from '@/utils/format-date-time';

type Props = {
  faq: Faq | null;
  onClose: () => void;
};

export function FaqViewModal({ faq, onClose }: Props) {
  if (!faq) return null;

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent
        onOpenAutoFocus={(e) => e.preventDefault()}
        className="max-w-xl"
        aria-describedby={undefined}
      >
        <DialogHeader>
          <DialogTitle>Visualizar pergunta</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 text-sm w-115.5 max-h-96 overflow-x-auto">
          <div>
            <h3 className="font-medium text-muted-foreground">Pergunta</h3>
            <p className="mt-1 whitespace-pre-line">{faq.question}</p>
          </div>

          <div>
            <h3 className="font-medium text-muted-foreground">Resposta</h3>
            <p className="mt-1 whitespace-pre-line">{faq.answer}</p>
          </div>

          <div className="flex gap-6 pt-2 text-xs text-muted-foreground">
            <span>Criado em: {formatDateTime(faq.createdAt)}</span>
            <span>Atualizado em: {formatDateTime(faq.updatedAt)}</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
