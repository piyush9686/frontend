import {
    FaPhone,
    FaMapMarkerAlt,
    FaStar,
    FaClock,
    FaGift,
    FaShoppingBag,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

import { useAuthStore } from "../../store/auth.store";

function BusinessCard({ business }) {

    const navigate = useNavigate();

    const user = useAuthStore(
        (state) => state.user
    );

    const isOwner =
        business.owner?._id === user?._id ||
        business.owner === user?._id;

    return (

        <div className="overflow-hidden rounded-3xl border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">

            {/* Business Banner */}

            <img
                src={
                    business.businessImage ||
                    "https://images.unsplash.com/photo-1556740749-887f6717d7e4?w=1200&q=80"
                }
                alt={business.name}
                className="h-56 w-full object-cover"
            />

            <div className="p-6">

                {/* Header */}

                <div className="flex items-start justify-between">

                    <div>

                        <h2 className="text-2xl font-bold">
                            {business.name}
                        </h2>

                        <p className="mt-1 text-sm capitalize text-slate-500">
                            {business.category}
                        </p>

                    </div>

                    <div className="flex items-center gap-1 rounded-full bg-yellow-100 px-3 py-1 text-sm font-medium text-yellow-700">

                        <FaStar />

                        {business.rating || 0}

                    </div>

                </div>

                {/* Description */}

                <p className="mt-4 text-slate-600">

                    {business.description}

                </p>

                {/* Contact */}

                <div className="mt-5 space-y-3 text-sm text-slate-700">

                    <div className="flex items-center gap-3">

                        <FaPhone />

                        <span>
                            {business.phone}
                        </span>

                    </div>

                    <div className="flex items-center gap-3">

                        <FaMapMarkerAlt />

                        <span>
                            {business.address}
                        </span>

                    </div>

                    <div className="flex items-center gap-3">

                        <FaClock />

                        <span>

                            {business.openingTime || "09:00 AM"}
                            {" - "}
                            {business.closingTime || "09:00 PM"}

                        </span>

                    </div>

                </div>

                {/* Products & Offers */}

                <div className="mt-5 flex gap-4">

                    <div className="flex items-center gap-2 rounded-xl bg-violet-50 px-4 py-2 text-sm text-violet-700">

                        <FaShoppingBag />

                        {business.products?.length || 0}
                        {" Products"}

                    </div>

                    <div className="flex items-center gap-2 rounded-xl bg-green-50 px-4 py-2 text-sm text-green-700">

                        <FaGift />

                        {business.offers?.length || 0}
                        {" Offers"}

                    </div>

                </div>

                {/* Owner Badge */}

                {isOwner && (

                    <div className="mt-5 rounded-xl bg-green-100 py-3 text-center font-semibold text-green-700">

                        You own this business 🏪

                    </div>

                )}

                {/* Actions */}

                <button
                    onClick={() =>
                        navigate(
                            `/business/${business._id}`
                        )
                    }
                    className="mt-6 w-full rounded-xl bg-violet-600 py-3 font-semibold text-white transition hover:bg-violet-700"
                >

                    View Details →

                </button>

            </div>

        </div>

    );

}

export default BusinessCard;