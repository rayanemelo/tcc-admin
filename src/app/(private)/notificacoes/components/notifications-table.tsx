'use client';

import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Eye, Trash } from 'lucide-react';
import { Notification } from '../page';

type Props = {
  data: Notification[];
  onView: (n: Notification) => void;
  onDelete: (n: Notification) => void;
};

export function NotificationsTable({ data, onView, onDelete }: Props) {
  return (
    <div className="rounded-md border bg-white">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Conteúdo</TableHead>
            <TableHead>Criado em</TableHead>
            <TableHead className="w-[120px] text-center">Ações</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map((n) => (
            <TableRow key={n.id}>
              <TableCell className="max-w-[500px] truncate">
                {n.content}
              </TableCell>

              <TableCell>{n.createdAt}</TableCell>

              <TableCell className="text-center space-x-1">
                <Button variant="ghost" size="icon" onClick={() => onView(n)}>
                  <Eye className="h-4 w-4" />
                </Button>

                <Button variant="ghost" size="icon" onClick={() => onDelete(n)}>
                  <Trash className="h-4 w-4 text-red-500" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
