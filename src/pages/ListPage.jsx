import { useContext, useState } from "react";
import { PeopleContext } from "../contexts/PeopleContext";
import DeleteModal from "../components/DeleteModal";
import EditModal from "../components/EditModal";
import toast from "react-hot-toast";
import PersonCard from "../components/PersonCard";
import { authHeaders } from "../api";

export default function ListPage() {
  const { people, deletePerson, editPerson } = useContext(PeopleContext);

  const [showRemove, setShowRemove] = useState(false);
  const [personToRemove, setPersonToRemove] = useState(null);
  const [showEdit, setShowEdit] = useState(false);
  const [personToEdit, setPersonToEdit] = useState(null);

  async function handleEdit(updatedData) {
    if (!personToEdit) return;

    const success = await editPerson(personToEdit._id, updatedData);

    if (success) {
      toast.success("Persona aggiornata!");
      setShowEdit(false);
    } else {
      toast.error("Errore aggiornamento");
    }
  }

  async function handleDelete() {
    if (!personToRemove) return;

    const success = await deletePerson(personToRemove._id);

    if (success) {
      toast.success("Persona eliminata!");
    } else {
      toast.error("Errore eliminazione");
    }

    setShowRemove(false);
  }

  return (
    <div className="container">
      {people?.map(person => (
        <PersonCard
          key={person._id}
          person={person}
          onEdit={() => {
            setPersonToEdit(person);
            setShowEdit(true);
          }}
          onDelete={() => {
            setPersonToRemove(person);
            setShowRemove(true);
          }}
        />
      ))}

      <DeleteModal
        title="Cancella"
        content="Se confermi, la persona verrà rimossa dall'elenco."
        show={showRemove}
        onClose={() => setShowRemove(false)}
        onConfirm={handleDelete}
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