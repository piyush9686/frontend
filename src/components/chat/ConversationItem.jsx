function ConversationItem({

    conversation,
    currentUser,
    onClick,

}) {

    const otherUser =
        conversation.participants.find(

            (user) =>
                user._id !==
                currentUser._id

        );

    return (

        <button
            onClick={onClick}
            className="w-full border-b p-4 text-left transition hover:bg-slate-100"
        >

            <div className="flex items-center gap-3">

                <div className="relative">

                    <img
                        src={
                            otherUser?.avatar ||
                            "https://ui-avatars.com/api/?name=User"
                        }
                        alt={otherUser?.name}
                        className="h-12 w-12 rounded-full object-cover"
                    />

                    {otherUser?.isOnline && (

                        <span
                            className="
                                absolute bottom-0 right-0
                                h-3 w-3 rounded-full
                                border-2 border-white
                                bg-green-500
                            "
                        />

                    )}

                </div>

                <div className="flex-1 overflow-hidden">

                    <div className="flex items-center gap-2">

                        <h3 className="font-semibold truncate">
                            {otherUser?.name}
                        </h3>

                        {otherUser?.isOnline && (

                            <span className="text-xs text-green-600">
                                Online
                            </span>

                        )}

                    </div>

                    <p className="truncate text-sm text-slate-500">

                        {conversation.lastMessage ||
                            "No messages yet"}

                    </p>

                </div>

            </div>

        </button>

    );

}

export default ConversationItem;