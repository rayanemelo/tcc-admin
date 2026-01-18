'use client';

import 'leaflet/dist/leaflet.css';
import dynamic from 'next/dynamic';

export type FloodArea = {
  id: number;
  address: string;
  latitude: number;
  longitude: number;
  status: 'Pendente' | 'Aprovado' | 'Rejeitado';
  level: 'Leve' | 'Moderado' | 'Interditado';
};

export const MOCK_FLOOD_AREAS: FloodArea[] = [
  {
    id: 1,
    address: 'Rua General Frota, Taquara - RS',
    latitude: -29.6509,
    longitude: -50.7814,
    status: 'Pendente',
    level: 'Leve',
  },
  {
    id: 2,
    address: 'Rua Pinheiro Machado, Taquara - RS',
    latitude: -29.6518,
    longitude: -50.7852,
    status: 'Aprovado',
    level: 'Interditado',
  },
  {
    id: 3,
    address: 'Av. Sebastião Amoreti, Taquara - RS',
    latitude: -29.6468,
    longitude: -50.7921,
    status: 'Aprovado',
    level: 'Moderado',
  },
];

const LeafletMap = dynamic(
  () => import('@/components/leaflet-map/leaflet-map'),
  {
    ssr: false,
  }
);

export default function MapaPage() {
  return (
    <div className="space-y-4 p-6">
      <h1 className="text-2xl font-semibold">Mapa de Alagamentos</h1>

      <div className="h-[600px] w-full overflow-hidden rounded-lg border">
        <LeafletMap floodAreas={MOCK_FLOOD_AREAS} />
      </div>
    </div>
  );
}
