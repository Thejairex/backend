import Footer from '@/Components/Footer'
import Header from '@/Components/Header'
import { Box, Flex } from '@chakra-ui/react'
import React from 'react'

const Home = () => {
  return (
    <Flex direction='column' w='full'>
      <Header />
      <Box h='80vh' w='full' border='1px solid black' >
        Carrusel de imagenes
      </Box>
      <Box h='40vh' w='full' border='1px solid black' >
        Catalogo de sorteos
      </Box>
      <Box h='80vh' w='full' border='1px solid black' >
        Branding
      </Box>
      <Box h='40vh' w='full' border='1px solid black' >
        Mas branding
      </Box>
      <Box h='40vh' w='full' border='1px solid black' >
        Invitacion a registro
      </Box>
      <Footer/>
    </Flex>
  )
}

export default Home