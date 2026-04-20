import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiFetch } from "../api";
import { PeopleContext } from "../contexts/PeopleContext";
import { AuthContext } from "../contexts/AuthContext";

export default function LoginPage() {
  const navigate = useNavigate();

  const {refreshPeople} = useContext(PeopleContext);
  const { login } = useContext(AuthContext);

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
    
    login(data.token);

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

      <p>
        Non hai un account? <a href="/register">Registrati</a>
      </p>

    </form>
  );
}