"use client"

import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type Props = {
  nivel: string | null
  status: string | null
  onNivelChange: (value: string | null) => void
  onStatusChange: (value: string | null) => void
}

export function AlagamentosFilters({
  nivel,
  status,
  onNivelChange,
  onStatusChange,
}: Props) {
  function clearFilters() {
    onNivelChange(null)
    onStatusChange(null)
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button variant="outline" onClick={clearFilters}>
        Limpar filtros
      </Button>

      {/* Select Nível */}
      <Select
        key={`nivel-${nivel ?? "empty"}`}
        value={nivel ?? undefined}
        onValueChange={(value) => onNivelChange(value)}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Selecionar nível" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Leve">Leve</SelectItem>
          <SelectItem value="Moderado">Moderado</SelectItem>
          <SelectItem value="Interditado">Interditado</SelectItem>
        </SelectContent>
      </Select>

      {/* Select Status */}
      <Select
        key={`status-${status ?? "empty"}`}
        value={status ?? undefined}
        onValueChange={(value) => onStatusChange(value)}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Selecionar status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Pendente">Pendente</SelectItem>
          <SelectItem value="Concluído">Concluído</SelectItem>
          <SelectItem value="Rejeitado">Rejeitado</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
