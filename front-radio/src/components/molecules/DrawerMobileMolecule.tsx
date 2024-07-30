import React from 'react';
import { Drawer, DrawerOverlay, DrawerContent, DrawerHeader, DrawerBody } from '@chakra-ui/react';

interface SideBarRadioMoleculeProps {
  isOpen: boolean;
  onClose: () => void;
}

const DrawerMobileMolecule: React.FC<SideBarRadioMoleculeProps> = ({ isOpen, onClose }) => {
  return (
    <Drawer placement='left' onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader borderBottomWidth='1px'>Favoritos</DrawerHeader>
        <DrawerBody>
          <p>Sua rádio favorita...</p>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default DrawerMobileMolecule;
