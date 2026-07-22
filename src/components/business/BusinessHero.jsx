
import { FaStar, FaCheckCircle } from "react-icons/fa";

function BusinessHero({
    business,
    isOwner,
    onAddProduct,
    onAddOffer,
    onAddGallery,
}) {

    return (

        <div className="overflow-hidden rounded-3xl bg-white shadow-lg">

            {/* Banner */}

            <div className="relative">

                <img
                    src={
                        business.businessImage ||
                        "https://images.unsplash.com/photo-1556740749-887f6717d7e4?w=1600"
                    }
                    alt={business.name}
                    className="h-[350px] w-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                <div className="absolute bottom-8 left-8 text-white">

                    <div className="flex flex-wrap items-center gap-3">

                        <span className="rounded-full bg-violet-600 px-4 py-2 text-sm font-semibold capitalize">

                            {business.category}

                        </span>

                        <span className="flex items-center gap-2 rounded-full bg-yellow-500 px-4 py-2 text-sm font-semibold text-white">

                            <FaStar />

                            {(business.rating || 0).toFixed(1)}
                        </span>

                        {business.isVerified && (

                            <span className="flex items-center gap-2 rounded-full bg-green-600 px-4 py-2 text-sm font-semibold text-white">

                                <FaCheckCircle />

                                Verified

                            </span>

                        )}

                    </div>

                    <h1 className="mt-4 text-4xl font-bold">

                        {business.name}

                    </h1>

                    <p className="mt-3 max-w-3xl text-slate-200">

                        {business.description}

                    </p>

                </div>

            </div>

            {/* Owner Actions */}

            {isOwner && (

                <div className="flex flex-wrap gap-3 border-t p-6">

                    <button
                        onClick={onAddProduct}
                        className="rounded-xl bg-violet-600 px-5 py-3 font-semibold text-white transition hover:bg-violet-700"
                    >
                        Add Product 🛍️
                    </button>

                    <button
                        onClick={onAddOffer}
                        className="rounded-xl bg-green-600 px-5 py-3 font-semibold text-white transition hover:bg-green-700"
                    >
                        Add Offer 🔥
                    </button>

                    <button
                        onClick={onAddGallery}
                        className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
                    >
                        Add Photo 📸
                    </button>

                </div>

            )}

        </div>

    );

}

export default BusinessHero;

