import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";

import { useAuthStore } from "../../store/auth.store";
import MobileDrawer from "./MobileDrawer";

function Navbar() {

    const [isOpen, setIsOpen] =
        useState(false);

    const user = useAuthStore(
        (state) => state.user
    );

    const logout = useAuthStore(
        (state) => state.logout
    );

    const navigate = useNavigate();

    const handleLogout = async () => {

        await logout();

        navigate("/login");

    };

    return (

        <>
            <header className="sticky top-0 z-50 border-b bg-white shadow-sm">

                <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

                    <div className="flex items-center gap-4">

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() =>
                                setIsOpen(true)
                            }
                            className="text-xl md:hidden"
                        >
                            <FaBars />
                        </button>

                        <Link
                            to="/"
                            className="text-2xl font-bold text-violet-600"
                        >
                            LocalConnect 🌍
                        </Link>

                    </div>

                    <div className="flex items-center gap-4">

                        <span className="hidden md:block font-medium text-slate-700">
                            Hi, {user?.name}
                        </span>

                        <img
                            src={
                                user?.avatar ||
                                "https://ui-avatars.com/api/?name=User"
                            }
                            alt="avatar"
                            className="h-10 w-10 rounded-full object-cover"
                        />

                        <button
                            onClick={handleLogout}
                            className="hidden rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600 md:block"
                        >
                            Logout
                        </button>

                    </div>

                </div>

            </header>

            <MobileDrawer
                isOpen={isOpen}
                setIsOpen={setIsOpen}
            />
        </>
    );

}

export default Navbar;