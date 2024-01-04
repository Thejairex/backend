import { useEffect } from "react";
import Checkbox from "@/Components/Checkbox";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Button, Card, CardBody, CardFooter, Container, Divider, Flex, Heading, IconButton } from "@chakra-ui/react";
import { Head, Link, router, useForm } from "@inertiajs/react";
import FormSectionControl from "@/Components/FormSectionControl";
import { FaHouse } from "react-icons/fa6";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset("password");
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route("login"));
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            <Flex justify='space-between' px='4' w='container.lg'>
                <Heading>
                    Inicio de sesion
                </Heading>
                <IconButton icon={<FaHouse />} onClick={() => router.visit(route('home'))} />
            </Flex>


            {status && (
                <div className="mb-4 font-medium text-sm text-green-600">
                    {status}
                </div>
            )}

            <Container as="form" maxW="container.lg" onSubmit={submit}>
                <Card>
                    <CardBody>
                        <Flex direction="column" gap="4">
                            <FormSectionControl
                                data={data}
                                id="email"
                                errors={errors}
                                setData={setData}
                                label="Email"
                                type="text"
                                inputProps={{ autoComplete: "email" }}
                            />
                            <FormSectionControl
                                data={data}
                                id="password"
                                errors={errors}
                                setData={setData}
                                label="Contraseña"
                                type="password"
                                inputProps={{
                                    autoComplete: "current-password",
                                }}
                            />

                            <div className="block mt-4">
                                <label className="flex items-center">
                                    <Checkbox
                                        name="remember"
                                        checked={data.remember}
                                        onChange={(e) =>
                                            setData(
                                                "remember",
                                                e.target.checked
                                            )
                                        }
                                    />
                                    <span className="ms-2 text-sm text-gray-600">
                                        Remember me
                                    </span>
                                </label>
                            </div>
                        </Flex>
                    </CardBody>
                    <Divider borderColor="gray.400" />
                    <CardFooter>
                        <Flex align="center" justify="flex-end" w="full">
                            <Button
                                as={Link}
                                variant="link"
                                justifySelf='flex-start'
                                marginRight='auto'
                                href={route("register")}
                            >
                                No tienes cuenta?
                            </Button>
                            <Button
                                as={Link}
                                variant="link"
                                href={route("password.request")}
                            >
                                Olvidaste tu contraseña?
                            </Button>

                            <PrimaryButton
                                className="ms-4"
                                disabled={processing}
                                type="submit"
                            >
                                Iniciar sesion
                            </PrimaryButton>
                        </Flex>
                    </CardFooter>
                </Card>
            </Container>
        </GuestLayout>
    );
}
