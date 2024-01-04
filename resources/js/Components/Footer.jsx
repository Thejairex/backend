import { Box, Flex } from '@chakra-ui/react'
import React from 'react'

const Footer = () => {
  return (
    <Box minH='16' borderBottom='1px solid var(--chakra-colors-red-400)' bg='red.500'>
        <Flex align='center' justify='center' h='full' >
            Footer
        </Flex>
    </Box>
  )
}

export default Footer