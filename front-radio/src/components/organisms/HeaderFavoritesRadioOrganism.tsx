import React, { useState } from 'react';
import { Flex, Box, useTheme, useColorMode } from '@chakra-ui/react';
import FilterInput from '../molecules/FilterInputMolecule';
import FavoriteAreaOrganism from './FavoriteAreaOrganism';

const HeaderFavoritesRadioOrganism: React.FC = () => {
  const [filter, setFilter] = useState('');
  const theme = useTheme();
  const { colorMode } = useColorMode();

  const mainBg = theme.colors[colorMode].primary;
  const favoritesStationBg = theme.colors[colorMode].fifth;
  const textColor = theme.colors[colorMode].secondary;

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
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
        <Box color={textColor} fontWeight="bold">
          Rádios Favoritas
        </Box>
        <FilterInput
          value={filter}
          onChange={handleFilterChange}
        />
      </Flex>
      <FavoriteAreaOrganism filter={filter} />
    </Flex>
  );
};

export default HeaderFavoritesRadioOrganism;
