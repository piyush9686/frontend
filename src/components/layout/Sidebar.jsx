import { NavLink } from "react-router-dom";

function Sidebar() {

    const links = [

        { name: "🏠 Home", path: "/" },

        { name: "🚨 Emergencies", path: "/emergencies" },

        { name: "💬 Chat", path: "/chat" },

        { name: "🏸 Events", path: "/events" },

        { name: "🏪 Businesses", path: "/businesses" },

        { name: "🗺️ Community Map", path: "/map" },

        { name: "🔔 Notifications", path: "/notifications" },

        { name: "👤 Profile", path: "/profile" },

        { name: "🧳 Lost & Found", path: "/lost-found" },

        { name: "⚙️ Settings", path: "/settings" },

    ];

    return (

        <aside className="hidden w-64 border-r bg-white p-6 md:block">

            <nav className="space-y-3">

                {links.map((link) => (

                    <NavLink
                        key={link.path}
                        to={link.path}
                        className={({ isActive }) =>
                            `block rounded-lg px-4 py-3 transition ${
                                isActive
                                    ? "bg-violet-100 font-medium text-violet-700"
                                    : "hover:bg-slate-100"
                            }`
                        }
                    >
                        {link.name}
                    </NavLink>

                ))}

            </nav>

        </aside>

    );

}

export default Sidebar;