import { useState } from "react";
import { toast } from "react-hot-toast";

import { addComment } from "../../api/post.api";
import { usePostStore } from "../../store/post.store";

function CommentSection({ post }) {

    const [comment, setComment] = useState("");

    const fetchFeed = usePostStore(
        (state) => state.fetchFeed
    );

    const handleComment = async (e) => {

        e.preventDefault();

        if (!comment.trim()) return;

        try {

            await addComment(
                post._id,
                comment
            );

            toast.success(
                "Comment added 🎉"
            );

            setComment("");

            fetchFeed();

        } catch (error) {

            toast.error(
                "Failed to add comment"
            );

        }

    };

    return (

        <div className="mt-4 border-t pt-4">

            <div className="space-y-2 mb-4">

                {post.comments?.map((comment) => (

                    <div
                        key={comment._id}
                        className="rounded-lg bg-slate-100 p-3"
                    >

                        <p className="font-semibold">
                            {comment.user?.name}
                        </p>

                        <p className="text-sm">
                            {comment.content}
                        </p>

                    </div>

                ))}

            </div>

            <form
                onSubmit={handleComment}
                className="flex gap-2"
            >

                <input
                    type="text"
                    placeholder="Write a comment..."
                    value={comment}
                    onChange={(e) =>
                        setComment(e.target.value)
                    }
                    className="flex-1 rounded-lg border px-4 py-2"
                />

                <button
                    type="submit"
                    className="rounded-lg bg-violet-600 px-4 py-2 text-white"
                >
                    Send
                </button>

            </form>

        </div>

    );

}

export default CommentSection;