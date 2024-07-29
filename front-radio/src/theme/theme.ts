import { extendTheme, SystemStyleObject } from '@chakra-ui/react';

const colors = {
  light: {
    primary: '#ffffff', // Branco para o fundo claro
    secondary: '#000000', // Preto para o texto claro
    accent: '#CCD5AE', // Cor de destaque para o modo claro
    fourth: '#c2cca0', // Cor adicional para o modo claro
    fifth: '#CCD5AE', // Nova cor adicionada para o modo claro
  },
  dark: {
    primary: '#2F2F33', // Cor escura para o fundo
    primarySideBar: '#ffffff', // Cor escura para o fundo da barra lateral
    secondary: '#E9EDC9', // Cor clara para o texto
    accent: '#1E1E21', // Cor de destaque para o modo escuro
    fourth: '#4D4D56', // Cor adicional para o modo escuro
    fifth: '#62626C', // Nova cor adicionada para o modo escuro
  },
};



// Estilos globais para o tema
const globalStyles: (props: { colorMode: 'light' | 'dark' }) => SystemStyleObject = (props) => ({
  body: {
    bg: props.colorMode === 'light' ? colors.light.primary : colors.dark.primary,
    color: props.colorMode === 'light' ? colors.light.secondary : colors.dark.secondary,
  },
});

// Configuração do tema
const theme = extendTheme({
  config: {
    initialColorMode: 'light', // Modo de cor inicial
    useSystemColorMode: false,
  },
  colors,
  styles: {
    global: globalStyles,
  },
});

export default theme;

