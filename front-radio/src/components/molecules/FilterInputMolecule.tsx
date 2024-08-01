import { Input, InputGroup, InputLeftElement, useTheme, useColorMode } from '@chakra-ui/react';
import { AiOutlineSearch } from 'react-icons/ai';

interface FilterInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FilterInput: React.FC<FilterInputProps> = ({ value, onChange }) => {
  const theme = useTheme();
  const { colorMode } = useColorMode();
  const textColor = theme.colors[colorMode].secondary;

  return (
    <InputGroup
      w={{ base: '60%', md: '40%' }} // Ajusta a largura com base no tamanho da tela
      ml="auto" // Garante que o InputGroup fique alinhado à direita
    >
      <Input
        value={value}
        onChange={onChange}
        placeholder="Pesquisar por nome de rádio, país ou idioma"
        color={textColor}
        borderRadius="md"
        _placeholder={{ color: textColor }}
        _focus={{ borderColor: textColor }}
        pr={10} 
      />
      <InputLeftElement
        pointerEvents="none"
        // deploy deu esse children como erro mas o coido funcionava, retirei apenas o ícone
        mr={2}
      />
    </InputGroup>
  );
};

export default FilterInput;