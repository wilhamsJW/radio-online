import { useState, useEffect } from 'react';
import { Box, Table, Tbody, Tr, Td, Text, Button, Flex, useTheme, useColorMode, IconButton, useToast, Input } from '@chakra-ui/react';
import { FaPlay, FaStop } from 'react-icons/fa';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import MotionMolecule from '../../components/molecules/MotionMolecule';

interface RadioStation {
  id: number;
  name: string;
  country: string;
  language: string;
  isPlaying: boolean;
}

interface FavoriteAreaOrganismProps {
  filter?: string;
}

const FavoriteAreaOrganism: React.FC<FavoriteAreaOrganismProps> = ({ filter = '' }) => {
  const [data, setData] = useState<RadioStation[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [editItemId, setEditItemId] = useState<number | null>(null);
  const [editName, setEditName] = useState('');
  const [editCountry, setEditCountry] = useState('');
  const [editLanguage, setEditLanguage] = useState('');
  const rowsPerPage = 10;
  const theme = useTheme();
  const { colorMode } = useColorMode();
  const textColor = theme.colors[colorMode].secondary;
  const { colors } = theme;
  const toast = useToast();

  useEffect(() => {
    const storedData = localStorage.getItem('radioStations');
    if (storedData) {
      setData(JSON.parse(storedData));
    } else {
      // Dados iniciais de test
      setData([
        {
          "id": 1,
          "name": "Harmony FM",
          "country": "USA",
          "language": "English",
          "isPlaying": false
        },
        {
          "id": 2,
          "name": "Rádio Vibrante",
          "country": "Brazil",
          "language": "Portuguese",
          "isPlaying": true
        },
        {
          "id": 3,
          "name": "Beats of Berlin",
          "country": "Germany",
          "language": "German",
          "isPlaying": false
        },
        {
          "id": 4,
          "name": "Melodia Latina",
          "country": "Spain",
          "language": "Spanish",
          "isPlaying": false
        },
        {
          "id": 5,
          "name": "Radio Nova",
          "country": "France",
          "language": "French",
          "isPlaying": false
        },
        {
          "id": 6,
          "name": "Tokyo Vibes",
          "country": "Japan",
          "language": "Japanese",
          "isPlaying": true
        },
        {
          "id": 7,
          "name": "Sunset Beats",
          "country": "Australia",
          "language": "English",
          "isPlaying": false
        },
        {
          "id": 8,
          "name": "Rádio Alegre",
          "country": "Portugal",
          "language": "Portuguese",
          "isPlaying": false
        },
        {
          "id": 9,
          "name": "Nova 9",
          "country": "France",
          "language": "French",
          "isPlaying": false
        },
        {
          "id": 10,
          "name": "Sou",
          "country": "Germany",
          "language": "German",
          "isPlaying": true
        },
        {
          "id": 11,
          "name": "Inglesa",
          "country": "England",
          "language": "English",
          "isPlaying": false
        },
        {
          "id": 12,
          "name": "Echo de Paris",
          "country": "France",
          "language": "French",
          "isPlaying": false
        },
        {
          "id": 13,
          "name": "Nova 13",
          "country": "France",
          "language": "French",
          "isPlaying": false
        },
        {
          "id": 14,
          "name": "Radio Pan",
          "country": "France",
          "language": "French",
          "isPlaying": false
        },
        {
          "id": 15,
          "name": "Nova 15",
          "country": "France",
          "language": "French",
          "isPlaying": false
        },
        {
          "id": 16,
          "name": "Nova 16",
          "country": "France",
          "language": "French",
          "isPlaying": false
        },
        {
          "id": 17,
          "name": "Bão de Mais",
          "country": "Brazil",
          "language": "Portuguese",
          "isPlaying": false
        },
        {
          "id": 18,
          "name": "Vibes International",
          "country": "Various",
          "language": "Various",
          "isPlaying": false
        },
        {
          "id": 19,
          "name": "AAA Radio",
          "country": "Unknown",
          "language": "Unknown",
          "isPlaying": false
        },
        {
          "id": 20,
          "name": "Tirulipa FM",
          "country": "Brazil",
          "language": "Portuguese",
          "isPlaying": false
        }
      ]);
      
    }
  }, []);

  // Filtra os dados com base no valor do filtro
  const filteredData = data.filter(
    item =>
      item.name.toLowerCase().includes(filter.toLowerCase()) ||
      item.country.toLowerCase().includes(filter.toLowerCase()) ||
      item.language.toLowerCase().includes(filter.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const saveDataToLocalStorage = (data: RadioStation[]) => {
    localStorage.setItem('radioStations', JSON.stringify(data));
  };

  const handleEdit = (item: RadioStation) => {
    setEditItemId(item.id);
    setEditName(item.name);
    setEditCountry(item.country);
    setEditLanguage(item.language);
  };

  const handleSave = () => {
    const updatedData = data.map(item =>
      item.id === editItemId
        ? { ...item, name: editName, country: editCountry, language: editLanguage }
        : item
    );
    setData(updatedData);
    saveDataToLocalStorage(updatedData);
    toast({
      title: "Dados salvos",
      description: "As alterações foram salvas com sucesso.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    setEditItemId(null);
  };

  const handleDelete = (id: number) => {
    const updatedData = data.filter(item => item.id !== id);
    setData(updatedData);
    saveDataToLocalStorage(updatedData);
    toast({
      title: "Rádio excluída",
      description: "",
      status: "error",
      duration: 3000,
      isClosable: true,
    });
  };

  const handlePlayStop = (id: number) => {
    setData(data.map(item =>
      item.id === id ? { ...item, isPlaying: !item.isPlaying } : item
    ));
  };

  return (
    <Box overflowY="auto" maxH="100%">
      <Table overflowY="auto" maxH="22vh" variant="simple">
        <Tbody>
          {paginatedData.map((item) => (
            <Tr key={item.id}>
              <Td>
                <Flex align="center">
                  <MotionMolecule whileHover={{ scale: 1.2 }}>
                    <IconButton
                      aria-label={item.isPlaying ? 'Stop' : 'Play'}
                      icon={item.isPlaying ? <FaStop color={theme.colors.red[500]} /> : <FaPlay color={theme.colors.green[300]} />}
                      onClick={() => handlePlayStop(item.id)}
                      bg={colorMode === 'dark' ? 'gray.600' : 'gray.200'}
                      _hover={{ bg: colorMode === 'dark' ? 'gray.500' : 'gray.300' }}
                      mr={4}
                      ml={6}
                    />
                  </MotionMolecule>

                  {/** Edição de nome de rádio, país e idioma */}
                  <Flex direction="column" ml={4}>
                    {editItemId === item.id ? (
                      <>
                        <Input
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          mb={2}
                          placeholder="Name"
                        />
                        <Input
                          value={editCountry}
                          onChange={(e) => setEditCountry(e.target.value)}
                          mb={2}
                          placeholder="Country"
                        />
                        <Input
                          value={editLanguage}
                          onChange={(e) => setEditLanguage(e.target.value)}
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
                  </Flex> {/** Fim */}

                </Flex>
              </Td>
              <Td>
                <Flex justify="flex-end">
                  {editItemId === item.id ? (
                    <Button onClick={() => setEditItemId(null)}>Cancel</Button>
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
                      onClick={() => handleDelete(item.id)}
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
      <Flex justify="space-between" mt={4}>
        <Button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </Button>
        <Text>
          Page {currentPage} of {totalPages}
        </Text>
        <Button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
          Next
        </Button>
      </Flex>
    </Box>
  );
};

export default FavoriteAreaOrganism;
