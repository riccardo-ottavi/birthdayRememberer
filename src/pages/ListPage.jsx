import { useContext, useState } from "react";
import { PeopleContext } from "../contexts/PeopleContext";
import DeleteModal from "../components/DeleteModal";
import EditModal from "../components/EditModal";
import { authHeaders, API, apiFetch } from "../api";
import toast from "react-hot-toast";
import PersonCard from "../components/PersonCard";


export default function ListPage() {
  const { people, refreshPeople } = useContext(PeopleContext);

  const [showRemove, setShowRemove] = useState(false);
  const [personToRemove, setPersonToRemove] = useState(null);
  const [showEdit, setShowEdit] = useState(false);
  const [personToEdit, setPersonToEdit] = useState(null);

  async function handleEdit(updatedPerson) {
    const res = await apiFetch(`/people/${personToEdit._id}`, {
      method: "PUT",
      headers: authHeaders(),
      body: JSON.stringify(updatedPerson)
    });

    if (!res.ok) {
      toast.error(res.data?.error);
      return;
    }

    toast.success("Persona aggiornata!");
    await refreshPeople();
    setShowEdit(false);
  }


  async function handleDelete(id) {
    try {
      const res = await apiFetch(`/people/${id}`, {
        method: "DELETE",
      });

      if (!res) return;

      if (!res.ok) {
        toast.error(res.data?.error || "Errore eliminazione");
        return;
      }

      toast.success("Contatto eliminato");

      await refreshPeople();

    } catch (error) {
      console.error("Errore eliminazione:", error);
      toast.error("Errore di rete");
    }
  }

  return (
    <div className="container">
      {people?.map(person => {
        return (
          <PersonCard
            onEdit={() =>{
              setPersonToEdit(person);
              setShowEdit(true)
            }}
            key={person._id}
            person={person}
            onDelete={() => {
              setPersonToRemove(person);
              setShowRemove(true);
            }}
          />
        );
      })}

      <DeleteModal
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
      <EditModal
        title="Modifica persona"
        show={showEdit}
        person={personToEdit}
        onClose={() => setShowEdit(false)}
        onConfirm={handleEdit}
      />
    </div>
  );
}