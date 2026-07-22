import { Navigate } from "react-router-dom";
import { useEffect } from "react";

import { useAuthStore } from "../../store/auth.store";
import { useBusinessStore } from "../../store/business.store";

function BusinessOwnerRoute({ children }) {

    const user = useAuthStore(
        (state) => state.user
    );

    const {
        myBusiness,
        fetchMyBusiness,
    } = useBusinessStore();

    useEffect(() => {

        if (user) {

            fetchMyBusiness();

        }

    }, [user]);

    if (!user) {

        return <Navigate to="/login" />;

    }

    if (myBusiness === null) {

        return (

            <div className="flex min-h-screen items-center justify-center">

                <h2 className="text-2xl font-bold">

                    Loading Dashboard...

                </h2>

            </div>

        );

    }

    return children;

}

export default BusinessOwnerRoute;