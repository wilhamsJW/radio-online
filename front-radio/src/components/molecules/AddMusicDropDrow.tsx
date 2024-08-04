import React from 'react';
import { Menu, MenuButton, IconButton, useDisclosure } from '@chakra-ui/react';
import DrawerMobileMolecule from '../molecules/DrawerMobileMolecule';
import { ReactElement  } from 'react';

interface AddMusicDropDrowProps {
    icon: ReactElement ; 
    color: string
  }

const AddMusicDropDrow: React.FC<AddMusicDropDrowProps> = ({ icon, color }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleLogout = async () => {
  };

  return (
    <Menu>
      <MenuButton
        onClick={onOpen}
        as={IconButton}
        aria-label='Options'
        icon={icon}
        variant='outline'
      />
      <DrawerMobileMolecule isOpen={isOpen} onClose={onClose} />
    </Menu>
  );
};

export default AddMusicDropDrow;