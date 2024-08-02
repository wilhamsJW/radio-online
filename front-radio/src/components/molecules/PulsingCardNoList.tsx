import { useEffect, useRef } from 'react';
import { useAnimate } from 'framer-motion';
import { Flex, Box, Text, Button, useDisclosure } from '@chakra-ui/react';
import DrawerMobileMolecule from '../molecules/DrawerMobileMolecule';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

interface PulsingCardProps {
  onOpen: () => void;
}

const PulsingCardNoList: React.FC<PulsingCardProps> = () => {
  const [scope, animate] = useAnimate();
  const scopeRef = useRef<HTMLDivElement>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { noListStationRadio, mediaQuery } = useSelector((state: RootState) => ({
    noListStationRadio: state.register.noListStationRadio,
    mediaQuery: state.register.mediaQuery
  }));
  
  useEffect(() => {
    if (scopeRef.current) {
      // Define a animação pulsante
      animate(scopeRef.current, { scale: [1, 1.05, 1] }, {
        duration: 2.5,
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
        onClick={mediaQuery.isDesktop ? () => {} : onOpen}
      >
        {noListStationRadio && <Text fontSize="lg" mb={4} color="white" >
          Selecione uma rádio e comece a ouvir agora mesmo
        </Text>}
        {noListStationRadio && <Button
          mt={6}
          colorScheme="teal"
          variant="solid"
          size="lg"
          _hover={{ bg: 'teal.600' }}
          _active={{ bg: 'teal.700' }}
          borderRadius={20}
          onClick={onOpen}
          display={{ base: 'inline-flex', md: 'none' }}
        >
          Selecionar agora
        </Button>}
        <DrawerMobileMolecule isOpen={isOpen} onClose={onClose} />
      </Box>
    </Flex>
  );
};

export default PulsingCardNoList;
