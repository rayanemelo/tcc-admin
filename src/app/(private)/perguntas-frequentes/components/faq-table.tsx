import { Button } from '@/components/ui/button';
import { Eye, Pencil, Trash } from 'lucide-react';

import { formatDateTime } from '@/utils/format-date-time';
import { Faq } from '@/services/faq';
import { BaseTable } from '@/components/base-table/base-table';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
type Props = {
  list: Faq[] | undefined;
  isLoading: boolean;
  onEdit: (faq: Faq) => void;
  onDelete: (faq: Faq) => void;
  onView: (faq: Faq) => void;
};

export function FaqTable({ list, isLoading, onEdit, onDelete, onView }: Props) {
  return (
    <BaseTable<Faq>
      list={list}
      isLoading={isLoading}
      skeleton={<FaqTableSkeleton />}
      emptyMessage="Nenhuma pergunta frequente encontrada."
      columns={[
        {
          header: 'Pergunta',
          className: 'max-w-[260px]',
          cell: (faq) => (
            <div className="flex flex-col">
              <span className="truncate font-medium text-gray-900">
                {faq.question}
              </span>
              <span className="text-xs text-gray-400">ID: {faq.id}</span>
            </div>
          ),
        },
        {
          header: 'Resposta',
          className: 'max-w-[320px]',
          cell: (faq) => (
            <p className="truncate text-sm text-gray-600">{faq.answer}</p>
          ),
        },
        {
          header: 'Criado',
          cell: (faq) => (
            <span className="text-xs text-gray-700">
              {formatDateTime(faq.createdAt)}
            </span>
          ),
        },
        {
          header: 'Atualizado',
          cell: (faq) => (
            <span className="text-xs text-gray-700">
              {formatDateTime(faq.updatedAt)}
            </span>
          ),
        },
      ]}
      actions={[
        {
          button: (faq) => (
            <Button
              variant="ghost"
              size="icon"
              className="text-blue-500 hover:bg-blue-50 hover:text-blue-600"
              onClick={() => onView(faq)}
            >
              <Eye className="h-4 w-4" />
            </Button>
          ),
        },
        {
          button: (faq) => (
            <Button
              variant="ghost"
              size="icon"
              className="text-amber-500 hover:bg-amber-50 hover:text-amber-600"
              onClick={() => onEdit(faq)}
            >
              <Pencil className="h-4 w-4" />
            </Button>
          ),
        },
        {
          button: (faq) => (
            <Button
              variant="ghost"
              size="icon"
              className="text-red-500 hover:bg-red-50 hover:text-red-600"
              onClick={() => onDelete(faq)}
            >
              <Trash className="h-4 w-4" />
            </Button>
          ),
        },
      ]}
    />
  );
}

export function FaqTableSkeleton() {
  return (
    <div className="rounded-md border bg-white">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Pergunta</TableHead>
            <TableHead>Resposta</TableHead>
            <TableHead>Criado em</TableHead>
            <TableHead>Atualizado em</TableHead>
            <TableHead className="w-40 text-center">Ações</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {[...Array(5)].map((_, index) => (
            <TableRow key={index} className="animate-pulse">
              <TableCell>
                <div className="h-4 w-3/4 rounded bg-gray-200" />
              </TableCell>

              <TableCell>
                <div className="h-4 w-3/4 rounded bg-gray-200" />
              </TableCell>

              <TableCell>
                <div className="h-4 w-1/2 rounded bg-gray-200" />
              </TableCell>

              <TableCell>
                <div className="h-4 w-1/2 rounded bg-gray-200" />
              </TableCell>

              <TableCell className="text-center">
                <div className="inline-flex space-x-1">
                  <div className="h-8 w-8 rounded bg-gray-200" />
                  <div className="h-8 w-8 rounded bg-gray-200" />
                  <div className="h-8 w-8 rounded bg-gray-200" />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
