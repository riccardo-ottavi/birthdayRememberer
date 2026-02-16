import { createContext, useState, useEffect } from "react";

export const GlobalContext = createContext();

export function GlobalProvider({ children }) {

    const [people, setPeople] = useState([])

    useEffect(() => {
        fetchList();
    }, [])


    async function fetchList() {
        const response = await fetch('http://localhost:3000/people')
        const data = await response.json()
        setPeople(data)
    }

    return (
        <GlobalContext.Provider
            value={{
                people
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
}

