import { useContext, useState } from "react";
import { GlobalContext } from "../contexts/BirthdayContext";
import Modal from "../components/Modal";

export default function ListPage() {

    const { people, setPeople } = useContext(GlobalContext);
    const [showRemove, setShowRemove] = useState(false);
    const [personToRemove, setPersonToRemove] = useState(null);

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
        <div className="container">
            {people?.map(person => {
                const birthDate = new Date(person.birthDate);
                return (
                    <div key={person.id}>
                        <p>{person.firstName} {person.lastName} - {birthDate.toLocaleDateString("it-IT")}</p>
                        <button onClick={() => {
                            setPersonToRemove(person);
                            setShowRemove(true);
                        }}>Elimina</button>
                    </div>
                )
            })}

            <Modal
                title={"Cancella"}
                content={"Se confermi, la persona verrà rimossa dall'elenco."}
                show={showRemove}
                onClose={() => setShowRemove(false)}
                onConfirm={() => {
                    if (personToRemove) handleDelete(personToRemove.id);
                    setShowRemove(false);
                }}
            />
        </div>
    )
}
