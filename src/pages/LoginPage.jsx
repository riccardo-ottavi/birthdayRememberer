import { useState, useContext } from "react";
import { GlobalContext } from "../contexts/BirthdayContext";

export default function LoginPage() {
    const { saveToken } = useContext(GlobalContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    console.log("Tentativo login...", { email, password });

    try {
        const res = await fetch("http://localhost:3000/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });

        console.log("Response status:", res.status);

        const data = await res.json();
        console.log("Response data:", data);

        if (!res.ok) {
            throw new Error(data.error || "Errore login");
        }

        console.log("Login riuscito!");
        saveToken(data.token);

    } catch (err) {
        console.log("Errore login:", err.message);
        setError(err.message);
    } finally {
        setLoading(false);
    }
}

    return (
        <div style={{ maxWidth: "400px", margin: "100px auto" }}>
            <h2>Login</h2>

            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <br /><br />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <br /><br />

                <button type="submit" disabled={loading}>
                    {loading ? "Accesso..." : "Login"}
                </button>
            </form>

            {error && (
                <p style={{ color: "red" }}>{error}</p>
            )}
        </div>
    );
}