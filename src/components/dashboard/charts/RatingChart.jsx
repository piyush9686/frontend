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

function RatingChart() {

    const analytics = useBusinessStore(

        (state) => state.analytics

    );

    const data = analytics?.ratingDistribution || [];

    return (

        <div className="rounded-3xl bg-white p-6 shadow">

            <h2 className="mb-6 text-xl font-bold">

                ⭐ Rating Distribution

            </h2>

            <div className="h-80">

                <ResponsiveContainer width="100%" height="100%">

                    <BarChart data={data}>

                        <CartesianGrid strokeDasharray="3 3" />

                        <XAxis dataKey="stars" />

                        <YAxis allowDecimals={false} />

                        <Tooltip />

                        <Bar

                            dataKey="count"

                            fill="#facc15"

                            radius={[8, 8, 0, 0]}

                        />

                    </BarChart>

                </ResponsiveContainer>

            </div>

        </div>

    );

}

export default RatingChart;