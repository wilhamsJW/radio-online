import { useState, useEffect } from 'react';
import { Box, VStack, Button, Flex, HStack, Divider, Input, useToast, useTheme, useColorMode, Text, Spinner } from '@chakra-ui/react';
import useStations from '../../hooks/useStations';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { setIsNewStationFavorite, setLoggedUser, setNoListStationRadio } from '../../store/slices/registerSlice'
import { auth } from '../../lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import truncateText from '@/utils/truncateText';
import { SkipNext, SkipPrevious } from '../../../public/index'
import { CheckedPlaylist } from '../../../public/index'

interface RadioStation {
  name: string;
  url: string;
  votes: number;
  country: string;
  language: string;
  countrycode: string;
  userId?: string;
  addedByUser?: boolean;
  changeuuid?: string
}

const ListRadioStations: React.FC = () => {
  const rowsPerPage = 10; // Número de itens por página
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const toast = useToast();

  const [searchTerm, setSearchTerm] = useState('');

  // Gerenciando dado e estados apenas com React Query, com isso a paginação
  //dos dados é feita com dados buscado do cache sem a necessidade de dá refetching
  const { data, error, isLoading } = useStations(currentPage);

  const theme = useTheme();
  const { colorMode } = useColorMode();
  const listStationsBg = theme.colors[colorMode].fourth;
  const textColor = theme.colors[colorMode].secondary;

  const [checkedMusic, setCheckedMusic] = useState<string[]>([]);

  const router = useRouter();

  const { loggedUser, removeIconCheckedList } = useSelector((state: RootState) => ({
    loggedUser: state.register.loggedUser,
    removeIconCheckedList: state.register.removeIconCheckedList
  }));

  useEffect(() => {
    if (removeIconCheckedList) {
      checkedMusicList(removeIconCheckedList)
    }
  }, [removeIconCheckedList])

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      dispatch(setLoggedUser(user))
    });
  }, [dispatch]);

  useEffect(() => {
    const savedPage = localStorage.getItem('currentPage');
    if (savedPage) {
      setCurrentPage(parseInt(savedPage, 10))
    }
  }, [])

  useEffect(() => {
    // Salva a página atual no localStorage sempre que mudar
    localStorage.setItem('currentPage', currentPage.toString());
  }, [currentPage]);

  if (isLoading && !data) return (
    <Flex
      height="50vh"
      align="center"
      justify="center"
    >
      <Spinner
        thickness='4px'
        speed='0.65s'
        emptyColor='gray.200'
        color='blue.500'
        size='xl'
      />
    </Flex>
  )

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

  const checkedMusicList = (newStationFavorite: string | '') => {
    if (!newStationFavorite) return;

    setCheckedMusic(prevChecked =>
      prevChecked.includes(newStationFavorite)
        ? prevChecked.filter(id => id !== newStationFavorite) // Remove da lista
        : [...prevChecked, newStationFavorite] // Adiciona à lista
    );
  };

  const userNotLogged = (userId: any) => {
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
  }

  let isDisabledClickStation: boolean
  const handleRadioClick = (newStationFavorite: RadioStation) => {
    const userId = loggedUser?.email;
    userNotLogged(loggedUser?.email)
    checkedMusicList(newStationFavorite.changeuuid ? newStationFavorite.changeuuid : '')

    const newStationFavoriteWithUser = {
      ...newStationFavorite,
      userId,
      addedByUser: true, // Adiciona o campo que indica que o usuário adicionou a rádio
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

      // Indica que a lista de estações não está vazia mais
      dispatch(setNoListStationRadio(false));

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


  const handleClick = () => {
    router.push('/');
  };

  const shouldShowIcon = (station: RadioStation, checkedMusic: any) => {
    return checkedMusic.includes(station?.changeuuid ? station?.changeuuid : '');
  };

  return (
    <Box
      position="relative"
      maxH="80vh"
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

      <VStack spacing={3} align="start">
        {paginatedRadios.length > 0 ? (
          paginatedRadios.map((station: RadioStation, index: number) => (
            <Flex
              key={index}
              onClick={() => handleRadioClick(station)}
              // bg={listStationsBg}
              bg={shouldShowIcon(station, checkedMusic) ? listStationsBg : "gray.300"} // Muda a cor de fundo se o ícone estiver exibido
              color="black"
              borderRadius="0.5rem"
              boxShadow="md"
              _hover={{ bg: "#858594" }}
              p={4}
              textAlign="left"
              w="11rem"
              alignSelf="center"
              fontSize="sm"
              overflow="hidden"
              textOverflow="ellipsis"
              whiteSpace="nowrap"
              cursor={shouldShowIcon(station, checkedMusic) ? "not-allowed" : "pointer"} // Muda o cursor se o ícone estiver exibido
              pointerEvents={shouldShowIcon(station, checkedMusic) ? "none" : "auto"} // Desabilita eventos de clique se o ícone estiver exibido
            >
              <Box mr={2} display="flex" alignItems="center">
                {/* {checkedMusic.includes(station?.changeuuid ? station?.changeuuid : '') && (
                <CheckedPlaylist color="green" />
              )} */}
                {shouldShowIcon(station, checkedMusic) && <CheckedPlaylist color="green" />}
                {isDisabledClickStation && <CheckedPlaylist color="green" />}
              </Box>
              <Text isTruncated>
                {truncateText(station.name, 10)}
              </Text>
            </Flex>
          ))
        ) : (
          <Text color={textColor}>A busca pelas estações de rádio falhou, tente novamente!</Text>
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
            <SkipPrevious color={colorMode} />
          </Button>
          <Button
            onClick={() => handlePageChange(currentPage + 1)}
            isDisabled={currentPage >= totalPages}
            aria-label="Próxima página"
          >
            <SkipNext color={colorMode} />
          </Button>
        </HStack>
      </Flex>
    </Box>
  );
};

export default ListRadioStations;
