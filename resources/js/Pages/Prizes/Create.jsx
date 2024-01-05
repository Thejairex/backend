import FormSectionControl from "@/Components/FormSectionControl";
import ImageInput from "@/Components/ImageInput";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import {
    Box,
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Container,
    Divider,
    Flex,
    FormControl,
    Image,
    Text,
} from "@chakra-ui/react";
import { Head, Link, useForm } from "@inertiajs/react";
import React from "react";

const Create = ({ auth, raffle }) => {
    const { data, setData, post, errors, processing, recentlySuccessful } =
        useForm({
            id_raffle: raffle.id,
            title: "",
            description: "",
            image: null,
            quantity: 1,
            position: 1,
            delivery_method: "presencial",
            status: true,
        });

    const submit = (e) => {
        e.preventDefault();

        post(route("prizes.store", raffle.id));
    };

    return (
        <Authenticated
            user={auth.user}
            header={
                <Flex direction="row" justify="space-between">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Crear Premio
                    </h2>
                    <PrimaryButton
                        as={Link}
                        href={route("raffles.show", raffle.id)}
                    >
                        Volver
                    </PrimaryButton>
                </Flex>
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
                <Card as="form" onSubmit={submit} bg="white" shadow="md">
                    <CardHeader>
                        <h3 className="font-semibold text-lg text-gray-800 leading-tight">
                            Crear Premio
                        </h3>
                    </CardHeader>
                    <Divider />
                    <CardBody>
                        <Flex direction="column" gap="4">
                            <FormSectionControl data={data} setData={setData} errors={errors} id="title" label="Titulo" />
                            <FormSectionControl data={data} setData={setData} errors={errors} id="description" label="Descripción" />
                            <FormControl>
                                <ImageInput setData={setData} error={errors.image} id="image" label="Imagen" recomendedText='Te recomendamos que la imagen sea cuadrada' />
                            </FormControl>
                            <FormSectionControl data={data} setData={setData} errors={errors} id="quantity" label="Cantidad" type='number' />
                            <FormSectionControl data={data} setData={setData} errors={errors} id="position" label="Posición" type='number' />
                            <FormSectionControl data={data} setData={setData} errors={errors} id="delivery_method" label="Metodo de entrega" />
                        </Flex>
                    </CardBody>
                    <Divider />
                    <CardFooter>
                        <Flex direction="row" justify="flex-end">
                            <PrimaryButton
                                type="submit"
                                className="mt-2"
                                processing={processing}
                                disabled={processing}
                            >
                                Crear Premio
                            </PrimaryButton>
                        </Flex>
                    </CardFooter>
                </Card>
            </Container>
        </Authenticated>
    );
};

export default Create;
