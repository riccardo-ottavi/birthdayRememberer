import { useState, useEffect, useContext } from "react";
import { GlobalContext } from "../contexts/BirthdayContext";

export default function HomePage() {

    const [now, setNow] = useState(new Date());
    const { people } = useContext(GlobalContext)
    const [birthdayPerson, setBirthdayPerson] = useState(null)

    useEffect(() => {
        const interval = setInterval(() => {
            setNow(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const today = new Date();
        const isAbirthdayPerson = people.find(p => {
            const bday = new Date(p.birthDate);
            return (
                bday.getDate() === today.getDate() &&
                bday.getMonth() === today.getMonth()
            );

        });
        setBirthdayPerson(isAbirthdayPerson)
        console.log(birthdayPerson)
    }, [now, people]);

    return (
        <>
            <h1>Sono la homepage</h1>
            <h2>
                {now.toLocaleDateString("it-IT")} -{" "}
                {now.toLocaleTimeString("it-IT")}
            </h2>
            {birthdayPerson && (
                <div>
                    <h3>Compleanni di oggi: </h3>
                    <p>{birthdayPerson.firstName} {birthdayPerson.lastName}</p>
                </div>
            )
            }
        </>
    );
}