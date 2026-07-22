import { useMemo, useState } from "react";

import { useBusinessStore } from "../../store/business.store";

import DashboardOfferCard from "./DashboardOfferCard";

import AddOfferModal from "../business/AddOfferModal";
import EditOfferModal from "../business/EditOfferModal";

function DashboardOffers() {

    const business = useBusinessStore(
        (state) => state.selectedBusiness
    );

    const deleteOffer =
        useBusinessStore(
            (state) => state.deleteOfferFromBusiness
        );

    const [search, setSearch] =
        useState("");

    const [showAdd, setShowAdd] =
        useState(false);

    const [showEdit, setShowEdit] =
        useState(false);

    const [selectedOffer, setSelectedOffer] =
        useState(null);

    const offers = useMemo(() => {

        return (
            business?.offers?.filter((offer) =>
                offer.title
                    .toLowerCase()
                    .includes(search.toLowerCase())
            ) || []
        );

    }, [business, search]);

    return (

        <div>

            <div className="mb-8 flex items-center justify-between">

                <div>

                    <h1 className="text-3xl font-bold">

                        Offer Management 🔥

                    </h1>

                    <p className="mt-2 text-slate-500">

                        Create and manage offers for your customers.

                    </p>

                </div>

                <button
                    onClick={() => setShowAdd(true)}
                    className="rounded-xl bg-green-600 px-5 py-3 font-semibold text-white hover:bg-green-700"
                >

                    + Add Offer

                </button>

            </div>

            <input
                type="text"
                placeholder="Search offers..."
                value={search}
                onChange={(e) =>
                    setSearch(e.target.value)
                }
                className="mb-8 w-full rounded-xl border p-3 outline-none focus:ring-2 focus:ring-green-500"
            />

            {offers.length ? (

                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

                    {offers.map((offer) => (

                        <DashboardOfferCard
                            key={offer._id}
                            offer={offer}
                            onEdit={() => {

                                setSelectedOffer(offer);

                                setShowEdit(true);

                            }}
                            onDelete={() =>
                                deleteOffer(
                                    business._id,
                                    offer._id
                                )
                            }
                        />

                    ))}

                </div>

            ) : (

                <div className="rounded-3xl bg-white p-12 text-center shadow">

                    <h2 className="text-2xl font-bold">

                        No Offers Found

                    </h2>

                    <p className="mt-3 text-slate-500">

                        Create your first promotional offer.

                    </p>

                </div>

            )}

            <AddOfferModal
                open={showAdd}
                onClose={() =>
                    setShowAdd(false)
                }
                businessId={business?._id}
            />

            <EditOfferModal
                open={showEdit}
                businessId={business?._id}
                offer={selectedOffer}
                onClose={() => {

                    setShowEdit(false);

                    setSelectedOffer(null);

                }}
            />

        </div>

    );

}

export default DashboardOffers;