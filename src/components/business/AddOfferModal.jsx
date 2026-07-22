import { useState } from "react";
import { useBusinessStore } from "../../store/business.store";

function AddOfferModal({
    open,
    onClose,
    businessId,
}) {

    const addOfferToBusiness =
        useBusinessStore(
            (state) =>
                state.addOfferToBusiness
        );

    const [form, setForm] =
        useState({

            title: "",
            description: "",
            validTill: "",

        });

    const handleSubmit =
        async (e) => {

            e.preventDefault();

            await addOfferToBusiness(
                businessId,
                form
            );

            setForm({

                title: "",
                description: "",
                validTill: "",

            });

            onClose();

        };

    if (!open) return null;

    return (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">

            <div className="w-full max-w-lg rounded-3xl bg-white p-6">

                <h2 className="mb-6 text-2xl font-bold">

                    Add Offer 🔥

                </h2>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                >

                    <input
                        placeholder="Offer Title"
                        className="w-full rounded-xl border p-3"
                        value={form.title}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                title: e.target.value,
                            })
                        }
                    />

                    <textarea
                        placeholder="Description"
                        className="w-full rounded-xl border p-3"
                        value={form.description}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                description:
                                    e.target.value,
                            })
                        }
                    />

                    <input
                        type="date"
                        className="w-full rounded-xl border p-3"
                        value={form.validTill}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                validTill:
                                    e.target.value,
                            })
                        }
                    />

                    <button
                        className="w-full rounded-xl bg-green-600 py-3 text-white"
                    >

                        Add Offer

                    </button>

                </form>

            </div>

        </div>

    );

}

export default AddOfferModal;