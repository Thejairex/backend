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

const Show = ({ auth, raffle, tickets }) => {
    const [filter, setFilter, filteredArray] = useFilter(
        tickets,
        {
            Todos: (a) => {
                return a;
            },
            Vendidos: (a) => {
                return a.id_purchase;
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
                                    alt=""
                                    h="16"
                                    aspectRatio="1/1"
                                    objectFit="cover"
                                    rounded="md"
                                    onError={(e) =>
                                        (e.target.style = "display:none")
                                    }
                                />
                                <Flex direction="column" gap="2" align='flex-start' >
                                    <Heading
                                        as="h3"
                                        size="md"
                                        fontWeight="semibold"
                                    >
                                        {raffle.title}
                                    </Heading>
                                    <Text>{raffle.description}</Text>
                                    <Badge colorScheme="green" w='auto'>{raffle.status}</Badge>
                                </Flex>
                            </Flex>
                        </Flex>
                    </CardHeader>
                    <Divider borderColor="gray.400" />
                    <CardBody>
                        <Flex direction="row" justify="space-between">
                            <Flex direction="column">
                                <Text>
                                    Creador :{" "}
                                    <Text as="span" fontWeight="semibold">
                                        <Link
                                            href={route(
                                                "profile.show",
                                                raffle.user.id
                                            )}
                                        >
                                            {raffle.user.username}
                                        </Link>
                                    </Text>
                                </Text>
                                <Text>
                                    Precio por ticket:{" "}
                                    <Text as="span" fontWeight="semibold">
                                        {raffle.price}$
                                    </Text>
                                </Text>
                                <Text>
                                    Cantidad de tickets habilitados:{" "}
                                    <Text as="span" fontWeight="semibold">
                                        {tickets?.filter(t => t.id_purchase === null).length}
                                    </Text>
                                </Text>
                            </Flex>
                            <Flex direction="column" align="flex-end">
                                <Text>
                                    Fecha de sorteo:{" "}
                                    <Text as="span" fontWeight="semibold">
                                        {raffle.draw_date}
                                    </Text>
                                </Text>
                                <Text>
                                    Maxima compra de tickets por usuario:{" "}
                                    <Text as="span" fontWeight="semibold">
                                        {raffle.max_tickets_per_user}
                                    </Text>
                                </Text>
                                <Text>
                                    Cantidad de tickets:{" "}
                                    <Text as="span" fontWeight="semibold">
                                        {raffle.quantity}
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
                                Compra de tickets
                            </Heading>
                        </Flex>
                    </CardHeader>
                    <Divider borderColor="gray.400" />
                    <CardBody>
                        {raffle?.prizes?.length > 0 && raffle?.status === 'active' && (
                            <Flex direction="row" justify="space-between">
                                <PrimaryButton
                                as={Link}
                                href={route("ticket.buy", raffle.id)}
                                >
                                    Comprar tickets
                                </PrimaryButton>
                            </Flex>
                        )}
                        {raffle?.prizes?.length === 0 && (
                            <Text>Rifa no activa</Text>
                        )}
                        {raffle?.status === 'completed' && <Text>La rifa ha finalizado</Text>}
                    </CardBody>
                </Card>
                <Card bg="white" shadow="md">
                    <CardHeader>
                        <Flex direction="row" justify="space-between">
                            <Heading as="h3" size="md" fontWeight="semibold">
                                Premios
                            </Heading>
                        </Flex>
                    </CardHeader>
                    <Divider />
                    <CardBody>
                        {raffle?.prizes?.length !== 0 && (
                            <>
                                <Grid templateColumns="repeat(1, 1fr)" gap={6}>
                                    {raffle?.prizes?.map((prize) => (
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
                        {raffle?.prizes?.length === 0 && (
                            <Text>No hay premios</Text>
                        )}
                    </CardBody>
                </Card>
            </Container>
        </Authenticated>
    );
};

export default Show;
