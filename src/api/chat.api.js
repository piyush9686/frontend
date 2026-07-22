import api from "./axios";

// ======================
// Get conversations
// ======================

export const getConversations = () =>
    api.get("/api/v1/messages/conversations");

// ======================
// Get messages
// ======================

export const getMessages = (
    conversationId,
    page = 1
) =>
    api.get(
        `/api/v1/messages/${conversationId}?page=${page}`
    );

// ======================
// Send message
// ======================

export const sendMessage = (
    receiverId,
    content
) =>
    api.post(
        `/api/v1/messages/send/${receiverId}`,
        { content }
    );

// ======================
// Mark messages as read
// ======================

export const markMessagesAsRead = (
    conversationId
) =>
    api.patch(
        `/api/v1/messages/read/${conversationId}`
    );