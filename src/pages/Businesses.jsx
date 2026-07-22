import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import AppLayout from "../components/layout/AppLayout";

import BusinessCard from "../components/business/BusinessCard";
import CreateBusinessModal from "../components/business/CreateBusinessModal";

import { useBusinessStore } from "../store/business.store";

function Businesses() {

    const navigate = useNavigate();

    const [open, setOpen] = useState(false);

    const businesses = useBusinessStore(
        (state) => state.businesses
    );

    const fetchBusinesses = useBusinessStore(
        (state) => state.fetchBusinesses
    );

    useEffect(() => {

        fetchBusinesses();

    }, [fetchBusinesses]);

    return (

        <AppLayout>

            <div className="mx-auto max-w-5xl space-y-6">

                {/* Header */}

                <div className="flex items-center justify-between">

                    <div>

                        <h1 className="text-3xl font-bold">

                            Local Businesses 🏪

                        </h1>

                        <p className="mt-1 text-slate-500">

                            Discover and support businesses
                            in your community.

                        </p>

                    </div>

                    <div className="flex items-center gap-4">

                        <button
                            onClick={() =>
                                navigate("/business/dashboard")
                            }
                            className="
                                rounded-xl
                                bg-blue-600
                                px-5 py-3
                                font-semibold
                                text-white
                                transition
                                hover:bg-blue-700
                            "
                        >

                            📊 Business Dashboard

                        </button>

                        <button
                            onClick={() =>
                                setOpen(true)
                            }
                            className="
                                rounded-xl
                                bg-violet-600
                                px-5 py-3
                                font-semibold
                                text-white
                                transition
                                hover:bg-violet-700
                            "
                        >

                            + Add Business

                        </button>

                    </div>

                </div>

                {/* Business List */}

                {businesses.length > 0 ? (

                    <div className="grid gap-6">

                        {businesses.map((business) => (

                            <BusinessCard
                                key={business._id}
                                business={business}
                            />

                        ))}

                    </div>

                ) : (

                    <div
                        className="
                            rounded-2xl
                            bg-white
                            p-12
                            text-center
                            shadow-sm
                        "
                    >

                        <div className="mb-3 text-5xl">

                            🏪

                        </div>

                        <h2 className="text-xl font-bold">

                            No businesses nearby

                        </h2>

                        <p className="mt-2 text-slate-500">

                            Be the first to promote your
                            local business.

                        </p>

                    </div>

                )}

            </div>

            <CreateBusinessModal
                open={open}
                onClose={() =>
                    setOpen(false)
                }
            />

        </AppLayout>

    );

}

export default Businesses;