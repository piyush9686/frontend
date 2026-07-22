import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import AppLayout from "../../components/layout/AppLayout";
import LocationPicker from "../../components/auth/LocationPicker";

import { useAuthStore } from "../../store/auth.store";

function Register() {

    const navigate = useNavigate();

    const register = useAuthStore(
        (state) => state.register
    );

    const [formData, setFormData] = useState({

        name: "",
        email: "",
        password: "",
        bio: "",
        interests: "",
        locationName: "",

    });

    const [locationMode, setLocationMode] =
        useState("manual");

    const [selectedLocation, setSelectedLocation] =
        useState(null);

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value,

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await register({

                ...formData,

                interests: formData.interests
                    .split(",")
                    .map((item) => item.trim())
                    .filter(Boolean),

                longitude:
                    selectedLocation?.lng,

                latitude:
                    selectedLocation?.lat,

            });

            toast.success(
                "Registration successful 🎉"
            );

            navigate("/login");

        } catch (error) {

            toast.error(

                error.response?.data?.message ||

                "Registration failed"

            );

        }

    };

    return (

        <AppLayout>

            <div className="flex items-center justify-center px-4 py-16">

                <div className="w-full max-w-lg rounded-3xl bg-white p-8 shadow-xl">

                    <h1 className="mb-2 text-3xl font-bold">
                        Join LocalConnect 🌍
                    </h1>

                    <p className="mb-8 text-slate-500">
                        Connect with your local community.
                    </p>

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-4"
                    >

                        {/* Name */}

                        <input
                            type="text"
                            name="name"
                            placeholder="Full Name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full rounded-xl border px-4 py-3 outline-none focus:border-violet-500"
                            required
                        />

                        {/* Email */}

                        <input
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full rounded-xl border px-4 py-3 outline-none focus:border-violet-500"
                            required
                        />

                        {/* Password */}

                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full rounded-xl border px-4 py-3 outline-none focus:border-violet-500"
                            required
                        />

                        {/* Bio */}

                        <textarea
                            name="bio"
                            rows="3"
                            placeholder="Tell your community about yourself..."
                            value={formData.bio}
                            onChange={handleChange}
                            className="w-full rounded-xl border px-4 py-3 outline-none focus:border-violet-500"
                        />

                        {/* Interests */}

                        <input
                            type="text"
                            name="interests"
                            placeholder="Coding, Sports, Music"
                            value={formData.interests}
                            onChange={handleChange}
                            className="w-full rounded-xl border px-4 py-3 outline-none focus:border-violet-500"
                        />

                        <p className="text-sm text-slate-500">
                            Separate interests with commas.
                        </p>

                        {/* Location Section */}

                        <div className="space-y-4 rounded-2xl border p-4">

                            <h3 className="font-semibold">
                                Community Location 📍
                            </h3>

                            <div className="flex gap-6">

                                <label className="flex items-center gap-2">

                                    <input
                                        type="radio"
                                        checked={
                                            locationMode === "manual"
                                        }
                                        onChange={() =>
                                            setLocationMode("manual")
                                        }
                                    />

                                    Type Manually

                                </label>

                                <label className="flex items-center gap-2">

                                    <input
                                        type="radio"
                                        checked={
                                            locationMode === "map"
                                        }
                                        onChange={() =>
                                            setLocationMode("map")
                                        }
                                    />

                                    Choose On Map

                                </label>

                            </div>

                            {/* Manual */}

                            {locationMode === "manual" && (

                                <input
                                    type="text"
                                    name="locationName"
                                    placeholder="Sambalpur, Odisha"
                                    value={formData.locationName}
                                    onChange={handleChange}
                                    className="w-full rounded-xl border px-4 py-3 outline-none focus:border-violet-500"
                                    required
                                />

                            )}

                            {/* Map */}

                            {locationMode === "map" && (

                                <div className="space-y-3">

                                    <LocationPicker
                                        onSelect={
                                            setSelectedLocation
                                        }
                                    />

                                    <p className="text-sm text-slate-500">
                                        Click anywhere on the map
                                        to select your community
                                        location.
                                    </p>

                                    {selectedLocation && (

                                        <div className="rounded-xl bg-green-50 p-3 text-sm">

                                            <p>
                                                ✅ Location selected
                                            </p>

                                            <p>
                                                Latitude:
                                                {" "}
                                                {selectedLocation.lat.toFixed(6)}
                                            </p>

                                            <p>
                                                Longitude:
                                                {" "}
                                                {selectedLocation.lng.toFixed(6)}
                                            </p>

                                        </div>

                                    )}

                                </div>

                            )}

                        </div>

                        {/* Submit */}

                        <button
                            type="submit"
                            className="w-full rounded-xl bg-violet-600 py-3 font-semibold text-white transition hover:bg-violet-700"
                        >
                            Create Account
                        </button>

                    </form>

                    <p className="mt-6 text-center text-slate-600">

                        Already have an account?{" "}

                        <Link
                            to="/login"
                            className="font-semibold text-violet-600 hover:underline"
                        >
                            Login
                        </Link>

                    </p>

                </div>

            </div>

        </AppLayout>

    );

}

export default Register;