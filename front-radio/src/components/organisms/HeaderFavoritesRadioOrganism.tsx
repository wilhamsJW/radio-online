'use client'

import { useState } from 'react';
import { Flex, Box, useTheme, useColorMode, useDisclosure } from '@chakra-ui/react';
import FilterInput from '../molecules/FilterInputMolecule';
import FavoriteAreaOrganism from './FavoriteAreaOrganism';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import PulsingCardNoList from '../molecules/PulsingCardNoList'
import { useMedia } from 'use-media';
import { setMediaQuery } from '../../store/slices/registerSlice'
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

const HeaderFavoritesRadioOrganism: React.FC = () => {
  const [filter, setFilter] = useState('');
  const theme = useTheme();
  const { colorMode } = useColorMode();

  const dispatch = useDispatch();

  const isMobile = useMedia({ maxWidth: '767px' });
  const isTablet = useMedia({ minWidth: '768px', maxWidth: '1024px' });
  const isDesktop = useMedia({ minWidth: '920px' });
  const isSmallScreen = useMedia({ maxWidth: '900px' })
  const isDesktopDrawer = useMedia({ maxWidth: '767px' }); // Garantiu sincronia total para responsividade com drawer e lista para desktop, redux ajudou muito

  const favoritesStationBg = theme.colors[colorMode].fifth;
  const textColor = theme.colors[colorMode].secondary;

  const { noListStationRadio } = useSelector((state: RootState) => ({
    noListStationRadio: state.register.noListStationRadio
  }));

  useEffect(() => {
    dispatch(setMediaQuery({
      isMobile,
      isTablet,
      isDesktop,
      isSmallScreen,
      isDesktopDrawer
    }));
  }, [isMobile, isTablet, isDesktop, isSmallScreen, isDesktopDrawer, dispatch])

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleOpen = () => {
    console.log('Card clicked!');
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
