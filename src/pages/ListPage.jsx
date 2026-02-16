import { useContext, useEffect } from "react"
import { GlobalContext } from "../contexts/BirthdayContext"

export default function ListPage() {

    const { people, setPeople } = useContext(GlobalContext)

    async function handleDelete(id) {
    try {
        const response = await fetch(`http://localhost:3000/people/${id}`, {
            method: "DELETE",
        });
        const data = await response.json();
        console.log(data.message, data.deletedPerson);

        setPeople(prev => prev.filter(p => p.id !== id));

    } catch (error) {
        console.error("Errore eliminazione:", error);
    }
}



    return (
        <>
            <h1>Sono la ListPage</h1>

            {people?.map(person => {
                const birthDate = new Date(person?.birthDate);
                return (
                    <div key={person?.id}>
                        <p>{person?.firstName} {person?.lastName} - {birthDate?.toLocaleDateString("it-IT")}</p>
                        <button onClick={() => handleDelete(person.id)}>Elimina</button>
                    </div>
                )
            })}
        </>

    )
}