import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
} from '@chakra-ui/react';

interface CustomModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalMolecule: React.FC<CustomModalProps> = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent color='white'>
        <ModalHeader>Oopss...</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          Estamos trabalhando nisso!
        </ModalBody>

        <ModalFooter>
          <Button colorScheme='blue' mr={3} onClick={onClose}>
            Fechar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalMolecule;
