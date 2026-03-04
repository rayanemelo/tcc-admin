'use client';

import { Button } from '@/components/ui/button';
import { Eye, Trash } from 'lucide-react';

import { BaseTable } from '@/components/base-table/base-table';
import { Notification } from '@/services/notification';
import { formatDateTime } from '@/utils/format-date-time';

type Props = {
  data: Notification[] | undefined;
  isLoading: boolean;
  onView: (n: Notification) => void;
  onDelete: (n: Notification) => void;
};

export function NotificationsTable({
  data,
  isLoading,
  onView,
  onDelete,
}: Props) {
  return (
    <BaseTable<Notification>
      list={data}
      isLoading={isLoading}
      skeleton={null}
      emptyMessage="Nenhuma notificação encontrada."
      columns={[
        {
          header: 'Conteúdo',
          className: 'max-w-[500px] truncate',
          cell: (n) => (
            <div className="flex flex-col">
              <span className="truncate font-medium text-slate-900 dark:text-slate-100">
                {n.content}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                ID: {n.id}
              </span>
            </div>
          ),
        },
        {
          header: 'Criado em',
          cell: (n) => (
            <span className="text-xs text-slate-700 dark:text-slate-300">
              {formatDateTime(n.createdAt)}
            </span>
          ),
        },
      ]}
      actions={[
        {
          button: (n) => (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onView(n)}
              className="text-blue-600 hover:bg-blue-50 hover:text-blue-700 dark:text-blue-400 dark:hover:bg-blue-500/15 dark:hover:text-blue-300"
            >
              <Eye className="h-4 w-4 " />
            </Button>
          ),
        },
        {
          button: (n) => (
            <Button
              variant="ghost"
              size="icon"
              className="text-red-600 hover:bg-red-50 hover:text-red-700 dark:text-red-400 dark:hover:bg-red-500/15 dark:hover:text-red-300"
              onClick={() => onDelete(n)}
            >
              <Trash className="h-4 w-4" />
            </Button>
          ),
        },
      ]}
    />
  );
}
