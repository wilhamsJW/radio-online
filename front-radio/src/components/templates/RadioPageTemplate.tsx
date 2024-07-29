import { Flex, Box, useTheme, useColorMode } from '@chakra-ui/react';
import MenuComponent from '../organisms/Menu';
import { ListRadioStations } from '../organisms/ListRadioStations';
import CustomHeadingProps from '../atoms/HeadingAtom'
import HeaderFavoritesRadioOrganism from '../organisms/HeaderFavoritesRadioOrganism'

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
        w={{ base: '100%', md: '25.1%' }}
        height="100vh"
        p={4}
        display={{ base: 'none', md: 'block' }} // Ocultar em resoluções menores
        bg={sidebarBg}
        overflowY="auto"
        overflow="hidden"
        position="relative"
      >
        <Box
          position="absolute"
          top={4}
          right={4}
          zIndex="modal"
        >
          <MenuComponent />
        </Box>

        {/** Área das rádios listadas */}
        <Box
          position="absolute"
          top={16}
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

      {/* Menu Component visível em resoluções menores */}
      <Box
        display={{ base: 'block', md: 'none' }} // Mostrar apenas em resoluções menores
        position="fixed"
        top={4}
        right={4}
        zIndex="modal"
      >
        <MenuComponent />
      </Box>

      {/** Área da lista de estações de rádio favorita */}
      <Box w={{ base: '100%', md: '80.9%' }} p={4} bg={mainBg}>
        <Flex direction="column" h="100%" bg={mainBg} color={textColor}>
          <CustomHeadingProps text={'Rádio Browser'} color={textColor} textAlign='center' pt='1rem' />
          <Box
            position="relative"
            maxH="82vh"
            borderRadius={10}
            overflow={'hidden'}
          >
            <HeaderFavoritesRadioOrganism />
          </Box>
        </Flex>
      </Box> {/** Fim lista de estações */}
    </Flex>
  );
};

export default RadioLayout;
