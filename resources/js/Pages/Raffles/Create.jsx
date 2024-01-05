import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import React from "react";
import CreateRaffle from "./Partials/CreateRaffles";
import { Container } from "@chakra-ui/react";
import AuthenticatedHeader from "@/Components/AuthenticatedHeader";

const Create = ({ auth }) => {
    return (
        <Authenticated
            user={auth.user}
            header={
                <AuthenticatedHeader
                    text="Crear sorteo"
                    href={route("raffles.index")}
                    children={null}
                />
            }
        >
            <Head title="Crear sorteo" />

            <Container maxW="container.lg" py="12" >
                <CreateRaffle />
            </Container>
        </Authenticated>
    );
};

export default Create;
