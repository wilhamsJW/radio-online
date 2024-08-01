import { useState } from 'react';
import { Flex, Box, useTheme, useColorMode, Text, useDisclosure } from '@chakra-ui/react';
import FilterInput from '../molecules/FilterInputMolecule';
import FavoriteAreaOrganism from './FavoriteAreaOrganism';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { FaRegListAlt } from 'react-icons/fa';
import PulsingCardNoList from '../molecules/PulsingCardNoList'

const HeaderFavoritesRadioOrganism: React.FC = () => {
  const [filter, setFilter] = useState('');
  const theme = useTheme();
  const { colorMode } = useColorMode();

  const mainBg = theme.colors[colorMode].primary;
  const favoritesStationBg = theme.colors[colorMode].fifth;
  const textColor = theme.colors[colorMode].secondary;

  const { noListStationRadio } = useSelector((state: RootState) => ({
    noListStationRadio: state.register.noListStationRadio
  }));

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleOpen = () => {
    console.log('Card clicked!');
    // Adicione a lógica para o que deve acontecer quando o card for clicado
  };

  return (
    <Flex
      direction="column"
      bg={favoritesStationBg}
      p={4}
      borderRadius="md"
      boxShadow="md"
      mb={2}
      overflowY="auto" maxH="100%"
    >
      <Flex justify="space-between" align="center" mb={4}>
        {!noListStationRadio && <Box color={textColor} fontWeight="bold">
          Rádios favoritas
          </Box>}
        {!noListStationRadio && (
          <FilterInput
            value={filter}
            onChange={handleFilterChange}
          />
        )}
      </Flex>
      {noListStationRadio && <PulsingCardNoList onOpen={handleOpen}/>}

      <FavoriteAreaOrganism filter={filter} />
    </Flex>
  );
};

export default HeaderFavoritesRadioOrganism;
