import { Button, Stack } from "@chakra-ui/react";
import { EmailIcon } from "@chakra-ui/icons";
import MotionMolecule from '../molecules/MotionMolecule'
import { useDisclosure } from '@chakra-ui/react'
import ModalMolecule from '../molecules/ModalMolecule'

const SocialLoginButtons: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  
  return (
    <Stack spacing={2} mb={4} textAlign="center" onClick={onOpen}>
    <MotionMolecule><Button leftIcon={<EmailIcon />} colorScheme="teal" size="lg" width="full" rounded="full">
      Continuar com Google
    </Button></MotionMolecule>
    
    <MotionMolecule><Button leftIcon={<EmailIcon />} colorScheme="teal" size="lg" width="full" rounded="full">
      Continuar com Facebook
    </Button></MotionMolecule>

    <MotionMolecule><Button leftIcon={<EmailIcon />} colorScheme="teal" size="lg" width="full" rounded="full">
      Continuar com Apple
    </Button></MotionMolecule>
    <ModalMolecule isOpen={isOpen} onClose={onClose} />
  </Stack>
  )
  };

export default SocialLoginButtons;
