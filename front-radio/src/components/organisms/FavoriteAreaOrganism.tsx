import { useState, useEffect, useRef } from 'react';
import { Box, Table, Tbody, Tr, Td, Text, Button, Flex, useTheme, useColorMode, IconButton, useToast, Input, useBreakpointValue } from '@chakra-ui/react';
import { FaPlay, FaStop } from 'react-icons/fa';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import MotionMolecule from '../../components/molecules/MotionMolecule';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { setIsNewStationFavorite, setAudioState, setNoListStationRadio, setIsNewUrlAudio } from '../../store/slices/registerSlice';
import AudioPlayer from '../molecules/AudioPlayerMolecule';
import truncateText from '../../utils/truncateText'
import { useAnimate, motion } from 'framer-motion';

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

  const scopeRefButton = useRef<HTMLButtonElement>(null);
  const [scope, animate] = useAnimate();

  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  // redux
  const dispatch = useDispatch();
  const { currentAudioId, currentAudioUrl, currentAudioIsPlaying, isNewStationFavorite, loggedUser, noListStationRadio } = useSelector((state: RootState) => ({
    currentAudioId: state.register.currentAudioId,
    currentAudioUrl: state.register.currentAudioUrl,
    currentAudioIsPlaying: state.register.currentAudioIsPlaying,
    isNewStationFavorite: state.register.isNewStationFavorite,
    loggedUser: state.register.loggedUser,
    noListStationRadio: state.register.noListStationRadio
  }));

  const filterByEmail = (allSelectedRadioStations: any[], userId: string | null): any[] => {
    return allSelectedRadioStations.filter(item => item.userId === userId);
  };

  useEffect(() => {
    if (scopeRefButton.current) {
      // Define a animação pulsante
      animate(scopeRefButton.current, { scale: [1, 2, 1] }, {
        duration: 2.5,
        repeat: Infinity,
        repeatType: 'loop',
        ease: 'easeInOut'
      });
    }
  }, [animate]);

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
        title: "Estamos em Contrução :)",
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

      // Pegando estação tocando musica
      const currentStationPlaying = userStations.filter((item: any) => item.changeuuid == id);

      // Verifica se a rádio a ser excluída é a que está tocando 
      const stationMusicaPlaying = currentStationPlaying.filter((item: any) => item.changeuuid == id && currentAudioIsPlaying && item.url == currentAudioUrl);

      // Seta setAudioState para que pare de tocar a múscia caso seja a rádio escolhida
      if (stationMusicaPlaying.length) {
        dispatch(setAudioState({ changeuuid: '', url: '', isPlaying: false }))
      }

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
    } else {
      dispatch(setNoListStationRadio(false))
    }
  }, [filteredData])

  return (
    <Box overflowY="auto" maxH="100%" w="100%" p={{ base: 2, md: 4 }}>
      <Table variant="simple" w="100%">
        <Tbody>
          {filteredData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage).map((item, index) => (
            <Tr key={index}>
              <Td>
                <Flex align="center" direction="row" wrap="wrap" gap={2}>
                  {/* Botão de Play/Stop e AudioPlayer */}
                  <Flex align="center" direction="row" mr={2} wrap="nowrap">
                    {editItemId !== item.changeuuid && (
                      <>
                        <motion.div
                          animate={{ scale: currentAudioId === item.changeuuid && currentAudioIsPlaying ? [1.3, 1.2, 1] : [] }}
                          transition={{ duration: 1, repeat: Infinity, repeatType: 'loop', ease: 'easeInOut' }}
                        >
                          <MotionMolecule whileHover={{ scale: 1.2 }}>
                            <IconButton
                              ref={scopeRefButton}
                              aria-label={currentAudioId === item.changeuuid && currentAudioIsPlaying ? 'Stop' : 'Play'}
                              icon={currentAudioId === item.changeuuid && currentAudioIsPlaying ?
                                <FaStop color={colorMode === 'dark' ? 'red.500' : 'red.600'} /> :
                                <FaPlay color={colorMode === 'dark' ? 'green.300' : 'green.500'} />
                              }
                              onClick={() => handlePlayStop(item.changeuuid, item.url || '')}
                              // bg={colorMode === 'dark' ? 'gray.600' : 'gray.200'}
                              bg={currentAudioId === item.changeuuid && currentAudioIsPlaying ? '#f56565' : colorMode === 'dark' ? 'gray.600' : 'gray.200'}
                              _hover={{ bg: colorMode === 'dark' ? 'gray.500' : 'gray.300' }}
                              isDisabled={currentAudioIsPlaying && currentAudioId !== item.changeuuid}
                              size="md"
                            />
                          </MotionMolecule>
                        </motion.div>
                      </>
                    )}
                    <AudioPlayer />
                  </Flex>

                  {/* Textos e Inputs */}
                  <Flex align="center" direction="row" flex="1" wrap="wrap">
                    <Flex direction="column" flex="1" mr={4}>
                      {editItemId === item.changeuuid ? (
                        <>
                          <Input
                            value={editName}
                            onChange={(e) => handleChange('name', e.target.value)}
                            mb={2}
                            placeholder="Name"
                          />
                          <Input
                            value={editCountry}
                            onChange={(e) => handleChange('country', e.target.value)}
                            mb={2}
                            placeholder="Country"
                          />
                          <Input
                            value={editLanguage}
                            onChange={(e) => handleChange('language', e.target.value)}
                            mb={2}
                            placeholder="Language"
                          />
                          <Button onClick={handleSave} mt={2} mb={2}>Salvar</Button>
                          <Button onClick={() => setEditItemId('')}>
                            Cancelar
                          </Button>
                        </>
                      ) : (
                        <Flex direction="column" flex="1">
                          <Text fontSize={fontSize} fontWeight="600" color='#000000' lineHeight="29.05px" textAlign="left">
                            {truncateText(item.name, maxNameLength)}
                          </Text>
                          <Text fontSize="xs" fontWeight="400" color='#000000' lineHeight="19.36px" textAlign="left">
                            {truncateText(item.country, maxNameLength)} - {item.language}
                          </Text>
                        </Flex>
                      )}
                    </Flex>
                  </Flex>
                </Flex>
              </Td>

              <Td>
                <Flex
                  justify="flex-end"
                  direction="row"
                  wrap="nowrap"
                  gap={2}
                  overflow="visible" // Garante que o conteúdo não seja cortado e evita barra de rolagem
                >
                  {editItemId !== item.changeuuid && (
                    <MotionMolecule whileHover={{ scale: 1.2 }}>
                      <IconButton
                        aria-label="Edit"
                        icon={<EditIcon color={textColor} />}
                        onClick={() => handleEdit(item)}
                        bg={colorMode === 'dark' ? 'gray.600' : 'gray.200'}
                        _hover={{ bg: colorMode === 'dark' ? 'gray.500' : 'gray.300' }}
                        size="sm"
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
                      size="sm"
                    />
                  </MotionMolecule>
                </Flex>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      {!noListStationRadio && <Flex mt={4} justify="space-between">
        <Button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </Button>
        <Text>
          Page {currentPage} of {Math.ceil(filteredData.length / rowsPerPage)}
        </Text>
        <Button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === Math.ceil(filteredData.length / rowsPerPage)}>
          Next
        </Button>
      </Flex>}
    </Box>
  );
};

export default FavoriteAreaOrganism;
