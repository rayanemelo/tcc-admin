"use client"

import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Pencil, Trash, Eye } from "lucide-react"
import { Faq } from "../page"

type Props = {
  data: Faq[]
  onEdit: (faq: Faq) => void
  onDelete: (faq: Faq) => void
  onView: (faq: Faq) => void
}

export function FaqTable({ data, onEdit, onDelete, onView }: Props) {
  return (
    <div className="rounded-md border bg-white">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Pergunta</TableHead>
            <TableHead>Resposta</TableHead>
            <TableHead>Criado em</TableHead>
            <TableHead>Atualizado em</TableHead>
            <TableHead className="w-[160px] text-center">
              Ações
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map((faq) => (
            <TableRow key={faq.id}>
              <TableCell className="max-w-[300px] truncate">
                {faq.question}
              </TableCell>

              <TableCell className="max-w-[300px] truncate">
                {faq.answer}
              </TableCell>

              <TableCell>{faq.createdAt}</TableCell>
              <TableCell>{faq.updatedAt}</TableCell>

              <TableCell className="text-center space-x-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onView(faq)}
                >
                  <Eye className="h-4 w-4" />
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onEdit(faq)}
                >
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
  )
}
