import { useState, useEffect } from "react"

export default function ListPage() {

    const [people, setPeople] = useState([])

    useEffect(() => {
        fetchList();
    }, [])


    async function fetchList() {
        const response = await fetch('http://localhost:3000/people')
        const data = await response.json()
        setPeople(data)
    }

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