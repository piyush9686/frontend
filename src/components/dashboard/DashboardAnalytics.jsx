import { useEffect } from "react";

import {
    FaEye,
    FaBoxOpen,
    FaTags,
    FaStar,
} from "react-icons/fa";

import { useBusinessStore } from "../../store/business.store";

import VisitorsChart from "./charts/VisitorsChart";
import RatingChart from "./charts/RatingChart";

function DashboardAnalytics() {

    const business = useBusinessStore(
        (state) => state.selectedBusiness
    );

    const analytics = useBusinessStore(
        (state) => state.analytics
    );

    const fetchBusinessAnalytics = useBusinessStore(
        (state) => state.fetchBusinessAnalytics
    );

    useEffect(() => {

        if (business?._id) {

            fetchBusinessAnalytics(business._id);

        }

    }, [business?._id, fetchBusinessAnalytics]);

    const stats = [

        {
            title: "Total Visitors",
            value: analytics?.totalViews ?? 0,
            icon: <FaEye />,
            color: "bg-blue-500",
        },

        {
            title: "Products",
            value: analytics?.totalProducts ?? 0,
            icon: <FaBoxOpen />,
            color: "bg-violet-500",
        },

        {
            title: "Offers",
            value: analytics?.totalOffers ?? 0,
            icon: <FaTags />,
            color: "bg-green-500",
        },

        {
            title: "Average Rating",
            value: analytics?.averageRating
                ? analytics.averageRating.toFixed(1)
                : "0.0",
            icon: <FaStar />,
            color: "bg-yellow-500",
        },

    ];

    return (

        <div>

            {/* Header */}

            <div className="mb-8">

                <h1 className="text-3xl font-bold">

                    Business Analytics 📈

                </h1>

                <p className="mt-2 text-slate-500">

                    Monitor your business performance.

                </p>

            </div>

            {/* Stats */}

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

                {stats.map((item) => (

                    <div
                        key={item.title}
                        className="rounded-3xl bg-white p-6 shadow transition hover:-translate-y-1 hover:shadow-lg"
                    >

                        <div className="flex items-center justify-between">

                            <div>

                                <p className="text-slate-500">

                                    {item.title}

                                </p>

                                <h2 className="mt-2 text-4xl font-bold">

                                    {item.value}

                                </h2>

                            </div>

                            <div
                                className={`${item.color} rounded-2xl p-4 text-2xl text-white`}
                            >

                                {item.icon}

                            </div>

                        </div>

                    </div>

                ))}

            </div>

            {/* Charts */}

            <div className="mt-10 grid gap-8 lg:grid-cols-2">

                <VisitorsChart />

                <RatingChart />

            </div>

        </div>

    );

}

export default DashboardAnalytics;