import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

import {
    MapContainer,
    TileLayer,
    Marker,
    useMap,
    useMapEvents,
} from "react-leaflet";

import { useEmergencyStore } from "../../store/emergency.store";

import "leaflet/dist/leaflet.css";


// =====================================
// Location Selector
// =====================================

function LocationSelector({
    position,
    setPosition,
}) {

    useMapEvents({

        click(e) {

            setPosition([

                e.latlng.lat,

                e.latlng.lng,

            ]);

        },

    });

    return position ? (

        <Marker position={position} />

    ) : null;

}


// =====================================
// Map Controller
// =====================================

function MapController({
    location,
}) {

    const map = useMap();

    useEffect(() => {

        if (!location) return;

        map.flyTo(

            location,

            16,

            {

                animate: true,

                duration: 1.5,

            }

        );

    }, [location, map]);

    return null;

}


// =====================================
// Initial Form
// =====================================

const initialForm = {

    type: "theft",

    title: "",

    description: "",

    visibilityRadius: 10,

    reportForSomeoneElse: false,

    contactName: "",

    contactPhone: "",

};


// =====================================
// Create Emergency Modal
// =====================================

function CreateEmergencyModal({

    open,

    onClose,

}) {

    const createNewEmergency =

        useEmergencyStore(

            (state) =>

                state.createNewEmergency

        );


    const [form, setForm] =

        useState(initialForm);


    const [location, setLocation] =

        useState(null);


    // =====================================
    // Handle Input
    // =====================================

    const handleChange = (e) => {

        const {

            name,

            value,

        } = e.target;


        setForm((previousForm) => ({

            ...previousForm,

            [name]: value,

        }));

    };


    // =====================================
    // Use Current Location
    // =====================================

    const useCurrentLocation = () => {

        if (

            !navigator.geolocation

        ) {

            toast.error(

                "Geolocation is not supported"

            );

            return;

        }


        navigator.geolocation.getCurrentPosition(

            (position) => {

                setLocation([

                    position.coords.latitude,

                    position.coords.longitude,

                ]);

                toast.success(

                    "Current location selected 📍"

                );

            },

            () => {

                toast.error(

                    "Unable to get your location"

                );

            }

        );

    };


    // =====================================
    // Submit
    // =====================================

    const handleSubmit = async (e) => {

        e.preventDefault();


        // Validate location

        if (!location) {

            toast.error(

                "Please select incident location"

            );

            return;

        }


        // Validate basic details

        if (

            !form.title.trim() ||

            !form.description.trim()

        ) {

            toast.error(

                "Please fill all required fields"

            );

            return;

        }


        // Validate contact details

        if (

            form.reportForSomeoneElse &&

            (

                !form.contactName.trim() ||

                !form.contactPhone.trim()

            )

        ) {

            toast.error(

                "Please enter the person's name and phone number"

            );

            return;

        }


        try {

            const emergencyData = {

                type: form.type,

                title: form.title.trim(),

                description:

                    form.description.trim(),

                visibilityRadius:

                    Number(

                        form.visibilityRadius

                    ),

                reportForSomeoneElse:

                    form.reportForSomeoneElse,

                contactName:

                    form.reportForSomeoneElse

                        ? form.contactName.trim()

                        : "",

                contactPhone:

                    form.reportForSomeoneElse

                        ? form.contactPhone.trim()

                        : "",

                location: {

                    type: "Point",

                    coordinates: [

                        location[1],

                        location[0],

                    ],

                },

            };


            await createNewEmergency(

                emergencyData

            );


            toast.success(

                "Emergency reported 🚨"

            );


            // Reset form

            setForm({

                ...initialForm,

            });


            setLocation(null);


            onClose();

        }

        catch (error) {

            console.error(error);

            toast.error(

                "Failed to report emergency"

            );

        }

    };


    if (!open) return null;


    return (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

            <div className="max-h-[95vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl">

                {/* Header */}

                <div className="mb-6 flex items-center justify-between">

                    <h2 className="text-2xl font-bold">

                        Report Emergency 🚨

                    </h2>


                    <button

                        type="button"

                        onClick={onClose}

                        className="text-2xl text-slate-500 hover:text-red-600"

                    >

                        ✕

                    </button>

                </div>


                <form

                    onSubmit={handleSubmit}

                    className="space-y-4"

                >

                    {/* Emergency Type */}

                    <select

                        name="type"

                        value={form.type}

                        onChange={handleChange}

                        className="w-full rounded-xl border p-3"

                    >

                        <option value="theft">

                            Theft

                        </option>


                        <option value="medical">

                            Medical

                        </option>


                        <option value="fire">

                            Fire

                        </option>


                        <option value="accident">

                            Accident

                        </option>


                        <option value="missing_person">

                            Missing Person

                        </option>


                        <option value="suspicious_activity">

                            Suspicious Activity

                        </option>

                    </select>


                    {/* Title */}

                    <input

                        name="title"

                        placeholder="Emergency title"

                        value={form.title}

                        onChange={handleChange}

                        className="w-full rounded-xl border p-3"

                        required

                    />


                    {/* Description */}

                    <textarea

                        name="description"

                        rows={4}

                        placeholder="Describe what is happening..."

                        value={form.description}

                        onChange={handleChange}

                        className="w-full rounded-xl border p-3"

                        required

                    />


                    {/* Report For Someone Else */}

                    <div className="rounded-2xl border bg-slate-50 p-4">

                        <label className="flex cursor-pointer items-center gap-3">

                            <input

                                type="checkbox"

                                name="reportForSomeoneElse"

                                checked={

                                    form.reportForSomeoneElse

                                }

                                onChange={(e) => {

                                    const checked =

                                        e.target.checked;


                                    setForm(

                                        (previousForm) => ({

                                            ...previousForm,

                                            reportForSomeoneElse:

                                                checked,

                                            contactName:

                                                checked

                                                    ? previousForm.contactName

                                                    : "",

                                            contactPhone:

                                                checked

                                                    ? previousForm.contactPhone

                                                    : "",

                                        })

                                    );

                                }}

                                className="h-5 w-5"

                            />

                            <span className="font-semibold">

                                I am reporting this emergency for someone else 👥

                            </span>

                        </label>


                        {form.reportForSomeoneElse && (

                            <div className="mt-4 space-y-3">

                                <input

                                    type="text"

                                    name="contactName"

                                    placeholder="Person's name"

                                    value={

                                        form.contactName

                                    }

                                    onChange={handleChange}

                                    className="w-full rounded-xl border p-3"

                                    required

                                />


                                <input

                                    type="tel"

                                    name="contactPhone"

                                    placeholder="Person's phone number"

                                    value={

                                        form.contactPhone

                                    }

                                    onChange={handleChange}

                                    className="w-full rounded-xl border p-3"

                                    required

                                />

                            </div>

                        )}

                    </div>


                    {/* Visibility Radius */}

                    <select

                        name="visibilityRadius"

                        value={

                            form.visibilityRadius

                        }

                        onChange={handleChange}

                        className="w-full rounded-xl border p-3"

                    >

                        <option value={5}>

                            5 km

                        </option>


                        <option value={10}>

                            10 km

                        </option>


                        <option value={25}>

                            25 km

                        </option>


                        <option value={50}>

                            50 km

                        </option>


                        <option value={60}>

                            60 km

                        </option>

                    </select>


                    {/* Location */}

                    <div>

                        <div className="mb-3 flex items-center justify-between">

                            <label className="font-semibold">

                                Incident Location 📍

                            </label>


                            <button

                                type="button"

                                onClick={

                                    useCurrentLocation

                                }

                                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"

                            >

                                Use Current Location

                            </button>

                        </div>


                        <MapContainer

                            center={[

                                20.2961,

                                85.8245,

                            ]}

                            zoom={13}

                            className="h-80 w-full rounded-2xl"

                        >

                            <TileLayer

                                attribution="&copy; OpenStreetMap contributors"

                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"

                            />


                            <MapController

                                location={location}

                            />


                            <LocationSelector

                                position={location}

                                setPosition={

                                    setLocation

                                }

                            />

                        </MapContainer>


                        {location && (

                            <p className="mt-2 text-sm text-green-600">

                                📍 Location selected:{" "}

                                {location[0].toFixed(6)}

                                ,{" "}

                                {location[1].toFixed(6)}

                            </p>

                        )}

                    </div>


                    {/* Submit */}

                    <button

                        type="submit"

                        className="w-full rounded-xl bg-red-600 py-3 font-semibold text-white hover:bg-red-700"

                    >

                        🚨 Report Emergency

                    </button>

                </form>

            </div>

        </div>

    );

}


export default CreateEmergencyModal;