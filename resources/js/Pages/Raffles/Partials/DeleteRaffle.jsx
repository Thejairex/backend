import { useRef, useState } from 'react';
import DangerButton from '@/Components/DangerButton';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import { useForm, usePage } from '@inertiajs/react';

export default function DeleteRaffleForm({ className = '' }) {
    const [confirmingRaffleDeletion, setConfirmingRaffleDeletion] = useState(false);
    const titleInput = useRef();
    const raffle = usePage().props.raffle;

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
    } = useForm({
        title: '',
    });

    const confirmRaffleDeletion = () => {
        setConfirmingRaffleDeletion(true);
    };

    const deleteRaffle = (e) => {
        e.preventDefault();

        destroy(route('raffles.destroy', raffle), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => titleInput.current.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingRaffleDeletion(false);

        reset();
    };

    return (
        <section className={`space-y-6 ${className}`}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">Eliminar Rifa</h2>

                <p className="mt-1 text-sm text-gray-600">
                    Una vez que elimines tu rifa, todos sus recursos y datos se eliminarán permanentemente. Antes de eliminar tu rifa, descarga cualquier dato o información que desees conservar.
                    No podras recuperar tu rifa una vez eliminada, tampoco podras eliminar una rifa que todavia tenga tickets vendidos.
                </p>
            </header>

            <DangerButton onClick={confirmRaffleDeletion}>Eliminar Rifa</DangerButton>

            <Modal show={confirmingRaffleDeletion} onClose={closeModal}>
                <form onSubmit={deleteRaffle} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">
                        Estas seguro que deseas eliminar tu rifa?
                    </h2>

                    <p className="mt-1 text-sm text-gray-600">
                        Por favor ingresa el titulo de la rifa para confirmar que deseas eliminar tu rifa.
                    </p>

                    <div className="mt-6">
                        <InputLabel htmlFor="title" value="Titulo" className="sr-only" />

                        <TextInput
                            id="title"
                            type="text"
                            name="title"
                            ref={titleInput}
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            className="mt-1 block w-3/4"
                            isFocused
                            placeholder="Titulo"
                        />

                        <InputError message={errors.title} className="mt-2" />
                    </div>

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>Cancelar</SecondaryButton>

                        <DangerButton type='submit' className="ms-3" disabled={processing}>
                            Eliminar Rifa
                        </DangerButton>
                    </div>
                </form>
            </Modal>
        </section>
    );
}
