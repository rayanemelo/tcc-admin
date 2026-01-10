'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { NotificationsTable } from './components/notifications-table';
import { NotificationFormModal } from './components/notification-form-modal';
import { NotificationViewModal } from './components/notification-view-modal';
import { NotificationDeleteModal } from './components/notification-delete-modal';

export type Notification = {
  id: string;
  content: string;
  createdAt: string;
};
// FIXME: Remove mock data and integrate with backend API
export const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    content: 'Risco de enchente na sua região. Fique atento!',
    createdAt: '20/01/2025',
  },
  {
    id: '2',
    content: 'Nível do rio subiu 20cm nas últimas 12 horas.',
    createdAt: '20/01/2025',
  },
  {
    id: '3',
    content: 'Alerta de chuva forte para as próximas horas.',
    createdAt: '20/01/2025',
  },
  {
    id: '4',
    content: 'Equipe de monitoramento enviou novas imagens da região.',
    createdAt: '20/01/2025',
  },
  {
    id: '5',
    content:
      'Alerta de evacuação preventiva. Siga as instruções da Defesa Civil.',
    createdAt: '20/01/2025',
  },
  {
    id: '6',
    content: 'Ruas alagadas nas proximidades. Evite transitar pela região.',
    createdAt: '20/01/2025',
  },
  {
    id: '7',
    content:
      'Atualização: situação está sob controle, mas continue acompanhando.',
    createdAt: '20/01/2025',
  },
  {
    id: '8',
    content:
      'Seu relato foi analisado por nossa equipe. Obrigado pela contribuição!',
    createdAt: '20/01/2025',
  },
  {
    id: '9',
    content: 'Previsão indica melhora no tempo nas próximas 24h.',
    createdAt: '20/01/2025',
  },
  {
    id: '10',
    content:
      'Monitoramento constante sendo realizado pela nossa equipe técnica.',
    createdAt: '20/01/2025',
  },
];

export default function NotificationsPage() {
  const [data, setData] = useState<Notification[]>(MOCK_NOTIFICATIONS);
  const [selected, setSelected] = useState<Notification | null>(null);
  const [openForm, setOpenForm] = useState(false);
  const [openView, setOpenView] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  function handleAdd(notification: Notification) {
    setData((prev) => [...prev, notification]);
  }

  function handleDelete() {
    if (!selected) return;
    setData((prev) => prev.filter((n) => n.id !== selected.id));
    setOpenDelete(false);
  }

  return (
    <div className="space-y-6 p-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Notificações</h1>

        <Button onClick={() => setOpenForm(true)}>Nova notificação</Button>
      </header>

      <NotificationsTable
        data={data}
        onView={(n) => {
          setSelected(n);
          setOpenView(true);
        }}
        onDelete={(n) => {
          setSelected(n);
          setOpenDelete(true);
        }}
      />

      <NotificationFormModal
        open={openForm}
        onClose={() => setOpenForm(false)}
        onSave={handleAdd}
      />

      <NotificationViewModal
        open={openView}
        notification={selected}
        onClose={() => setOpenView(false)}
      />

      <NotificationDeleteModal
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
}
