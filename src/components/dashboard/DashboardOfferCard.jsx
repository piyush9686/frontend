import {
    FaEdit,
    FaTrash,
    FaCalendarAlt,
    FaTag,
} from "react-icons/fa";

function DashboardOfferCard({

    offer,

    onEdit,

    onDelete,

}) {

    const isExpired =
        offer.validTill &&
        new Date(offer.validTill) < new Date();

    return (

        <div className="rounded-3xl bg-white p-6 shadow transition hover:-translate-y-1 hover:shadow-lg">

            <div className="flex items-start justify-between">

                <div>

                    <div className="mb-3 flex items-center gap-2">

                        <FaTag className="text-green-600" />

                        <h2 className="text-xl font-bold">

                            {offer.title}

                        </h2>

                    </div>

                    <p className="text-slate-600">

                        {offer.description}

                    </p>

                </div>

                <span
                    className={`rounded-full px-3 py-1 text-sm font-semibold ${
                        isExpired
                            ? "bg-red-100 text-red-700"
                            : "bg-green-100 text-green-700"
                    }`}
                >

                    {isExpired
                        ? "Expired"
                        : "Active"}

                </span>

            </div>

            {offer.validTill && (

                <div className="mt-5 flex items-center gap-2 text-slate-500">

                    <FaCalendarAlt />

                    <span>

                        Valid Till:

                        {" "}

                        {new Date(
                            offer.validTill
                        ).toLocaleDateString("en-IN")}

                    </span>

                </div>

            )}

            <div className="mt-6 flex gap-3">

                <button
                    onClick={onEdit}
                    className="flex-1 rounded-xl bg-blue-100 py-2 font-semibold text-blue-700 hover:bg-blue-200"
                >

                    <FaEdit className="mr-2 inline" />

                    Edit

                </button>

                <button
                    onClick={onDelete}
                    className="flex-1 rounded-xl bg-red-100 py-2 font-semibold text-red-700 hover:bg-red-200"
                >

                    <FaTrash className="mr-2 inline" />

                    Delete

                </button>

            </div>

        </div>

    );

}

export default DashboardOfferCard;