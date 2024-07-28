import { Box, Text } from "@chakra-ui/react";

const RecaptchaNotice: React.FC = () => (
  <Box bg={{ base: "inherit", md: "gray.50" }} p={4} mt={4} mb={4} textAlign="center" w="full">
    <Text fontSize="sm" color="gray.600">
      Este site é protegido pelo reCAPTCHA e está sujeito à{" "}
      <Text as="span" textDecoration="underline" cursor="pointer">Política de Privacidade</Text>
      {" "}e aos{" "}
      <Text as="span" textDecoration="underline" cursor="pointer">Termos de Serviço</Text>
    </Text>
  </Box>
);

export default RecaptchaNotice;
