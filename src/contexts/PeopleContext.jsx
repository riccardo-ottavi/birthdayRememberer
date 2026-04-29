import { createContext, useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext";
import { apiFetch } from "../api";

export const PeopleContext = createContext();

export function PeopleProvider({ children }) {
  const { token } = useContext(AuthContext);
  const [people, setPeople] = useState([]);

  useEffect(() => {
    if (!token) return;

    const fetchPeople = async () => {
      try {
        const res = await apiFetch("/people");

        if (!res.ok) return;

        setPeople(res.data);
      } catch (err) {
        console.log("Errore fetch people:", err);
      }
    };

    fetchPeople();
  }, [token]);

  async function refreshPeople() {
    try {
      const res = await apiFetch("/people");

      if (!res.ok) return;

      setPeople(res.data);
    } catch (err) {
      console.log("Errore refresh people:", err);
    }
  }

  function updatePerson(updatedPerson) {
    setPeople(prev =>
      prev.map(p =>
        p._id === updatedPerson._id ? updatedPerson : p
      )
    );
  }

  function removePerson(id) {
    setPeople(prev =>
      prev.filter(p => p._id !== id)
    );
  }

  function addPerson(newPerson) {
    setPeople(prev => [newPerson, ...prev]);
  }

  async function deletePerson(id) {
  const res = await apiFetch(`/people/${id}`, { method: "DELETE" });
  if (!res.ok) return false;

  setPeople(prev => prev.filter(p => p._id !== id));
  return true;
}

async function editPerson(id, updatedData) {
  const res = await apiFetch(`/people/${id}`, {
    method: "PUT",
    body: JSON.stringify(updatedData)
  });

  if (!res.ok) return false;

  setPeople(prev =>
    prev.map(p => (p._id === id ? res.data : p))
  );

  return true;
}

async function createPerson(newPerson) {
  try {
    const res = await apiFetch("/people", {
      method: "POST",
      body: JSON.stringify(newPerson)
    });

    if (!res.ok) {
      return { success: false, error: res.data?.error };
    }

    addPerson(res.data);

    return { success: true };

  } catch (err) {
    console.log("Errore create person:", err);
    return { success: false, error: "Errore di rete" };
  }
}

  return (
    <PeopleContext.Provider value={{
      people,
      setPeople,
      refreshPeople,
      updatePerson,
      deletePerson,
      addPerson,
      createPerson,
      editPerson
    }}>
      {children}
    </PeopleContext.Provider>
  );
}