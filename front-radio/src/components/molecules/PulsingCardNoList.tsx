import { useEffect, useRef } from 'react';
import { useAnimate } from 'framer-motion';
import { Flex, Box, Text, useDisclosure, useTheme, useColorMode } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

interface PulsingCardProps {
  onOpen: () => void;
}

const PulsingCardNoList: React.FC<PulsingCardProps> = () => {
  const [scope, animate] = useAnimate();
  const scopeRef = useRef<HTMLDivElement>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const theme = useTheme();
  const { colorMode } = useColorMode();
  const textColor = theme.colors[colorMode].secondary;

  const { noListStationRadio, mediaQuery } = useSelector((state: RootState) => ({
    noListStationRadio: state.register.noListStationRadio,
    mediaQuery: state.register.mediaQuery
  }));

  useEffect(() => {
    if (scopeRef.current) {
      // Define a animação pulsante
      animate(scopeRef.current, { scale: [0.9, 1, 0.9] }, {
        duration: 4,
        repeat: Infinity,
        repeatType: 'loop',
        ease: 'easeInOut'
      });
    }
  }, [animate]);

  return (
    <Flex
      justify="center"
      align="center"
      p={2}
    >
      <Box
        ref={scopeRef}

        borderRadius="md"
        p={6}

        textAlign="center"
        maxWidth="600px"
        width="100%"
        mx="auto"
        cursor={mediaQuery.isDesktop ? "default" : "pointer"}
        onClick={mediaQuery.isDesktop ? () => { } : onOpen}
      >
        {noListStationRadio && <>
          <Text fontSize="lg" mb={4} color={textColor} >
            Selecione uma rádio e comece a ouvir agora mesmo
          </Text>
          <Text fontSize="xs" mb={4} color={textColor} >
            {mediaQuery.isDesktopDrawer ? '(Clique no botão abaixo)' : '' } 
          </Text>
        </>}
      </Box>
    </Flex>
  );
};

export default PulsingCardNoList;
