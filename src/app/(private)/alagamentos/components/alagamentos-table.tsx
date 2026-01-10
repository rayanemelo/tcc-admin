"use client"

import { useRouter } from "next/navigation"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye, MapPin } from "lucide-react"
import { nivelVariant, statusVariant } from "@/utils/styles"

type Item = {
  id: string
  endereco: string
  nivel: string
  status: string
  data: string
  lat: number
  lng: number
}

type Props = {
  data: Item[]
}

export function AlagamentosTable({ data }: Props) {
  const router = useRouter()

  if (data.length === 0) {
    return (
      <div className="rounded-md border bg-white p-6 text-center text-sm text-muted-foreground">
        Nenhum relato encontrado com os filtros selecionados.
      </div>
    )
  }

  return (
    <div className="rounded-md border bg-white">
      <Table>
        <TableHeader className="bg-muted/50">
          <TableRow>
            <TableHead>Endereço</TableHead>
            <TableHead>Nível</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Data</TableHead>
            <TableHead className="w-[120px] text-center">Ações</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map((item) => (
            <TableRow
              key={item.id}
              onClick={() => router.push(`/alagamentos/${item.id}`)}
              className="cursor-pointer hover:bg-muted/50"
            >
              <TableCell>{item.endereco}</TableCell>

              <TableCell>
                <Badge className={nivelVariant(item.nivel)}>
                  {item.nivel}
                </Badge>
              </TableCell>

              <TableCell>
                <Badge className={statusVariant(item.status)}>
                  {item.status}
                </Badge>
              </TableCell>

              <TableCell>{item.data}</TableCell>

              {/* Ações */}
              <TableCell
                className="flex justify-center gap-1"
                onClick={(e) => e.stopPropagation()}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() =>
                    router.push(`/alagamentos/${item.id}`)
                  }
                >
                  <Eye className="h-4 w-4" />
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() =>
                    window.open(
                      `https://www.google.com/maps?q=${item.lat},${item.lng}`,
                      "_blank"
                    )
                  }
                >
                  <MapPin className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
