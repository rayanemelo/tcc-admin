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
import { Faq } from '@/services/faq';
import { formatDateTime } from '@/utils/format-date-time';
import { Pencil, Trash, Eye } from 'lucide-react';

type Props = {
  list: Faq[] | undefined;
  isLoading: boolean;
  onEdit: (faq: Faq) => void;
  onDelete: (faq: Faq) => void;
  onView: (faq: Faq) => void;
};

export function FaqTable({ list, onEdit, onDelete, onView, isLoading }: Props) {
  if (isLoading) {
    return <FaqTableSkeleton />;
  }

  if (!list || list.length === 0) {
    return (
      <div className="rounded-md border bg-white p-6 text-center text-gray-500">
        Nenhuma pergunta frequente encontrada.
      </div>
    );
  }

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
          {list.map((faq) => (
            <TableRow key={faq.id}>
              <TableCell className="max-w-75 truncate">
                {faq.question}
              </TableCell>

              <TableCell className="max-w-75 truncate">{faq.answer}</TableCell>

              <TableCell>{formatDateTime(faq.createdAt)}</TableCell>
              <TableCell>{formatDateTime(faq.updatedAt)}</TableCell>

              <TableCell className="text-center space-x-1">
                <Button variant="ghost" size="icon" onClick={() => onView(faq)}>
                  <Eye className="h-4 w-4" />
                </Button>

                <Button variant="ghost" size="icon" onClick={() => onEdit(faq)}>
                  <Pencil className="h-4 w-4" />
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onDelete(faq)}
                >
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
                  <div className="h-8 w-8 rounded-full bg-gray-200" />
                  <div className="h-8 w-8 rounded-full bg-gray-200" />
                  <div className="h-8 w-8 rounded-full bg-gray-200" />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
