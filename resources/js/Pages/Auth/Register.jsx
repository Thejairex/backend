import { useEffect } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, router, useForm } from "@inertiajs/react";
import FormSectionControl from "@/Components/FormSectionControl";
import { Button, Card, CardBody, CardFooter, Container, Divider, Flex, FormControl, FormLabel, Heading, IconButton, Select } from "@chakra-ui/react";
import ImageInput from "@/Components/ImageInput";
import { FaHouse } from "react-icons/fa6";

export default function Register({ org }) {

    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        lastname: "",
        username: "",
        phone: "",
        image: "",
        id_country: 10,
        birthdate: "",
        email: "",
        password: "",
        password_confirmation: "",
        type: org ? 'org' : 'simple'
    });

    useEffect(() => {
        return () => {
            reset("password", "password_confirmation");
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route("register"));
    };

    return (
        <GuestLayout>
            <Head title="Registrarse" />

            <Flex justify='space-between' px='4' w='container.lg'>
                <Heading>
                    Registro
                </Heading>
                <IconButton icon={<FaHouse />} onClick={() => router.visit(route('home'))} />
            </Flex>

            <Container as="form" maxW="container.lg" onSubmit={submit}>
                <Card>
                    <CardBody>
                        <Flex direction="column" gap="4">
                            <Flex direction="row" gap="2">
                                <FormSectionControl
                                    data={data}
                                    id="name"
                                    errors={errors}
                                    setData={setData}
                                    label="Nombre"
                                    type="text"
                                    inputProps={{ autoComplete: "name" }}
                                />
                                {data.type === 'simple' && <FormSectionControl
                                    data={data}
                                    id="lastname"
                                    errors={errors}
                                    setData={setData}
                                    label="Apellido"
                                    type="text"
                                    inputProps={{ autoComplete: "lastname" }}
                                />}
                            </Flex>

                            <Flex direction="row" gap="2">
                                <FormSectionControl
                                    data={data}
                                    id="username"
                                    errors={errors}
                                    setData={setData}
                                    label="Nombre de usuario"
                                    type="text"
                                    inputProps={{ autoComplete: "username" }}
                                />
                                <FormSectionControl
                                    data={data}
                                    id="email"
                                    errors={errors}
                                    setData={setData}
                                    label="Email"
                                    type="email"
                                    inputProps={{ autoComplete: "email" }}
                                />
                            </Flex>

                            <Flex direction="row" gap="2">
                                <FormSectionControl
                                    data={data}
                                    id="birthdate"
                                    errors={errors}
                                    setData={setData}
                                    label="Fecha de nacimiento"
                                    type="date"
                                />
                                <FormSectionControl
                                    data={data}
                                    id="phone"
                                    errors={errors}
                                    setData={setData}
                                    label="Teléfono"
                                    type="text"
                                    inputProps={{ autoComplete: "phone" }}
                                />
                            </Flex>

                            <Flex direction="row" gap="2">
                                <FormSectionControl
                                    data={data}
                                    id="password"
                                    errors={errors}
                                    setData={setData}
                                    label="Contraseña"
                                    type="password"
                                    inputProps={{
                                        autoComplete: "new-password",
                                    }}
                                />
                                <FormSectionControl
                                    data={data}
                                    id="password_confirmation"
                                    errors={errors}
                                    setData={setData}
                                    label="Confirmar contraseña"
                                    type="password"
                                    inputProps={{
                                        autoComplete: "new-password",
                                    }}
                                />
                            </Flex>
                            <ImageInput
                                setData={setData}
                                error={errors.image}
                                id="image"
                                label="Imagen de perfil"
                                recomendedText="Te recomendamos que la imagen sea cuadrada"
                            />
                        </Flex>
                    </CardBody>
                    <Divider borderColor='gray.400' />
                    <CardFooter>
                        <Flex align='center' justify='flex-end' w='full'>
                            <Button
                                as={Link}
                                variant='link'
                                href={route("login")}
                            >
                                Ya tienes un usuario?
                            </Button>

                            <PrimaryButton
                                className="ms-4"
                                disabled={processing}
                            >
                                Registrarse
                            </PrimaryButton>
                        </Flex>
                    </CardFooter>
                </Card>
            </Container>
        </GuestLayout>
    );
}
