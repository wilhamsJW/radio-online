import { Flex, Box, useTheme, useColorMode } from '@chakra-ui/react';
import MenuComponent from '../organisms/Menu';
import { ListRadioStations } from '../organisms/ListRadioStations';

const RadioLayout: React.FC = () => {
  const theme = useTheme();
  const { colorMode } = useColorMode();

  // Definindo as cores com base no modo de cor
  const sidebarBg = theme.colors[colorMode].accent;
  const mainBg = theme.colors[colorMode].primary;
  const textColor = theme.colors[colorMode].secondary;
  const lisStationBg = theme.colors[colorMode].fourth

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
        overflow="hidden" // Cuidado com overflow escondendo conteúdo
        position="relative" // Garante que o Box pai é o contexto de posicionamento
      >
        {/* Menu Component dentro do Box pai */}
        <Box
          position="absolute"
          top={4}
          right={4}
          zIndex="modal" // Verifique se 'modal' está configurado corretamente no tema
        >
          <MenuComponent />
        </Box>

        {/** Área das rádios listadas */}
        <Box
          position="absolute"
          top={16}
          left={4}
          zIndex="0" // Certifique-se de que o zIndex é menor que o do menu se necessário
          w="full"
          maxW="calc(100% - 16px)"
          maxH="calc(100vh - 64px)"
          bg={sidebarBg}
          p={4}
        >
          <ListRadioStations />
        </Box> {/** Fim da área das rádios listadas */}
      </Box> {/** Fim Box que envolver área geral das rádios listadas */}

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
          <Box>
            INICIANDO PROJETO
            <Box>INICIANDO xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</Box>
          </Box>
          <Box>
            Outro texto
            <Box>outro dentro</Box>
          </Box>
        </Flex>
      </Box>
    </Flex>

  );
};

export default RadioLayout;
