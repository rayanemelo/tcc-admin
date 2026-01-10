"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { FaqFormModal } from "./components/faq-form-modal"
import { FaqDeleteModal } from "./components/faq-delete-modal"
import { FaqTable } from "./components/faq-table"
import { FaqViewModal } from "./components/faq-view-modal"

export type Faq = {
  id: string
  question: string
  answer: string
  createdAt: string
  updatedAt: string
}

// FIXME: Remove mock data and integrate with backend API
export const MOCK_FAQ = [
  {
    id: "1",
    question: "Como funciona a autenticação via SMS?",
    answer:
      "Após inserir seu número de celular, você receberá um código de verificação por SMS. Digite esse código no aplicativo para fazer login. Isso garante que apenas usuários autenticados possam acessar determinadas funcionalidades do aplicativo.",
    createdAt: "20/01/2025",
    updatedAt: "20/01/2025",
  },
  {
    id: "2",
    question: "Como posso marcar um ponto de alagamento?",
    answer:
      "Para marcar um ponto de alagamento:\n1. Acesse o mapa interativo.\n2. Selecione o local onde ocorreu o alagamento.\n3. Envie uma imagem que comprove o alagamento.\n4. Escolha o nível de gravidade (leve, moderado ou interditado).\n5. Confirme sua localização, caso ainda não tenha compartilhado.\n\nApós enviar, você verá uma mensagem informando que sua marcação está em análise.",
    createdAt: "20/01/2025",
    updatedAt: "20/01/2025",
  },
  {
    id: "3",
    question: "Como posso visualizar os pontos de alagamento registrados?",
    answer:
      "O aplicativo exibe todos os pontos de alagamento registrados em tempo real no mapa interativo. Você pode clicar em cada ponto para visualizar informações detalhadas, como data da marcação, nível de gravidade e fotos enviadas pelos usuários.",
    createdAt: "20/01/2025",
    updatedAt: "20/01/2025",
  },
  {
    id: "4",
    question:
      "O que acontece quando recebo um alerta sobre um ponto de alagamento?",
    answer:
      "Quando você estiver próximo a um ponto de alagamento, receberá um alerta perguntando se o local ainda está alagado. Você pode responder \"Sim\" ou \"Não\". Sua resposta será registrada e ajudará a manter as informações atualizadas.",
    createdAt: "20/01/2025",
    updatedAt: "20/01/2025",
  },
  {
    id: "5",
    question: "Como posso visualizar meu histórico de envios?",
    answer:
      "Você pode acessar a tela de histórico no aplicativo, onde encontrará uma lista de todas as suas marcações. Cada entrada inclui a data e hora do envio, bem como o status da análise (aprovado, rejeitado ou pendente).",
    createdAt: "20/01/2025",
    updatedAt: "20/01/2025",
  },
  {
    id: "6",
    question: "O que são notificações e como funcionam?",
    answer:
      "As notificações são mensagens enviadas pelo administrador do sistema sobre condições climáticas adversas ou áreas em risco de alagamento. Você poderá visualizar essas notificações diretamente no aplicativo.",
    createdAt: "20/01/2025",
    updatedAt: "20/01/2025",
  },
  {
    id: "7",
    question:
      "Como posso relatar um problema técnico ou fornecer feedback?",
    answer:
      "Se você encontrar algum problema técnico ou tiver sugestões, pode acessar este formulário: link. Aqui, você poderá enviar seu feedback ou relatar problemas diretamente à equipe responsável.",
    createdAt: "20/01/2025",
    updatedAt: "20/01/2025",
  },
  {
    id: "8",
    question:
      "O que devo fazer se não receber o código de verificação por SMS?",
    answer:
      "Se você não receber o código de verificação, verifique se o número de celular informado está correto e se você tem sinal. Caso o problema persista, tente solicitar o código novamente. Se ainda assim não funcionar, entre em contato com o suporte técnico.",
    createdAt: "20/01/2025",
    updatedAt: "20/01/2025",
  },
  {
    id: "9",
    question: "O aplicativo é gratuito?",
    answer:
      "Sim, o aplicativo é gratuito para download e uso. No entanto, é importante que você tenha acesso a dados móveis ou Wi-Fi para utilizar todas as funcionalidades.",
    createdAt: "20/01/2025",
    updatedAt: "20/01/2025",
  },
]

export default function FaqPage() {
  const [data, setData] = useState<Faq[]>(MOCK_FAQ)
  const [selectedFaq, setSelectedFaq] = useState<Faq | null>(null)
  const [openForm, setOpenForm] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const [viewFaq, setViewFaq] = useState<Faq | null>(null)
  const [openView, setOpenView] = useState(false)


  function handleSave(faq: Faq) {
    setData((prev) =>
      prev.some((f) => f.id === faq.id)
        ? prev.map((f) => (f.id === faq.id ? faq : f))
        : [...prev, faq]
    )
  }

  function handleDelete() {
    if (!selectedFaq) return
    setData((prev) => prev.filter((f) => f.id !== selectedFaq.id))
    setOpenDelete(false)
  }

  return (
    <div className="space-y-6 p-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">
          Perguntas Frequentes (FAQ)
        </h1>

        <Button onClick={() => {
          setSelectedFaq(null)
          setOpenForm(true)
        }}>
          Adicionar pergunta
        </Button>
      </header>

      <FaqTable
        data={data}
        onEdit={(faq) => {
          setSelectedFaq(faq)
          setOpenForm(true)
        }}
        onDelete={(faq) => {
          setSelectedFaq(faq)
          setOpenDelete(true)
        }}
        onView={(faq) => {
          setViewFaq(faq)
          setOpenView(true)
        }}
      />

      <FaqViewModal
        open={openView}
        faq={viewFaq}
        onClose={() => setOpenView(false)}
      />

      <FaqFormModal
        key={selectedFaq?.id ?? "new"}
        open={openForm}
        faq={selectedFaq}
        onClose={() => setOpenForm(false)}
        onSave={handleSave}
      />

      <FaqDeleteModal
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        onConfirm={handleDelete}
      />
    </div>
  )
}
