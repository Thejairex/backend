import PrimaryButton from '@/Components/PrimaryButton'
import { Card, CardBody, CardFooter, CardHeader, Divider, Flex, Heading, Image, Modal, ModalContent, ModalHeader, ModalOverlay, Portal, Text, useDisclosure } from '@chakra-ui/react'
import { Link, usePage } from '@inertiajs/react'
import React from 'react'

const PrizeItem = ({ prize }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { auth, raffle } = usePage().props

  return (
    <Card bg="white" shadow="lg" border='1px solid var(--chakra-colors-gray-300)'>
        <CardHeader>
            <Flex direction="row" justify="flex-start" align='center' gap='4'>
                <Image src={prize.image} maxH='32' rounded='md' boxShadow='rgba(0,0,0,0.25) 0px 2px 15px 5px' onError={e => e.target.style = 'display:none'} />
                <Flex direction="column" gap='2'>
                    <Heading as="h3" size="md" fontWeight="semibold">
                        {prize.title}
                    </Heading>
                    <Text fontSize='sm' >{prize.description}</Text>
                </Flex>
            </Flex>
        </CardHeader>
        <Divider borderColor='gray.400' />
        <CardBody>
            <Flex direction="row" justify="space-between">
                <Flex direction="column">
                    <Text>
                        Cantidad:{" "}
                        <Text as="span" fontWeight="semibold">
                            {prize.quantity}
                        </Text>
                    </Text>
                    <Text>
                        Posicion:{" "}
                        <Text as="span" fontWeight="semibold">
                            {prize.position}
                        </Text>
                    </Text>
                    {/* <Text>
                        Delivery Method:{" "}
                        <Text as="span" fontWeight="semibold">
                            {prize.delivery_method}
                        </Text>
                    </Text> */}
                    {prize?.user && 
                    <Text>
                        Usuario ganador:{" "}
                        <Text as="span" fontWeight="semibold">
                            {prize?.user?.username}
                        </Text>
                    </Text>}
                </Flex>
                <Flex direction="column" align="flex-end">
                </Flex>
            </Flex>
        </CardBody>
        <Divider borderColor='gray.400' />
        <CardFooter>
            {auth.user.id === raffle.id_user_creator && <Flex direction='row' justify='space-between' align='center' gap='4'>
                <PrimaryButton as={Link} href={route('prizes.edit', prize)}>Edit</PrimaryButton>
            </Flex>}
        </CardFooter>
        {/* <Portal>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Desea eliminar este premio?</ModalHeader>

                </ModalContent>
            </Modal>
        </Portal> */}
    </Card>
  )
}

export default PrizeItem