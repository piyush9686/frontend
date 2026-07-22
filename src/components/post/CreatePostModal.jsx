import { useState } from "react";
import { toast } from "react-hot-toast";

import { createPost } from "../../api/post.api";
import { usePostStore } from "../../store/post.store";

function CreatePostModal() {

    const [content, setContent] =
        useState("");

    const [images, setImages] =
        useState([]);

    const [loading, setLoading] =
        useState(false);

    const fetchFeed = usePostStore(
        (state) => state.fetchFeed
    );

    const handleImageChange = (e) => {

        const files =
            Array.from(e.target.files);

        setImages(files);

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (
            !content.trim() &&
            images.length === 0
        ) {

            return toast.error(
                "Post cannot be empty"
            );

        }

        try {

            setLoading(true);

            const formData =
                new FormData();

            formData.append(
                "content",
                content
            );

            formData.append(
                "category",
                "general"
            );

            images.forEach((image) => {

                formData.append(
                    "images",
                    image
                );

            });

            await createPost(
                formData
            );

            toast.success(
                "Post created successfully 🎉"
            );

            setContent("");
            setImages([]);

            await fetchFeed();

        } catch (error) {

            toast.error(

                error.response?.data
                    ?.message ||

                "Failed to create post"

            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="rounded-2xl border bg-white p-5 shadow-sm">

            <form
                onSubmit={handleSubmit}
                className="space-y-4"
            >

                {/* Post Text */}

                <textarea
                    rows={4}
                    placeholder="What's happening in your community?"
                    value={content}
                    onChange={(e) =>
                        setContent(
                            e.target.value
                        )
                    }
                    className="w-full resize-none rounded-xl border p-4"
                />

                {/* Upload Images */}

                <div>

                    <label className="mb-2 block font-medium">

                        📷 Add Images

                    </label>

                    <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={
                            handleImageChange
                        }
                    />

                </div>

                {/* Image Preview */}

                {images.length > 0 && (

                    <div>

                        <p className="mb-3 text-sm text-slate-500">

                            {images.length}
                            {" "}
                            image(s) selected

                        </p>

                        <div className="grid grid-cols-3 gap-3">

                            {images.map(
                                (
                                    image,
                                    index
                                ) => (

                                    <img
                                        key={index}
                                        src={URL.createObjectURL(
                                            image
                                        )}
                                        alt=""
                                        className="h-28 w-full rounded-xl object-cover"
                                    />

                                )
                            )}

                        </div>

                    </div>

                )}

                {/* Submit */}

                <button
                    type="submit"
                    disabled={loading}
                    className="rounded-xl bg-violet-600 px-6 py-3 font-semibold text-white hover:bg-violet-700 disabled:opacity-50"
                >

                    {loading
                        ? "Posting..."
                        : "Create Post"}

                </button>

            </form>

        </div>

    );

}

export default CreatePostModal;