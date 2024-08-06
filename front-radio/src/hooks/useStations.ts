'use client'

import { useQuery, useQueryClient  } from 'react-query';
import { fetchStationsApi } from '../app/api/fetchStations';

{/**************************************************************************************
  * Utilizando o React Query para fazer o pré-carregamento de dados e cache eficiente. *
  **************************************************************************************/}

  {/** useQuery é um hook que depende do ambiente de execução do cliente, 
  pois ele faz uso de recursos específicos do cliente para gerenciar o 
  estado de dados e o cache.

  ele verifica o cache do QueryClient (que foi preenchido com o dehydratedState no servidor) e, 
  se os dados estiverem disponíveis, retorna esses dados diretamente, evitando uma nova requisição
  de rede.*/}

const useStations = (page: number) => {
  const queryClient = useQueryClient();
  return useQuery(['stations', page], () => fetchStationsApi(page), {
    keepPreviousData: true, // Mantém dados da página anterior enquanto a nova página é carregada
    staleTime: 500000, // Tempo em milissegundos para considerar dados como frescos
    cacheTime: 500000,
    initialData: () => queryClient.getQueryData(['stations']), // Usa dados em cache se disponíveis
  });
};

export default useStations;