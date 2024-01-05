import PrimaryButton from "@/Components/PrimaryButton";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import React from "react";
import DeleteRaffleForm from "./Partials/DeleteRaffle";
import EditRaffle from "./Partials/EditRaffle";
import TicketsItem from "./Partials/TicketsItem";
import {
    Avatar,
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
    Image,
    Text,
} from "@chakra-ui/react";
import Filter from "@/Components/Filter";
import useFilter from "@/Hooks/useFilter";
import usePagination from "@/Hooks/usePagination";
import PrizeItem from "../Prizes/Partials/PrizeItem";
import AuthenticatedHeader from "@/Components/AuthenticatedHeader";

const Show = ({ auth, raffle, members, tickets, prizes }) => {
    const [filter, setFilter, filteredArray] = useFilter(
        tickets,
        {
            Todos: (a) => {
                return a;
            },
            Vendidos: (a) => {
                return a.id_purchase;
            },
            Ganadores: (a) => {
                return a.id_prize;
            },
        },
        "Todos"
    );
    const [currentItems, itemsPerPage, setItemsPerPage, paginate, currentPage] =
        usePagination(filteredArray, 12);

    const [
        currentItemsPrizes,
        itemsPerPagePrizes,
        setItemsPerPagePrizes,
        paginatePrizes,
        currentPagePrizes,
    ] = usePagination(raffle.prizes, 2);

    const deleteRaffle = (id) => {
        destroy(route("raffles.destroy", id));
    };

    return (
        <Authenticated
            user={auth.user}
            header={
                <AuthenticatedHeader
                    text={`Rifa: ${raffle.id}`}
                    href={route("raffles.index")}
                    children={null}
                />
            }
        >
            <Head title="Rifa" />

            <Container
                as={Flex}
                gap="12"
                direction="column"
                maxW="container.xl"
                py="12"
            >
                <Card bg="white" shadow="md">
                    <CardHeader>
                        <Flex direction="column" gap="2">
                            <Image
                                src={raffle.image_banner}
                                alt=""
                                objectFit="cover"
                                maxHeight="32"
                                w="full"
                                rounded="md"
                            />
                            <Flex
                                direction="row"
                                align="center"
                                justify="flex-start"
                                gap="2"
                            >
                                <Image
                                    src={raffle.image_logo}
                                    alt=''
                                    h="16"
                                    aspectRatio="1/1"
                                    objectFit="cover"
                                    rounded="md"
                                    onError={(e) => e.target.style = 'display:none'}
                                />
                                <Flex direction="column" gap="2">
                                    <Heading
                                        as="h3"
                                        size="md"
                                        fontWeight="semibold"
                                    >
                                        {raffle.title}
                                    </Heading>
                                    <Text>{raffle.description}</Text>
                                    <Badge colorScheme="green" w='min'>
                                        {raffle.status}
                                    </Badge>
                                </Flex>
                            </Flex>
                        </Flex>
                    </CardHeader>
                    <Divider borderColor="gray.400" />
                    <CardBody>
                        <Flex direction="row" justify="space-between">
                            <Flex direction="column">
                                <Text>
                                    Creator:{" "}
                                    <Text as="span" fontWeight="semibold">
                                        {raffle.user.username}
                                    </Text>
                                </Text>
                                <Text>
                                    Price per ticket:{" "}
                                    <Text as="span" fontWeight="semibold">
                                        {raffle.price}$
                                    </Text>
                                </Text>
                                <Text>
                                    Tickets Quantity:{" "}
                                    <Text as="span" fontWeight="semibold">
                                        {raffle.quantity}
                                    </Text>
                                </Text>
                            </Flex>
                            <Flex direction="column" align="flex-end">
                                <Text>
                                    Draw Date:{" "}
                                    <Text as="span" fontWeight="semibold">
                                        {raffle.draw_date}
                                    </Text>
                                </Text>
                                <Text>
                                    Max Tickets per User:{" "}
                                    <Text as="span" fontWeight="semibold">
                                        {raffle.max_tickets_per_user}
                                    </Text>
                                </Text>
                                <Text>
                                    Tickets Sold:{" "}
                                    <Text as="span" fontWeight="semibold">
                                        {raffle.tickets_sold}
                                    </Text>
                                </Text>
                            </Flex>
                        </Flex>
                    </CardBody>
                </Card>
                <Card bg="white" shadow="md">
                    <CardHeader>
                        <Flex direction="row" justify="space-between">
                            <Heading as="h3" size="md" fontWeight="semibold">
                                Link para la compra de tickets
                            </Heading>
                        </Flex>
                    </CardHeader>
                    <Divider borderColor='gray.400' />
                    <CardBody as={Flex} direction='column' gap='2' >
                        {raffle?.prizes?.length > 0 && raffle?.status === 'active' && <Flex direction="row" justify="space-between">
                            <Button variant='link' as={Link} href={route("ticket.buy", raffle.id)} >
                                    {route("ticket.buy", raffle.id)}
                            </Button>
                            <PrimaryButton
                                type='button'
                                onClick={() => {
                                    navigator.clipboard.writeText(
                                        route("ticket.buy", raffle.id)
                                    );
                                }}
                            >
                                Copiar
                            </PrimaryButton>
                        </Flex>}
                        {raffle?.prizes?.length === 0 && <Text>Crea un premio primero para habilitar la compra de Tickets!</Text>}
                        {raffle?.status === 'completed' && <Text>El sorteo ha finalizado</Text>}
                    </CardBody>
                </Card>
                <Card bg="white" shadow="md">
                    <CardHeader>
                        <Flex direction="row" justify="space-between" align='center'>
                            <Heading as="h3" size="md" fontWeight="semibold">
                                Tickets
                            </Heading>
                            <Filter
                                filter={filter}
                                setFilter={setFilter}
                                list={["Todos", "Vendidos", 'Ganadores']}
                            />
                        </Flex>
                    </CardHeader>
                    <Divider borderColor='gray.400' />
                    <CardBody>
                        <Grid templateColumns="repeat(3, 1fr)" gap={6}>
                            {currentItems.map((ticket) => (
                                <GridItem key={ticket.id} colSpan={1} w='100%'>
                                    <TicketsItem data={ticket} />
                                </GridItem>
                            ))}
                        </Grid>
                    </CardBody>
                    <Divider borderColor='gray.400' />
                    <CardFooter as={Flex} direction='column' gap='4' w='full' >
                        <Flex
                            direction="row"
                            justify="space-between"
                            align="center"
                        >
                            <Text>
                                Showing {currentItems.length} of{" "}
                                {filteredArray.length} tickets
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
                        >
                            <PrimaryButton
                                onClick={() => paginate(currentPage - 1)}
                                disabled={currentPage === 1}
                            >
                                Previous
                            </PrimaryButton>
                            <Text mx="4">
                                Page {currentPage} of{" "}
                                {Math.ceil(filteredArray.length / itemsPerPage)}
                            </Text>
                            <PrimaryButton
                                onClick={() => paginate(currentPage + 1)}
                                disabled={
                                    currentPage ===
                                    Math.ceil(
                                        filteredArray.length / itemsPerPage
                                    )
                                }
                                className="ms-4"
                            >
                                Next
                            </PrimaryButton>
                        </Flex>
                    </CardFooter>
                </Card>
                <Card bg="white" shadow="md">
                    <CardHeader>
                        <Flex direction="row" justify="space-between">
                            <Heading as="h3" size="md" fontWeight="semibold">
                                Premios
                            </Heading>
                            {raffle?.status === 'active' && <PrimaryButton
                                as={Link}
                                href={route("prizes.create", raffle.id)}
                            >
                                Añadir Premio
                            </PrimaryButton>}
                        </Flex>
                    </CardHeader>
                    <Divider />
                    <CardBody>
                        {raffle?.prizes?.length !== 0 && (
                            <>
                                <Grid templateColumns="repeat(1, 1fr)" gap={6}>
                                    {prizes?.map((prize) => (
                                        <GridItem key={prize.id} colSpan={1}>
                                            <PrizeItem prize={prize} />
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
                                        Showing {currentItemsPrizes.length} of{" "}
                                        {raffle.prizes.length} prizes
                                    </Text>
                                    <Flex direction="row" align="center">
                                        <Text mr="2">Items per page: </Text>
                                        <Filter
                                            filter={itemsPerPagePrizes}
                                            setFilter={setItemsPerPagePrizes}
                                            list={[2, 4, 8]}
                                            text={itemsPerPagePrizes}
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
                                            paginatePrizes(
                                                currentPagePrizes - 1
                                            )
                                        }
                                        disabled={currentPagePrizes === 1}
                                    >
                                        Previous
                                    </PrimaryButton>
                                    <Text mx="4">
                                        Page {currentPagePrizes} of{" "}
                                        {Math.ceil(
                                            raffle.prizes.length /
                                                itemsPerPagePrizes
                                        )}
                                    </Text>
                                    <PrimaryButton
                                        onClick={() =>
                                            paginatePrizes(
                                                currentPagePrizes + 1
                                            )
                                        }
                                        disabled={
                                            currentPagePrizes ===
                                            Math.ceil(
                                                raffle.prizes.length /
                                                    itemsPerPagePrizes
                                            )
                                        }
                                        className="ms-4"
                                    >
                                        Next
                                    </PrimaryButton>
                                </Flex>
                            </>
                        )}
                        {prizes?.length === 0 && (
                            <Text>No hay premios</Text>
                        )}
                    </CardBody>
                </Card>
                {
                    tickets?.filter(t => t.status === 'sold')?.length > 0 && raffle?.prizes?.filter(p => p.id_user_winner)?.length === 0 && raffle?.status === 'active' && !raffle?.draw_date && <Card bg="white" shadow="md">
                        <CardHeader>
                            <Flex direction="row" justify="space-between">
                                <Heading as="h3" size="md" fontWeight="semibold">
                                    Sortear
                                </Heading>
                            </Flex>
                        </CardHeader>
                        <Divider />
                        <CardBody>
                            <PrimaryButton
                                as={Link}
                                href={route("raffles.draw", raffle.id)}
                                method="post"
                            >
                                Sortear
                            </PrimaryButton>
                        </CardBody>
                    </Card>    
                }
                {
                    raffle?.prizes?.filter(p => p.id_user_winner)?.length !== 0 && <Card bg="white" shadow="md">
                        <CardHeader>
                            <Flex direction="row" justify="space-between">
                                <Heading as="h3" size="md" fontWeight="semibold">
                                    Ganadores
                                </Heading>
                            </Flex>
                        </CardHeader>
                        <Divider />
                        <CardBody>
                            <Grid templateColumns="repeat(1, 1fr)" gap={6}>
                                {prizes?.filter(p => p.id_user_winner)?.map((prize) => (
                                    <GridItem key={prize.id} colSpan={1}>
                                        {prize?.position} - {prize?.user?.username} - {prize?.user?.name} {prize?.user?.lastname}
                                    </GridItem>
                                ))}
                            </Grid>
                        </CardBody>
                    </Card>    
                }
                {tickets?.filter(t => t.id_purchase)?.length === 0 && raffle?.status === 'active' && <Card bg="white" shadow="md">
                    <CardBody>
                        <EditRaffle className="max-w-xl" />
                    </CardBody>
                </Card>}
                {tickets?.filter(t => t.id_purchase)?.length === 0 && raffle?.status === 'active' && <Card bg="white" shadow="md">
                    <CardBody>
                        <DeleteRaffleForm className="max-w-xl" />
                    </CardBody>
                </Card>}
            </Container>
        </Authenticated>
    );
};

export default Show;
