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

  return (
    <PeopleContext.Provider value={{
      people,
      setPeople,
      refreshPeople,
      updatePerson,
      removePerson,
      addPerson
    }}>
      {children}
    </PeopleContext.Provider>
  );
}