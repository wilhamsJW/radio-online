import { Button, Stack } from "@chakra-ui/react";
import { EmailIcon } from "@chakra-ui/icons";
import MotionMolecule from '../molecules/MotionMolecule'

const SocialLoginButtons: React.FC = () => (
  <Stack spacing={2} mb={4} textAlign="center">
    <MotionMolecule><Button leftIcon={<EmailIcon />} colorScheme="teal" size="lg" width="full" rounded="full">
      Continuar com Google
    </Button></MotionMolecule>
    
    <MotionMolecule><Button leftIcon={<EmailIcon />} colorScheme="teal" size="lg" width="full" rounded="full">
      Continuar com Facebook
    </Button></MotionMolecule>

    <MotionMolecule><Button leftIcon={<EmailIcon />} colorScheme="teal" size="lg" width="full" rounded="full">
      Continuar com Apple
    </Button></MotionMolecule>
  </Stack>
);

export default SocialLoginButtons;
