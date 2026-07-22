import {

    BarChart,

    Bar,

    XAxis,

    YAxis,

    CartesianGrid,

    Tooltip,

    ResponsiveContainer,

} from "recharts";

import { useBusinessStore } from "../../../store/business.store";

function OfferPerformanceChart() {

    const business = useBusinessStore(
        (state) => state.selectedBusiness
    );

    // Dummy clicks for now
    const data =
        business?.offers?.map((offer, index) => ({

            name: offer.title,

            clicks: (index + 1) * 18,

        })) || [];

    return (

        <div className="rounded-3xl bg-white p-6 shadow">

            <h2 className="mb-6 text-xl font-bold">

                Offer Performance 🔥

            </h2>

            <div className="h-80">

                <ResponsiveContainer width="100%" height="100%">

                    <BarChart data={data}>

                        <CartesianGrid strokeDasharray="3 3" />

                        <XAxis dataKey="name" />

                        <YAxis />

                        <Tooltip />

                        <Bar

                            dataKey="clicks"

                            fill="#22c55e"

                            radius={[8, 8, 0, 0]}

                        />

                    </BarChart>

                </ResponsiveContainer>

            </div>

        </div>

    );

}

export default OfferPerformanceChart;