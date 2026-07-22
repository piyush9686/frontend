import { useEffect, useState } from "react";

import AppLayout from "../components/layout/AppLayout";
import EmergencyCard from "../components/emergency/EmergencyCard";
import CreateEmergencyModal from "../components/emergency/CreateEmergencyModal";

import { useEmergencyStore } from "../store/emergency.store";

import socket from "../socket/socket";

function Emergencies() {

    const [open, setOpen] =
        useState(false);

    const emergencies =
        useEmergencyStore(
            (state) =>
                state.emergencies
        );

    const fetchEmergencies =
        useEmergencyStore(
            (state) =>
                state.fetchEmergencies
        );

    const addEmergency =
        useEmergencyStore(
            (state) =>
                state.addEmergency
        );

    useEffect(() => {

        fetchEmergencies();

        socket.on(
            "newEmergency",
            addEmergency
        );

        return () => {

            socket.off(
                "newEmergency",
                addEmergency
            );

        };

    }, [fetchEmergencies, addEmergency]);

    return (

        <AppLayout>

            <div className="mx-auto max-w-4xl space-y-6">

                {/* Header */}
                <div className="flex items-center justify-between">

                    <h1 className="text-3xl font-bold">

                        Emergency Alerts 🚨

                    </h1>

                    <button
                        onClick={() =>
                            setOpen(true)
                        }
                        className="
                            rounded-xl
                            bg-red-600
                            px-5
                            py-3
                            text-white
                            transition
                            hover:bg-red-700
                        "
                    >

                        Report Emergency

                    </button>

                </div>

                {/* Emergency List */}
                {emergencies.length > 0 ? (

                    emergencies.map(
                        (emergency) => (

                            <EmergencyCard
                                key={
                                    emergency._id
                                }
                                emergency={
                                    emergency
                                }
                            />

                        )
                    )

                ) : (

                    <div
                        className="
                            rounded-2xl
                            bg-white
                            p-10
                            text-center
                            text-slate-500
                            shadow-sm
                        "
                    >

                        🎉 No nearby emergencies.

                    </div>

                )}

            </div>

            {/* Create Modal */}
            <CreateEmergencyModal
                open={open}
                onClose={() =>
                    setOpen(false)
                }
            />

        </AppLayout>

    );

}

export default Emergencies;