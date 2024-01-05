import PrimaryButton from "@/Components/PrimaryButton";
import {
    Card,
    CardHeader,
    CardBody,
    Text,
    Flex,
    Image,
    Heading,
    Badge,
    Divider,
    CardFooter,
} from "@chakra-ui/react";
import { router } from "@inertiajs/react";
import React from "react";

const RaffleInfo = ({ raffle }) => {
    return (
        <Card bg="white" shadow="md">
            <CardHeader p="0">
                <Flex direction="column" gap="4">
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
                        gap="4"
                        mx="4"
                        mb="4"
                    >
                        <Image
                            src={raffle.image_logo}
                            alt=""
                            h="16"
                            aspectRatio="1/1"
                            objectFit="cover"
                            rounded="md"
                            onError={(e) => (e.target.style = "display:none")}
                        />
                        <Flex direction="column" gap="2">
                            <Heading as="h3" size="md" fontWeight="semibold">
                                {raffle.title}
                            </Heading>
                            <Text>{raffle.description}</Text>
                        </Flex>
                    </Flex>
                </Flex>
            </CardHeader>
            <Divider borderColor="gray.400" />
            <CardBody>
                <Flex direction="row" justify="space-between">
                    <Flex direction="column">
                        <Text>
                            Creador:{" "}
                            <Text as="span" fontWeight="semibold">
                                {raffle.user.username}
                            </Text>
                        </Text>
                        <Text>
                            Precio por ticket:{" "}
                            <Text as="span" fontWeight="semibold">
                                {raffle.price}$
                            </Text>
                        </Text>
                        <Text>
                            Cantidad de tickets:{" "}
                            <Text as="span" fontWeight="semibold">
                                {raffle.quantity}
                            </Text>
                        </Text>
                    </Flex>
                    <Flex direction="column" align="flex-end">
                        {raffle.draw_date && <Text>
                            Fecha de sorteo:{" "}
                            <Text as="span" fontWeight="semibold">
                                {raffle.draw_date}
                            </Text>
                        </Text>}
                        <Text>
                            Tickets maximos por usuario:{" "}
                            <Text as="span" fontWeight="semibold">
                                {raffle.max_tickets_per_user}
                            </Text>
                        </Text>
                    </Flex>
                </Flex>
            </CardBody>
            <Divider borderColor="gray.400" />
            <CardFooter>
                <PrimaryButton
                    onClick={() => router.visit(route("raffles.show.invited", raffle.id))}
                    type="button"
                >
                    Ver rifa
                </PrimaryButton>
            </CardFooter>
        </Card>
    );
};

export default RaffleInfo;
