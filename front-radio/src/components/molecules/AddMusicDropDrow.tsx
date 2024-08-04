import React from 'react';
import { Menu, MenuButton, IconButton, useDisclosure } from '@chakra-ui/react';
import DrawerMobileMolecule from '../molecules/DrawerMobileMolecule';
import { ReactElement  } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

interface AddMusicDropDrowProps {
    icon: ReactElement ; 
  }

const AddMusicDropDrow: React.FC<AddMusicDropDrowProps> = ({ icon }) => {

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { mediaQuery } = useSelector((state: RootState) => ({
    mediaQuery: state.register.mediaQuery
  }));

  return (
    <>
      {mediaQuery.isDesktopDrawer && <Menu>
      <MenuButton
        onClick={onOpen}
        as={IconButton}
        aria-label='Options'
        icon={icon}
        variant='outline'
      />
      <DrawerMobileMolecule isOpen={isOpen} onClose={onClose} />
    </Menu>}
    </>
  );
};

export default AddMusicDropDrow;