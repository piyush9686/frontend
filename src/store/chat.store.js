import { create } from "zustand";

import {
    getConversations,
    getMessages,
    sendMessage,
} from "../api/chat.api";

export const useChatStore = create((set, get) => ({

    conversations: [],

    messages: [],

    selectedConversation: null,

    isLoading: false,

    // ======================
    // Fetch Conversations
    // ======================

    fetchConversations: async () => {

        try {

            set({ isLoading: true });

            const response =
                await getConversations();

            set({

                conversations:
                    response.data.data,

                isLoading: false,

            });

        } catch (error) {

            console.error(error);

            set({ isLoading: false });

        }

    },

    // ======================
    // Fetch Messages
    // ======================

    fetchMessages: async (
        conversationId
    ) => {

        try {

            set({ isLoading: true });

            const response =
                await getMessages(
                    conversationId
                );

            set({

                messages:
                    response.data.data.messages.reverse(),

                isLoading: false,

            });

        } catch (error) {

            console.error(error);

            set({ isLoading: false });

        }

    },

    // ======================
    // Select Conversation
    // ======================

    setSelectedConversation:
        (conversation) => {

            set({

                selectedConversation:
                    conversation,

            });

        },

    // ======================
    // Send Message
    // ======================

    sendNewMessage: async (
        receiverId,
        content
    ) => {

        try {

            const response =
                await sendMessage(
                    receiverId,
                    content
                );

            const newMessage =
                response.data.data;

            set((state) => ({

                messages: [
                    ...state.messages,
                    newMessage,
                ],

            }));

        } catch (error) {

            console.error(error);

        }

    },

    // ======================
    // Real-time Message
    // ======================

    addMessage: (message) => {

        const exists =
            get().messages.some(
                (msg) =>
                    msg._id === message._id
            );

        if (exists) {
            return;
        }

        set((state) => ({

            messages: [
                ...state.messages,
                message,
            ],

        }));

    },

    // ======================
    // Update Online Status
    // ======================

    updateUserStatus: (
        userId,
        isOnline,
        lastSeen = null
    ) => {

        set((state) => ({

            conversations:
                state.conversations.map(
                    (conversation) => ({

                        ...conversation,

                        participants:
                            conversation.participants.map(
                                (participant) => {

                                    if (
                                        participant._id === userId
                                    ) {

                                        return {

                                            ...participant,

                                            isOnline,

                                            lastSeen,

                                        };

                                    }

                                    return participant;

                                }
                            ),

                    })
                ),

        }));

    },

    // ======================
    // Clear Messages
    // ======================

    clearMessages: () => {

        set({

            messages: [],

            selectedConversation: null,

        });

    },

}));


// ======================
// Open Conversation
// ======================

openConversation: async (user) => {

    const state = get();

    // Check if conversation already exists
    const existingConversation =
        state.conversations.find(

            (conversation) =>

                conversation.participants.some(

                    (participant) =>
                        participant._id === user._id

                )

        );

    if (existingConversation) {

        set({

            selectedConversation:
                existingConversation,

        });

        await get().fetchMessages(
            existingConversation._id
        );

        return;
    }

    // Temporary conversation (no messages yet)

    const tempConversation = {

        _id: `temp-${user._id}`,

        participants: [
            user,
        ],

        lastMessage: "",

        unreadCount: 0,

    };

    set({

        selectedConversation:
            tempConversation,

        messages: [],

    });

};