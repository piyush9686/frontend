import api from "./axios";

// ======================
// Get conversations
// ======================

export const getConversations = () =>
    api.get("/messages/conversations");

// ======================
// Get messages
// ======================

export const getMessages = (
    conversationId,
    page = 1
) =>
    api.get(
        `/messages/${conversationId}?page=${page}`
    );

// ======================
// Send message
// ======================

export const sendMessage = (
    receiverId,
    content
) =>
    api.post(
        `/messages/send/${receiverId}`,
        { content }
    );

// ======================
// Mark messages as read
// ======================

export const markMessagesAsRead = (
    conversationId
) =>
    api.patch(
        `/messages/read/${conversationId}`
    );