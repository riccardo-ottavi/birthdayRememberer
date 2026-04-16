import { createContext, useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext";
import { API } from "../api";

export const PeopleContext = createContext();

export function PeopleProvider({ children }) {
  const { token } = useContext(AuthContext);
  const [people, setPeople] = useState([]);

  async function fetchPeople() {
    if (!token) return;

    try {
      const res = await fetch(`${API}/people`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const data = await res.json();
      setPeople(data);
    } catch (err) {
      console.log("Errore fetch people:", err);
    }
  }

  useEffect(() => {
    fetchPeople();
  }, [token]);

  async function refreshPeople() {
    await fetchPeople();
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