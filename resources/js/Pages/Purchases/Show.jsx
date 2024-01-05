import PrimaryButton from "@/Components/PrimaryButton";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import React from "react";
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Container,
    Divider,
    Flex,
    Grid,
    GridItem,
    Heading,
    Text,
} from "@chakra-ui/react";
import AuthenticatedHeader from "@/Components/AuthenticatedHeader";

const Show = ({ auth, checkout, purchase, status }) => {
    console.log(purchase, status);
    return (
        <Authenticated
            user={auth.user}
            header={<AuthenticatedHeader text="Compra" />}
        >
            <Head title="Compra" />

            <Container
                as={Flex}
                gap="12"
                direction="column"
                maxW="container.xl"
                py="12"
            >
                <Card bg="white" shadow="md">
                    <CardHeader>
                        <Flex direction="row" justify="space-between">
                            <Flex direction="column">
                                <Heading
                                    as="h3"
                                    size="lg"
                                    fontWeight="semibold"
                                >
                                    Compra de tickets de rifa:{" "}
                                    {purchase.tickets[0]?.raffle.title}
                                </Heading>
                                <Text size="sm" color="gray.700" mt="2">
                                    Generada el:{" "}
                                    <Text as="span" fontWeight="medium">
                                        {new Date(purchase.created_at).toLocaleString()}
                                    </Text>
                                </Text>
                            </Flex>
                            {purchase.tickets[0]?.raffle.id && <Button
                                as={Link}
                                href={route(
                                    "raffles.show.invited",
                                    purchase.tickets[0]?.raffle.id
                                )}
                            >
                                Ver Rifa
                            </Button>}
                        </Flex>
                    </CardHeader>
                    <Divider borderColor="gray.400" />
                    <CardBody>
                        <Flex direction="row" justify="space-between">
                            <Flex direction="column">
                                <Text>
                                    Price per ticket:{" "}
                                    <Text as="span" fontWeight="semibold">
                                        {purchase.tickets[0]?.raffle.price}$
                                    </Text>
                                </Text>
                                <Text>
                                    Tickets Quantity:{" "}
                                    <Text as="span" fontWeight="semibold">
                                        {purchase.quantity}
                                    </Text>
                                </Text>
                                <Text>
                                    Monto total:{" "}
                                    <Text as="span" fontWeight="semibold">
                                        {purchase.mount}$
                                    </Text>
                                </Text>
                                <Text>
                                    Estado de pago:{" "}
                                    <Text as="span" fontWeight="semibold">
                                        {purchase.paid_at
                                            ? "Pagado"
                                            : purchase.cancelled_at
                                            ? "Cancelado"
                                            : "Pendiente"}
                                    </Text>
                                </Text>
                            </Flex>
                            <Flex direction="column" align="flex-end">
                                {purchase.cancelled_at && (
                                    <Text>
                                        Compra cancelada el:{" "}
                                        <Text as="span" fontWeight="semibold">
                                            {purchase.cancelled_at}
                                        </Text>
                                    </Text>
                                )}
                                {purchase.paid_at && (
                                    <Text>
                                        Tickets Quantity:{" "}
                                        <Text as="span" fontWeight="semibold">
                                            {purchase.quantity}
                                        </Text>
                                    </Text>
                                )}
                            </Flex>
                        </Flex>
                    </CardBody>
                    {purchase.status === 'pending' && (
                        <>
                            <Divider borderColor="gray.400" />
                            <CardFooter
                                as={Flex}
                                align="center"
                                justify="center"
                                direction="column"
                            >
                                <Button as={Link} target="_blank" href={checkout} >Pagar</Button>
                            </CardFooter>
                        </>
                    )}
                </Card>
            </Container>
        </Authenticated>
    );
};

export default Show;
