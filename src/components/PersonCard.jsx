export default function PersonCard({ person, onDelete }) {

    const birthDate = new Date(person.birthDate);

    return (
        <div className="person-card">
            <p>{person.firstName} {person.lastName}</p>
            <p>{birthDate.toLocaleDateString("it-IT")}</p>

            <button onClick={onDelete}>
                Elimina
            </button>
        </div>
    );
}