import { useContext, useEffect } from "react"
import { GlobalContext } from "../contexts/BirthdayContext"

export default function ListPage() {

    const { people } = useContext(GlobalContext)

    return (
        <>
            <h1>Sono la ListPage</h1>

            {people?.map(person => {
                const birthDate = new Date(person?.birthDate);
                return (
                    <div key={person?.id}>
                        <p>{person?.firstName} {person?.lastName} - {birthDate?.toLocaleDateString("it-IT")}</p>
                        <button>Elimina</button>
                    </div>
                )
            })}
        </>

    )
}