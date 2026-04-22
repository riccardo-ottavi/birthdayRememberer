import { useContext, useState } from "react";
import { PeopleContext } from "../contexts/PeopleContext";
import DeleteModal from "../components/DeleteModal";
import EditModal from "../components/EditModal";
import { authHeaders, API, apiFetch } from "../api";
import toast from "react-hot-toast";
import PersonCard from "../components/PersonCard";


export default function ListPage() {
  const { people, refreshPeople, removePerson, updatePerson } = useContext(PeopleContext);

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

  if (!res.ok) return;

  updatePerson(res.data); 
  setShowEdit(false);
  toast.success("Persona Aggiornata!");
}


  async function handleDelete(id) {
  const res = await apiFetch(`/people/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) return;
  toast.success("Persona Eliminata!");
  removePerson(id);  
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