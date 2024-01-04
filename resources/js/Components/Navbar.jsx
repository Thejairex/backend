import { Button, Flex, Text } from '@chakra-ui/react'
import { router } from '@inertiajs/react'
import React from 'react'

const Navbar = () => {
  return (
    <Flex direction='row' justify='flex-start' align='center' p='4' px='16' gap='8' >
      <Text>
        Logo
      </Text>
      <Flex align='center' gap='4'>
        <Button variant='link' color='black'>
          Inicio
        </Button>
        <Button variant='link' color='black'>
          Sorteos
        </Button>
        <Button variant='link' color='black'>
          Sobre Nosotros
        </Button>
      </Flex>
      <Button colorScheme='yellow' onClick={() => router.visit(route('login'))} ml='auto'>
        Iniciar sesion
      </Button>
    </Flex>
  )
}

export default Navbar