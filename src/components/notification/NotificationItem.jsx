function NotificationItem({

    notification,
    onClick,

}) {

    const icons = {

        like: "❤️",
        comment: "💬",
        message: "📨",
        event: "🏸",
        emergency: "🚨",
        business: "🏪",

    };

    return (

        <button
            onClick={onClick}
            className={`
                w-full rounded-2xl border p-4 text-left shadow-sm transition

                ${
                    notification.isRead
                        ? "bg-white hover:bg-slate-50"
                        : "border-violet-200 bg-violet-50"
                }
            `}
        >

            <div className="flex gap-4">

                <div className="text-3xl">

                    {icons[
                        notification.type
                    ] || "🔔"}

                </div>

                <div className="flex-1">

                    <h3 className="font-semibold">

                        {notification.title}

                    </h3>

                    <p className="mt-1 text-slate-600">

                        {notification.message}

                    </p>

                    <p className="mt-2 text-sm text-slate-400">

                        {new Date(
                            notification.createdAt
                        ).toLocaleString()}

                    </p>

                </div>

                {!notification.isRead && (

                    <div
                        className="
                            mt-2 h-3 w-3
                            rounded-full
                            bg-violet-600
                        "
                    />

                )}

            </div>

        </button>

    );

}

export default NotificationItem;