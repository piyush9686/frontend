import {
    FaChartPie,
    FaBoxOpen,
    FaTags,
    FaImages,
    FaStar,
    FaChartLine,
    FaCog,
} from "react-icons/fa";

function DashboardSidebar({

    activeTab,

    setActiveTab,

}) {

    const menus = [

        {
            id: "overview",
            label: "Overview",
            icon: <FaChartPie />,
        },

        {
            id: "products",
            label: "Products",
            icon: <FaBoxOpen />,
        },

        {
            id: "offers",
            label: "Offers",
            icon: <FaTags />,
        },

        {
            id: "gallery",
            label: "Gallery",
            icon: <FaImages />,
        },

        {
            id: "reviews",
            label: "Reviews",
            icon: <FaStar />,
        },

        {
            id: "analytics",
            label: "Analytics",
            icon: <FaChartLine />,
        },

        {
            id: "settings",
            label: "Settings",
            icon: <FaCog />,
        },

    ];

    return (

        <aside className="min-h-screen w-72 bg-white shadow-lg">

            <div className="border-b p-6">

                <h2 className="text-2xl font-bold">

                    Business Dashboard

                </h2>

            </div>

            <div className="mt-6 flex flex-col gap-2 px-4">

                {menus.map((menu) => (

                    <button

                        key={menu.id}

                        onClick={() =>
                            setActiveTab(menu.id)
                        }

                        className={`flex items-center gap-3 rounded-xl px-5 py-4 text-left transition ${
                            activeTab === menu.id
                                ? "bg-violet-600 text-white"
                                : "text-slate-700 hover:bg-slate-100"
                        }`}

                    >

                        <span className="text-lg">

                            {menu.icon}

                        </span>

                        <span className="font-medium">

                            {menu.label}

                        </span>

                    </button>

                ))}

            </div>

        </aside>

    );

}

export default DashboardSidebar;