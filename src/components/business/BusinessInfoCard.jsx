import {
    FaPhone,
    FaMapMarkerAlt,
    FaClock,
    FaStar,
    FaCheckCircle,
} from "react-icons/fa";

function BusinessInfoCard({ business }) {

    return (

        <div className="sticky top-24 rounded-3xl border bg-white p-6 shadow-sm">

            <h2 className="mb-6 text-3xl font-bold">
                Business Info 🏪
            </h2>

            <div className="space-y-6">

                <div className="flex items-center gap-4">

                    <div className="rounded-2xl bg-violet-100 p-4">
                        <FaPhone className="text-xl text-violet-600" />
                    </div>

                    <div>
                        <p className="text-slate-500">
                            Phone
                        </p>

                        <p className="font-bold">
                            {business.phone}
                        </p>
                    </div>

                </div>

                <div className="flex items-center gap-4">

                    <div className="rounded-2xl bg-blue-100 p-4">
                        <FaMapMarkerAlt className="text-xl text-blue-600" />
                    </div>

                    <div>
                        <p className="text-slate-500">
                            Address
                        </p>

                        <p className="font-bold">
                            {business.address}
                        </p>
                    </div>

                </div>

                <div className="flex items-center gap-4">

                    <div className="rounded-2xl bg-green-100 p-4">
                        <FaClock className="text-xl text-green-600" />
                    </div>

                    <div>
                        <p className="text-slate-500">
                            Working Hours
                        </p>

                        <p className="font-bold">
                            {business.openingTime} - {business.closingTime}
                        </p>
                    </div>

                </div>

                <div className="flex items-center gap-4">

                    <div className="rounded-2xl bg-yellow-100 p-4">
                        <FaStar className="text-xl text-yellow-600" />
                    </div>

                    <div>
                        <p className="text-slate-500">
                            Rating
                        </p>

                        <p className="font-bold">
                            {(business.rating || 0).toFixed(1)}
                            {" "}
                            ({business.totalReviews || 0} reviews)
                        </p>
                    </div>

                </div>

                <div className="flex items-center gap-4">

                    <div className="rounded-2xl bg-slate-100 p-4">
                        <FaCheckCircle
                            className={
                                business.isVerified
                                    ? "text-green-600"
                                    : "text-slate-500"
                            }
                        />
                    </div>

                    <div>
                        <p className="text-slate-500">
                            Verification
                        </p>

                        <p className="font-bold">
                            {business.isVerified
                                ? "Verified"
                                : "Not Verified"}
                        </p>
                    </div>

                </div>

            </div>

        </div>

    );

}

export default BusinessInfoCard;