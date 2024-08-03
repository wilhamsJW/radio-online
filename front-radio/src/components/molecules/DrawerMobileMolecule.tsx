import React from 'react';
import { Divider, Drawer, DrawerOverlay, DrawerContent, DrawerHeader, DrawerBody, Flex, Text, Box } from '@chakra-ui/react';
import ListRadioStations from '../organisms/ListRadioStations'
import { MdFavorite } from "react-icons/md";
import { GiPocketRadio } from "react-icons/gi";

interface SideBarRadioMoleculeProps {
  isOpen: boolean;
  onClose: () => void;
}

const DrawerMobileMolecule: React.FC<SideBarRadioMoleculeProps> = ({ isOpen, onClose }) => {
  return (
    <Drawer placement='left' onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay />
      {<DrawerContent>
        <Flex align="center" direction="row" p={1}>
          <DrawerHeader >
            Adicionar
          </DrawerHeader>
          <MdFavorite size={24} style={{ marginRight: '0.5rem', marginLeft: '-0.9rem' }} />
          <GiPocketRadio size={24} />
        </Flex>
        <Flex align="center" p={4}>
          <Text fontSize="sm" letterSpacing='0.1rem'>
            Selecione e comece a ouvir na sua lista de favoritos
          </Text>
        </Flex>

        <Divider />
        <DrawerBody>
          <ListRadioStations />
        </DrawerBody>
      </DrawerContent>}
    </Drawer>
  );
};

export default DrawerMobileMolecule;
