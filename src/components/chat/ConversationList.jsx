// import { useEffect, useState } from "react";

// import {
//     useChatStore
// } from "../../store/chat.store";

// import {
//     useAuthStore
// } from "../../store/auth.store";

// import {
//     getAllUsers
// } from "../../api/user.api";

// import ConversationItem
// from "./ConversationItem";


// function ConversationList() {

//     const user =
//         useAuthStore(
//             (state) => state.user
//         );

//     const conversations =
//         useChatStore(
//             (state) =>
//                 state.conversations
//         );

//     const fetchConversations =
//         useChatStore(
//             (state) =>
//                 state.fetchConversations
//         );

//     const setSelectedConversation =
//         useChatStore(
//             (state) =>
//                 state.setSelectedConversation
//         );

//     const fetchMessages =
//         useChatStore(
//             (state) =>
//                 state.fetchMessages
//         );

//     const sendNewMessage =
//         useChatStore(
//             (state) =>
//                 state.sendNewMessage
//         );

//     const [users, setUsers] =
//         useState([]);

//     const [search, setSearch] =
//         useState("");

//     useEffect(() => {

//         fetchConversations();

//         fetchUsers();

//     }, []);

//     const fetchUsers =
//         async () => {

//             try {

//                 const response =
//                     await getAllUsers();

//                 setUsers(
//                     response.data.data
//                 );

//             } catch (error) {

//                 console.error(error);

//             }

//         };

//     const filteredUsers =
//         users.filter(

//             (u) =>

//                 u._id !== user?._id &&

//                 u.name
//                     .toLowerCase()
//                     .includes(
//                         search.toLowerCase()
//                     )

//         );

//     const handleStartChat =
//         async (receiverId) => {

//             try {

//                 await sendNewMessage(
//                     receiverId,
//                     "👋 Hello!"
//                 );

//                 await fetchConversations();

//                 setSearch("");

//             } catch (error) {

//                 console.error(error);

//             }

//         };

//     return (

//         <div className="h-full overflow-y-auto">

//             {/* Search */}

//             <div className="border-b p-4">

//                 <input
//                     type="text"
//                     placeholder="🔍 Search people..."
//                     value={search}
//                     onChange={(e) =>
//                         setSearch(
//                             e.target.value
//                         )
//                     }
//                     className="w-full rounded-xl border px-4 py-3 outline-none focus:border-violet-500"
//                 />

//             </div>

//             {/* Search Results */}

//             {search && (

//                 <div className="border-b p-3">

//                     <h3 className="mb-3 text-sm font-bold text-slate-500">

//                         Search Results

//                     </h3>

//                     {filteredUsers.length === 0 && (

//                         <p className="text-sm text-slate-400">

//                             No users found

//                         </p>

//                     )}

//                     {filteredUsers.map(
//                         (person) => (

//                             <div
//                                 key={person._id}
//                                 className="mb-2 flex items-center justify-between rounded-xl p-2 hover:bg-slate-100"
//                             >

//                                 <div>

//                                     <h4 className="font-semibold">
//                                         {person.name}
//                                     </h4>

//                                     <p className="text-xs text-slate-500">
//                                         📍 {
//                                             person.locationName ||
//                                             "Unknown"
//                                         }
//                                     </p>

//                                 </div>

//                                 <button
//                                     onClick={() =>
//                                         handleStartChat(
//                                             person._id
//                                         )
//                                     }
//                                     className="rounded-lg bg-violet-600 px-3 py-2 text-sm text-white hover:bg-violet-700"
//                                 >
//                                     Message 💬
//                                 </button>

//                             </div>

//                         )
//                     )}

//                 </div>

//             )}

//             {/* Recent Chats */}

//             <div>

//                 <h3 className="p-4 text-sm font-bold text-slate-500">

//                     Recent Chats

//                 </h3>

//                 {conversations.map(

//                     (conversation) => (

//                         <ConversationItem

//                             key={
//                                 conversation._id
//                             }

