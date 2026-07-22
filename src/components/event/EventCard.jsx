import {
    FaCalendarAlt,
    FaMapMarkerAlt,
    FaUsers,
} from "react-icons/fa";

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

    const alreadyJoined =
        event.participants?.some(
            (participant) =>
                participant._id === user?._id
        );

    const isOrganizer =
        event.organizer?._id === user?._id;

    const formattedDate =
        event.eventDate
            ? new Date(
                  event.eventDate
              ).toLocaleString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                  hour: "numeric",
                  minute: "2-digit",
              })
            : "Date not available";

    const handleAction = async () => {

        try {

            if (alreadyJoined) {

                if (isOrganizer) {

                    toast.error(
                        "Organizer cannot leave the event"
                    );

                    return;

                }

                await leaveEventById(
                    event._id
                );

                toast.success(
                    "Left event successfully ❌"
                );

            } else {

                await joinEventById(
                    event._id
                );

                toast.success(
                    "Joined event successfully 🎉"
                );

            }

        } catch (error) {

            toast.error(

                error.response?.data?.message ||

                "Something went wrong"

            );

        }

    };

    return (

        <div className="overflow-hidden rounded-3xl border bg-white shadow-sm transition hover:shadow-lg">

            {/* Event Image */}
{/* Event Image */}

<img
    src={
        event.eventImage?.startsWith("data:image")
            ? event.eventImage
            : event.eventImage ||
              "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=1200&q=80"
    }
    alt={event.title}
    className="h-56 w-full w-full object-cover transition duration-300 hover:scale-[1.02]"
    onError={(e) => {
        e.target.src =
            "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=1200&q=80";
    }}
/>

            <div className="p-6">

                {/* Category */}

                <span className="rounded-full bg-violet-100 px-3 py-1 text-sm font-medium capitalize text-violet-700">

                    {event.category}

                </span>

                {/* Title */}

                <h2 className="mt-3 text-2xl font-bold">

                    {event.title}

                </h2>

                {/* Description */}

                <p className="mt-3 text-slate-600">

                    {event.description}

                </p>

                {/* Date */}

                <div className="mt-5 flex items-center gap-3 text-slate-700">

                    <FaCalendarAlt />

                    <span>
                        {formattedDate}
                    </span>

                </div>

                {/* Location */}

                <div className="mt-3 flex items-center gap-3 text-slate-700">

                    <FaMapMarkerAlt />

                    <span>

                        {event.organizer?.locationName ||

                            "Local Community"}

                    </span>

                </div>

                {/* Participants */}

                <div className="mt-3 flex items-center gap-3 text-slate-700">

                    <FaUsers />

                    <span>

                        {event.participants?.length || 0}
                        {" / "}
                        {event.maxParticipants}
                        {" participants"}

                    </span>

                </div>

                {/* Organizer */}

                <div className="mt-5 flex items-center gap-3 border-t pt-4">

                    <img
                        src={
                            event.organizer?.avatar ||

                            `https://ui-avatars.com/api/?name=${event.organizer?.name}`
                        }
                        alt=""
                        className="h-10 w-10 rounded-full object-cover"
                    />

                    <div>

                        <p className="text-xs text-slate-500">

                            Organized by

                        </p>

                        <p className="font-semibold">

                            {event.organizer?.name}

                        </p>

                    </div>

                </div>

                {/* Join / Leave Button */}

                {!isOrganizer && (

                    <button
                        onClick={handleAction}
                        className={`mt-6 w-full rounded-xl py-3 font-semibold text-white transition ${
                            alreadyJoined
                                ? "bg-red-500 hover:bg-red-600"
                                : "bg-violet-600 hover:bg-violet-700"
                        }`}
                    >

                        {alreadyJoined
                            ? "Leave Event ❌"
                            : "Join Event 🎉"}

                    </button>

                )}

                {isOrganizer && (

                    <div className="mt-6 rounded-xl bg-green-100 py-3 text-center font-semibold text-green-700">

                        You are the Organizer 👑

                    </div>

                )}

            </div>

        </div>

    );

}

export default EventCard;