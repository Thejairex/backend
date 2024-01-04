import { Flex } from '@chakra-ui/react'
import React from 'react'
import PrimaryButton from './PrimaryButton'
import { Link } from '@inertiajs/react'

const AuthenticatedHeader = ({ text = 'Header', href = '/', children }) => {
  return (
    <Flex direction="row" justify="space-between" align='center'>
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
            {text}
        </h2>
        {children === null ? <PrimaryButton
            as={Link}
            href={href}
        >
            Volver
        </PrimaryButton> : children}
    </Flex>
  )
}

export default AuthenticatedHeader