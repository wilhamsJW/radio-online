import React from 'react';
import { Menu, MenuButton, MenuList, MenuItem, IconButton, useColorMode, useDisclosure, Icon } from '@chakra-ui/react';
import { HamburgerIcon, MoonIcon, SunIcon, StarIcon } from '@chakra-ui/icons'; 
import { FaRadio } from 'react-icons/fa6';
import { CiLogout } from 'react-icons/ci';
import { auth } from '../../lib/firebase';
import { useRouter } from 'next/navigation';
import DrawerMobileMolecule from '../molecules/DrawerMobileMolecule';

const MenuComponent: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleLogout = async () => {
    try {
      await auth.signOut();
      router.push('/');
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  const iconColor = colorMode === 'light' ? '#2F2F33' : '#ffffff';

  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label='Options'
        icon={<HamburgerIcon color={iconColor} />}
        variant='outline'
      />
      <MenuList>
        <MenuItem onClick={toggleColorMode} color={iconColor}>
          {colorMode === 'light' ? <MoonIcon color={iconColor} /> : <SunIcon color={iconColor} />}
          <span style={{ marginLeft: '8px' }}>{colorMode === 'light' ? 'Light' : 'Dark'}</span>
        </MenuItem>
        <MenuItem display={{ base: 'block', md: 'none' }}  width="100%" onClick={onOpen} color={iconColor}>
          <StarIcon color={iconColor} />
          <span style={{ marginLeft: '8px' }}></span>
          Favoritos
        </MenuItem>
        <MenuItem color={iconColor}>
          <FaRadio color={iconColor} />
          <span style={{ marginLeft: '8px' }}></span>
          Rádio
        </MenuItem>
        <MenuItem onClick={handleLogout} color={iconColor}>
          <CiLogout fontSize="1.2rem" color={iconColor} />
          <span style={{ marginLeft: '8px' }}></span>
          Sair
        </MenuItem>
      </MenuList>
      {/* Drawer para Favorites */}
      <DrawerMobileMolecule isOpen={isOpen} onClose={onClose} />
    </Menu>
  );
};

export default MenuComponent;