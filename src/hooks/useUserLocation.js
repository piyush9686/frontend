import { useEffect, useState } from "react";

export default function useUserLocation() {

    const [location, setLocation] =
        useState(null);

    useEffect(() => {

        navigator.geolocation.getCurrentPosition(

            (position) => {

                setLocation({

                    lat: position.coords.latitude,
                    lng: position.coords.longitude,

                });

            },

            () => {

                console.log(
                    "Location permission denied"
                );

            }

        );

    }, []);

    return location;

}