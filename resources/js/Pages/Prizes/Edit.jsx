import AuthenticatedHeader from '@/Components/AuthenticatedHeader';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { Card, CardBody, CardHeader, CardFooter, Container, Divider, Flex } from '@chakra-ui/react';
import { Head, Link, useForm } from '@inertiajs/react';
import React from 'react'

const Edit = ({ auth, prize }) => {
    const { data, setData, post, errors, processing, recentlySuccessful } =
        useForm({
            id_raffle: prize.id_raffle,
            title: prize.title,
            description: prize.description,
            quantity: prize.quantity,
            position: prize.position,
            image: prize.image,
            delivery_method: prize.delivery_method,
        });

    const submit = (e) => {
        e.preventDefault();

        post(route("prizes.update", prize.id));
    };

    return (
        <Authenticated
            user={auth.user}
            header={
                <AuthenticatedHeader text="Editar Premio" href={route('raffles.show', prize.id_raffle)} children={null} />
            }
        >
            <Head title={`Editar - ${prize.title}`} />

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
                            Editar Premio
                        </h3>
                    </CardHeader>
                    <Divider />
                    <CardBody>
                        <Flex direction="column" gap="4">
                            <div>
                                <InputLabel htmlFor="title" value="Titulo" />

                                <TextInput
                                    id="title"
                                    className="mt-1 block w-full"
                                    value={data.title}
                                    onChange={(e) =>
                                        setData("title", e.target.value)
                                    }
                                    required
                                    autoComplete="title"
                                />

                                <InputError
                                    className="mt-2"
                                    message={errors.title}
                                />
                            </div>
                            <div>
                                <InputLabel
                                    htmlFor="description"
                                    value="Descripción"
                                />

                                <TextInput
                                    id="description"
                                    className="mt-1 block w-full"
                                    value={data.description}
                                    onChange={(e) =>
                                        setData("description", e.target.value)
                                    }
                                    required
                                    autoComplete="description"
                                />

                                <InputError
                                    className="mt-2"
                                    message={errors.description}
                                />
                            </div>
                            <div>
                                <InputLabel htmlFor="image" value="Imagen" />

                                <TextInput
                                    id="image"
                                    className="mt-1 block w-full"
                                    type="file"
                                    onChange={(e) => 
                                        setData("image", e.target.files[0])
                                    }
                                    autoComplete="image"
                                />

                                <InputError
                                    className="mt-2"
                                    message={errors.image}
                                />
                            </div>
                            <div>
                                <InputLabel
                                    htmlFor="quantity"
                                    value="Cantidad"
                                />

                                <TextInput
                                    id="quantity"
                                    className="mt-1 block w-full"
                                    value={data.quantity}
                                    type="number"
                                    onChange={(e) =>
                                        setData("quantity", e.target.value)
                                    }
                                    required
                                    autoComplete="quantity"
                                />

                                <InputError
                                    className="mt-2"
                                    message={errors.quantity}
                                />
                            </div>
                            <div>
                                <InputLabel
                                    htmlFor="position"
                                    value="Posición"
                                />

                                <TextInput
                                    id="position"
                                    className="mt-1 block w-full"
                                    value={data.position}
                                    type="number"
                                    onChange={(e) =>
                                        setData("position", e.target.value)
                                    }
                                    required
                                    autoComplete="position"
                                />

                                <InputError
                                    className="mt-2"
                                    message={errors.position}
                                />
                            </div>
                            <div>
                                <InputLabel
                                    htmlFor="delivery_method"
                                    value="Metodo de entrega"
                                />

                                <TextInput
                                    id="delivery_method"
                                    className="mt-1 block w-full"
                                    value={data.delivery_method}
                                    onChange={(e) =>
                                        setData(
                                            "delivery_method",
                                            e.target.value
                                        )
                                    }
                                    required
                                    isFocused
                                    autoComplete="delivery_method"
                                />

                                <InputError
                                    className="mt-2"
                                    message={errors.delivery_method}
                                />
                            </div>
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
                                Editar Premio
                            </PrimaryButton>
                        </Flex>
                    </CardFooter>
                </Card>
            </Container>
        </Authenticated>
    );
}

export default Edit