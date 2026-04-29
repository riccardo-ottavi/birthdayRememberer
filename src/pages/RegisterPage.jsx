import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiFetch } from "../api";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);

  async function handleRegister(e) {
  e.preventDefault();

  const email = form.email.trim();
  const password = form.password.trim();

  if (!email || !password) {
    toast.error("Compila tutti i campi");
    return;
  }

  if (password.length < 6) {
    toast.error("La password deve avere almeno 6 caratteri");
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    toast.error("Email non valida");
    return;
  }

  try {
    setLoading(true);

    const res = await apiFetch("/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    if (!res.ok) {
      toast.error(res.data?.error || "Errore registrazione");
      return;
    }

    toast.success("Registrazione completata!");
    setForm({ email: "", password: "" });
    navigate("/login");

  } catch (err) {
    toast.error("Errore di rete");
  } finally {
    setLoading(false);
  }
}

  return (
    <div className="container">
      <form onSubmit={handleRegister}>
        <input
          placeholder="email"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="password"
          value={form.password}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <button disabled={loading}>
          {loading ? "Registrazione..." : "Registrati"}
        </button>
      </form>
    </div>
  );
}