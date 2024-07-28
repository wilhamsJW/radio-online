import { Button } from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { useColorMode } from '@chakra-ui/react';
import MotionMolecule from '../../components/molecules/MotionMolecule';

const ToggleColorModeButton: React.FC = () => {
    const { colorMode, toggleColorMode } = useColorMode();

    return (
        <MotionMolecule whileHover={{ scale: 1.2 }}>
            <Button onClick={toggleColorMode} variant="outline" leftIcon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}>
            </Button>
        </MotionMolecule>
    );
};

export default ToggleColorModeButton;