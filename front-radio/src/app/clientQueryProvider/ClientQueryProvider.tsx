"use client";

import { QueryClient, QueryClientProvider, Hydrate  } from 'react-query';
import { ReactNode } from 'react';
import { DehydratedState } from 'react-query';
// import { ReactQueryDevtools } from 'react-query/devtools'; {/**Uso deve ser feito apenas em ambiente de desenvolvimento */}

const queryClient = new QueryClient();

interface ClientQueryProviderProps {
  children: ReactNode;
  dehydratedState?: DehydratedState;
}

const ClientQueryProvider = ({ children, dehydratedState }: ClientQueryProviderProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={dehydratedState}>
        {children}
      </Hydrate>
      {/* <ReactQueryDevtools initialIsOpen={false}/> *Uso deve ser feito apenas em ambiente de desenvolvimento */}
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

/**
 * dehydratedState: Este estado é passado do lado do servidor (por exemplo, de getServerSideProps ou getStaticProps 
 * em Next.js) e usado pelo Hydrate para preencher o cache do React Query com dados já carregados.
 */

/**
 * Como tudo funciona?
 * 
 * O componente Hydrate usa o dehydratedState para hidratar o cache do react query ao lado do cliente
 * e isso aconte neste componente: <QueryClientProvider /> HOC que recebe o <Hydrate />, isso já é
 * a pré configuração para manter os dados em cache
 * 
 * Então ao fazer o request com o getServerSideProps() armazenamos os dados obtido do request em cache, 
 * isso acontece na linha(arquivo ListRadioStations.tsx): await queryClient.prefetchQuery(['stations', currentPage], () => fetchStationsApi(currentPage));
 * 
 * Por fim ao utilizar o hook useStation que eu personalizei para buscar dados, ele já irá verificar se há dados no cache
 * const { data, error, isLoading } = useStations(currentPage);
 * essa linha acima é a responsável por ir no cache e verificar se há em cache evitando requests desnecessários
 * 
 */

