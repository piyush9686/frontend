function MessageBubble({
    message,
    currentUser,
}) {

    const mine =
        message.sender._id ===
        currentUser._id;

    return (

        <div
            className={`flex ${
                mine
                    ? "justify-end"
                    : "justify-start"
            }`}
        >

            <div
                className={`max-w-[75%] rounded-2xl px-4 py-3 shadow-sm ${
                    mine
                        ? "bg-violet-600 text-white"
                        : "border bg-white text-slate-800"
                }`}
            >

                <p className="break-words">
                    {message.content}
                </p>

                <div
                    className={`mt-2 flex items-center gap-2 text-xs ${
                        mine
                            ? "text-violet-100"
                            : "text-slate-500"
                    }`}
                >

                    <span>
                        {new Date(
                            message.createdAt
                        ).toLocaleTimeString(
                            [],
                            {
                                hour: "2-digit",
                                minute: "2-digit",
                            }
                        )}
                    </span>

                    {mine && message.isRead && (

                        <span>
                            ✓✓ Seen
                        </span>

                    )}

                </div>

            </div>

        </div>

    );

}

export default MessageBubble;