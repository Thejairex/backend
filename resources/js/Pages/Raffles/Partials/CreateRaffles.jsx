import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Link, useForm, usePage } from "@inertiajs/react";
import { Transition } from "@headlessui/react";
import {
    Box,
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Divider,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Select,
    Text,
} from "@chakra-ui/react";
import React from "react";
import ImageInput from "@/Components/ImageInput";
import FormSectionControl from "@/Components/FormSectionControl";

export default function CreateRaffle({ className = "" }) {
    const user = usePage().props.auth.user;

    const { data, setData, post, errors, processing, recentlySuccessful } =
        useForm({
            title: "",
            description: "",
            image_banner: "",
            image_logo: "",
            id_user_creator: user.id,
            price: 1000,
            quantity: 1000,
            status: true,
            payment_method: "Coinbase",
            social_networks: "Instagram,Facebook,Twitter",
            draw_date: "",
            max_tickets_per_user: 10,
            id_country: 1,
            image_banner: "url",
            image_logo: "url",
            draw_type: 'datetime',
            show_others: false
        });

    const imageLogoInputRef = React.useRef(null)
    const imageBannerInputRef = React.useRef(null)

    const submit = (e) => {
        e.preventDefault();

        post(route("raffles.store"));
    };

    return (
        <Box as="section" className={className}>
            <Card as="form" onSubmit={submit}>
                <CardHeader>
                    <Heading as="h3" size="md" fontWeight="semibold">
                        Crea un nuevo sorteo
                    </Heading>
                    <Text size="sm" color="gray.700" mt="2">
                        Crea un sorteo con los datos que se te piden a
                        continuación.
                    </Text>
                </CardHeader>
                <Divider borderColor="gray.400" />
                <CardBody>
                    <Flex direction="column" gap="4">
                        <FormSectionControl id='title' label='Nombre del sorteo' setData={setData} errors={errors} data={data} type='text' />
                        <FormSectionControl id='description' label='Descripción' setData={setData} errors={errors} data={data} type='text' />

                        <Flex direction="row" gap="2">
                            <ImageInput id='image_logo' label='Logo del sorteo' setData={setData} recomendedText='Te recomendamos una imagen cuadrada' error={errors.image_logo} imageProps={{ h: '32' }} />
                            <ImageInput id='image_banner' label='Banner del sorteo' setData={setData} error={errors.image_banner} recomendedText='Te recomendamos una imagen rectangular' imageProps={{ aspectRatio: '', w: 'full', h: '32' }} />
                        </Flex>

                        <FormSectionControl id='price' label='Precio por ticket' setData={setData} errors={errors} data={data} type='number' />
                        <FormSectionControl id='quantity' label='Cantidad de tickets' setData={setData} errors={errors} data={data} type='number' /* inputProps={{ max: plan.max_numbers }} */ />
                        <FormControl>
                            <FormLabel>
                                Metodo de sorteo
                            </FormLabel>
                            <Select onChange={e => setData('draw_type', e.currentTarget.value)} defaultValue={data.draw_type} >
                                <option value='datetime'>Sortear en fecha y hora</option>
                                <option value='manual'>Sorteo manual</option>
                            </Select>
                        </FormControl>
                        {data.draw_type === 'datetime' && <FormSectionControl id='draw_date' label='Fecha de sorteo' setData={setData} errors={errors} data={data} type='datetime-local' />}
                        <FormSectionControl id='max_tickets_per_user' label='Maximo de tickets por usuario' setData={setData} errors={errors} data={data} type='number' />
                    </Flex>
                </CardBody>
                <Divider borderColor="gray.400" />
                <CardFooter>
                    <PrimaryButton disabled={processing}>Crear</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">Rifa creada</p>
                    </Transition>
                </CardFooter>
            </Card>
        </Box>
    );
}
