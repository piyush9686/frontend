import { useEffect } from "react";

import socket from "../socket/socket";
import { useAuthStore } from "../store/auth.store";

export default function useSocket() {

    const user = useAuthStore(
        (state) => state.user
    );

    useEffect(() => {

        if (!user) return;

        socket.connect();

        socket.emit(
            "join",
            user._id
        );

        return () => {

            socket.disconnect();

        };

    }, [user]);

}