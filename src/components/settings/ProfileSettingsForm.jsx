import { useState } from "react";
import { toast } from "react-hot-toast";

import { useAuthStore } from "../../store/auth.store";

function ProfileSettingsForm() {

    const user = useAuthStore(
        (state) => state.user
    );

    const updateProfile = useAuthStore(
        (state) => state.updateProfile
    );

    const [form, setForm] =
        useState({

            name: user?.name || "",

            bio: user?.bio || "",

            interests:
                user?.interests?.join(", ") || "",

            radius:
                user?.radius || 50,

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

                await updateProfile({

                    ...form,

                    interests:
                        form.interests
                            .split(",")

                            .map(
                                (item) =>
                                    item.trim()
                            )

                            .filter(Boolean),

                });

                toast.success(
                    "Profile updated successfully 🎉"
                );

            } catch (error) {

                toast.error(

                    error.response?.data?.message ||

                    "Failed to update profile"

                );

            }

        };

    return (

        <div className="rounded-2xl bg-white p-6 shadow-sm">

            <h2 className="mb-6 text-2xl font-bold">

                Profile Settings 👤

            </h2>

            <form
                onSubmit={handleSubmit}
                className="space-y-4"
            >

                <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Name"
                    className="w-full rounded-lg border p-3"
                />

                <textarea
                    name="bio"
                    rows="4"
                    value={form.bio}
                    onChange={handleChange}
                    placeholder="Bio"
                    className="w-full rounded-lg border p-3"
                />

                <input
                    type="text"
                    name="interests"
                    value={form.interests}
                    onChange={handleChange}
                    placeholder="React, Football, Music"
                    className="w-full rounded-lg border p-3"
                />

                <div>

                    <label className="mb-2 block font-medium">

                        Community Radius:
                        {" "}
                        {form.radius} km

                    </label>

                    <input
                        type="range"
                        min="10"
                        max="100"
                        step="5"
                        name="radius"
                        value={form.radius}
                        onChange={handleChange}
                        className="w-full"
                    />

                </div>

                <button
                    type="submit"
                    className="
                        w-full rounded-xl
                        bg-violet-600 py-3
                        font-semibold text-white
                        hover:bg-violet-700
                    "
                >

                    Save Changes

                </button>

            </form>

        </div>

    );

}

export default ProfileSettingsForm;