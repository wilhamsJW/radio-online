import { useState, useEffect } from 'react';
import { Box, Table, Tbody, Tr, Td, Text, Button, Flex, useTheme, useColorMode, IconButton, useToast, Input, useBreakpointValue } from '@chakra-ui/react';
import { FaPlay, FaStop } from 'react-icons/fa';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import MotionMolecule from '../../components/molecules/MotionMolecule';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { setIsNewStationFavorite, setAudioState, setNoListStationRadio, setIsNewUrlAudio } from '../../store/slices/registerSlice';
import AudioPlayer from '../molecules/AudioPlayerMolecule';
import truncateText from '../../utils/truncateText'

interface RadioStation {
  id: number;
  name: string;
  country: string;
  language: string;
  isPlaying: boolean;
  changeuuid: string;
  url?: string;
  userId?: string
}

interface FavoriteAreaOrganismProps {
  filter?: string;
}

const FavoriteAreaOrganism: React.FC<FavoriteAreaOrganismProps> = ({ filter = '' }) => {
  // states
  const [data, setData] = useState<RadioStation[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [editItemId, setEditItemId] = useState<string>('');
  const [editName, setEditName] = useState('');
  const [editCountry, setEditCountry] = useState('');
  const [editLanguage, setEditLanguage] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filteredData, setFilteredData] = useState<RadioStation[]>([]);

  // theme
  const theme = useTheme();
  const { colorMode } = useColorMode();
  const textColor = theme.colors[colorMode].secondary;
  const { colors } = theme;

  // BreakPoint
  const fontSize = useBreakpointValue({ base: 'sm', md: 'md' });
  const maxNameLength = useBreakpointValue({ base: 9, md: 15 });

  const toast = useToast();

  // redux
  const dispatch = useDispatch();
  const { currentAudioId, currentAudioUrl, currentAudioIsPlaying, isNewStationFavorite, loggedUser } = useSelector((state: RootState) => ({
    currentAudioId: state.register.currentAudioId,
    currentAudioUrl: state.register.currentAudioUrl,
    currentAudioIsPlaying: state.register.currentAudioIsPlaying,
    isNewStationFavorite: state.register.isNewStationFavorite,
    loggedUser: state.register.loggedUser
  }));

  const filterByEmail = (allSelectedRadioStations: any[], userId: string | null): any[] => {
    return allSelectedRadioStations.filter(item => item.userId === userId);
  };

  useEffect(() => {
    if (loggedUser) {
      const allSelectedRadioStations = JSON.parse(localStorage.getItem('selectedRadioStations') || '[]');
      const userByAllSelectedStatios = filterByEmail(allSelectedRadioStations, loggedUser.email)
      setData(userByAllSelectedStatios);
    }
  }, [loggedUser]);

  useEffect(() => {
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
    if (isNewStationFavorite) {
      const allSelectedRadioStations = JSON.parse(localStorage.getItem('selectedRadioStations') || '[]');
      const userByAllSelectedStatios = filterByEmail(allSelectedRadioStations, userId)
      setData(userByAllSelectedStatios);
      dispatch(setIsNewStationFavorite(false));
    }
  }, [isNewStationFavorite, dispatch]);

  useEffect(() => {
    if (data.length > 0) {
      const newFilteredData = data?.filter(item => {
        // Verifique se o item e suas propriedades existem - Começou a gerar erros e fiz isso para validar
        const itemName = item?.name?.toLowerCase() || '';
        const itemCountry = item?.country?.toLowerCase() || '';
        const itemLanguage = item?.language?.toLowerCase() || '';
        const filterText = filter?.toLowerCase() || '';

        return (
          itemName.includes(filterText) ||
          itemCountry.includes(filterText) ||
          itemLanguage.includes(filterText)
        );
      });

      setFilteredData(newFilteredData);
      setCurrentPage(1);
    }
  }, [data, filter]);


  useEffect(() => {
    const totalPages = Math.ceil(filteredData.length / rowsPerPage);
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [filteredData, currentPage, rowsPerPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePlayStop = (changeuuid: string, url: string | undefined) => {
    if (currentAudioId && currentAudioId !== changeuuid) {
      dispatch(setAudioState({ changeuuid: currentAudioId, url: currentAudioUrl || '', isPlaying: !currentAudioIsPlaying }));
    }

    if (currentAudioId === changeuuid && currentAudioIsPlaying) {
      dispatch(setAudioState({ changeuuid, url: currentAudioUrl || '', isPlaying: false }));
    } else {
      dispatch(setAudioState({ changeuuid, url: url || '', isPlaying: true }));
      dispatch(setIsNewUrlAudio(url || ''));
    }
  };


  const handleEdit = (item: RadioStation) => {
    setEditItemId(item.changeuuid);
    setEditName(item.name);
    setEditCountry(item.country);
    setEditLanguage(item.language);
  };

  const handleSave = () => {
    if (loggedUser) {
      // Obtém todas as estações de rádio do localStorage
      const allSelectedRadioStations = JSON.parse(localStorage.getItem('selectedRadioStations') || '[]');

      // Filtra as estações de rádio do usuário logado
      const userStations = allSelectedRadioStations.filter((item: any) => item.userId === loggedUser.email);

      // Atualiza os dados da estação que está sendo editada
      const updatedUserStations = userStations.map((item: any) =>
        item.changeuuid === editItemId
          ? { ...item, name: editName, country: editCountry, language: editLanguage }
          : item
      );

      // Atualiza o array completo de estações de rádio, mantendo os dados de outros usuários
      const updatedAllStations = allSelectedRadioStations.filter((item: any) => item.userId !== loggedUser.email)
        .concat(updatedUserStations);

      // Atualiza o localStorage com as estações de rádio atualizadas
      localStorage.setItem('selectedRadioStations', JSON.stringify(updatedAllStations));

      // Atualiza o estado com as estações de rádio atualizadas para o usuário logado
      setData(updatedUserStations);

      // Exibe mensagem de sucesso
      toast({
        title: "Dados salvos",
        description: "As alterações foram salvas com sucesso.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      // Limpa o ID do item que estava sendo editado
      setEditItemId('');
    }
  };

  const handleDelete = (id: string) => {
    if (loggedUser) {
      // Obtém todas as estações de rádio do localStorage
      const allSelectedRadioStations = JSON.parse(localStorage.getItem('selectedRadioStations') || '[]');

      // Filtra apenas as estações de rádio do usuário logado
      const userStations = allSelectedRadioStations.filter((item: any) => item.userId === loggedUser.email);

      // Remove a estação com o id fornecido apenas para o usuário logado
      const updatedUserStations = userStations.filter((item: any) => item.changeuuid !== id);

      // Atualiza o array completo de estações de rádio, mantendo os dados de outros usuários
      const updatedAllStations = allSelectedRadioStations.filter((item: any) => item.userId !== loggedUser.email)
        .concat(updatedUserStations);

      // Atualiza o localStorage com as estações de rádio atualizadas
      localStorage.setItem('selectedRadioStations', JSON.stringify(updatedAllStations));

      // Atualiza o estado com as estações de rádio atualizadas para o usuário logado
      setData(updatedUserStations);
      setFilteredData(updatedUserStations)

      toast({
        title: "Rádio excluída",
        description: "",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleChange = (field: 'name' | 'country' | 'language', value: string) => {
    switch (field) {
      case 'name':
        setEditName(value);
        break;
      case 'country':
        setEditCountry(value);
        break;
      case 'language':
        setEditLanguage(value);
        break;
    }

    if (loggedUser) {
      // Filtra estações do usuário logado
      const allSelectedRadioStations = JSON.parse(localStorage.getItem('selectedRadioStations') || '[]');
      const userStations = allSelectedRadioStations.filter((item: any) => item.userId === loggedUser.email);

      // Atualiza as estações do usuário
      const updatedUserStations = userStations.map((d: any) =>
        d.changeuuid === editItemId
          ? { ...d, name: field === 'name' ? value : d.name, country: field === 'country' ? value : d.country, language: field === 'language' ? value : d.language }
          : d
      );

      // Atualiza o array completo de estações de rádio, mantendo os dados de outros usuários
      const updatedAllStations = allSelectedRadioStations.filter((item: any) => item.userId !== loggedUser.email)
        .concat(updatedUserStations);

      // Atualiza o localStorage com o array atualizado
      localStorage.setItem('selectedRadioStations', JSON.stringify(updatedAllStations));

      // Atualiza o estado com as estações de rádio atualizadas para o usuário logado
      setData(updatedUserStations);
    }
  };

  useEffect(() => {
    if (!filteredData.length) {
      dispatch(setNoListStationRadio(true))
    }
  }, [filteredData])

  console.log('filteredData', filteredData);
  

  return (
    <Box overflowY="auto" maxH="100%" w="100%" p={{ base: 2, md: 4 }}>
      <Table overflowY="auto" maxH="22vh" variant="simple" w="100%">
        <Tbody>
          {filteredData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage).map((item, index) => (
            <Tr key={index}>
              <Td>
                <Flex align="center" direction="row" wrap="wrap">
                  {/* <!-- Botão de Play/Stop e AudioPlayer --> */}
                  <Flex align="center" mr={2}>
                    <MotionMolecule whileHover={{ scale: 1.2 }}>
                      <IconButton
                        aria-label={currentAudioId === item.changeuuid && currentAudioIsPlaying ? 'Stop' : 'Play'}
                        icon={currentAudioId === item.changeuuid && currentAudioIsPlaying ? <FaStop color={colorMode === 'dark' ? 'red.500' : 'red.600'} /> : <FaPlay color={colorMode === 'dark' ? 'green.300' : 'green.500'} />}
                        onClick={() => handlePlayStop(item.changeuuid, item.url || '')}
                        bg={colorMode === 'dark' ? 'gray.600' : 'gray.200'}
                        _hover={{ bg: colorMode === 'dark' ? 'gray.500' : 'gray.300' }}
                        isDisabled={currentAudioIsPlaying && currentAudioId !== item.changeuuid}
                        size="md"
                        ml="-1rem"
                      />
                    </MotionMolecule>
                    <AudioPlayer />
                  </Flex>

                  {/* <!-- Textos --> */}
                  <Flex direction="column" flex="1" mr={4}>
                    <Text fontSize={fontSize} fontWeight="600" color='#000000' lineHeight="29.05px" textAlign="left">
                      {truncateText(item.name, maxNameLength)}
                    </Text>
                    <Text fontSize="xs" fontWeight="400" color='#000000' lineHeight="19.36px" textAlign="left">
                      {truncateText(item.country, maxNameLength)} - {item.language}
                    </Text>
                  </Flex>

                  {/* <!-- Botões de Editar e Excluir --> */}
                  <Flex direction="row" align="center" gap={2}>
                    {editItemId === item.changeuuid ? (
                      <Button onClick={() => setEditItemId('')} size="sm">Cancel</Button>
                    ) : (
                      <MotionMolecule whileHover={{ scale: 1.2 }}>
                        <IconButton
                          aria-label="Edit"
                          icon={<EditIcon color={textColor} />}
                          onClick={() => handleEdit(item)}
                          bg={colorMode === 'dark' ? 'gray.600' : 'gray.200'}
                          _hover={{ bg: colorMode === 'dark' ? 'gray.500' : 'gray.300' }}
                          size="md"
                        />
                      </MotionMolecule>
                    )}
                    <MotionMolecule whileHover={{ scale: 1.2 }}>
                      <IconButton
                        aria-label="Delete"
                        icon={<DeleteIcon color={colors.red[400]} />}
                        onClick={() => handleDelete(item.changeuuid)}
                        bg={colorMode === 'dark' ? 'gray.600' : 'gray.200'}
                        _hover={{ bg: colorMode === 'dark' ? 'gray.500' : 'gray.300' }}
                        size="md"
                      />
                    </MotionMolecule>
                  </Flex>
                </Flex>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Flex justify="center" mt={4}>
        {Array.from({ length: Math.ceil(filteredData.length / rowsPerPage) }).map((_, index) => (
          <Button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            mx={1}
            variant={index + 1 === currentPage ? 'solid' : 'outline'}
            size="sm"
          >
            {index + 1}
          </Button>
        ))}
      </Flex>
    </Box>

  );
};

export default FavoriteAreaOrganism;
