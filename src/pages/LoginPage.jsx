import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiFetch } from "../api";
import { AuthContext } from "../contexts/AuthContext";
import toast from "react-hot-toast";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  async function handleLogin(e) {
    e.preventDefault();

    if (!form.email.trim() || !form.password.trim()) {
      toast.error("Compila tutti i campi");
      return;
    }

    try {
      const res = await apiFetch("/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      console.log("LOGIN RESPONSE:", res);

      if (!res.ok) {
        toast.error(res.data?.error || "Login fallito");
        return;
      }

      login(res.data.token);

      toast.success("Login effettuato!");

      navigate("/");

    } catch (err) {
      console.log("Errore login:", err);
      toast.error("Errore di rete");
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

      <p>
        Non hai un account? <a href="/register">Registrati</a>
      </p>
    </form>
  );
}