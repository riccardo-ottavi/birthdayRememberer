import ReactDOM from "react-dom";
import { useState, useEffect } from "react";
import { authHeaders } from "../api";

export default function EditModal({
  title,
  show,
  onClose,
  onConfirm,
  person
}) {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    birthDate: ""
  });

  useEffect(() => {
    if (person) {
      setForm({
        firstName: person.firstName || "",
        lastName: person.lastName || "",
        birthDate: person.birthDate?.slice(0, 10) || ""
      });
    }
  }, [person]);

  function handleChange(e) {
    const { name, value } = e.target;

    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  }

  function handleSubmit() {
    onConfirm(form);
  }

  return show && ReactDOM.createPortal(
    <div className="container-modal">
      <div className="modal">
        <h2>{title}</h2>

        <input
          name="firstName"
          value={form.firstName}
          onChange={handleChange}
          placeholder="Nome"
        />

        <input
          name="lastName"
          value={form.lastName}
          onChange={handleChange}
          placeholder="Cognome"
        />

        <input
          type="date"
          name="birthDate"
          value={form.birthDate}
          onChange={handleChange}
        />

        <div style={{ display: "flex", gap: "10px" }}>
          <button onClick={onClose}>Annulla</button>
          <button onClick={handleSubmit}>Salva</button>
        </div>
      </div>
    </div>,
    document.body
  );
}