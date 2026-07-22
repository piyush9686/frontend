import { useState } from "react";
import { toast } from "react-hot-toast";

import { useEventStore } from "../../store/event.store";

function CreateEventModal({ open, onClose }) {

    const createNewEvent = useEventStore(
        (state) => state.createNewEvent
    );

    const [form, setForm] = useState({
        title: "",
        description: "",
        category: "badminton",
        eventDate: "",
        maxParticipants: 10,
        visibilityRadius: 10,
        eventImage: "",
    });

    const [preview, setPreview] = useState("");

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });

    };

    // ==========================
    // Upload image as Base64
    // ==========================
    const handleImageUpload = (e) => {

        const file = e.target.files[0];

        if (!file) return;

        const reader = new FileReader();

        reader.onloadend = () => {

            setPreview(reader.result);

            setForm((prev) => ({
                ...prev,
                eventImage: reader.result,
            }));

        };

        reader.readAsDataURL(file);

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await createNewEvent(form);

            toast.success(
                "Event created successfully 🎉"
            );

            onClose();

            setForm({
                title: "",
                description: "",
                category: "badminton",
                eventDate: "",
                maxParticipants: 10,
                visibilityRadius: 10,
                eventImage: "",
            });

            setPreview("");

        } catch (error) {

            console.log(error.response?.data);

            toast.error(
                error.response?.data?.message ||
                "Failed to create event"
            );

        }

    };

    if (!open) return null;

    return (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

            <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">

                <div className="mb-6 flex items-center justify-between">

                    <h2 className="text-2xl font-bold">
                        Create Event 🏸
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
                        name="title"
                        placeholder="Event title"
                        value={form.title}
                        onChange={handleChange}
                        required
                        className="w-full rounded-lg border p-3"
                    />

                    <textarea
                        name="description"
                        placeholder="Description"
                        rows="4"
                        value={form.description}
                        onChange={handleChange}
                        required
                        className="w-full rounded-lg border p-3"
                    />

                    <select
                        name="category"
                        value={form.category}
                        onChange={handleChange}
                        className="w-full rounded-lg border p-3"
                    >
                        <option value="badminton">
                            Badminton 🏸
                        </option>

                        <option value="cricket">
                            Cricket 🏏
                        </option>

                        <option value="football">
                            Football ⚽
                        </option>

                        <option value="music">
                            Music 🎵
                        </option>

                        <option value="study">
                            Study 📚
                        </option>

                        <option value="blood-donation">
                            Blood Donation 🩸
                        </option>

                        <option value="community">
                            Community 🤝
                        </option>

                        <option value="other">
                            Other 🌍
                        </option>
                    </select>

                    {/* Event Image Upload */}

                    <div>

                        <label className="mb-2 block text-sm font-medium">
                            Event Banner
                        </label>

                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="w-full rounded-lg border p-2"
                        />

                        {preview && (

                            <img
                                src={preview}
                                alt="Preview"
                                className="mt-3 h-40 w-full rounded-xl object-cover"
                            />

                        )}

                    </div>

                    <input
                        type="datetime-local"
                        name="eventDate"
                        value={form.eventDate}
                        onChange={handleChange}
                        required
                        className="w-full rounded-lg border p-3"
                    />

                    <div className="grid grid-cols-2 gap-4">

                        <input
                            type="number"
                            name="maxParticipants"
                            min="2"
                            value={form.maxParticipants}
                            onChange={handleChange}
                            className="rounded-lg border p-3"
                            placeholder="Participants"
                        />

                        <input
                            type="number"
                            name="visibilityRadius"
                            min="1"
                            value={form.visibilityRadius}
                            onChange={handleChange}
                            className="rounded-lg border p-3"
                            placeholder="Radius (km)"
                        />

                    </div>

                    <button
                        type="submit"
                        className="w-full rounded-xl bg-violet-600 py-3 font-semibold text-white hover:bg-violet-700"
                    >
                        Create Event
                    </button>

                </form>

            </div>

        </div>

    );

}

export default CreateEventModal;