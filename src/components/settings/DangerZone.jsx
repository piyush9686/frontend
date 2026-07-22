import { useNavigate } from "react-router-dom";

import { useAuthStore } from "../../store/auth.store";

function DangerZone() {

    const navigate =
        useNavigate();

    const logout =
        useAuthStore(
            (state) => state.logout
        );

    const handleLogout = () => {

        logout();

        navigate("/login");

    };

    return (

        <div className="rounded-2xl border border-red-200 bg-red-50 p-6">

            <h2 className="mb-4 text-2xl font-bold text-red-700">

                Danger Zone ⚠️

            </h2>

            <button
                onClick={handleLogout}
                className="
                    rounded-xl
                    bg-red-600
                    px-6 py-3
                    font-semibold
                    text-white
                    hover:bg-red-700
                "
            >

                Logout

            </button>

        </div>

    );

}

export default DangerZone;