'use client'

import { Flex, Box, useTheme, useColorMode, Divider } from '@chakra-ui/react';
import MenuComponent from '../organisms/Menu';
import ListRadioStations from '../organisms/ListRadioStations';
import CustomHeadingProps from '../atoms/HeadingAtom'
import HeaderFavoritesRadioOrganism from '../organisms/HeaderFavoritesRadioOrganism'
import { MdFavorite } from "react-icons/md";
import { GiPocketRadio } from "react-icons/gi";
import AddMusicDropDrow from '../molecules/AddMusicDropDrow'
import { PlaylistAdd } from '../../../public/index'

const RadioLayout: React.FC = () => {
  const theme = useTheme();
  const { colorMode } = useColorMode();

  const sidebarBg = theme.colors[colorMode].accent;
  const mainBg = theme.colors[colorMode].primary;
  const textColor = theme.colors[colorMode].secondary;

  return (
    <Flex h="100vh" direction="row">
      {/* Box pai apenas visível em resoluções maiores que 'md' */}
      <Box
        w={{ base: '100%', md: '40.1%' }}
        height="100vh"
        p={4}
        display={{ base: 'none', md: 'block' }} // Ocultar em resoluções menores
        bg={sidebarBg}
        overflowY="auto"
        overflow="hidden"
        position="relative"
        alignItems={'center'}
        justifyContent={'center'}
      >
        <Flex
          color={textColor}
          align="center"
          direction="row"
          p={1}
          display="flex"
          alignItems="center"
          justifyContent="center"
          wrap="wrap" // Adiciona wrap para garantir que o box inferior vá para a linha seguinte se necessário
        >
          <Box mr={2}>
            Adicionar
          </Box>
          <MdFavorite size={24} style={{ marginRight: '0.5rem' }} />
          <GiPocketRadio style={{ color: textColor }} size={24} />
          <Box mt={3} fontSize="xs">
            Selecione e comece a ouvir na sua lista de favoritos 1
          </Box>
        </Flex>
        <Divider />

        {/** Área das rádios listadas */}
        <Box
          position="relative"
          top={0}
          left={4}
          zIndex="0"
          w="full"
          maxW="calc(100% - 16px)"
          maxH="calc(100vh - 64px)"
          bg={sidebarBg}
          p={4}
        >
          <ListRadioStations />
        </Box>
      </Box>

      {/** Área da lista de estações de rádio favorita */}
      <Box w={{ base: '100%', md: '80.9%' }} p={4} bg={mainBg}>
        <Flex direction="column" h="100%" bg={mainBg} color={textColor}>
          <Flex
            align="center"
            direction="row"
            p={1}
            display="flex"
            justifyContent="center" // Centraliza os itens horizontalmente
            alignItems="center"    // Alinha os itens verticalmente no centro
          >
            <CustomHeadingProps
              text={'Rádio Browser'}
              color={textColor}
              textAlign='center'
              pt='1rem'
            />
            <GiPocketRadio
              style={{ color: textColor, marginLeft: '0.5rem' }}
              size={24}
            />
          </Flex>

          <Box
            position="relative"
            maxH="82vh"
            borderRadius={10}
            overflow={'hidden'}
          >{/* Menu Component visível em resoluções menores */}
            <Box

              position="fixed"
              top={4}
              right={4}
              zIndex="modal"
            >
              <MenuComponent />
            </Box>
            <HeaderFavoritesRadioOrganism />
            {/* Componente suspenso no final da página */}
            <Box
              position="fixed"
              bottom={2}
              right={4} 
              zIndex="overlay" // Garante que o componente fique acima de outros conteúdos
            >
              <AddMusicDropDrow icon={<PlaylistAdd color={textColor} />} color={textColor} />
            </Box>
          </Box>
        </Flex>
      </Box> {/** Fim lista de estações */}
    </Flex>
  );
};

export default RadioLayout;
