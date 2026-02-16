import { useContext } from "react"
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
                        {person?.firstName} {person?.lastName} - {birthDate?.toLocaleDateString("it-IT")}
                    </div>
                )
            })}
        </>

    )
}