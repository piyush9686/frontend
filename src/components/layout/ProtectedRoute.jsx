import { Navigate } from "react-router-dom";
import { useAuthStore } from "../../store/auth.store";

function ProtectedRoute({ children }) {

    const isAuthenticated =
        useAuthStore(
            (state) => state.isAuthenticated
        );

    const isCheckingAuth =
        useAuthStore(
            (state) => state.isCheckingAuth
        );

    if (isCheckingAuth) {

        return (
            <div className="flex h-screen items-center justify-center">
                Loading...
            </div>
        );

    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return children;
}

export default ProtectedRoute;