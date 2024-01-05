import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Flex, FormControl, Heading, Text } from '@chakra-ui/react';
import { Transition } from '@headlessui/react';
import { useForm, usePage } from '@inertiajs/react';
import React from 'react'

const EditRaffle = ({ className }) => {
    const raffle = usePage().props.raffle;

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        title: raffle.title,
        description: raffle.description,
        price: raffle.price,
        quantity: raffle.quantity,
        draw_date: raffle.draw_date,
        max_tickets_per_user: raffle.max_tickets_per_user,
    });

    const submit = (e) => {
        e.preventDefault();

        patch(route('raffles.update', raffle));
    };

    return (
        <section className={className}>
            <header>
                <Heading as='h2' fontSize='xl' fontWeight='medium' color='gray.900' >Editar Rifa</Heading>

                <Text mt='1' fontSize='sm' color='gray.600'>
                    Edita los datos de tu rifa.
                </Text>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <FormControl>
                    <InputLabel htmlFor="title" value="Title" />

                    <TextInput
                        id="title"
                        className="mt-1 block w-full"
                        value={data.title}
                        onChange={(e) => setData('title', e.target.value)}
                        required
                        autoComplete="title"
                    />

                    <InputError className="mt-2" message={errors.title} />
                </FormControl>

                <FormControl>
                    <InputLabel htmlFor="description" value="Description" />

                    <TextInput
                        id="description"
                        className="mt-1 block w-full"
                        value={data.description}
                        onChange={(e) => setData('description', e.target.value)}
                        required
                        autoComplete="description"
                    />

                    <InputError className="mt-2" message={errors.description} />
                </FormControl>

                <FormControl>
                    <InputLabel htmlFor="price" value="Price per ticket" />

                    <TextInput
                        id="price"
                        type="number"
                        className="mt-1 block w-full"
                        value={data.price}
                        onChange={(e) => setData('price', e.target.value)}
                        required
                        autoComplete="price"
                    />

                    <InputError className="mt-2" message={errors.price} />
                </FormControl>

                <FormControl>
                    <InputLabel htmlFor="quantity" value="Tickets Quantity" />

                    <TextInput
                        id="quantity"
                        type="number"
                        className="mt-1 block w-full"
                        value={data.quantity}
                        onChange={(e) => setData('quantity', e.target.value)}
                        required
                        autoComplete="quantity"
                    />

                    <InputError className="mt-2" message={errors.quantity} />
                </FormControl>

                <FormControl>
                    <InputLabel htmlFor="draw_date" value="Draw Date" />

                    <TextInput
                        id="draw_date"
                        type="date"
                        className="mt-1 block w-full"
                        value={data.draw_date}
                        onChange={(e) => setData('draw_date', e.target.value)}
                        required
                        autoComplete="draw_date"
                    />

                    <InputError className="mt-2" message={errors.draw_date} />
                </FormControl>

                <FormControl>
                    <InputLabel htmlFor="max_tickets_per_user" value="Max Tickets per User" />

                    <TextInput
                        id="max_tickets_per_user"
                        type="number"
                        className="mt-1 block w-full"
                        value={data.max_tickets_per_user}
                        onChange={(e) => setData('max_tickets_per_user', e.target.value)}
                        required
                        autoComplete="max_tickets_per_user"
                    />

                    <InputError className="mt-2" message={errors.max_tickets_per_user} />
                </FormControl>

                <Flex align='center' gap='4'>
                    <PrimaryButton disabled={processing}>Save</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">Saved.</p>
                    </Transition>
                </Flex>
            </form>
        </section>
    );
}

export default EditRaffle