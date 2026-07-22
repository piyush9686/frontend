import AppLayout from "../components/layout/AppLayout";

import CommunityMap from "../components/map/CommunityMap";

import { useAuthStore }
from "../store/auth.store";

import { useEventStore }
from "../store/event.store";

import { useBusinessStore }
from "../store/business.store";

import { useEmergencyStore }
from "../store/emergency.store";







function Map() {

    const user =
        useAuthStore(
            (state) => state.user
        );

    const events =
        useEventStore(
            (state) => state.events
        );

    const businesses =
        useBusinessStore(
            (state) => state.businesses
        );

    const emergencies =
        useEmergencyStore(
            (state) => state.emergencies
        );

    return (

        <AppLayout>

            <div className="space-y-6">

                <h1 className="text-3xl font-bold">

                    Community Map 🗺️

                </h1>

                <CommunityMap

                    userLocation={
                        user?.location
                    }

                    radius={
                        user?.radius || 50
                    }

                    events={events}

                    businesses={businesses}

                    emergencies={emergencies}

                />

            </div>

        </AppLayout>

    );

}

export default Map;