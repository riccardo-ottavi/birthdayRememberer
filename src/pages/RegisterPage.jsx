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

    if (!form.email.trim() || !form.password.trim()) {
      toast.error("Tutti i campi sono obbligatori");
      return;
    }

    try {
      setLoading(true);

      const data = await apiFetch("/auth/register", {
        method: "POST",
        body: JSON.stringify(form)
      });

      if (!data) return;

      if (data.error) {
        toast.error(data.error);
        return;
      }

      toast.success("Registrazione completata!");

      setForm({
        email: "",
        password: ""
      });

      navigate("/login");

    } catch (err) {
      console.log("Errore register:", err);
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