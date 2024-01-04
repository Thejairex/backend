import ApplicationLogo from '@/Components/ApplicationLogo';
import { Box, Flex } from '@chakra-ui/react';
import { Link } from '@inertiajs/react';

export default function Guest({ children }) {
    return (
        <Flex direction='column' minH='100vh' justify={{ sm: 'center' }} align='center' bg='gray.100' gap='8' py='32'>
                {children}
        </Flex>
    );
}
