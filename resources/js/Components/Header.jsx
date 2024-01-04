import { Box } from '@chakra-ui/react'
import React from 'react'
import Navbar from './Navbar'

const Header = ({ children }) => {
  return (
    <Box minH='16' borderBottom='1px solid var(--chakra-colors-red-400)' bg='red.500'>
        <Navbar/>
    </Box>
  )
}

export default Header