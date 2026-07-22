import {
    FaEye,
    FaBoxOpen,
    FaTags,
    FaImages,
    FaStar,
    FaStore,
} from "react-icons/fa";

import { useBusinessStore } from "../../store/business.store";

function DashboardHome() {

    const myBusiness = useBusinessStore(
        (state) => state.myBusiness
    );

    const cards = [

        {
            title: "Total Visitors",
            value: myBusiness?.totalViews || 0,
            icon: <FaEye size={28} />,
            color: "bg-blue-500",
        },

        {
            title: "Products",
            value: myBusiness?.products?.length || 0,
            icon: <FaBoxOpen size={28} />,
            color: "bg-violet-500",
        },

        {
            title: "Offers",
            value: myBusiness?.offers?.length || 0,
            icon: <FaTags size={28} />,
            color: "bg-green-500",
        },

        {
            title: "Gallery",
            value: myBusiness?.gallery?.length || 0,
            icon: <FaImages size={28} />,
            color: "bg-pink-500",
        },

        {
            title: "Reviews",
            value: myBusiness?.totalReviews || 0,
            icon: <FaStar size={28} />,
            color: "bg-yellow-500",
        },

        {
            title: "Rating",
            value: (myBusiness?.rating || 0).toFixed(1),
            icon: <FaStore size={28} />,
            color: "bg-orange-500",
        },

    ];

    return (

        <div>

            <h2 className="mb-8 text-3xl font-bold">

                Dashboard Overview 📊

            </h2>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

                {cards.map((card) => (

                    <div
                        key={card.title}
                        className="rounded-3xl bg-white p-6 shadow transition hover:-translate-y-1 hover:shadow-lg"
                    >

                        <div className="flex items-center justify-between">

                            <div>

                                <p className="text-slate-500">

                                    {card.title}

                                </p>

                                <h3 className="mt-2 text-4xl font-bold">

                                    {card.value}

                                </h3>

                            </div>

                            <div
                                className={`${card.color} rounded-2xl p-4 text-white`}
                            >

                                {card.icon}

                            </div>

                        </div>

                    </div>

                ))}

            </div>

        </div>

    );

}

export default DashboardHome;