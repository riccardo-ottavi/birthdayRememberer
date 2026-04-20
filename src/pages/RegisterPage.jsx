import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiFetch } from "../api";

export default function RegisterPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);

  async function handleRegister(e) {
    e.preventDefault();

    if (!form.email.trim() || !form.password.trim()) {
      alert("Tutti i campi sono obbligatori");
      return;
    }

    try {
      setLoading(true);

      const data = await apiFetch("/auth/register", {
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

      setForm({
        email: "",
        password: ""
      });

      navigate("/login");

    } catch (err) {
      console.log("Errore register:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
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
  );
}