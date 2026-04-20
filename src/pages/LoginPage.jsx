import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiFetch } from "../api";

export default function LoginPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  async function handleLogin(e) {
  e.preventDefault();

  try {
    const data = await apiFetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    });

    console.log("LOGIN RESPONSE:", data);

    if (data.error) {
      alert(data.error);
      return;
    }

    localStorage.setItem("token", data.token);

    navigate("/");
  } catch (err) {
    console.log("Errore login:", err);
  }
}

  return (
    <form onSubmit={handleLogin}>
      <input
        placeholder="email"
        onChange={(e) =>
          setForm({ ...form, email: e.target.value })
        }
      />

      <input
        type="password"
        placeholder="password"
        onChange={(e) =>
          setForm({ ...form, password: e.target.value })
        }
      />

      <button>Login</button>
    </form>
  );
}