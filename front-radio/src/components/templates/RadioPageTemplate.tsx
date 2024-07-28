import React from 'react';
import { Flex, Box, useTheme, useColorMode } from '@chakra-ui/react';
import ToggleColorModeButton from '../molecules/ToggleColorModeButton';
import MenuComponent from '../organisms/Menu'

const RadioLayout: React.FC = () => {
  const theme = useTheme();
  const { colorMode } = useColorMode();

  // Definindo as cores com base no modo de cor
  const sidebarBg = theme.colors[colorMode].accent;
  const mainBg = theme.colors[colorMode].primary;
  const textColor = theme.colors[colorMode].secondary;

  {/****************************************************************************
   As definições da largura da página de 19.1% e 80.9% foram feitas respeitando 
       o layout do figma que é de 1034px de uma parte da tela e outra de 244px 
  ******************************************************************************/}

  return (
    <Flex h="100vh" direction="row">
      {/* Box pai apenas visível em resoluções maiores que 'md' */}
      <Box
        w={{ base: '100%', md: '19.1%' }}
        height="100vh"
        p={4}
        display={{ base: 'none', md: 'block' }} // Ocultar em resoluções menores
        bg={sidebarBg}
        position="relative" // Garante que o Box pai é o contexto de posicionamento
      >
        {/* Menu Component dentro do Box pai */}
        <Box
          position="absolute"
          top={4}
          right={4}
          zIndex="modal"
        >
          <MenuComponent />
        </Box>
        <Box color={textColor}>INICIANDO</Box>
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

      <Box w={{ base: '100%', md: '80.9' }} p={4} bg={mainBg}>
        <Flex direction="column" h="100%" bg={mainBg} color={textColor}>
          <Box>
            INCIANDO PROJETO
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
