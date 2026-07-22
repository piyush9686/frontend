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

function TopProductsChart() {

    const business = useBusinessStore(
        (state) => state.selectedBusiness
    );

    // Dummy views for now
    const data =
        business?.products?.map((product, index) => ({

            name: product.name,

            views: (index + 1) * 25,

        })) || [];

    return (

        <div className="rounded-3xl bg-white p-6 shadow">

            <h2 className="mb-6 text-xl font-bold">

                Top Products 📦

            </h2>

            <div className="h-80">

                <ResponsiveContainer width="100%" height="100%">

                    <BarChart data={data}>

                        <CartesianGrid strokeDasharray="3 3" />

                        <XAxis dataKey="name" />

                        <YAxis />

                        <Tooltip />

                        <Bar
                            dataKey="views"
                            fill="#7c3aed"
                            radius={[8, 8, 0, 0]}
                        />

                    </BarChart>

                </ResponsiveContainer>

            </div>

        </div>

    );

}

export default TopProductsChart;