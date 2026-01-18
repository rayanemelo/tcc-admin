import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Faq, FaqService } from '../services/faq';
import { useState } from 'react';
import { toast } from "sonner";

const service = new FaqService();

export type ModalState =
  | { type: 'create' }
  | { type: 'view'; faq: Faq }
  | { type: 'edit'; faq: Faq }
  | { type: 'delete'; faq: Faq }
  | null;


export function useFaq() {
  const queryClient = useQueryClient()
  const [modal, setModal] = useState<ModalState>(null)

  const { data: faqList, isLoading, error } = useQuery({
    queryKey: ['faqList'],
    queryFn: () => service.getFaqList(),
  })

  const createMutation = useMutation({
    mutationFn: (faq: Partial<Faq>) => service.createFaq(faq),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['faqList'] })
      toast.success('Pergunta criada com sucesso.')
    },
    onError: () => {
      toast.error('Não foi possível criar a pergunta. Tente novamente mais tarde.'
      );
    },
  })

  const updateMutation = useMutation({
    mutationFn: (faq: Partial<Faq>) =>
      service.updateFaq(faq.id!, faq),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['faqList'] })
      toast.success('Pergunta atualizada com sucesso.')
    },
    onError: () => {
      toast.error(
        'Não foi possível salvar as alterações. Tente novamente mais tarde.'
      );
    },
  })

  const deleteMutation = useMutation({
    mutationFn: (id: string) => service.deleteFaq(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['faqList'] })
      toast.success('Pergunta excluída com sucesso.')
    },
    onError: () => {
      toast.error(
        'Não foi possível excluir a pergunta. Tente novamente mais tarde.'
      );
    },
  })

  return {
    error,
    modal,
    faqList,
    isLoading,

    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,

    setModal,

    createFaq: createMutation.mutateAsync,
    updateFaq: updateMutation.mutateAsync,
    deleteFaq: deleteMutation.mutateAsync,

    onCreate: () => setModal({ type: 'create' }),
    onEdit: (faq: Faq) => setModal({ type: 'edit', faq }),
    onView: (faq: Faq) => setModal({ type: 'view', faq }),
    onDelete: (faq: Faq) => setModal({ type: 'delete', faq }),
  }
}
