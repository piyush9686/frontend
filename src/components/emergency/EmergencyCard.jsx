import { toast } from "react-hot-toast";

import { useAuthStore } from "../../store/auth.store";
import { useEmergencyStore } from "../../store/emergency.store";
import { useNavigate } from "react-router-dom";
function EmergencyCard({ emergency }) {

    const user = useAuthStore(
        (state) => state.user
    );

    const resolveEmergencyById =
        useEmergencyStore(
            (state) =>
                state.resolveEmergencyById
        );

    const colors = {

        critical:
            "bg-red-100 text-red-700",

        high:
            "bg-orange-100 text-orange-700",

        medium:
            "bg-yellow-100 text-yellow-700",

        low:
            "bg-green-100 text-green-700",

    };

    const handleResolve =
        async () => {

            try {

                await resolveEmergencyById(
                    emergency._id
                );

                toast.success(
                    "Emergency resolved ✅"
                );

            } catch (error) {

                toast.error(
                    "Failed to resolve emergency"
                );

            }

        };
        const navigate = useNavigate();

    return (

        <div className="rounded-2xl border bg-white p-5 shadow-sm transition hover:shadow-md">

            {/* Header */}
            <div className="mb-3 flex items-start justify-between gap-4">

                <div>

                    <h2 className="text-xl font-bold">

                        🚨 {emergency.title}

                    </h2>

                    <p className="mt-1 text-sm text-slate-500">

                        Type: {emergency.type}

                    </p>

                </div>

                <span
                    className={`rounded-full px-3 py-1 text-sm font-medium capitalize ${
                        colors[
                            emergency.priority
                        ] ||
                        "bg-slate-100 text-slate-700"
                    }`}
                >

                    {emergency.priority}

                </span>

            </div>

            {/* Description */}
            <p className="mb-4 text-slate-600">

                {emergency.description}

            </p>

            {/* Footer */}
            <div className="flex items-center justify-between text-sm text-slate-500">

                {/* <span>
                    📍{" "}
                    {emergency.distance
                        ? `${emergency.distance.toFixed(1)} km away`
                        : "Nearby"}
                </span> */}

            <span>
    📍{" "}
    {emergency.distance !== undefined
        ? `${emergency.distance.toFixed(1)} km away`
        : "Nearby"}
</span>

                <span>
                    {new Date(
                        emergency.createdAt
                    ).toLocaleString()}
                </span>

            </div>

            {/* Resolve Button */}
            {emergency.user ===
                user?._id && (

                <button
                    onClick={handleResolve}
                    className="
                        mt-4 w-full rounded-xl
                        bg-green-600 py-3
                        font-semibold text-white
                        transition hover:bg-green-700
                    "
                >

                    Resolve Emergency ✅

                </button>

            )}




<button
    onClick={() =>
        navigate(`/emergency/${emergency._id}`)
    }
    className="mt-6 w-full rounded-xl bg-red-600 py-3 font-semibold text-white transition hover:bg-red-700"
>

    View Details →

</button>




        </div>

    );

}

export default EmergencyCard;