//                             conversation={
//                                 conversation
//                             }

//                             currentUser={
//                                 user
//                             }

//                             onClick={() => {

//                                 setSelectedConversation(
//                                     conversation
//                                 );

//                                 fetchMessages(
//                                     conversation._id
//                                 );

//                             }}

//                         />

//                     )

//                 )}

//             </div>

//         </div>

//     );

// }

// export default ConversationList;









import { useEffect, useState } from "react";

import {
    useChatStore
} from "../../store/chat.store";

import {
    useAuthStore
} from "../../store/auth.store";

import {
    getAllUsers
} from "../../api/user.api";

import ConversationItem
from "./ConversationItem";

function ConversationList() {

    const user =
        useAuthStore(
            (state) => state.user
        );

    const conversations =
        useChatStore(
            (state) =>
                state.conversations
        );

    const fetchConversations =
        useChatStore(
            (state) =>
                state.fetchConversations
        );

    const setSelectedConversation =
        useChatStore(
            (state) =>
                state.setSelectedConversation
        );

    const fetchMessages =
        useChatStore(
            (state) =>
                state.fetchMessages
        );

    const openConversation =
        useChatStore(
            (state) =>
                state.openConversation
        );

    const [users, setUsers] =
        useState([]);

    const [search, setSearch] =
        useState("");

    useEffect(() => {

        fetchConversations();

        fetchUsers();

    }, []);

    const fetchUsers = async () => {

        try {

            const response =
                await getAllUsers();

            setUsers(
                response.data.data
            );

        } catch (error) {

            console.error(error);

        }

    };

    const filteredUsers =
        users.filter(

            (u) =>

                u._id !== user?._id &&

                u.name
                    .toLowerCase()
                    .includes(
                        search.toLowerCase()
                    )

        );

    const handleStartChat =
        async (person) => {

            await openConversation(person);

            setSearch("");

        };

    return (

        <div className="h-full overflow-y-auto">

            {/* Search */}

            <div className="border-b p-4">

                <input
                    type="text"
                    placeholder="🔍 Search people..."
                    value={search}
                    onChange={(e) =>
                        setSearch(
                            e.target.value
                        )
                    }
                    className="w-full rounded-xl border px-4 py-3 outline-none focus:border-violet-500"
                />

            </div>

            {/* Search Results */}

            {search && (

                <div className="border-b p-3">

                    <h3 className="mb-3 text-sm font-bold text-slate-500">

                        Search Results

                    </h3>

                    {filteredUsers.length === 0 && (

                        <p className="text-sm text-slate-400">

                            No users found

                        </p>

                    )}

                    {filteredUsers.map(
                        (person) => (

                            <div
                                key={person._id}
                                className="mb-2 flex items-center justify-between rounded-xl p-2 hover:bg-slate-100"
                            >

                                <div>

                                    <h4 className="font-semibold">
                                        {person.name}
                                    </h4>

                                    <p className="text-xs text-slate-500">
                                        📍 {
                                            person.locationName ||
                                            "Unknown"
                                        }
                                    </p>

                                </div>

                                <button
                                    onClick={() =>
                                        handleStartChat(
                                            person
                                        )
                                    }
                                    className="rounded-lg bg-violet-600 px-3 py-2 text-sm text-white hover:bg-violet-700"
                                >
                                    Message 💬
                                </button>

                            </div>

                        )
                    )}

                </div>

            )}

            {/* Recent Chats */}

            <div>

                <h3 className="p-4 text-sm font-bold text-slate-500">

                    Recent Chats

                </h3>

                {conversations.map(

                    (conversation) => (

                        <ConversationItem

                            key={
                                conversation._id
                            }

                            conversation={
                                conversation
                            }

                            currentUser={
                                user
                            }

                            onClick={() => {

                                setSelectedConversation(
                                    conversation
                                );

                                fetchMessages(
                                    conversation._id
                                );

                            }}

                        />

                    )

                )}

            </div>

        </div>

    );

}

export default ConversationList;