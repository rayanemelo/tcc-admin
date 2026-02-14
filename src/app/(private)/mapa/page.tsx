'use client';

import { useMemo } from 'react';
import 'leaflet/dist/leaflet.css';
import dynamic from 'next/dynamic';
import { useFloodArea } from '@/hooks/use-flood-area';
import { mapFloodLevel, mapStatus } from '@/utils/mapping';

const LeafletMap = dynamic(
  () => import('@/components/leaflet-map/leaflet-map'),
  {
    ssr: false,
  }
);

export default function MapaPage() {
  const { floodAreaList, isLoading, error } = useFloodArea();

  const mapData = useMemo(() => {
    return (floodAreaList ?? [])
      .map((item) => ({
        id: item.id,
        address: item.address,
        latitude: Number(item.latitude),
        longitude: Number(item.longitude),
        status: mapStatus(item.status),
        level: mapFloodLevel(item.floodLevelId),
      }))
      .filter(
        (item) =>
          Number.isFinite(item.latitude) && Number.isFinite(item.longitude)
      );
  }, [floodAreaList]);

  return (
    <div className="space-y-4 p-6">
      <h1 className="text-2xl font-semibold">Mapa de Alagamentos</h1>

      <div className="h-150 w-full overflow-hidden rounded-lg border">
        {isLoading ? (
          <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
            Carregando mapa...
          </div>
        ) : error ? (
          <div className="flex h-full items-center justify-center text-sm text-red-500">
            Não foi possível carregar os alagamentos.
          </div>
        ) : (
          <LeafletMap floodAreas={mapData} />
        )}
      </div>
    </div>
  );
}
