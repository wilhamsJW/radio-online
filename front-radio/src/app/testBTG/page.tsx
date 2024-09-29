'use client'
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  HStack,
  Text,
  useToast,
  Divider,
  RadioGroup,
  Radio,
  Stack,
} from '@chakra-ui/react';

function FormPage() {
  const { control, handleSubmit } = useForm();
  const [activeSection, setActiveSection] = useState(null);
  const navigate = useNavigate();
  const toast = useToast();

  const onSubmit = (data: any) => {
    console.log('Form Data:', data);
    toast({
      title: "Formulário enviado com sucesso!",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
    navigate('/success');
  };

  const handleSectionClick = (section: any) => {
    setActiveSection(section);
  };

  return (
    <Box p={5}>
      <Heading mb={5}>Formulário</Heading>
      <HStack spacing={4} mb={5}>
        {['Oferta Pública', 'Série', 'Coordenadores', 'Representantes', 'Documentos'].map((section, index) => (
          <Box
            key={index}
            p={3}
            borderWidth={1}
            borderColor={activeSection === section ? 'blue.500' : 'gray.300'}
            borderRadius="md"
            onClick={() => handleSectionClick(section)}
            cursor="pointer"
          >
            {section}
          </Box>
        ))}
      </HStack>
      <Divider mb={5} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={4}>
          {['Oferta Pública', 'Série', 'Coordenadores', 'Representantes', 'Documentos'].map((section, index) => (
            <Box key={index} p={5} borderWidth={1} borderColor='gray.300' borderRadius="md">
              <Text fontSize="lg" mb={3} fontWeight="bold">{section}</Text>
              <FormControl mb={3}>
                <FormLabel htmlFor={`${section}-date`}>Data</FormLabel>
                <Controller
                  name={`${section}-date`}
                  control={control}
                  render={({ field }) => (
                    <Input
                      id={`${section}-date`}
                      type="date"
                      {...field}
                      borderRadius="none"
                      borderColor="gray.300"
                      borderTopWidth="2px"
                      borderBottomWidth="0"
                      borderLeftWidth="0"
                      borderRightWidth="0"
                    />
                  )}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor={`${section}-select`}>Selecione uma opção</FormLabel>
                <Controller
                  name={`${section}-select`}
                  control={control}
                  render={({ field }) => (
                    <Input
                      id={`${section}-select`}
                      as="select"
                      {...field}
                      borderRadius="none"
                      borderColor="gray.300"
                      borderTopWidth="2px"
                      borderBottomWidth="0"
                      borderLeftWidth="0"
                      borderRightWidth="0"
                    >
                      <option value="">Escolha...</option>
                      <option value="option1">Opção 1</option>
                      <option value="option2">Opção 2</option>
                      <option value="option3">Opção 3</option>
                    </Input>
                  )}
                />
              </FormControl>
            </Box>
          ))}
        </Stack>
        <Button mt={5} colorScheme="blue" type="submit">Enviar</Button>
      </form>
    </Box>
  );
}

export default FormPage;
