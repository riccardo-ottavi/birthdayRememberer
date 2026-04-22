export default function PersonCard({ person, onDelete, onEdit }) {

    const birthDate = new Date(person.birthDate);

    return (
        <div className="person-card" onClick={onEdit}>
            <p>{person.firstName} {person.lastName}</p>
            <p>{birthDate.toLocaleDateString("it-IT")}</p>

            <button onClick={(e) => {
                e.stopPropagation();
                onDelete();
            }}>
                Elimina
            </button>
        </div>
    );
}