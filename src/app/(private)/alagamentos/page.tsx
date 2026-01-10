"use client"

import { useMemo, useState } from "react"
import { AlagamentosFilters } from "./components/alagamentos-filters"
import { AlagamentosTable } from "./components/alagamentos-table"

// FIXME: Remove mock data and integrate with backend API
const MOCK_DATA = [
  {
    id: "1",
    endereco: "Rua General Frota",
    nivel: "Leve",
    status: "Concluído",
    data: "19/05/2025 às 20h",
    lat: -29.6509,
    lng: -50.7814,
  },
  {
    id: "2",
    endereco: "Rua Pinheiro Machado",
    nivel: "Interditado",
    status: "Pendente",
    data: "22/03/2025 às 14h",
    lat: -29.6501,
    lng: -50.7852,
  },
  {
    id: "3",
    endereco: "Av. Sebastião Amoreti",
    nivel: "Moderado",
    status: "Rejeitado",
    data: "15/02/2025 às 17h",
    lat: -29.6468,
    lng: -50.7921,
  },
]


export default function AlagamentosPage() {
  const [nivel, setNivel] = useState<string | null>(null)
  const [status, setStatus] = useState<string | null>(null)

  const filteredData = useMemo(() => {
    return MOCK_DATA.filter((item) => {
      const matchNivel = nivel ? item.nivel === nivel : true
      const matchStatus = status ? item.status === status : true

      return matchNivel && matchStatus
    })
  }, [nivel, status])

  return (
    <div className="space-y-6 p-6">
      <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl font-semibold">
          Análise de Alagamentos
        </h1>

        <AlagamentosFilters
          nivel={nivel}
          status={status}
          onNivelChange={setNivel}
          onStatusChange={setStatus}
        />
      </header>

      <AlagamentosTable data={filteredData} />
    </div>
  )
}
