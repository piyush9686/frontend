import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
    FaMapMarkerAlt,
    FaPhone,
    FaClock,
    FaExclamationTriangle,
    FaDirections,
    FaUser,
    FaPhoneAlt,
} from "react-icons/fa";

import { useEmergencyStore } from "../store/emergency.store";

import EmergencyMap from "../components/emergency/EmergencyMap";

import ResponseModal from "../components/emergency/ResponseModal";


function EmergencyDetails() {

    const { id } = useParams();


    // =====================================
    // Response Modal State
    // =====================================

    const [showResponseModal, setShowResponseModal] =

        useState(false);


    const [selectedResponseType, setSelectedResponseType] =

        useState("");


    // =====================================
    // Emergency Store
    // =====================================

    const {

        selectedEmergency,

        fetchEmergencyById,

        respondEmergency,

        isLoading,

    } = useEmergencyStore();


    // =====================================
    // Fetch Emergency
    // =====================================

    useEffect(() => {

        if (id) {

            fetchEmergencyById(id);

        }

    }, [id, fetchEmergencyById]);


    // =====================================
    // Loading
    // =====================================

    if (isLoading) {

        return (

            <div className="flex h-screen items-center justify-center">

                <h2 className="text-2xl font-bold">

                    Loading Emergency...

                </h2>

            </div>

        );

    }


    // =====================================
    // Not Found
    // =====================================

    if (!selectedEmergency) {

        return (

            <div className="flex h-screen items-center justify-center">

                <h2 className="text-2xl font-bold">

                    Emergency not found

                </h2>

            </div>

        );

    }


    const emergency = selectedEmergency;


    // =====================================
    // Coordinates
    // =====================================

    const lat =

        emergency.location?.coordinates?.[1];


    const lng =

        emergency.location?.coordinates?.[0];


    // =====================================
    // Response Modal
    // =====================================

    const openResponseModal = (type) => {

        setSelectedResponseType(type);

        setShowResponseModal(true);

    };


    // =====================================
    // Submit Response
    // =====================================

    const submitResponse = async (message) => {

        await respondEmergency(

            emergency._id,

            {

                type: selectedResponseType,

                message,

            }

        );


        setShowResponseModal(false);

    };


    // =====================================
    // Phone Number
    // =====================================

    const phoneNumber = emergency.reportForSomeoneElse

        ? emergency.contactPhone

        : emergency.user?.phone;


    const personName = emergency.reportForSomeoneElse

        ? emergency.contactName

        : emergency.user?.name;


    return (

        <div className="mx-auto max-w-7xl px-6 py-10">


            {/* =====================================
                Header
            ===================================== */}

            <div className="rounded-3xl bg-white p-8 shadow">

                <div className="flex items-center gap-4">

                    <div className="rounded-full bg-red-100 p-4">

                        <FaExclamationTriangle

                            className="text-4xl text-red-600"

                        />

                    </div>


                    <div>

                        <h1 className="text-4xl font-bold">

                            {emergency.title}

                        </h1>


                        <p className="mt-1 text-lg font-semibold capitalize text-red-600">

                            {emergency.priority} Priority

                        </p>

                    </div>

                </div>


                <p className="mt-8 text-lg leading-8 text-slate-700">

                    {emergency.description}

                </p>

            </div>


            {/* =====================================
                Reporter & Incident Information
            ===================================== */}

            <div className="mt-8 grid gap-6 lg:grid-cols-2">


                {/* =====================================
                    Reporter
                ===================================== */}

                <div className="rounded-3xl bg-white p-6 shadow">

                    <h2 className="mb-6 text-2xl font-bold">

                        👤 Reporter

                    </h2>


                    <div className="space-y-4">

                        <p>

                            <strong>Name:</strong>{" "}

                            {emergency.user?.name ||

                                "Unknown"}

                        </p>


                        <p>

                            <FaPhone

                                className="mr-2 inline text-violet-600"

                            />

                            {emergency.user?.phone ||

                                "Hidden"}

                        </p>

                    </div>

                </div>


                {/* =====================================
                    Incident
                ===================================== */}

                <div className="rounded-3xl bg-white p-6 shadow">

                    <h2 className="mb-6 text-2xl font-bold">

                        🚨 Incident

                    </h2>


                    <div className="space-y-4">

                        <p>

                            <FaMapMarkerAlt

                                className="mr-2 inline text-red-600"

                            />

                            {emergency.address ||

                                "Location selected on map"}

                        </p>


                        <p>

                            <FaClock

                                className="mr-2 inline text-violet-600"

                            />

                            {new Date(

                                emergency.createdAt

                            ).toLocaleString()}

                        </p>

                    </div>

                </div>

            </div>


            {/* =====================================
                Reported For Someone Else
            ===================================== */}

            {emergency.reportForSomeoneElse && (

                <div className="mt-8 rounded-3xl border border-orange-200 bg-orange-50 p-6 shadow">


                    <div className="flex items-center gap-3">

                        <FaUser

                            className="text-2xl text-orange-600"

                        />


                        <h2 className="text-2xl font-bold text-orange-800">

                            Emergency Reported for Someone Else

                        </h2>

                    </div>


                    <div className="mt-5 grid gap-4 md:grid-cols-2">


                        {/* Name */}

                        <p>

                            <strong>Name:</strong>{" "}

                            {emergency.contactName ||

                                "Not provided"}

                        </p>


                        {/* Phone */}

                        <div>

                            <p>

                                <FaPhone

                                    className="mr-2 inline text-orange-600"

                                />

                                {emergency.contactPhone ||

                                    "Not provided"}

                            </p>


                            {emergency.contactPhone && (

                                <a

                                    href={`tel:${emergency.contactPhone}`}

                                    className="mt-3 inline-flex items-center gap-2 rounded-xl bg-green-600 px-4 py-2 font-semibold text-white transition hover:bg-green-700"

                                >

                                    <FaPhoneAlt />

                                    Call Now

                                </a>

                            )}

                        </div>

                    </div>

                </div>

            )}


            {/* =====================================
                Response Buttons
            ===================================== */}

            <div className="mt-8 rounded-3xl bg-white p-6 shadow">

                <h2 className="mb-6 text-2xl font-bold">

                    🤝 Respond to this Emergency

                </h2>


                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">


                    <button

                        onClick={() =>

                            openResponseModal(

                                "coming"

                            )

                        }

                        className="rounded-xl bg-green-600 py-3 font-semibold text-white transition hover:bg-green-700"

                    >

                        🚑 I'm Coming

                    </button>


                    <button

                        onClick={() =>

                            openResponseModal(

                                "police"

                            )

                        }

                        className="rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"

                    >

                        🚓 Calling Police

                    </button>


                    <button

                        onClick={() =>

                            openResponseModal(

                                "ambulance"

                            )

                        }

                        className="rounded-xl bg-red-600 py-3 font-semibold text-white transition hover:bg-red-700"

                    >

                        🚑 Ambulance

                    </button>


                    <button

                        onClick={() =>

                            openResponseModal(

                                "fire"

                            )

                        }

                        className="rounded-xl bg-orange-600 py-3 font-semibold text-white transition hover:bg-orange-700"

                    >

                        🚒 Fire Brigade

                    </button>


                    <button

                        onClick={() =>

                            openResponseModal(

                                "safe"

                            )

                        }

                        className="rounded-xl bg-violet-600 py-3 font-semibold text-white transition hover:bg-violet-700"

                    >

                        ❤️ Stay Safe

                    </button>

                </div>

            </div>


            {/* =====================================
                Community Responses
            ===================================== */}

            <div className="mt-8 rounded-3xl bg-white p-6 shadow">

                <h2 className="mb-6 text-2xl font-bold">

                    Community Responses

                </h2>


                {emergency.responses?.length > 0 ? (

                    <div className="space-y-4">

                        {emergency.responses.map(

                            (response) => (

                                <div

                                    key={response._id}

                                    className="rounded-2xl border p-4"

                                >

                                    <div className="flex items-center justify-between">

                                        <h3 className="font-semibold">

                                            {response.user?.name ||

                                                "Community Member"}

                                        </h3>


                                        <span className="rounded-full bg-violet-100 px-3 py-1 text-sm capitalize">

                                            {response.type}

                                        </span>

                                    </div>


                                    {response.message && (

                                        <p className="mt-2 text-slate-600">

                                            {response.message}

                                        </p>

                                    )}


                                    <p className="mt-2 text-xs text-slate-400">

                                        {new Date(

                                            response.createdAt

                                        ).toLocaleString()}

                                    </p>

                                </div>

                            )

                        )}

                    </div>

                ) : (

                    <p className="text-slate-500">

                        No one has responded yet.

                    </p>

                )}

            </div>


            {/* =====================================
                Incident Map
            ===================================== */}

            <div className="mt-8 rounded-3xl bg-white p-6 shadow">

                <h2 className="mb-6 text-2xl font-bold">

                    📍 Incident Location

                </h2>


                <EmergencyMap

                    emergency={emergency}

                />


                {lat && lng && (

                    <button

                        onClick={() =>

                            window.open(

                                `https://www.google.com/maps?q=${lat},${lng}`,

                                "_blank"

                            )

                        }

                        className="mt-6 flex items-center gap-3 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"

                    >

                        <FaDirections />

                        Open in Google Maps

                    </button>

                )}

            </div>


            {/* =====================================
                Response Modal
            ===================================== */}

            <ResponseModal

                open={showResponseModal}

                onClose={() =>

                    setShowResponseModal(false)

                }

                responseType={

                    selectedResponseType

                }

                onSubmit={submitResponse}

            />

        </div>

    );

}


export default EmergencyDetails;