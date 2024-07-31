import React from 'react';
import { Flex, HStack, Button, Icon } from '@chakra-ui/react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface PaginationListRadioProps {
  currentPage: number;
  totalPages: number;
  handlePageChange: (page: number) => void;
}

const PaginationListRadio: React.FC<PaginationListRadioProps> = ({
  currentPage,
  totalPages,
  handlePageChange,
}) => {
  return (
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
  );
};

export default PaginationListRadio;
