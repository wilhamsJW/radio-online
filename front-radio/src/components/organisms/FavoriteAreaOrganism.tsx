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
  const { currentAudioId, currentAudioUrl, currentAudioIsPlaying, isNewStationFavorite } = useSelector((state: RootState) => ({
    currentAudioId: state.register.currentAudioId,
    currentAudioUrl: state.register.currentAudioUrl,
    currentAudioIsPlaying: state.register.currentAudioIsPlaying,
    isNewStationFavorite: state.register.isNewStationFavorite
  }));

  useEffect(() => {
    const allSelectedRadioStations = JSON.parse(localStorage.getItem('selectedRadioStations') || '[]');
    setData(allSelectedRadioStations);
  }, []);

  useEffect(() => {
    if (isNewStationFavorite) {
      const allSelectedRadioStations = JSON.parse(localStorage.getItem('selectedRadioStations') || '[]');
      setData(allSelectedRadioStations);
      dispatch(setIsNewStationFavorite(false));
    }
  }, [isNewStationFavorite, dispatch]);

  useEffect(() => {
    if (data.length > 0) {
      const newFilteredData = data.filter(
        item =>
          item.name.toLowerCase().includes(filter.toLowerCase()) ||
          item.country.toLowerCase().includes(filter.toLowerCase()) ||
          item.language.toLowerCase().includes(filter.toLowerCase())
      );
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
      dispatch(setAudioState({ changeuuid: currentAudioId, url: currentAudioUrl || '', isPlaying: !currentAudioIsPlaying  }));
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
    const updatedData = data.map(item =>
      item.changeuuid === editItemId
        ? { ...item, name: editName, country: editCountry, language: editLanguage }
        : item
    );
    setData(updatedData);
    localStorage.setItem('selectedRadioStations', JSON.stringify(updatedData));
    toast({
      title: "Dados salvos",
      description: "As alterações foram salvas com sucesso.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    setEditItemId('');
  };

  const handleDelete = (id: string) => {
    const updatedData = data.filter(item => item.changeuuid !== id);
    setData(updatedData);
    localStorage.setItem('selectedRadioStations', JSON.stringify(updatedData));
    toast({
      title: "Rádio excluída",
      description: "",
      status: "error",
      duration: 3000,
      isClosable: true,
    });
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

    const updatedSelectedStations = data.map(d =>
      d.changeuuid === editItemId
        ? { ...d, name: field === 'name' ? value : d.name, country: field === 'country' ? value : d.country, language: field === 'language' ? value : d.language }
        : d
    );

    localStorage.setItem('selectedRadioStations', JSON.stringify(updatedSelectedStations));
    setData(updatedSelectedStations);
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
