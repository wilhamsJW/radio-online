'use client'

import { useQuery } from 'react-query';
import { fetchStationsApi } from '../app/api/fetchStations';

{/**************************************************************************************
  * Utilizando o React Query para fazer o pré-carregamento de dados e cache eficiente. *
  **************************************************************************************/}

  {/** useQuery é um hook que depende do ambiente de execução do cliente, 
  pois ele faz uso de recursos específicos do cliente para gerenciar o 
  estado de dados e o cache. */}

const useStations = (page: number) => {
  return useQuery(['stations', page], () => fetchStationsApi(page), {
    keepPreviousData: true, // Mantém dados da página anterior enquanto a nova página é carregada
    staleTime: 60000, // Tempo em milissegundos para considerar dados como frescos
    onError: (error) => {
      console.error('Error fetching stations:', error);
    }
  });
};

export default useStations;