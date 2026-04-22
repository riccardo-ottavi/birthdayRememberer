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

    const email = form.email.trim();
    const password = form.password.trim();

    if (!email || !password) {
      toast.error("Inserisci email e password");
      return;
    }

    try {
      const res = await apiFetch("/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json?.() || res.data;
      console.log("STEP 2 - RESPONSE:", data);

      if (!res.ok) {
        toast.error(data.error || "Credenziali non valide");
        return;
      }

      login(data.token);
      toast.success("Login effettuato!");
      navigate("/");
      login(data.token);

      toast.success("Login effettuato!");

      navigate("/", { replace: true });

    } catch (err) {
      toast.error("Errore di rete, riprova");
    }
  }


  return (
    <div className="container">
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
    </div>
  );
}