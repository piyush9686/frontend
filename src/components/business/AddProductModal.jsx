import { useState } from "react";
import { toast } from "react-hot-toast";

import { useBusinessStore } from "../../store/business.store";

function AddProductModal({
    open,
    onClose,
    businessId,
}) {

    const addProductToBusiness =
        useBusinessStore(
            (state) =>
                state.addProductToBusiness
        );

    const [form, setForm] =
        useState({

            name: "",
            description: "",
            price: "",
            image: "",

        });

    const handleChange =
        (e) => {

            setForm({

                ...form,

                [e.target.name]:
                    e.target.value,

            });

        };

    const handleSubmit =
        async (e) => {

            e.preventDefault();

            try {

                await addProductToBusiness(

                    businessId,

                    {
                        ...form,
                        price: Number(
                            form.price
                        ),
                    }

                );

                toast.success(
                    "Product added successfully 🛍️"
                );

                setForm({

                    name: "",
                    description: "",
                    price: "",
                    image: "",

                });

                onClose();

            } catch (error) {

                toast.error(
                    "Failed to add product"
                );

            }

        };

    if (!open) return null;

    return (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

            <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl">

                <div className="mb-6 flex items-center justify-between">

                    <h2 className="text-2xl font-bold">

                        Add Product 🛍️

                    </h2>

                    <button
                        onClick={onClose}
                        className="text-2xl text-slate-500 hover:text-black"
                    >

                        ×

                    </button>

                </div>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                >

                    <input
                        type="text"
                        name="name"
                        placeholder="Product Name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        className="w-full rounded-xl border p-3"
                    />

                    <textarea
                        rows="3"
                        name="description"
                        placeholder="Description"
                        value={form.description}
                        onChange={handleChange}
                        className="w-full rounded-xl border p-3"
                    />

                    <input
                        type="number"
                        name="price"
                        placeholder="Price (₹)"
                        value={form.price}
                        onChange={handleChange}
                        required
                        className="w-full rounded-xl border p-3"
                    />

                    <input
                        type="text"
                        name="image"
                        placeholder="Image URL"
                        value={form.image}
                        onChange={handleChange}
                        className="w-full rounded-xl border p-3"
                    />

                    <button
                        type="submit"
                        className="w-full rounded-xl bg-violet-600 py-3 font-semibold text-white hover:bg-violet-700"
                    >

                        Add Product

                    </button>

                </form>

            </div>

        </div>

    );

}

export default AddProductModal;