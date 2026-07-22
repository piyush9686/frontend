import { NavLink } from "react-router-dom";

function MobileNav() {

    const links = [

        {
            path: "/",
            icon: "🏠",
            label: "Home",
        },

        {
            path: "/chat",
            icon: "💬",
            label: "Chat",
        },

        {
            path: "/events",
            icon: "🏸",
            label: "Events",
        },

        {
            path: "/map",
            icon: "🗺️",
            label: "Map",
        },

        {
            path: "/profile",
            icon: "👤",
            label: "Profile",
        },

    ];

    return (

        <div className="fixed bottom-0 left-0 right-0 z-50 border-t bg-white shadow-lg md:hidden">

            <div className="flex items-center justify-around py-2">

                {links.map((link) => (

                    <NavLink
                        key={link.path}
                        to={link.path}
                        className={({ isActive }) =>
                            `flex flex-col items-center gap-1 px-3 py-2 text-xs transition ${
                                isActive
                                    ? "text-violet-600"
                                    : "text-slate-500"
                            }`
                        }
                    >

                        <span className="text-xl">
                            {link.icon}
                        </span>

                        <span>
                            {link.label}
                        </span>

                    </NavLink>

                ))}

            </div>

        </div>

    );

}

export default MobileNav;