"use client";

import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

const ClientQueryProvider = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

export default ClientQueryProvider;

/**
 * O `ClientQueryProvider` é utilizado para envolver a aplicação com o `QueryClientProvider` do React Query.
 * Isso é necessário porque o `QueryClientProvider` requer um ambiente de cliente para funcionar corretamente.
 * Como o Next.js permite a execução de código no servidor e no cliente, envolver a aplicação com um componente
 * específico para o cliente garante que o `QueryClientProvider` seja usado apenas no lado do cliente,
 * evitando erros de execução no lado do servidor.
 */

