import React from "react";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";
import {
    Avatar,
    Box,
    Button,
    Card,
    CardBody,
    CardFooter,
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

const Index = ({ auth, raffles }) => {
    const { data, links } = raffles;

    return (
        <Authenticated
            user={auth.user}
            header={
                <AuthenticatedHeader
                    text="Sorteos"
                    href={route("dashboard")}
                    children={null}
                />
            }
        >
            <Head title="Sorteos" />

            <Container
                as={Flex}
                gap="4"
                direction="column"
                maxW="container.xl"
            >
                <Card>
                    <CardHeader>
                        <Heading as="h3" size="md" fontWeight="semibold">
                            Sorteos
                        </Heading>
                        <Text size="sm" color="gray.700" mt="2">
                            Aqui podras ver los sorteos disponibles y en los que has participado.
                        </Text>
                    </CardHeader>
                </Card>
                <Card shadow="md" rounded="md">
                    <CardHeader>
                        <Flex
                            direction="row"
                            align="center"
                            justify="space-between"
                        >
                            <Heading
                                as="h3"
                                fontWeight="semibold"
                                fontSize="xl"
                                letterSpacing="tight"
                            >
                                Sorteos Disponibles:
                            </Heading>
                        </Flex>
                    </CardHeader>
                    <Divider borderColor="gray.400" />
                    <CardBody>
                        <Flex direction="column" gap="4">
                            {data?.length !== 0 &&
                                data?.map((raffle) => (
                                    <Card
                                        key={raffle.id}
                                        _hover={{ bg: "gray.100" }}
                                    >
                                        <Link
                                            href={route(
                                                "raffles.show.invited",
                                                raffle.id
                                            )}
                                        >
                                            <CardHeader pos="relative" overflow='hidden' h='32'>
                                                <Image
                                                    pos="absolute"
                                                    inset="0"
                                                    h="full"
                                                    maxHeight='32'
                                                    zIndex="0"
                                                    filter='blur(5px)'
                                                    src={raffle.image_banner}
                                                    alt=""
                                                    w="full"
                                                    rounded="md"
                                                    objectFit="cover"
                                                />
                                                <Box pos='absolute' inset='0' zIndex='1' bg='whiteAlpha.400' />
                                            </CardHeader>
                                            <Divider />
                                            <CardBody>
                                                <Flex
                                                    direction="row"
                                                    justify="flex-start"
                                                    gap='4'
                                                >
                                                <Avatar
                                                    name={raffle.title}
                                                    src={raffle.image_logo}
                                                />
                                                    <Heading
                                                        as="h3"
                                                        fontWeight="semibold"
                                                        fontSize="xl"
                                                        letterSpacing="tight"
                                                    >
                                                        {raffle.title}
                                                    </Heading>
                                                </Flex>
                                                <Divider
                                                    borderColor="gray.400"
                                                    my="4"
                                                />
                                                <Flex
                                                    direction="row"
                                                    justify="space-between"
                                                >
                                                    <Text
                                                        fontSize="sm"
                                                    >
                                                        {raffle.description}
                                                    </Text>
                                                    <VStack align="flex-end">
                                                        <Text
                                                            fontSize="sm"
                                                        >
                                                            {new Date(raffle.created_at).toLocaleString()}
                                                        </Text>
                                                    </VStack>
                                                </Flex>
                                            </CardBody>
                                        </Link>
                                    </Card>
                                ))}
                            {data?.length === 0 && (
                                <Text
                                    marginInline="auto"
                                    fontSize="sm"
                                >
                                    No hay sorteos disponibles
                                </Text>
                            )}
                        </Flex>
                    </CardBody>
                    <Divider borderColor="gray.400" />
                    <CardFooter>
                        <Flex
                            direction="row"
                            justify="flex-end"
                            align="center"
                            w="full"
                        >
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
                                            fontSize="sm"
                                            cursor="pointer"
                                        >
                                            {link.label.includes("Previous")
                                                ? "Anterior"
                                                : link.label.includes("Next")
                                                ? "Siguiente"
                                                : link.label}
                                        </Text>
                                    </Button>
                                ))}
                            </Flex>
                        </Flex>
                    </CardFooter>
                </Card>
            </Container>
        </Authenticated>
    );
};

export default Index;
