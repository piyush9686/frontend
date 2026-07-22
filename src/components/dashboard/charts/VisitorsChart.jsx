import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

import { useBusinessStore } from "../../../store/business.store";

function VisitorsChart() {

    const analytics = useBusinessStore(
        (state) => state.analytics
    );

    const data = analytics?.weeklyVisitors || [];

    return (

        <div className="rounded-3xl bg-white p-6 shadow">

            <h2 className="mb-6 text-xl font-bold">

                Visitors (Last 7 Days)

            </h2>

            <div className="h-80">

                {data.length === 0 ? (

                    <div className="flex h-full items-center justify-center text-slate-500">

                        No visitor data available.

                    </div>

                ) : (

                    <ResponsiveContainer width="100%" height="100%">

                        <LineChart data={data}>

                            <CartesianGrid strokeDasharray="3 3" />

                            <XAxis dataKey="day" />

                            <YAxis />

                            <Tooltip />

                            <Line
                                type="monotone"
                                dataKey="visitors"
                                stroke="#7c3aed"
                                strokeWidth={3}
                                dot={{ r: 5 }}
                                activeDot={{ r: 7 }}
                            />

                        </LineChart>

                    </ResponsiveContainer>

                )}

            </div>

        </div>

    );

}

export default VisitorsChart;