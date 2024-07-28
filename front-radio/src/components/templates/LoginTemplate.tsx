'use client'

import { Box } from '@chakra-ui/react';
import LoginBox from '../organisms/LoginBox'

const LoginTemplate: React.FC = () => {
    return (
        <Box
            maxW="md"
            w="full"
            bg="#1E1E21"
            boxShadow="lg"
            rounded="lg"
            p={8}
            mx="auto"
            my="auto"
            mt={{ base: 4, md: 8 }}
            mb={{ base: 4, md: 8 }}
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
        >
            <LoginBox />
        </Box>
    );
};

export default LoginTemplate;