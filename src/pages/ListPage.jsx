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

            {people.map(person => (
                <div key={person?.id}>
                    <p>{person?.firstName}</p>
                    <p>{person?.lastName}</p>
                    <p>{person?.birthDate}</p>
                </div>
            ))}
        </>

    )
}