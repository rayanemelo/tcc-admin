'use client';

import { ReactNode } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

type Column<T> = {
  header: string;
  cell: (item: T) => ReactNode;
  className?: string;
};

type Action<T> = {
  button: (item: T) => ReactNode;
};

type Props<T> = {
  list: T[] | undefined;
  isLoading: boolean;

  columns: Column<T>[];

  actions?: Action<T>[];

  emptyMessage: string;

  skeleton: ReactNode;
};

export function BaseTable<T>({
  list,
  isLoading,
  columns,
  actions,
  emptyMessage,
  skeleton,
}: Props<T>) {
  if (isLoading) return skeleton;

  if (!list || list.length === 0) {
    return (
      <div className="rounded-xl border border-dashed bg-white p-10 text-center text-sm text-gray-500">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
      <Table>
        {/* Header fixo igual ao seu */}
        <TableHeader>
          <TableRow className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
            {columns.map((col) => (
              <TableHead key={col.header}>{col.header}</TableHead>
            ))}

            {actions && (
              <TableHead className="w-40 text-center">Ações</TableHead>
            )}
          </TableRow>
        </TableHeader>

        {/* Body fixo igual ao seu */}
        <TableBody>
          {list.map((item, index) => (
            <TableRow
              key={index}
              className="
                group transition
                odd:bg-white
                even:bg-gray-50/60
                hover:bg-gray-100
              "
            >
              {/* Cells */}
              {columns.map((col) => (
                <TableCell key={col.header} className={col.className}>
                  {col.cell(item)}
                </TableCell>
              ))}

              {/* Actions */}
              {actions && (
                <TableCell className="text-center">
                  {actions.map((action, i) => (
                    <span key={i}>{action.button(item)}</span>
                  ))}
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
