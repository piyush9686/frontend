import api from "./axios";

// =====================================
// Get Feed
// =====================================

export const getFeed = (page = 1) =>
    api.get(`/api/v1/posts/feed?page=${page}`,
        {
            headers:{
            Authorization: `Bearer ${token}`,
        }
        }
    );

// =====================================
// Create Post (supports images)
// =====================================

export const createPost = (formData) =>
    api.post(
        "/api/v1/posts",
        formData,
        {
            headers: {
                "Content-Type":
                    "multipart/form-data",
            },
        }
    );

// =====================================
// Like / Unlike Post
// =====================================

export const likePost = (postId) =>
    api.post(`/api/v1/posts/${postId}/like`,
        {
        headers:{
            Authorization: `Bearer ${token}`,
        }
    }
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
        },
        {
            headers:{
            Authorization: `Bearer ${token}`,
        }
        }
    );