function DashboardSettings() {

    return (

        <div>

            <div className="mb-8">

                <h1 className="text-3xl font-bold">

                    Business Settings ⚙️

                </h1>

                <p className="mt-2 text-slate-500">

                    Update your business information.

                </p>

            </div>

            <div className="rounded-3xl bg-white p-8 shadow">

                <div className="grid gap-6 md:grid-cols-2">

                    <div>

                        <label className="mb-2 block font-semibold">

                            Business Name

                        </label>

                        <input
                            className="w-full rounded-xl border p-3"
                        />

                    </div>

                    <div>

                        <label className="mb-2 block font-semibold">

                            Category

                        </label>

                        <input
                            className="w-full rounded-xl border p-3"
                        />

                    </div>

                    <div>

                        <label className="mb-2 block font-semibold">

                            Phone

                        </label>

                        <input
                            className="w-full rounded-xl border p-3"
                        />

                    </div>

                    <div>

                        <label className="mb-2 block font-semibold">

                            Email

                        </label>

                        <input
                            className="w-full rounded-xl border p-3"
                        />

                    </div>

                    <div className="md:col-span-2">

                        <label className="mb-2 block font-semibold">

                            Address

                        </label>

                        <input
                            className="w-full rounded-xl border p-3"
                        />

                    </div>

                    <div className="md:col-span-2">

                        <label className="mb-2 block font-semibold">

                            Description

                        </label>

                        <textarea
                            rows={5}
                            className="w-full rounded-xl border p-3"
                        />

                    </div>

                </div>

                <button
                    className="mt-8 rounded-xl bg-violet-600 px-8 py-3 font-semibold text-white hover:bg-violet-700"
                >

                    Save Changes

                </button>

            </div>

        </div>

    );

}

export default DashboardSettings;