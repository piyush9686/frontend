import { NavLink } from "react-router-dom";

function MobileDrawer({

    isOpen,
    setIsOpen,

}) {

    const links = [

        {
            name: "🏠 Home",
            path: "/",
        },

        {
            name: "🚨 Emergencies",
            path: "/emergencies",
        },

        {
            name: "💬 Chat",
            path: "/chat",
        },

        {
            name: "🏸 Events",
            path: "/events",
        },

        {
            name: "🏪 Businesses",
            path: "/businesses",
        },

        {
            name: "🗺️ Map",
            path: "/map",
        },

        {
            name: "🔔 Notifications",
            path: "/notifications",
        },

        {
            name: "👤 Profile",
            path: "/profile",
        },

        {
            name: "⚙️ Settings",
            path: "/settings",
        },

    ];

    return (

        <>

            {/* Overlay */}

            {isOpen && (

                <div
                    onClick={() =>
                        setIsOpen(false)
                    }
                    className="fixed inset-0 z-40 bg-black/50 md:hidden"
                />

            )}

            {/* Drawer */}

            <aside
                className={`fixed left-0 top-0 z-50 h-full w-72 bg-white p-6 shadow-xl transition-transform md:hidden ${
                    isOpen
                        ? "translate-x-0"
                        : "-translate-x-full"
                }`}
            >

                <h2 className="mb-8 text-2xl font-bold text-violet-600">
                    LocalConnect 🌍
                </h2>

                <nav className="space-y-3">

                    {links.map((link) => (

                        <NavLink
                            key={link.path}
                            to={link.path}
                            onClick={() =>
                                setIsOpen(false)
                            }
                            className={({ isActive }) =>
                                `block rounded-lg px-4 py-3 transition ${
                                    isActive
                                        ? "bg-violet-100 text-violet-700"
                                        : "hover:bg-slate-100"
                                }`
                            }
                        >
                            {link.name}
                        </NavLink>

                    ))}

                </nav>

            </aside>

        </>

    );

}

export default MobileDrawer;