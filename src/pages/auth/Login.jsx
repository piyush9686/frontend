import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import AppLayout from "../../components/layout/AppLayout";
import { useAuthStore } from "../../store/auth.store";

function Login() {
    const navigate = useNavigate();

    const login = useAuthStore(
        (state) => state.login
    );

    const isLoading = useAuthStore(
        (state) => state.isLoading
    );

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await login({
                email,
                password,
            });

            toast.success(
                "Login successful 🚀"
            );

            navigate("/");

        } catch (error) {

            toast.error(

                error.response?.data?.message ||

                "Login failed"

            );

        }

    };

    return (

        <AppLayout>

            <div className="flex items-center justify-center py-20">

                <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">

                    <h1 className="mb-2 text-3xl font-bold">
                        Welcome Back 👋
                    </h1>

                    <p className="mb-8 text-slate-500">
                        Login to your LocalConnect account.
                    </p>

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-4"
                    >

                        <input
                            type="email"
                            placeholder="Email"
                            className="w-full rounded-lg border px-4 py-3"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                            required
                        />

                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full rounded-lg border px-4 py-3"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                            required
                        />

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full rounded-lg bg-violet-600 py-3 font-semibold text-white transition hover:bg-violet-700 disabled:opacity-50"
                        >
                            {isLoading
                                ? "Logging in..."
                                : "Login"}
                        </button>

                    </form>

                    <p className="mt-6 text-center text-slate-600">

                        Don't have an account?{" "}

                        <Link
                            to="/register"
                            className="font-semibold text-violet-600 hover:underline"
                        >
                            Register
                        </Link>

                    </p>

                </div>

            </div>

        </AppLayout>

    );
}

export default Login;