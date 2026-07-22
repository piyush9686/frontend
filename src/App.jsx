import { useEffect } from "react";

import AppRoutes from "./routes/AppRoutes";

import { useAuthStore }
from "./store/auth.store";

import useSocket from "./hooks/useSocket";

function App() {

  const fetchCurrentUser =
    useAuthStore(
      (state) => state.fetchCurrentUser
    );

  useEffect(() => {

    fetchCurrentUser();

  }, []);
  
  useSocket();
  return <AppRoutes />;

}

export default App;