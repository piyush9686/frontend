import api from "./axios";

// =====================================
// Get Feed
// =====================================

export const getFeed = (page = 1) =>
    api.get(`/posts/feed?page=${page}`
    );

// =====================================
// Create Post (supports images)
// =====================================

export const createPost = (formData) =>
    api.post(
        "/posts",
        formData
    );

// =====================================
// Like / Unlike Post
// =====================================

export const likePost = (postId) =>
    api.post(`/posts/${postId}/like`
    );

// =====================================
// Add Comment
// =====================================

export const addComment = (
    postId,
    content
) =>
    api.post(
        `/posts/${postId}/comments`,
        {
            content,
        }
    );