import AuthenticatedHeader from "@/Components/AuthenticatedHeader";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import {
    Badge,
    Box,
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
import { Head, useForm, usePage } from "@inertiajs/react";
import React, { useEffect } from "react";
import Filter from "@/Components/Filter";
import PrimaryButton from "@/Components/PrimaryButton";
import usePagination from "@/Hooks/usePagination";
import FormSectionControl from "@/Components/FormSectionControl";
import RaffleInfo from "./Partials/RaffleInfo";

const Buy = ({ auth, raffle, status, isAvaliable }) => {
    const { preferenceId } = usePage().props;
    const [numbers, setNumbers] = React.useState([]);
    const [currentItems, itemsPerPage, setItemsPerPage, paginate, currentPage] =
        usePagination(raffle.tickets, 12);
    const { data, setData, post, errors, processing, recentlySuccessful } =
        useForm({
            id_user: auth.user.id,
            id_raffle: raffle.id,
            quantity: numbers.length,
            numbers: numbers.join(","),
            email: auth.user.email,
            mount: raffle.price * numbers.length,
            payment_method: "mercadopago",
        });

    const submit = (e) => {
        e.preventDefault();

        if (!isAvaliable) return;
        console.log(data);

        post(route("purchases.store", raffle.id));
    };

    useEffect(() => {
        setData('mount', numbers.length * raffle.price)
        setData('quantity', numbers.length)
        console.log('update data');
    }, [numbers])

    return (
        <Authenticated
            user={auth.user}
            header={
                <AuthenticatedHeader
                    text="Comprar Ticket"
                    href={route("raffles.show.invited", raffle.id)}
                    children={null}
                />
            }
        >
            <Head title={`Comprar rifas - ${raffle.id}`} />

            <Container
                as={Flex}
                gap="12"
                direction="column"
                maxW="container.md"
                py="12"
            >
                <RaffleInfo raffle={raffle} />
                <Card as="form" bg="white" shadow="md" onSubmit={submit}>
                    <CardHeader>
                        <Heading as="h2" size="md" fontWeight="bold">
                            Comprar Tickets
                        </Heading>
                    </CardHeader>
                    <Divider borderColor="gray.400" />
                    <CardBody>
                        {isAvaliable ? (
                            <Flex direction="column" gap="6">
                                <Flex
                                    direction="column"
                                    border="2px solid var(--chakra-colors-gray-500)"
                                    p="4"
                                    rounded="md"
                                    shadow="lg"
                                >
                                    <Heading
                                        as="h3"
                                        size="md"
                                        fontWeight="bold"
                                        mb="4"
                                    >
                                        Tickets
                                    </Heading>
                                    <Grid
                                        templateColumns="repeat(4, 1fr)"
                                        gap={6}
                                        align="center"
                                    >
                                        {currentItems.map((ticket) => (
                                            <GridItem
                                                key={ticket.id}
                                                colSpan={1}
                                            >
                                                <Button
                                                    py="12"
                                                    onClick={() => {
                                                        if (
                                                            numbers.includes(
                                                                ticket.number
                                                            )
                                                        ) {
                                                            setNumbers(
                                                                numbers.filter(
                                                                    (number) =>
                                                                        number !==
                                                                        ticket.number
                                                                )
                                                            );
                                                            setData('numbers', numbers.filter(
                                                                (number) =>
                                                                    number !==
                                                                    ticket.number
                                                            ).join(','))
                                                        } else {
                                                            setNumbers([
                                                                ...numbers,
                                                                ticket.number,
                                                            ]);
                                                            setData('numbers', [
                                                                ...numbers,
                                                                ticket.number,
                                                            ].join(','))
                                                        }
                                                    }}
                                                    isDisabled={
                                                        (numbers.length + 1 >
                                                            parseInt(
                                                                raffle.max_tickets_per_user
                                                            ) &&
                                                            !numbers.includes(
                                                                ticket.number
                                                            )) ||
                                                        ticket?.id_purchase
                                                    }
                                                    isActive={numbers.includes(
                                                        ticket.number
                                                    )}
                                                >
                                                    <Flex
                                                        direction="column"
                                                        align="center"
                                                        gap="2"
                                                    >
                                                        <Text>
                                                            Ticket n°{" "}
                                                            {ticket.number}
                                                        </Text>
                                                        <Badge
                                                            colorScheme={
                                                                ticket?.id_purchase
                                                                    ? "red"
                                                                    : "green"
                                                            }
                                                        >
                                                            {ticket?.id_purchase
                                                                ? "Comprado"
                                                                : "Disponible"}
                                                        </Badge>
                                                        {ticket?.id_purchase && (
                                                            <Text
                                                                fontSize="small"
                                                                color="gray.500"
                                                            >
                                                                Comprado por{" "}
                                                                {
                                                                    ticket?.user
                                                                        ?.username
                                                                }
                                                            </Text>
                                                        )}
                                                    </Flex>
                                                </Button>
                                            </GridItem>
                                        ))}
                                    </Grid>
                                    <Divider my="4" />
                                    <Flex
                                        direction="row"
                                        justify="space-between"
                                        align="center"
                                    >
                                        <Text>
                                            Showing {currentItems.length} of{" "}
                                            {raffle.tickets.length} tickets
                                        </Text>
                                        <Flex direction="row" align="center">
                                            <Text mr="2">Items per page: </Text>
                                            <Filter
                                                filter={itemsPerPage}
                                                setFilter={setItemsPerPage}
                                                list={[12, 24, 48]}
                                                text={itemsPerPage}
                                            />
                                        </Flex>
                                    </Flex>
                                    <Flex
                                        direction="row"
                                        justify="space-between"
                                        align="center"
                                        mt="6"
                                    >
                                        <PrimaryButton
                                            onClick={() =>
                                                paginate(currentPage - 1)
                                            }
                                            type="button"
                                            disabled={currentPage === 1}
                                        >
                                            Previous
                                        </PrimaryButton>
                                        <Text mx="4">
                                            Page {currentPage} of{" "}
                                            {Math.ceil(
                                                raffle.tickets.length /
                                                    itemsPerPage
                                            )}
                                        </Text>
                                        <PrimaryButton
                                            onClick={() =>
                                                paginate(currentPage + 1)
                                            }
                                            disabled={
                                                currentPage ===
                                                Math.ceil(
                                                    raffle.tickets.length /
                                                        itemsPerPage
                                                )
                                            }
                                            type="button"
                                            className="ms-4"
                                        >
                                            Next
                                        </PrimaryButton>
                                    </Flex>
                                </Flex>
                                <Text fontSize="small" color="gray.700">
                                    El monto total a pagar es de{" "}
                                    <strong>
                                        ${numbers.length * raffle.price}
                                    </strong>
                                </Text>
                                {errors.numbers && (
                                    <Text fontSize="small" color="red">
                                        {errors.numbers}
                                    </Text>
                                )}
                                <Divider borderColor="gray.400" />
                                <FormSectionControl
                                    data={data}
                                    id="email"
                                    errors={errors}
                                    setData={setData}
                                    label="Email"
                                    type="email"
                                />
                            </Flex>
                        ) : (
                            <Text>
                                Esta rifa no se encuentra habilitada para la
                                compra por falta de premios!
                            </Text>
                        )}
                    </CardBody>
                    <Divider borderColor="gray.400" />
                    <CardFooter>
                        <Flex direction="column" gap="4">
                            <PrimaryButton
                                type="submit"
                                processing={processing}
                            >
                                Comprar
                            </PrimaryButton>
                        </Flex>
                    </CardFooter>
                </Card>
                <Box
                    bg="whiteAlpha.500"
                    border="1px solid var(--chakra-colors-red-100)"
                    rounded="md"
                    shadow="md"
                    p="4"
                >
                    <Text fontSize="small" color="gray.700">
                        Recuerda: Al comprar un ticket, aceptas los{" "}
                        <a href="#">Términos y condiciones</a> de la plataforma
                        <br></br>
                        Te recomendamos solo comprar tickets de rifas que
                        conozcas, ya que no nos hacemos responsables de estafas.
                    </Text>
                </Box>
            </Container>
        </Authenticated>
    );
};

export default Buy;
