import { createContext, useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext";
import { API, apiFetch } from "../api";

export const PeopleContext = createContext();

export function PeopleProvider({ children }) {
  const { token } = useContext(AuthContext);
  const [people, setPeople] = useState([]);

  useEffect(() => {
  if (!token) {
    setPeople([]);
  }
}, [token]);

  async function fetchPeople() {
  if (!token) return;

  try {
    const data = await apiFetch(`${API}/people`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

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