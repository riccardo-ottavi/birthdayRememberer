import { createContext, useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext";
import { apiFetch } from "../api";

export const PeopleContext = createContext();

export function PeopleProvider({ children }) {
  const { token } = useContext(AuthContext);
  const [people, setPeople] = useState([]);

  async function fetchPeople() {
    if (!token) return;

    try {
      const res = await apiFetch("/people");

      if (!res.ok) return;

      setPeople(res.data);
    } catch (err) {
      console.log("Errore fetch people:", err);
    }
  }

  useEffect(() => {
    fetchPeople();
  }, [token]);

  function refreshPeople() {
    fetchPeople();
  }

  return (
    <PeopleContext.Provider value={{
      people,
      setPeople,
      refreshPeople
    }}>
      {children}
    </PeopleContext.Provider>
  );
}