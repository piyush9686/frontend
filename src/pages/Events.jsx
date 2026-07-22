import { useEffect, useState } from "react";

import AppLayout from "../components/layout/AppLayout";

import EventCard from "../components/event/EventCard";
import CreateEventModal from "../components/event/CreateEventModal";

import { useEventStore } from "../store/event.store";

function Events() {

    const [open, setOpen] =
        useState(false);

    const events =
        useEventStore(
            (state) =>
                state.events
        );

    const fetchEvents =
        useEventStore(
            (state) =>
                state.fetchEvents
        );

    useEffect(() => {

        fetchEvents();

    }, [fetchEvents]);

    return (

        <AppLayout>

            <div className="mx-auto max-w-5xl space-y-6">

                {/* Header */}
                <div className="flex items-center justify-between">

                    <div>

                        <h1 className="text-3xl font-bold">
                            Community Events 🏸
                        </h1>

                        <p className="mt-1 text-slate-500">
                            Join sports, meetups, games,
                            and activities near you.
                        </p>

                    </div>

                    <button
                        onClick={() =>
                            setOpen(true)
                        }
                        className="
                            rounded-xl
                            bg-violet-600
                            px-5 py-3
                            font-semibold
                            text-white
                            transition
                            hover:bg-violet-700
                        "
                    >

                        + Create Event

                    </button>

                </div>

                {/* Events List */}
                {events.length > 0 ? (

                    <div className="grid gap-6">

                        {events.map(
                            (event) => (

                                <EventCard
                                    key={event._id}
                                    event={event}
                                />

                            )
                        )}

                    </div>

                ) : (

                    <div
                        className="
                            rounded-2xl
                            bg-white
                            p-12
                            text-center
                            shadow-sm
                        "
                    >

                        <div className="mb-3 text-5xl">
                            🏸
                        </div>

                        <h2 className="text-xl font-bold">
                            No events nearby
                        </h2>

                        <p className="mt-2 text-slate-500">
                            Create the first community
                            event in your area.
                        </p>

                    </div>

                )}

            </div>

            <CreateEventModal
                open={open}
                onClose={() =>
                    setOpen(false)
                }
            />

        </AppLayout>

    );

}

export default Events;