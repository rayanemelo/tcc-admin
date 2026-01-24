'use client';

import { Button } from '@/components/ui/button';
import { NotificationModalController } from './components/notification-modal-controller';
import { Separator } from '@/components/ui/separator';
import { PlusIcon } from 'lucide-react';
import { useNotification } from '@/hooks/use-notification';
import { NotificationsTable } from './components/notifications-table';

export default function NotificationPage() {
  const {
    notificationList,
    isLoading,
    modal,
    setModal,
    onDelete,
    onView,
    onCreate,
    createNotification,
    deleteNotification,
    isCreating,
    isDeleting,
  } = useNotification();

  return (
    <div className="space-y-6 p-6">
      <header className="flex items-center justify-between">
        <div className="flex flex-col">
          <h1 className="text-2xl font-semibold text-gray-900">Notificações</h1>
        </div>
        <Button
          onClick={onCreate}
          className="flex items-center gap-2 bg-[#3B6790] text-white hover:bg-[#2C4F6E]"
        >
          <PlusIcon className="text-white" />
          Nova notificação
        </Button>
      </header>
      <Separator />

      <NotificationsTable
        data={notificationList}
        onView={onView}
        onDelete={onDelete}
        isLoading={isLoading}
      />

      <NotificationModalController
        modal={modal}
        createNotification={createNotification}
        deleteNotification={deleteNotification}
        isDeleting={isDeleting}
        onClose={() => setModal(null)}
        isSaving={isCreating}
      />
    </div>
  );
}
