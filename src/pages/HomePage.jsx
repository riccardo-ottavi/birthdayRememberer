import { useState, useEffect, useContext } from "react";
import { GlobalContext } from "../contexts/BirthdayContext";

export default function HomePage() {

    const [now, setNow] = useState(new Date());
    const { people } = useContext(GlobalContext)
    const [birthdayPerson, setBirthdayPerson] = useState([])

    useEffect(() => {
        const interval = setInterval(() => {
            setNow(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const today = new Date();
        const birthdaysToday  = people.filter(p => {
            const bday = new Date(p.birthDate);
            return(
                bday.getDate() === today.getDate() &&
                bday.getMonth() === today.getMonth()
            );
        });

        setBirthdayPerson(birthdaysToday)
        console.log(birthdaysToday)
    }, [now, people]);

    return (
        <>
            <h1>Sono la homepage</h1>
            <h2>
                {now.toLocaleDateString("it-IT")} -{" "}
                {now.toLocaleTimeString("it-IT")}
            </h2>
            <h3>Today's birthdays: </h3>
            {birthdayPerson.length > 0 ? (
                birthdayPerson.map(p => (
                    <div key={p.id}>
                        <p>{p.firstName} {p.lastName}</p>
                    </div>
                ))
            ) : (
                <p>No birthdays today!</p>
            )}
        </>
    );
}