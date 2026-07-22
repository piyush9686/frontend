import api from "./axios";

// =====================================
// Get Feed
// =====================================

export const getFeed = (page = 1) =>
    api.get(`/api/v1/posts/feed?page=${page}`
    );

// =====================================
// Create Post (supports images)
// =====================================

export const createPost = (formData) =>
    api.post(
        "/api/v1/posts",
        formData
    );

// =====================================
// Like / Unlike Post
// =====================================

export const likePost = (postId) =>
    api.post(`/api/v1/posts/${postId}/like`
    );

// =====================================
// Add Comment
// =====================================

export const addComment = (
    postId,
    content
) =>
    api.post(
        `/api/v1/posts/${postId}/comments`,
        {
            content,
        }
    );