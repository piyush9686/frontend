function ProfileStats({

    posts = 0,
    events = 0,
    businesses = 0,

}) {

    const stats = [

        {
            label: "Posts",
            value: posts,
            icon: "📝",
        },

        {
            label: "Events",
            value: events,
            icon: "🏸",
        },

        {
            label: "Businesses",
            value: businesses,
            icon: "🏪",
        },

    ];

    return (

        <div className="grid gap-4 md:grid-cols-3">

            {stats.map((stat) => (

                <div
                    key={stat.label}
                    className="
                        rounded-2xl
                        bg-white
                        p-6
                        text-center
                        shadow-sm
                    "
                >

                    <div className="text-4xl">

                        {stat.icon}

                    </div>

                    <h2 className="mt-3 text-3xl font-bold">

                        {stat.value}

                    </h2>

                    <p className="text-slate-500">

                        {stat.label}

                    </p>

                </div>

            ))}

        </div>

    );

}

export default ProfileStats;