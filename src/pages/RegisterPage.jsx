import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiFetch } from "../api";

export default function RegisterPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  async function handleRegister(e) {
    e.preventDefault();

    try {
      const data = await apiFetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      if (!data) return;

      if (data.error) {
        alert(data.error);
        return;
      }

      alert("Registrazione completata!");

      navigate("/login");
    } catch (err) {
      console.log("Errore register:", err);
    }
  }

  return (
    <form onSubmit={handleRegister}>
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

      <button>Registrati</button>
    </form>
  );
}