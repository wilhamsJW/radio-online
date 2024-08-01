import React from 'react';
import { Divider, Drawer, DrawerOverlay, DrawerContent, DrawerHeader, DrawerBody, Flex } from '@chakra-ui/react';
import ListRadioStations from '../organisms/ListRadioStations'
import { MdFavorite } from "react-icons/md";

interface SideBarRadioMoleculeProps {
  isOpen: boolean;
  onClose: () => void;
}

const DrawerMobileMolecule: React.FC<SideBarRadioMoleculeProps> = ({ isOpen, onClose }) => {
  return (
    <Drawer placement='left' onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay />
      <DrawerContent>
        <Flex align="center" direction="row" p={1}>
          <DrawerHeader >
            Adicionar
          </DrawerHeader>
          <MdFavorite size={24} />
        </Flex>
        <Divider />
        <DrawerBody>
          <ListRadioStations />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default DrawerMobileMolecule;
