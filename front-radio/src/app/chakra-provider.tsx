'use client'
import { ChakraProvider, ColorModeProvider, CSSReset } from '@chakra-ui/react';
import theme from '../theme/theme';

const ChakraProviderWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ChakraProvider theme={theme}>
      <ColorModeProvider options={{ initialColorMode: 'dark', useSystemColorMode: false }}>
        <CSSReset />
        {children}
      </ColorModeProvider>
    </ChakraProvider>
  );
};

export default ChakraProviderWrapper;
