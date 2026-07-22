import { useState } from "react";

function NotificationSettings() {

    const [enabled, setEnabled] =
        useState(true);

    return (

        <div className="rounded-2xl bg-white p-6 shadow-sm">

            <h2 className="mb-4 text-2xl font-bold">

                Notifications 🔔

            </h2>

            <div className="flex items-center justify-between">

                <div>

                    <h3 className="font-semibold">

                        Push Notifications

                    </h3>

                    <p className="text-sm text-slate-500">

                        Receive updates from your community.

                    </p>

                </div>

                <button
                    onClick={() =>
                        setEnabled(
                            !enabled
                        )
                    }
                    className={`
                        rounded-full px-4 py-2 text-white

                        ${
                            enabled
                                ? "bg-green-600"
                                : "bg-slate-400"
                        }
                    `}
                >

                    {enabled
                        ? "Enabled"
                        : "Disabled"}

                </button>

            </div>

        </div>

    );

}

export default NotificationSettings;