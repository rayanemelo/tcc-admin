'use client';

import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { nivelVariant, statusVariant } from '@/utils/styles';
import { IAAnalysis } from '@/components/ia-analysis/ia-analysis';

const MOCK_DETAIL = {
  id: '1',
  endereco: 'Rua General Frota, Centro, Taquara, RS',
  nivel: 'Leve',
  status: 'Pendente',
  dataCriacao: '19/02/2025 às 20h45',
  coordenadas: {
    latitude: -29.6509,
    longitude: -50.7814,
  },
  coordenadasUsuario: {
    latitude: -29.6509,
    longitude: -50.7814,
  },
  imagemUrl:
    'https://images.unsplash.com/photo-1639164631432-fe23c2cfcee7?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
};

export default function AlagamentoDetalhesPage() {
  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-semibold">Análise de Alagamentos</h1>

      <Card>
        <CardContent className="grid gap-6 md:grid-cols-[500px_1fr] ">
          {/* Imagem */}
          <div className="relative aspect-3/4 max-w-125 w-full overflow-hidden rounded-lg border">
            <Image
              src={MOCK_DETAIL.imagemUrl}
              alt="Imagem do alagamento"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 500px"
            />
          </div>

          {/* Informações */}
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">
                Endereço
              </h3>
              <p className="text-sm">{MOCK_DETAIL.endereco}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground">
                Coordenadas
              </h3>
              <p className="text-sm">
                Latitude: {MOCK_DETAIL.coordenadas.latitude}
              </p>
              <p className="text-sm">
                Longitude: {MOCK_DETAIL.coordenadas.longitude}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground">
                Coordenadas do usuário
              </h3>
              <p className="text-sm">
                Latitude: {MOCK_DETAIL.coordenadasUsuario.latitude}
              </p>
              <p className="text-sm">
                Longitude: {MOCK_DETAIL.coordenadasUsuario.longitude}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground">
                Nível
              </h3>
              <Badge className={nivelVariant(MOCK_DETAIL.nivel)}>
                {MOCK_DETAIL.nivel}
              </Badge>
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground">
                Status
              </h3>
              <Badge className={statusVariant(MOCK_DETAIL.status)}>
                {MOCK_DETAIL.status}
              </Badge>
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground">
                Data de criação
              </h3>
              <p className="text-sm">{MOCK_DETAIL.dataCriacao}</p>
            </div>
            <IAAnalysis />

            {/* Comentário do gestor */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Comentário do gestor</h3>
              <Textarea
                placeholder="Adicione um comentário sobre este relato (opcional)"
                className="min-h-[100px]"
              />
            </div>

            {/* Ações */}
            <div className="flex gap-3 pt-4">
              <Button variant="outline" className="flex-1">
                Rejeitar
              </Button>

              <Button className="flex-1">Aprovar</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
