import { useState, useEffect } from 'react';
import { Box, Table, Tbody, Tr, Td, Text, Button, Flex, useTheme, useColorMode, IconButton, useToast, Input } from '@chakra-ui/react';
import { FaPlay, FaStop } from 'react-icons/fa';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import MotionMolecule from '../../components/molecules/MotionMolecule';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { setIsNewStationFavorite, setAudioState, setIsPlaying, setIsNewUrlAudio } from '../../store/slices/registerSlice';
import AudioPlayer from '../molecules/AudioPlayerMolecule';

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
  

  return (
    <Box overflowY="auto" maxH="100%">
      <Table overflowY="auto" maxH="22vh" variant="simple">
        <Tbody>
          {filteredData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage).map((item, index) => (
            <Tr key={index}>
              <Td>
                <Flex align="center">
                  <MotionMolecule whileHover={{ scale: 1.2 }}>
                    {/** Botão responsável por acionar as estãções a tocar múscia */}
                    <IconButton
                      aria-label={currentAudioId === item.changeuuid && currentAudioIsPlaying ? 'Stop' : 'Play'}
                      icon={currentAudioId === item.changeuuid && currentAudioIsPlaying ? <FaStop color={theme.colors.red[500]} /> : <FaPlay color={theme.colors.green[300]} />}
                      onClick={() => handlePlayStop(item.changeuuid, item.url ? item.url : '')}
                      bg={colorMode === 'dark' ? 'gray.600' : 'gray.200'}
                      _hover={{ bg: colorMode === 'dark' ? 'gray.500' : 'gray.300' }}
                      mr={4}
                      ml={6}
                      isDisabled={currentAudioIsPlaying && currentAudioId !== item.changeuuid}
                    />
                    <AudioPlayer />
                  </MotionMolecule>

                  <Flex direction="column" ml={4}>
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
                        <Button onClick={handleSave}>Save</Button>
                      </>
                    ) : (
                      <>
                        <Text fontSize="md" fontWeight="600" color='#000000' lineHeight="29.05px" textAlign="left">
                          {item.name}
                        </Text>
                        <Text fontSize="xs" fontWeight="400" color='#000000' lineHeight="19.36px" textAlign="left">
                          {item.country} - {item.language}
                        </Text>
                      </>
                    )}
                  </Flex>
                </Flex>
              </Td>
              <Td>
                <Flex justify="flex-end" gap={1} wrap="nowrap"> {/** wrap="nowrap" // Garante que os itens não vão para a linha seguinte */}
                  {editItemId === item.changeuuid ? (
                    <Button onClick={() => setEditItemId('')}>Cancel</Button>
                  ) : (
                    <MotionMolecule whileHover={{ scale: 1.2 }}>
                      <IconButton
                        aria-label="Edit"
                        icon={<EditIcon color={textColor} />}
                        mr={2}
                        onClick={() => handleEdit(item)}
                        bg={colorMode === 'dark' ? 'gray.600' : 'gray.200'}
                        _hover={{ bg: colorMode === 'dark' ? 'gray.500' : 'gray.300' }}
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
                    />
                  </MotionMolecule>
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
          >
            {index + 1}
          </Button>
        ))}
      </Flex>
    </Box>
  );
};

export default FavoriteAreaOrganism;
