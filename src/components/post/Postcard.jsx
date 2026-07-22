import { FaHeart } from "react-icons/fa";
import { useState } from "react";
import { toast } from "react-hot-toast";

import { likePost } from "../../api/post.api";
import { usePostStore } from "../../store/post.store";

import CommentSection from "./CommentSection";

function PostCard({ post }) {

    const [showComments, setShowComments] =
        useState(false);

    const fetchFeed = usePostStore(
        (state) => state.fetchFeed
    );

    //debug
     console.log("POST:", post);
    console.log("IMAGES:", post.images);
    console.log(
        "images length:",
        post.images?.length
    );

    const handleLike = async () => {

        try {

            await likePost(post._id);

            fetchFeed();

        } catch {

            toast.error(
                "Failed to like post"
            );

        }

    };


    return (



        <div className="rounded-2xl border bg-white p-5 shadow-sm">

            {/* Author */}

            <div className="mb-4 flex items-center gap-3">

                <img
                    src={
                        post.author?.avatar ||
                        `https://ui-avatars.com/api/?name=${post.author?.name}`
                    }
                    alt=""
                    className="h-12 w-12 rounded-full object-cover"
                />

                <div>

                    <h3 className="font-semibold">
                        {post.author?.name}
                    </h3>

                    <p className="text-sm text-slate-500">
                        {new Date(
                            post.createdAt
                        ).toLocaleString()}
                    </p>

                </div>

            </div>

            {/* Content */}

            <p className="mb-4 whitespace-pre-wrap text-slate-700">
                {post.content}
            </p>

            {/* Images */}

            {post.images?.length > 0 && (

                <div
                    className={`mb-4 grid gap-2 ${
                        post.images.length === 1
                            ? "grid-cols-1"
                            : post.images.length === 2
                            ? "grid-cols-2"
                            : "grid-cols-3"
                    }`}
                >

                    {post.images.map(
                        (image, index) => (

                            <img
                                key={index}
                                src={image}
                                alt={`Post ${index}`}
                                className="max-h-80 w-full rounded-xl object-cover transition hover:scale-[1.02]"
                            />

                        )
                    )}

                </div>

            )}

            {/* Actions */}

            <div className="mt-4 flex items-center gap-6">

                <button
                    onClick={handleLike}
                    className="flex items-center gap-2 text-slate-600 transition hover:text-red-500"
                >

                    <FaHeart />

                    {post.likes?.length || 0}

                </button>

                <button
                    onClick={() =>
                        setShowComments(
                            !showComments
                        )
                    }
                    className="text-slate-600"
                >

                    💬 {post.comments?.length || 0}

                </button>

            </div>

            {/* Comments */}

            {showComments && (

                <CommentSection
                    post={post}
                />

            )}

        </div>

    );

}

export default PostCard;