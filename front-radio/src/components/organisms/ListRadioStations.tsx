import React, { useState } from 'react';
import { Box, Input, Button, VStack, Divider, Flex, HStack, Icon, useTheme, useColorMode } from '@chakra-ui/react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'; // Importar ícones

export const ListRadioStations = () => {
  const [search, setSearch] = useState('');
  const [selectedRadio, setSelectedRadio] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const radios = Array.from({ length: 20 }, (_, i) => `Rádio ${i + 1}`); // Gerar 20 rádios
  const rowsPerPage = 10;

  const filteredRadios = radios.filter(radio => radio.toLowerCase().includes(search.toLowerCase()));
  const theme = useTheme();
  const { colorMode } = useColorMode();
  const lisStationBg = theme.colors[colorMode].fourth
  const textColor = theme.colors[colorMode].secondary;

  // Paginação
  const totalPages = Math.ceil(filteredRadios.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedRadios = filteredRadios.slice(startIndex, endIndex);

  const handleRadioClick = (radio: string) => {
    setSelectedRadio(radio);
    // Aqui você pode implementar lógica adicional, como adicionar à lista de favoritos
    console.log(`Selecionado: ${radio}`);
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <Box
      position="relative"
      maxH="90vh" // Define a altura máxima para não ultrapassar a tela
      overflowY="auto" // Adiciona a rolagem vertical se necessário
      p={4}
    >
      {/* Campo de pesquisa */}
      <Input
        placeholder="Pesquisar rádio"
        mb={4}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Lista de rádios */}
      <VStack spacing={3} align="stretch">
        {paginatedRadios.map((radio, index) => (
          <Button
            key={index}
            onClick={() => handleRadioClick(radio)}
            bg={lisStationBg}
            color={textColor}
            borderRadius="md"
            boxShadow="md"
            _hover={{ bg: "gray.200" }}
            p={4}
            textAlign="left"
            w="full" // Faz com que o botão ocupe toda a largura disponível do VStack
            alignSelf="flex-start" // Garante que o botão fique alinhado à esquerda
          >
            {radio}
          </Button>
        ))}
      </VStack>

      <Divider my={4} />

      {/* Paginação */}
      <Flex justify="center" mt={4}>
        <HStack spacing={2}>
          <Button
            onClick={() => handlePageChange(currentPage - 1)}
            isDisabled={currentPage === 1}
            aria-label="Página anterior"
          >
            <Icon as={FaChevronLeft} />
          </Button>
          <Button
            onClick={() => handlePageChange(currentPage + 1)}
            isDisabled={currentPage === totalPages}
            aria-label="Próxima página"
          >
            <Icon as={FaChevronRight} />
          </Button>
        </HStack>
      </Flex>
    </Box>
  );
};
