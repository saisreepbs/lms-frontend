import { useState } from "react";

function Login() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();
        console.log("Username:", username);
        console.log("Email:", email);
    };

    return (
        <div className="w-screen h-screen flex items-center justify-center bg-blue-200">
            <div className="bg-white p-8 rounded-3xl shadow-xl w-80">
                <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
                    Login
                </h2>
                <form onSubmit={handleLogin}>
                    <label className="block mb-1 text-sm text-gray-600">
                        Username
                    </label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter username"
                        className="w-full border border-gray-300 p-3 mb-4 rounded-lg
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <label className="block mb-1 text-sm text-gray-600">
                        Email
                    </label>
                    <input
                        type="email"  
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter email"
                        className="w-full border border-gray-300 p-3 mb-6 rounded-lg
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        type="submit"
                        className="w-full !bg-indigo-600 hover:!bg-indigo-700 !text-white py-3 rounded-lg font-semibold transition duration-200"

                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;