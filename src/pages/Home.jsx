import { useEffect } from "react";

import { usePostStore } from "../store/post.store";

import PostCard from "../components/post/Postcard";
import CreatePostModal from "../components/post/CreatePostModal";
import AppLayout from "../components/layout/AppLayout";

function Home() {

    const posts =
        usePostStore(
            (state) => state.posts
        );

    const fetchFeed =
        usePostStore(
            (state) => state.fetchFeed
        );

    useEffect(() => {

        fetchFeed();

    }, []);

    return (

        <AppLayout>

            <div className="mx-auto max-w-2xl py-8 space-y-6">

                <h1 className="text-3xl font-bold">
                    Community Feed 🌍
                </h1>

                <CreatePostModal />

                {posts?.length > 0 ? (

                    posts.map((post) => (

                        <PostCard
                            key={post._id}
                            post={post}
                        />

                    ))

                ) : (

                    <div className="rounded-xl bg-white p-6 text-center text-slate-500">

                        No posts yet.

                    </div>

                )}

            </div>

        </AppLayout>

    );

}

export default Home;