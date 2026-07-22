import { useState } from "react";
import { toast } from "react-hot-toast";

import { useBusinessStore } from "../../store/business.store";

function CreateBusinessModal({ open, onClose }) {

    const createNewBusiness =
        useBusinessStore(
            (state) =>
                state.createNewBusiness
        );

    const [form, setForm] =
        useState({

            name: "",
            description: "",
            category: "restaurant",
            phone: "",
            address: "",

            businessImage: "",

            openingTime: "09:00",
            closingTime: "21:00",

            visibilityRadius: 10,

        });

    const handleChange = (e) => {

        setForm({

            ...form,

            [e.target.name]:
                e.target.value,

        });

    };

    const handleImageChange = (e) => {

        const file =
            e.target.files[0];

        if (!file) return;

        const reader =
            new FileReader();

        reader.onloadend = () => {

            setForm((prev) => ({

                ...prev,

                businessImage:
                    reader.result,

            }));

        };

        reader.readAsDataURL(file);

    };

    const handleSubmit =
        async (e) => {

            e.preventDefault();

            try {

                console.log(
                    "BUSINESS DATA:",
                    form
                );

                await createNewBusiness(
                    form
                );

                toast.success(
                    "Business created successfully 🏪"
                );

                setForm({

                    name: "",
                    description: "",
                    category: "restaurant",
                    phone: "",
                    address: "",

                    businessImage: "",

                    openingTime: "09:00",
                    closingTime: "21:00",

                    visibilityRadius: 10,

                });

                onClose();

            } catch (error) {

                console.log(
                    error.response?.data
                );

                toast.error(

                    error.response?.data?.message ||

                    "Failed to create business"

                );

            }

        };

    if (!open) return null;

    return (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 overflow-y-auto">

            <div className="w-full max-w-2xl rounded-3xl bg-white p-8 shadow-2xl">

                <div className="mb-8 flex items-center justify-between">

                    <h2 className="text-3xl font-bold">

                        Add Business 🏪

                    </h2>

                    <button
                        onClick={onClose}
                        className="text-3xl text-slate-500 hover:text-black"
                    >
                        ×
                    </button>

                </div>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >

                    {/* Banner Upload */}

                    <div>

                        <label className="mb-2 block font-medium">

                            Business Banner

                        </label>

                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="w-full rounded-lg border p-3"
                        />

                        {form.businessImage && (

                            <img
                                src={form.businessImage}
                                alt="Preview"
                                className="mt-4 h-48 w-full rounded-2xl object-cover"
                            />

                        )}

                    </div>

                    <input
                        type="text"
                        name="name"
                        placeholder="Business name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        className="w-full rounded-xl border p-4"
                    />

                    <textarea
                        name="description"
                        placeholder="Tell people about your business..."
                        rows="4"
                        value={form.description}
                        onChange={handleChange}
                        required
                        className="w-full rounded-xl border p-4"
                    />

                    <select
                        name="category"
                        value={form.category}
                        onChange={handleChange}
                        className="w-full rounded-xl border p-4"
                    >

                        <option value="restaurant">
                            Restaurant 🍔
                        </option>

                        <option value="cafe">
                            Cafe ☕
                        </option>

                        <option value="grocery">
                            Grocery 🛒
                        </option>

                        <option value="gym">
                            Gym 🏋️
                        </option>

                        <option value="salon">
                            Salon 💇
                        </option>

                        <option value="clinic">
                            Clinic 🏥
                        </option>

                        <option value="coaching">
                            Coaching 📚
                        </option>

                        <option value="repair">
                            Repair 🔧
                        </option>

                        <option value="other">
                            Other 🌍
                        </option>

                    </select>

                    <input
                        type="tel"
                        name="phone"
                        placeholder="Phone number"
                        value={form.phone}
                        onChange={handleChange}
                        required
                        className="w-full rounded-xl border p-4"
                    />

                    <input
                        type="text"
                        name="address"
                        placeholder="Address"
                        value={form.address}
                        onChange={handleChange}
                        required
                        className="w-full rounded-xl border p-4"
                    />

                    {/* Opening & Closing */}

                    <div className="grid grid-cols-2 gap-4">

                        <div>

                            <label className="mb-2 block text-sm font-medium">
                                Opening Time
                            </label>

                            <input
                                type="time"
                                name="openingTime"
                                value={form.openingTime}
                                onChange={handleChange}
                                className="w-full rounded-xl border p-4"
                            />

                        </div>

                        <div>

                            <label className="mb-2 block text-sm font-medium">
                                Closing Time
                            </label>

                            <input
                                type="time"
                                name="closingTime"
                                value={form.closingTime}
                                onChange={handleChange}
                                className="w-full rounded-xl border p-4"
                            />

                        </div>

                    </div>

                    <input
                        type="number"
                        name="visibilityRadius"
                        min="1"
                        max="60"
                        value={
                            form.visibilityRadius
                        }
                        onChange={handleChange}
                        className="w-full rounded-xl border p-4"
                        placeholder="Visibility radius (km)"
                    />

                    <button
                        type="submit"
                        className="w-full rounded-2xl bg-violet-600 py-4 text-lg font-semibold text-white transition hover:bg-violet-700"
                    >

                        Create Business 🚀

                    </button>

                </form>

            </div>

        </div>

    );

}

export default CreateBusinessModal;