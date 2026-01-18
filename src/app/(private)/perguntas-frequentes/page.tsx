'use client';

import { Button } from '@/components/ui/button';
import { FaqTable } from './components/faq-table';
import { useFaq } from '@/hooks/use-faq';
import { FaqModalController } from './components/faq-modal-controller';

export default function FaqPage() {
  const {
    faqList,
    isLoading,
    modal,
    setModal,
    onEdit,
    onDelete,
    onView,
    onCreate,
    updateFaq,
    createFaq,
    deleteFaq,
    isCreating,
    isUpdating,
    isDeleting,
  } = useFaq();

  return (
    <div className="min-h-screen bg-slate-50 p-8 space-y-6">
      <div className="flex items-center justify-between bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <header className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Perguntas Frequentes (FAQ)</h1>
          <Button onClick={onCreate}>Adicionar pergunta</Button>
        </header>

        <FaqTable
          list={faqList}
          onView={onView}
          onEdit={onEdit}
          onDelete={onDelete}
          isLoading={isLoading}
        />

        <FaqModalController
          modal={modal}
          createFaq={createFaq}
          updateFaq={updateFaq}
          deleteFaq={deleteFaq}
          isDeleting={isDeleting}
          onClose={() => setModal(null)}
          isSaving={isCreating || isUpdating}
        />
      </div>
    </div>
  );
}
