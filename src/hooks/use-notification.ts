import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { toast } from "sonner";
import { Notification, NotificationService } from '@/services/notification';

const service = new NotificationService();

export type ModalStateNotification =
  | { type: 'create' }
  | { type: 'view'; notification: Notification }
  | { type: 'delete'; notification: Notification }
  | null;


export function useNotification() {
  const queryClient = useQueryClient()
  const [modal, setModal] = useState<ModalStateNotification>(null)

  const { data: notificationList, isLoading, error } = useQuery({
    queryKey: ['notificationList'],
    queryFn: () => service.getNotificationList(),
  })

  const createMutation = useMutation({
    mutationFn: (notification: Partial<Notification>) => service.createNotification(notification),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notificationList'] })
      toast.success('Notificação criada com sucesso.')
    },
    onError: () => {
      toast.error('Não foi possível criar a notificação. Tente novamente mais tarde.'
      );
    },
  })

  const deleteMutation = useMutation({
    mutationFn: (id: string) => service.deleteNotification(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notificationList'] })
      toast.success('Notificação excluída com sucesso.')
    },
    onError: () => {
      toast.error(
        'Não foi possível excluir a notificação. Tente novamente mais tarde.'
      );
    },
  })

  return {
    error,
    modal,
    notificationList,
    isLoading,
    isCreating: createMutation.isPending,
    isDeleting: deleteMutation.isPending,
    setModal,
    createNotification: createMutation.mutateAsync,
    deleteNotification: deleteMutation.mutateAsync,
    onCreate: () => setModal({ type: 'create' }),
    onView: (notification: Notification) => setModal({ type: 'view', notification }),
    onDelete: (notification: Notification) => setModal({ type: 'delete', notification }),
  }
}
