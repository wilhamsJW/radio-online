import { useState, useEffect } from 'react';
import { Box, VStack, Button, Flex, HStack, Icon, Divider, Input, useToast, useTheme, useColorMode } from '@chakra-ui/react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import useStations from '../../hooks/useStations';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { setIsNewStationFavorite, setLoggedUser } from '../../store/slices/registerSlice'
import { auth } from '../../lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { useRouter } from 'next/navigation';

interface RadioStation {
  name: string;
  url: string;
  votes: number;
  country: string;
  language: string;
  countrycode: string;
  userId?: string
}

const ListRadioStations: React.FC = () => {
  const rowsPerPage = 10; // Número de itens por página
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const toast = useToast();

  const theme = useTheme();
  const { colorMode } = useColorMode();
  const listStationsBg = theme.colors[colorMode].fourth;

  const router = useRouter();

  const { loggedUser } = useSelector((state: RootState) => ({
    loggedUser: state.register.loggedUser
  }));

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      //setUser(user);
      dispatch(setLoggedUser(user))
    });
    // Limpeza do listener quando o componente desmonta
    //return () => unsubscribe();
  }, [dispatch]);

  useEffect(() => {
    const savedPage = localStorage.getItem('currentPage');
    if (savedPage) {
      setCurrentPage(parseInt(savedPage, 10))
    }
  }, [])

  const [searchTerm, setSearchTerm] = useState('');

  const { data, error, isLoading } = useStations(currentPage);

  useEffect(() => {
    // Salva a página atual no localStorage sempre que mudar
    localStorage.setItem('currentPage', currentPage.toString());
  }, [currentPage]);

  if (isLoading) return <div>Loading...</div>;
  if (error) {
    const errorMessage = (error as Error)?.message || 'Error fetching stations';
    return <div>{errorMessage}</div>;
  }

  // Filtra os dados com base no termo de busca
  const filteredRadios = data ? data.filter(station =>
    station.name.toLowerCase().includes(searchTerm.toLowerCase())
  ) : [];

  // Pagina os dados filtrados - Divisão do array para montar a paginação com slice
  const paginatedRadios = filteredRadios.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  // Calcula o número total de páginas baseado na quantidade de dados filtrados
  const totalPages = Math.ceil(filteredRadios.length / rowsPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const filterByEmail = (allSelectedRadioStations: any[], userId: string | null | undefined): any[] => {
    return allSelectedRadioStations.filter(item => item.userId === userId);
  };

  const handleRadioClick = (newStationFavorite: RadioStation) => {
    const userId = loggedUser?.email;
    if (!userId) {
      console.error("Usuário não está logado.");
      toast({
        title: "É preciso estar logado para adicionar uma rádio.",
        description: "",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const newStationFavoriteWithUser = {
      ...newStationFavorite,
      userId
    };

    // Obtém as estações de rádio armazenadas no localStorage
    const allSelectedRadioStations = JSON.parse(localStorage.getItem('selectedRadioStations') || '[]');

    // Filtra as estações de rádio do usuário atual
    const userStations = filterByEmail(allSelectedRadioStations, userId);

    // Verifica se a nova estação já está adicionada pelo usuário atual
    const isStationAlreadyAddedByUser = userStations.some((s: RadioStation) => s.name === newStationFavoriteWithUser.name);

    // Verifica se a estação já está adicionada por qualquer usuário
    const isStationAlreadyAddedByAnyUser = allSelectedRadioStations.some((s: RadioStation) => s.name === newStationFavoriteWithUser.name);

    if (!isStationAlreadyAddedByUser) {
      // Adiciona a nova estação se ela ainda não estiver na lista do usuário
      allSelectedRadioStations.push(newStationFavoriteWithUser);

      // Atualiza o localStorage com a nova lista
      localStorage.setItem('selectedRadioStations', JSON.stringify(allSelectedRadioStations));

      toast({
        title: "Estação de rádio adicionada com sucesso.",
        description: "",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Esta estação de rádio já foi adicionada.",
        description: "",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }

    dispatch(setIsNewStationFavorite(true));
  };

  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };

  const handleClick = () => {
    router.push('/'); // Redireciona para a página inicial
  };

  return (
    <Box
      position="relative"
      maxH="90vh"
      overflowY="auto"
      p={4}
    >
      {!loggedUser && <Button
        onClick={() => handleClick()}
        bg={listStationsBg}
        color="black"
        borderRadius="md"
        boxShadow="md"
        _hover={{ bg: "#858594" }}
        p={8}
        textAlign="left"
        w="full"
        alignSelf="center"
        fontSize="md"
        mb='1rem'
      >
        Cadastrar-se
      </Button>}
      {/* Campo de busca */}
      <Input
        placeholder="Pesquise estação de rádios"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        mb={4}
      />

      <VStack spacing={3} align="stretch">
        {paginatedRadios.length > 0 ? (
          paginatedRadios.map((station: RadioStation, index: number) => (
            <Button
              key={index}
              onClick={() => handleRadioClick(station)}
              bg={listStationsBg}
              color="black"
              borderRadius="md"
              boxShadow="md"
              _hover={{ bg: "#858594" }}
              p={8}
              textAlign="left"
              w="full"
              alignSelf="center"
              fontSize="sm"
              overflow="hidden"
              textOverflow="ellipsis"
              whiteSpace="nowrap"
            >
              {truncateText(station.name, 12)}
            </Button>
          ))
        ) : (
          <div>No stations available.</div>
        )}
      </VStack>

      <Divider my={4} />

      <Flex justify="center" mt={4}>
        <HStack spacing={2}>
          <Button
            onClick={() => handlePageChange(currentPage - 1)}
            isDisabled={currentPage <= 1}
            aria-label="Página anterior"
          >
            <Icon as={FaChevronLeft} />
          </Button>
          <Button
            onClick={() => handlePageChange(currentPage + 1)}
            isDisabled={currentPage >= totalPages}
            aria-label="Próxima página"
          >
            <Icon as={FaChevronRight} />
          </Button>
        </HStack>
      </Flex>
    </Box>
  );
};

export default ListRadioStations;
