function ProfileHeader({ user }) {

    return (

        <div className="rounded-2xl bg-white p-8 shadow-sm">

            <div className="flex flex-col items-center gap-4 md:flex-row">

                <img
                    src={
                        user?.avatar ||
                        `https://ui-avatars.com/api/?name=${user?.name}`
                    }
                    alt={user?.name}
                    className="h-32 w-32 rounded-full border-4 border-violet-200"
                />

                <div className="flex-1 text-center md:text-left">

                    <h1 className="text-4xl font-bold">

                        {user?.name}

                    </h1>

                    <p className="mt-2 text-slate-600">

                        {user?.bio ||
                            "No bio added yet."}

                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">

                        {user?.interests?.map(
                            (interest) => (

                                <span
                                    key={interest}
                                    className="
                                        rounded-full
                                        bg-violet-100
                                        px-3 py-1
                                        text-sm
                                        text-violet-700
                                    "
                                >

                                    {interest}

                                </span>

                            )
                        )}

                    </div>

                </div>

            </div>

        </div>

    );

}

export default ProfileHeader;