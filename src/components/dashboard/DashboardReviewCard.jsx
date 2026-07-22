import { FaStar, FaTrash, FaUser } from "react-icons/fa";

function DashboardReviewCard({

    review,

    onDelete,

}) {

    return (

        <div className="rounded-3xl bg-white p-6 shadow transition hover:shadow-lg">

            <div className="flex items-center justify-between">

                <div className="flex items-center gap-3">

                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-violet-100">

                        <FaUser className="text-violet-600" />

                    </div>

                    <div>

                        <h2 className="font-bold">

                            {review.user?.name || "Anonymous"}

                        </h2>

                        <div className="mt-1 flex items-center gap-1">

                            {Array.from({

                                length: review.rating,

                            }).map((_, index) => (

                                <FaStar

                                    key={index}

                                    className="text-yellow-500"

                                />

                            ))}

                        </div>

                    </div>

                </div>

                <button

                    onClick={onDelete}

                    className="rounded-xl bg-red-100 px-4 py-2 text-red-700 hover:bg-red-200"

                >

                    <FaTrash />

                </button>

            </div>

            <p className="mt-5 text-slate-600">

                {review.comment}

            </p>

        </div>

    );

}

export default DashboardReviewCard;