import { useContext, useState, useMemo } from "react";
import { PeopleContext } from "../contexts/PeopleContext";
import { authHeaders, API, apiFetch } from "../api";

export default function NewPersonPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    birthDate: ""
  });

  const { refreshPeople } = useContext(PeopleContext);

  const symbols = ["!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "+", "="];

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const res = await apiFetch(`/people`, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify(formData)
      });

      if (!res) return;

      if (res.error) {
        alert(res.error);
        return;
      }

      console.log("Nuova persona aggiunta:", res);

      await refreshPeople();

      setFormData({
        firstName: "",
        lastName: "",
        birthDate: ""
      });

    } catch (error) {
      console.error("Errore durante l'invio:", error);
    }
  }

  const fieldError = useMemo(() => {
    if (!formData.firstName?.trim()) return "Il nome è obbligatorio!";
    if (!formData.lastName?.trim()) return "Il cognome è obbligatorio!";
    if (!formData.birthDate) return "La data di nascita è obbligatoria";

    if (!isFieldValid(formData.firstName))
      return "Il nome contiene caratteri non validi";

    if (!isFieldValid(formData.lastName))
      return "Il cognome contiene caratteri non validi";

    if (new Date(formData.birthDate) > new Date()) {
      return "La data non può essere nel futuro";
    }

    return null;
  }, [formData]);

  function isFieldValid(field) {
    return ![...field].some((char) => symbols.includes(char));
  }

  function setFieldValue(e) {
    const { value, name } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <p>First Name</p>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={setFieldValue}
        />

        <p>Last Name</p>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={setFieldValue}
        />

        <p>Birth Date</p>
        <input
          type="date"
          name="birthDate"
          value={formData.birthDate}
          onChange={setFieldValue}
        />

        {fieldError && (
          <p style={{ color: "red" }}>{fieldError}</p>
        )}

        <button type="submit" disabled={!!fieldError}>
          Confirm
        </button>
      </form>
    </div>
  );
}