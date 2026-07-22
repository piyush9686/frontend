import { useMemo } from "react";

import AppLayout from "../components/layout/AppLayout";

import ProfileHeader from "../components/profile/ProfileHeader";
import ProfileStats from "../components/profile/ProfileStats";

import { useAuthStore } from "../store/auth.store";
import { usePostStore } from "../store/post.store";
import { useEventStore } from "../store/event.store";
import { useBusinessStore } from "../store/business.store";

function Profile() {

    const user = useAuthStore(
        (state) => state.user
    );

    const posts = usePostStore(
        (state) => state.posts
    );

    const events = useEventStore(
        (state) => state.events
    );

    const businesses = useBusinessStore(
        (state) => state.businesses
    );

    const stats = useMemo(() => {

        const myPosts = posts.filter(
            (post) =>
                post.author?._id === user?._id
        );

        const joinedEvents = events.filter(
            (event) =>
                event.participants?.some(
                    (participant) =>
                        participant._id === user?._id
                )
        );

        const ownedBusinesses =
            businesses.filter(
                (business) =>
                    business.owner?._id ===
                        user?._id ||
                    business.owner === user?._id
            );

        return {

            posts: myPosts.length,
            events: joinedEvents.length,
            businesses:
                ownedBusinesses.length,

        };

    }, [posts, events, businesses, user]);

    return (

        <AppLayout>

            <div className="mx-auto max-w-6xl space-y-6">

                <ProfileHeader user={user} />

                <ProfileStats
                    posts={stats.posts}
                    events={stats.events}
                    businesses={
                        stats.businesses
                    }
                />

                <div className="rounded-2xl bg-white p-6 shadow-sm">

                    <h2 className="mb-4 text-2xl font-bold">

                        Community Information 🌍

                    </h2>

                    <div className="space-y-3 text-slate-700">

                        <p>
                            📍 Radius:
                            {" "}
                            {user?.radius || 50}
                            {" "}km
                        </p>

                        <p>
                            📧 Email:
                            {" "}
                            {user?.email}
                        </p>

                        <p>
                            🗓 Joined:
                            {" "}
                            {new Date(
                                user?.createdAt
                            ).toLocaleDateString()}
                        </p>

                    </div>

                </div>

            </div>

        </AppLayout>

    );

}

export default Profile;