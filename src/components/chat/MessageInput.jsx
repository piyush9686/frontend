import { useState } from "react";

import { useChatStore } from "../../store/chat.store";
import { useAuthStore } from "../../store/auth.store";

import { socket } from "../../socket/socket";

function MessageInput({ receiverId }) {

    const [text, setText] = useState("");

    const user = useAuthStore(
        (state) => state.user
    );

    const sendNewMessage = useChatStore(
        (state) => state.sendNewMessage
    );

    const handleSend = async (e) => {

        e.preventDefault();

        if (!text.trim()) return;

        try {

            await sendNewMessage(
                receiverId,
                text
            );

            // Stop typing indicator
            socket.emit(
                "stopTyping",
                {
                    receiverId,
                }
            );

            setText("");

        } catch (error) {

            console.error(error);

        }

    };

    const handleTyping = (e) => {

        const value = e.target.value;

        setText(value);

        if (value.trim()) {

            socket.emit(
                "typing",
                {
                    receiverId,
                    senderName: user?.name,
                }
            );

        } else {

            socket.emit(
                "stopTyping",
                {
                    receiverId,
                }
            );

        }

    };

    return (

        <form
            onSubmit={handleSend}
            className="flex gap-2 border-t p-4"
        >

            <input
                value={text}
                onChange={handleTyping}
                placeholder="Type a message..."
                className="flex-1 rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-violet-500"
            />

            <button
                type="submit"
                className="rounded-lg bg-violet-600 px-6 py-3 text-white transition hover:bg-violet-700"
            >
                Send
            </button>

        </form>

    );

}

export default MessageInput;