function EmptyNotifications() {

    return (

        <div
            className="
                rounded-2xl
                bg-white
                p-12
                text-center
                shadow-sm
            "
        >

            <div className="mb-4 text-6xl">

                🔔

            </div>

            <h2 className="text-2xl font-bold">

                No notifications

            </h2>

            <p className="mt-2 text-slate-500">

                You're all caught up!

            </p>

        </div>

    );

}

export default EmptyNotifications;