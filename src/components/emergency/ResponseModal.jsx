import { useState } from "react";

function ResponseModal({

    open,

    onClose,

    onSubmit,

    responseType,

}) {

    const [message, setMessage] = useState("");

    if (!open) return null;

    const handleSubmit = () => {

        onSubmit(message);

        setMessage("");

        onClose();

    };

    return (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">

            <div className="w-full max-w-md rounded-3xl bg-white p-8">

                <h2 className="text-2xl font-bold">

                    {responseType}

                </h2>

                <p className="mt-2 text-slate-500">

                    Add an optional message.

                </p>

                <textarea

                    rows={5}

                    value={message}

                    onChange={(e) =>

                        setMessage(e.target.value)

                    }

                    placeholder="Example: I'm 5 minutes away."

                    className="mt-6 w-full rounded-xl border p-4 outline-none focus:border-violet-500"

                />

                <div className="mt-8 flex justify-end gap-4">

                    <button

                        onClick={onClose}

                        className="rounded-xl border px-5 py-2"

                    >

                        Cancel

                    </button>

                    <button

                        onClick={handleSubmit}

                        className="rounded-xl bg-violet-600 px-6 py-2 text-white"

                    >

                        Send

                    </button>

                </div>

            </div>

        </div>

    );

}

export default ResponseModal;