import { useEffect, useState } from "react";
import { useBusinessStore } from "../../store/business.store";

function EditOfferModal({

    open,

    onClose,

    businessId,

    offer,

}) {

    const updateOfferInBusiness =
        useBusinessStore(
            (state) =>
                state.updateOfferInBusiness
        );

    const [form, setForm] =
        useState({

            title: "",

            description: "",

            validTill: "",

        });

    useEffect(() => {

        if (offer) {

            setForm({

                title: offer.title,

                description: offer.description,

                validTill: offer.validTill
                    ? offer.validTill.slice(0, 10)
                    : "",

            });

        }

    }, [offer]);

    const handleSubmit =
        async (e) => {

            e.preventDefault();

            await updateOfferInBusiness(

                businessId,

                offer._id,

                form

            );

            onClose();

        };

    if (!open) return null;

    return (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">

            <div className="w-full max-w-lg rounded-3xl bg-white p-6">

                <h2 className="mb-6 text-2xl font-bold">

                    Edit Offer 🔥

                </h2>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                >

                    <input

                        placeholder="Offer Title"

                        className="w-full rounded-xl border p-3"

                        value={form.title}

                        onChange={(e)=>

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

                        onChange={(e)=>

                            setForm({

                                ...form,

                                description: e.target.value,

                            })

                        }

                    />

                    <input

                        type="date"

                        className="w-full rounded-xl border p-3"

                        value={form.validTill}

                        onChange={(e)=>

                            setForm({

                                ...form,

                                validTill: e.target.value,

                            })

                        }

                    />

                    <div className="flex justify-end gap-3">

                        <button

                            type="button"

                            onClick={onClose}

                            className="rounded-xl border px-5 py-3"

                        >

                            Cancel

                        </button>

                        <button

                            className="rounded-xl bg-green-600 px-5 py-3 text-white hover:bg-green-700"

                        >

                            Update Offer

                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}

export default EditOfferModal;