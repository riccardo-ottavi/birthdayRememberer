import { createContext, useState, useEffect } from "react";

export const GlobalContext = createContext();

export function GlobalProvider({ children }) {

    const [people, setPeople] = useState([]);
    const [token, setToken] = useState(localStorage.getItem("token"));

    useEffect(() => {
        if (token) {
            fetchList();
        }
    }, [token]);

    async function fetchList() {
        try {
            const response = await fetch("http://localhost:3000/people", {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });

            const data = await response.json();
            setPeople(data);
        } catch (err) {
            console.log("Errore fetch list:", err);
        }
    }

    function saveToken(newToken) {
        setToken(newToken);
        localStorage.setItem("token", newToken);
    }

    function logout() {
        setToken(null);
        localStorage.removeItem("token");
        setPeople([]);
    }

    return (
        <GlobalContext.Provider value={{
            people,
            setPeople,
            token,
            saveToken,
            logout,
            fetchList
        }}>
            {children}
        </GlobalContext.Provider>
    );
}