import { toast } from "react-hot-toast";

import { useAuthStore } from "../../store/auth.store";
import { useEventStore } from "../../store/event.store";

function EventCard({ event }) {

    const user = useAuthStore(
        (state) => state.user
    );

    const joinEventById = useEventStore(
        (state) => state.joinEventById
    );

    const leaveEventById = useEventStore(
        (state) => state.leaveEventById
    );

    const isJoined =
        event.participants.some(

            (participant) =>

                participant._id === user?._id ||

                participant === user?._id

        );

    const isOrganizer =
        event.organizer?._id === user?._id ||

        event.organizer === user?._id;

    const handleJoin = async () => {

        try {

            await joinEventById(
                event._id
            );

            toast.success(
                "Joined event 🎉"
            );

        } catch (error) {

            toast.error(

                error.response?.data?.message ||

                "Failed to join event"

            );

        }

    };

    const handleLeave = async () => {

        try {

            await leaveEventById(
                event._id
            );

            toast.success(
                "Left event"
            );

        } catch (error) {

            toast.error(

                error.response?.data?.message ||

                "Failed to leave event"

            );

        }

    };

    return (

        <div className="rounded-2xl border bg-white p-5 shadow-sm transition hover:shadow-md">

            <div className="mb-4 flex items-start justify-between">

                <div>

                    <h2 className="text-xl font-bold">
                        {event.category} {event.title}
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                        Organized by{" "}
                        {event.organizer?.name || "Unknown"}
                    </p>

                </div>

                <span className="rounded-full bg-violet-100 px-3 py-1 text-sm text-violet-700">

                    {event.participants.length}
                    /
                    {event.maxParticipants}

                </span>

            </div>

            <p className="mb-4 text-slate-600">

                {event.description}

            </p>

            <div className="mb-4 flex items-center justify-between text-sm text-slate-500">

                <span>
                    📅{" "}
                    {new Date(
                        event.eventDate
                    ).toLocaleString()}
                </span>

                <span>
                    📍 {event.visibilityRadius} km
                </span>

            </div>

            {!isOrganizer && (

                isJoined ? (

                    <button
                        onClick={handleLeave}
                        className="w-full rounded-xl bg-slate-200 py-3 font-semibold hover:bg-slate-300"
                    >

                        Leave Event

                    </button>

                ) : (

                    <button
                        onClick={handleJoin}
                        className="w-full rounded-xl bg-violet-600 py-3 font-semibold text-white hover:bg-violet-700"
                    >

                        Join Event

                    </button>

                )

            )}

            {isOrganizer && (

                <div className="rounded-xl bg-green-100 py-3 text-center font-semibold text-green-700">

                    You are the organizer 🏸

                </div>

            )}

        </div>

    );

}

export default EventCard;