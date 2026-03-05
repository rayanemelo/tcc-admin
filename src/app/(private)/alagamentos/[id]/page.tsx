'use client';

import { useMemo, useRef } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { nivelVariant, statusVariant } from '@/utils/styles';
import { IAAnalysis } from '@/components/ia-analysis/ia-analysis';
import { useFloodArea } from '@/hooks/use-flood-area';
import { formatDateTime } from '@/utils/format-date-time';
import { FloodAreaStatus } from '@/services/flood-area';
import { mapFloodLevel, mapStatus } from '@/utils/mapping';

const FALLBACK_IMAGE_URL =
  'https://images.unsplash.com/photo-1639164631432-fe23c2cfcee7?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

export default function AlagamentoDetalhesPage() {
  const { t } = useTranslation();
  const params = useParams<{ id: string }>();
  const id = useMemo(() => Number(params.id), [params.id]);
  const commentRef = useRef<HTMLTextAreaElement>(null);
  const { getFloodAreaById, updateFloodArea, isUpdating } = useFloodArea();

  const {
    data: floodArea,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['floodAreaById', id],
    queryFn: () => getFloodAreaById(id),
    enabled: Number.isFinite(id),
  });

  async function handleUpdateStatus(status: FloodAreaStatus) {
    if (!floodArea) return;

    await updateFloodArea({
      id: floodArea.id,
      active: status === 'completed',
      status,
      commentsAdmin: commentRef.current?.value?.trim() || null,
    });
  }

  function translateFloodLevel(level: string) {
    switch (level) {
      case 'Leve':
        return t('flood-level.light');
      case 'Moderado':
        return t('flood-level.moderate');
      case 'Interditado':
        return t('flood-level.interdicted');
      default:
        return level;
    }
  }

  function translateFloodStatus(status: string) {
    switch (status) {
      case 'Pendente':
        return t('flood-status.pending');
      case 'Concluído':
        return t('flood-status.completed');
      case 'Rejeitado':
        return t('flood-status.rejected');
      default:
        return status;
    }
  }

  if (!Number.isFinite(id)) {
    return (
      <div className="space-y-6 p-6">
        <h1 className="text-2xl font-semibold">{t('menu.alagamentos')}</h1>
        <div className="rounded-md border bg-white p-6 text-sm text-red-500">
          {t('alagamentos.details.invalid-id')}
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="space-y-6 p-6">
        <h1 className="text-2xl font-semibold">{t('menu.alagamentos')}</h1>
        <div className="rounded-md border bg-white p-6 text-sm text-muted-foreground">
          {t('alagamentos.details.loading')}
        </div>
      </div>
    );
  }

  if (error || !floodArea) {
    return (
      <div className="space-y-6 p-6">
        <h1 className="text-2xl font-semibold">{t('menu.alagamentos')}</h1>
        <div className="rounded-md border bg-white p-6 text-sm text-red-500">
          {t('alagamentos.details.load-error')}
        </div>
      </div>
    );
  }

  const nivel = mapFloodLevel(floodArea.floodLevelId);
  const status = mapStatus(floodArea.status);
  const imageUrl = floodArea.images?.[0]?.url ?? FALLBACK_IMAGE_URL;

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-semibold">{t('menu.alagamentos')}</h1>

      <Card>
        <CardContent className="grid gap-6 md:grid-cols-[500px_1fr] ">
          <div className="relative aspect-3/4 max-w-125 w-full overflow-hidden rounded-lg border">
            <Image
              src={imageUrl}
              alt={t('alagamentos.details.image-alt')}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 500px"
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">
                {t('table.address')}
              </h3>
              <p className="text-sm">{floodArea.address}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground">
                {t('alagamentos.details.coordinates')}
              </h3>
              <p className="text-sm">
                {t('alagamentos.details.latitude')}: {floodArea.latitude}
              </p>
              <p className="text-sm">
                {t('alagamentos.details.longitude')}: {floodArea.longitude}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground">
                {t('table.level')}
              </h3>
              <Badge className={nivelVariant(nivel)}>
                {translateFloodLevel(nivel)}
              </Badge>
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground">
                {t('table.status')}
              </h3>
              <Badge className={statusVariant(status)}>
                {translateFloodStatus(status)}
              </Badge>
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground">
                {t('alagamentos.details.created-at')}
              </h3>
              <p className="text-sm">{formatDateTime(floodArea.createdAt)}</p>
            </div>
            <div className="md:col-span-2">
              <IAAnalysis />
            </div>

            <div className="space-y-2 md:col-span-2">
              <h3 className="text-sm font-medium">
                {t('alagamentos.details.manager-comment')}
              </h3>
              <Textarea
                placeholder={t('alagamentos.details.comment-placeholder')}
                className="min-h-25"
                defaultValue={floodArea.commentsAdmin ?? ''}
                ref={commentRef}
              />
            </div>

            <div className="flex gap-3 pt-4 md:col-span-2">
              <Button
                variant="outline"
                className="flex-1"
                disabled={isUpdating}
                onClick={() => handleUpdateStatus('rejected')}
              >
                {t('actions.reject')}
              </Button>

              <Button
                className="flex-1 bg-[#3B6790] hover:bg-[#3B6790]/90 text-white"
                disabled={isUpdating}
                onClick={() => handleUpdateStatus('completed')}
              >
                {t('actions.approve')}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
