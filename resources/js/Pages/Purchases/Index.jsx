import React from "react";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";
import {
    Avatar,
    Button,
    Card,
    CardBody,
    CardHeader,
    Container,
    Divider,
    Flex,
    Heading,
    Image,
    Text,
    VStack,
} from "@chakra-ui/react";
import AuthenticatedHeader from "@/Components/AuthenticatedHeader";

const Index = ({ auth, purchases }) => {
    console.log(purchases);
    const { data: purchasesData, current_page, links } = purchases;
    return (
        <Authenticated
            user={auth.user}
            header={
                <AuthenticatedHeader text="Mis compras" children={null} />
            }
        >
            <Head title="Compras" />

            <Container maxW="container.xl">
                <Flex
                    direction="column"
                    gap="4"
                    mb="6"
                    p="8"
                    bg="blackBrand.700"
                    shadow="md"
                    rounded="md"
                >
                    <Heading
                        as="h3"
                        fontWeight="semibold"
                        fontSize="xl"
                        color="white"
                        letterSpacing="tight"
                    >
                        Mis Compras
                    </Heading>
                    <Divider mb="4" />
                    {purchasesData?.length !== 0 &&
                        purchasesData?.map((purchase) => (
                            <Card key={purchase.id} _hover={{ bg: "gray.100" }}>
                                <Link
                                    href={route("purchases.show", purchase.id)}
                                >
                                    <CardHeader>
                                        <Flex
                                            direction="row"
                                            justify="space-between"
                                        >
                                            <Heading
                                                as="h3"
                                                fontWeight="semibold"
                                                fontSize="xl"
                                                color="white"
                                                letterSpacing="tight"
                                            >
                                                Rifa comprada:{" "}
                                                {
                                                    purchase?.tickets[0]?.raffle
                                                        .title
                                                }
                                            </Heading>
                                        </Flex>
                                    </CardHeader>
                                    <Divider />
                                    <CardBody>
                                        <Flex
                                            direction="row"
                                            justify="space-between"
                                        >
                                            <VStack align="flex-start">
                                                <Text
                                                    color="white"
                                                    fontSize="sm"
                                                >
                                                    Numeros comprados:{' '} 
                                                    <Text as='strong'>
                                                        {purchase.numbers}
                                                    </Text>
                                                </Text>
                                                <Text
                                                    color="white"
                                                    fontSize="sm"
                                                >
                                                    Cantidad de numeros comprados:{' '} 
                                                    <Text as='strong'>
                                                        {purchase.quantity}
                                                    </Text>
                                                </Text>
                                                <Text
                                                    color="white"
                                                    fontSize="sm"
                                                >
                                                    Metodo de pago:{' '} 
                                                    <Text as='strong'>
                                                        {purchase.payment_method}
                                                    </Text>
                                                </Text>
                                            </VStack>
                                            <VStack align="flex-end">
                                                <Text
                                                    color="white"
                                                    fontSize="sm"
                                                >
                                                    Precio de los numeros:{' '} 
                                                    <Text as='strong'>
                                                        {purchase?.tickets[0]?.raffle?.price}
                                                    </Text>
                                                </Text>
                                                <Text
                                                    color="white"
                                                    fontSize="sm"
                                                >
                                                    Monto total:{' '} 
                                                    <Text as='strong'>
                                                        {purchase.mount}
                                                    </Text>
                                                </Text>
                                                <Text
                                                    color="white"
                                                    fontSize="sm"
                                                >
                                                    Compra generada el:{' '} 
                                                    <Text as='strong'>
                                        {new Date(purchase.created_at).toLocaleString()}
                                                    </Text>
                                                </Text>
                                            </VStack>
                                        </Flex>
                                    </CardBody>
                                </Link>
                            </Card>
                        ))}
                    {purchasesData?.length === 0 && (
                        <Text
                            marginInline="auto"
                            color="white"
                            fontSize="sm"
                        >
                            No tienes compras
                        </Text>
                    )}
                    <Divider />
                    <Flex direction="row" justify="space-between">
                        <Text color="white" fontSize="sm">
                            Mostrando {purchasesData?.length} de{" "}
                            {purchases.total} compras
                        </Text>
                        <Flex direction="row" gap="2">
                            {links.map((link, index) => (
                                <Button
                                    as={Link}
                                    isDisabled={!link.active}
                                    key={index}
                                    href={link.url}
                                    preserveScroll
                                >
                                    <Text
                                        color="white"
                                        fontSize="sm"
                                        cursor="pointer"
                                    >
                                        {link.label.includes('Previous') ? 'Anterior' : link.label.includes('Next') ? 'Siguiente' : link.label}
                                    </Text>
                                </Button>
                            ))}
                        </Flex>
                    </Flex>
                </Flex>
            </Container>
        </Authenticated>
    );
};

export default Index;
