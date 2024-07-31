import { useState, useEffect, useRef } from 'react';
import { Box, Table, Tbody, Tr, Td, Text, Button, Flex, useTheme, useColorMode, IconButton, useToast, Input } from '@chakra-ui/react';
import { FaPlay, FaStop } from 'react-icons/fa';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import MotionMolecule from '../../components/molecules/MotionMolecule';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { setIsNewStationFavorite, setIsPlaying, setIsNewUrlAudio } from '../../store/slices/registerSlice';
import { Howl } from 'howler';
import AudioPlayer from '../molecules/AudioPlayerMolecule'


interface RadioStation {
  id: number;
  name: string;
  country: string;
  language: string;
  isPlaying: boolean;
  changeuuid: string;
  url?: string
}

interface FavoriteAreaOrganismProps {
  filter?: string;
}

export interface AudioPlayerHandle {
  play: () => Promise<void>;
  pause: () => Promise<void>;
  setSrc: (newUrl: string) => void;

}

const FavoriteAreaOrganism: React.FC<FavoriteAreaOrganismProps> = ({ filter = '' }) => {
  const [data, setData] = useState<RadioStation[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [editItemId, setEditItemId] = useState<string>('');
  const [editName, setEditName] = useState('');
  const [editCountry, setEditCountry] = useState('');
  const [editLanguage, setEditLanguage] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filteredData, setFilteredData] = useState<RadioStation[]>([]);
  const theme = useTheme();
  const { colorMode } = useColorMode();
  const textColor = theme.colors[colorMode].secondary;
  const { colors } = theme;
  const toast = useToast();
  const dispatch = useDispatch();
  const [newUrl, setNewUrl] = useState('')
  const { isNewStationFavorite, isPlaying } = useSelector((state: RootState) => ({
    isNewStationFavorite: state.register.isNewStationFavorite,
    isPlaying: state.register.isPlaying
  }));

  useEffect(() => {
    const allSelectedRadioStations = JSON.parse(localStorage.getItem('selectedRadioStations') || '[]');
    setData(allSelectedRadioStations)
  }, [])

  useEffect(() => {
    if (isNewStationFavorite) {
      const allSelectedRadioStations = JSON.parse(localStorage.getItem('selectedRadioStations') || '[]');
      setData(allSelectedRadioStations);
      dispatch(setIsNewStationFavorite(false));
    }
  }, [isNewStationFavorite, dispatch]);

  useEffect(() => {
    const newFilteredData = data.filter(
      item =>
        item.name.toLowerCase().includes(filter.toLowerCase()) ||
        item.country.toLowerCase().includes(filter.toLowerCase()) ||
        item.language.toLowerCase().includes(filter.toLowerCase())
    );
    setFilteredData(newFilteredData);
    setCurrentPage(1);
  }, [data, filter]);

  useEffect(() => {
    const totalPages = Math.ceil(filteredData.length / rowsPerPage);
    //const startIndex = (currentPage - 1) * rowsPerPage;
    //const endIndex = startIndex + rowsPerPage;
    //const newPaginatedData = filteredData.slice(startIndex, endIndex);

    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [filteredData, currentPage, rowsPerPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
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

  //const [audio] = useState(new Audio('http://stream.funradio.sk:8000/fun128.mp3'));

    const handlePlayStop = (changeuuid: string, url: string | undefined) => {
      if (url) {
        dispatch(setIsNewUrlAudio(url)); // Atualiza a URL no Redux
        //setIsPlaying(prev => !prev); // Alterna o estado de reprodução
        dispatch(setIsPlaying(true))
      } else {
        console.error('URL is undefined');
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

    const updatedSelectedStations = data.map(d =>
      d.changeuuid === editItemId
        ? { ...d, name: field === 'name' ? value : d.name, country: field === 'country' ? value : d.country, language: field === 'language' ? value : d.language }
        : d
    );

    // Atualizo no storage ou poderia ser numa API
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

                    {/* {item.url && <AudioPlayer url={item.url} />} */}
                    {/* <AudioPlayer url={item.url} /> */}
                    <IconButton
                      aria-label={isPlaying ? 'Stop' : 'Play'}
                      icon={isPlaying ? <FaStop color={theme.colors.red[500]} /> : <FaPlay color={theme.colors.green[300]} />}
                      onClick={() => handlePlayStop(item.changeuuid, item.url ? item.url : '')}
                      bg={colorMode === 'dark' ? 'gray.600' : 'gray.200'}
                      _hover={{ bg: colorMode === 'dark' ? 'gray.500' : 'gray.300' }}
                      mr={4}
                      ml={6}
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
                <Flex justify="flex-end">
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
      <Flex mt={4} justify="space-between">
        <Button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </Button>
        <Text>
          Page {currentPage} of {Math.ceil(filteredData.length / rowsPerPage)}
        </Text>
        <Button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === Math.ceil(filteredData.length / rowsPerPage)}>
          Next
        </Button>
      </Flex>
    </Box>
  );
};

export default FavoriteAreaOrganism;
