import { useEffect, useState } from "react";
import { useBusinessStore } from "../../store/business.store";

function EditProductModal({

    open,

    onClose,

    businessId,

    product,

}) {

    const updateProductInBusiness =
        useBusinessStore(
            (state) =>
                state.updateProductInBusiness
        );

    const [form, setForm] =
        useState({

            name: "",

            description: "",

            price: "",

            image: "",

            available: true,

        });

    useEffect(() => {

        if (product) {

            setForm({

                name: product.name,

                description: product.description,

                price: product.price,

                image: product.image,

                available: product.available,

            });

        }

    }, [product]);

    const handleSubmit =
        async (e) => {

            e.preventDefault();

            await updateProductInBusiness(

                businessId,

                product._id,

                {

                    ...form,

                    price: Number(form.price),

                }

            );

            onClose();

        };

    if (!open) return null;

    return (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">

            <div className="w-full max-w-lg rounded-3xl bg-white p-6">

                <h2 className="mb-6 text-2xl font-bold">

                    Edit Product ✏️

                </h2>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                >

                    <input
                        className="w-full rounded-xl border p-3"
                        placeholder="Product Name"
                        value={form.name}
                        onChange={(e)=>

                            setForm({

                                ...form,

                                name: e.target.value,

                            })

                        }
                    />

                    <textarea
                        className="w-full rounded-xl border p-3"
                        placeholder="Description"
                        value={form.description}
                        onChange={(e)=>

                            setForm({

                                ...form,

                                description: e.target.value,

                            })

                        }
                    />

                    <input
                        type="number"
                        className="w-full rounded-xl border p-3"
                        placeholder="Price"
                        value={form.price}
                        onChange={(e)=>

                            setForm({

                                ...form,

                                price: e.target.value,

                            })

                        }
                    />

                    <input
                        className="w-full rounded-xl border p-3"
                        placeholder="Image URL"
                        value={form.image}
                        onChange={(e)=>

                            setForm({

                                ...form,

                                image: e.target.value,

                            })

                        }
                    />

                    <label className="flex items-center gap-3">

                        <input

                            type="checkbox"

                            checked={form.available}

                            onChange={(e)=>

                                setForm({

                                    ...form,

                                    available:
                                        e.target.checked,

                                })

                            }

                        />

                        Available

                    </label>

                    <div className="flex justify-end gap-3">

                        <button

                            type="button"

                            onClick={onClose}

                            className="rounded-xl border px-5 py-3"

                        >

                            Cancel

                        </button>

                        <button

                            className="rounded-xl bg-violet-600 px-5 py-3 text-white"

                        >

                            Update Product

                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}

export default EditProductModal;