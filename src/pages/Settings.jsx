import { useState } from "react";
import { useAuthStore } from "../store/auth.store.js";

function LocationSettings() {

    const user = useAuthStore(
        (state) => state.user
    );

    const updateLocation = useAuthStore(
        (state) => state.updateLocation
    );

    const [locationName, setLocationName] =
        useState(
            user?.locationName || ""
        );

    const [coordinates, setCoordinates] =
        useState(
            user?.location?.coordinates || [0, 0]
        );

    const handleUseCurrentLocation = () => {

        navigator.geolocation.getCurrentPosition(

            (position) => {

                setCoordinates([

                    position.coords.longitude,
                    position.coords.latitude,

                ]);

                alert(
                    "Current location captured successfully!"
                );

            },

            () => {

                alert(
                    "Unable to access your location."
                );

            }

        );

    };

    const handleSave = async () => {
       

        //err 
        console.log(
            "Saving location:",
            locationName,
            coordinates
        );
        try {

            await updateLocation({

                locationName,
                coordinates,

            });

            alert(
                "Location updated successfully!"
            );

        } catch (error) {

            console.error(error);

            alert(
                "Failed to update location."
            );

        }

    };

    return (

        <div className="rounded-2xl bg-white p-6 shadow-sm">

            <h2 className="mb-4 text-xl font-bold">

                📍 Home Location

            </h2>

            <input
                type="text"
                value={locationName}
                onChange={(e) =>
                    setLocationName(
                        e.target.value
                    )
                }
                placeholder="Sambalpur, Odisha"
                className="mb-4 w-full rounded-xl border p-3"
            />

            <div className="flex flex-wrap gap-3">

                <button
                    onClick={handleUseCurrentLocation}
                    className="rounded-xl bg-violet-600 px-5 py-3 text-white hover:bg-violet-700"
                >
                    Use Current Location
                </button>

                <button
                    disabled
                    className="cursor-not-allowed rounded-xl border px-5 py-3 text-slate-400"
                >
                    Choose on Map (Coming Soon)
                </button>

                <button
                    onClick={handleSave}
                    className="rounded-xl bg-green-600 px-5 py-3 text-white hover:bg-green-700"
                >
                    Save
                </button>

            </div>

        </div>

    );

}

export default LocationSettings;