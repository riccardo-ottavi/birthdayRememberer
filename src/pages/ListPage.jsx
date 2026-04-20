import { useContext, useState } from "react";
import { PeopleContext } from "../contexts/PeopleContext";
import Modal from "../components/Modal";
import { authHeaders, API, apiFetch } from "../api";

export default function ListPage() {
  const { people, refreshPeople } = useContext(PeopleContext);

  const [showRemove, setShowRemove] = useState(false);
  const [personToRemove, setPersonToRemove] = useState(null);

  async function handleDelete(id) {
  try {
    const data = await apiFetch(`${API}/people/${id}`, {
      method: "DELETE",
      headers: authHeaders()
    });

    if (!data) return;  

    if (data.error) {
      alert(data.error || "Errore eliminazione");
      return;
    }

    console.log(data.message, data.deletedPerson);

    await refreshPeople();
  } catch (error) {
    console.error("Errore eliminazione:", error);
  }
}

  return (
    <div className="container">
      {people?.map(person => {
        const birthDate = new Date(person.birthDate);

        return (
          <div key={person._id}>
            <p>
              {person.firstName} {person.lastName} -{" "}
              {birthDate.toLocaleDateString("it-IT")}
            </p>

            <button
              onClick={() => {
                setPersonToRemove(person);
                setShowRemove(true);
              }}
            >
              Elimina
            </button>
          </div>
        );
      })}

      <Modal
        title={"Cancella"}
        content={"Se confermi, la persona verrà rimossa dall'elenco."}
        show={showRemove}
        onClose={() => setShowRemove(false)}
        onConfirm={() => {
          if (personToRemove) {
            handleDelete(personToRemove._id);
          }
          setShowRemove(false);
        }}
      />
    </div>
  );
}