import {
    FaBell,
    FaUserCircle,
    FaSignOutAlt,
} from "react-icons/fa";

import { useAuthStore } from "../../store/auth.store";

function DashboardNavbar() {

    const user = useAuthStore(
        (state) => state.user
    );

    const logout = useAuthStore(
        (state) => state.logout
    );

    return (

        <header className="sticky top-0 z-50 flex h-20 items-center justify-between border-b bg-white px-8 shadow-sm">

            <div>

                <h1 className="text-3xl font-bold">

                    Business Dashboard

                </h1>

                <p className="text-slate-500">

                    Manage your business efficiently

                </p>

            </div>

            <div className="flex items-center gap-6">

                {/* Notification */}

                <button className="relative rounded-full p-3 transition hover:bg-slate-100">

                    <FaBell
                        size={22}
                    />

                    <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500"></span>

                </button>

                {/* User */}

                <div className="flex items-center gap-3">

                    {user?.avatar ? (

                        <img
                            src={user.avatar}
                            alt={user.name}
                            className="h-12 w-12 rounded-full object-cover"
                        />

                    ) : (

                        <FaUserCircle
                            size={42}
                            className="text-slate-500"
                        />

                    )}

                    <div>

                        <p className="font-bold">

                            {user?.name}

                        </p>

                        <p className="text-sm text-slate-500">

                            Business Owner

                        </p>

                    </div>

                </div>

                {/* Logout */}

                <button
                    onClick={logout}
                    className="flex items-center gap-2 rounded-xl bg-red-500 px-4 py-2 text-white transition hover:bg-red-600"
                >

                    <FaSignOutAlt />

                    Logout

                </button>

            </div>

        </header>

    );

}

export default DashboardNavbar;