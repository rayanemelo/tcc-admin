'use client';

import { useRouter } from 'next/navigation';
import { Eye, MapPin } from 'lucide-react';

import { BaseTable } from '@/components/base-table/base-table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { nivelVariant, statusVariant } from '@/utils/styles';

type Item = {
  id: string;
  endereco: string;
  nivel: string;
  status: string;
  data: string;
  lat: number;
  lng: number;
};

type Props = {
  data: Item[];
};

export function AlagamentosTable({ data }: Props) {
  const router = useRouter();

  return (
    <BaseTable<Item>
      list={data}
      isLoading={false}
      skeleton={null}
      emptyMessage="Nenhum relato encontrado com os filtros selecionados."
      columns={[
        {
          header: 'Endereço',
          className: 'max-w-[500px] truncate',
          cell: (item) => (
            <div className="flex flex-col">
              <button
                type="button"
                onClick={() => router.push(`/alagamentos/${item.id}`)}
                className="truncate text-left font-medium text-gray-900 hover:underline"
              >
                {item.endereco}
              </button>
              <span className="text-xs text-gray-400">ID: {item.id}</span>
            </div>
          ),
        },
        {
          header: 'Nível',
          cell: (item) => (
            <Badge className={nivelVariant(item.nivel)}>{item.nivel}</Badge>
          ),
        },
        {
          header: 'Status',
          cell: (item) => (
            <Badge className={statusVariant(item.status)}>{item.status}</Badge>
          ),
        },
        {
          header: 'Data',
          cell: (item) => (
            <span className="text-xs text-gray-700">{item.data}</span>
          ),
        },
      ]}
      actions={[
        {
          button: (item) => (
            <Button
              variant="ghost"
              size="icon"
              className="text-blue-500 hover:bg-blue-50 hover:text-blue-600"
              onClick={() => router.push(`/alagamentos/${item.id}`)}
            >
              <Eye className="h-4 w-4" />
            </Button>
          ),
        },
        {
          button: (item) => (
            <Button
              variant="ghost"
              size="icon"
              className="text-red-500 hover:bg-red-50 hover:text-red-600"
              onClick={() =>
                window.open(
                  `https://www.google.com/maps?q=${item.lat},${item.lng}`,
                  '_blank'
                )
              }
            >
              <MapPin className="h-4 w-4" />
            </Button>
          ),
        },
      ]}
    />
  );
}
