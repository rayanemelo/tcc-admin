'use client';
import { Toaster } from '@/components/ui/sonner';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      <Toaster position="top-right" />
    </>
  );
}
