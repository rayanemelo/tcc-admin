"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Faq } from "../page"

type Props = {
  open: boolean
  faq: Faq | null
  onClose: () => void
}

export function FaqViewModal({ open, faq, onClose }: Props) {
  if (!faq) return null

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        onOpenAutoFocus={(e) => e.preventDefault()}
        className="max-w-xl"
        aria-describedby={undefined}
      >
        <DialogHeader>
          <DialogTitle>
            Visualizar pergunta
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 text-sm">
          <div>
            <h3 className="font-medium text-muted-foreground">
              Pergunta
            </h3>
            <p className="mt-1 whitespace-pre-line">
              {faq.question}
            </p>
          </div>

          <div>
            <h3 className="font-medium text-muted-foreground">
              Resposta
            </h3>
            <p className="mt-1 whitespace-pre-line">
              {faq.answer}
            </p>
          </div>

          <div className="flex gap-6 pt-2 text-xs text-muted-foreground">
            <span>Criado em: {faq.createdAt}</span>
            <span>Atualizado em: {faq.updatedAt}</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
