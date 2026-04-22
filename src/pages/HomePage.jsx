import { useState, useEffect, useContext } from "react";
import { API, authHeaders, apiFetch } from "../api";
import { PeopleContext } from "../contexts/PeopleContext";

export default function HomePage() {
  const [now, setNow] = useState(new Date());
  const [birthdayPerson, setBirthdayPerson] = useState([]);
  const { people } = useContext(PeopleContext)


  function getAgeToday(birthDate) {
  const today = new Date();
  const bday = new Date(birthDate);

  return today.getFullYear() - bday.getFullYear();
}

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);


  useEffect(() => {
    const today = new Date();

    const birthdaysToday = people.filter(p => {
      const bday = new Date(p.birthDate);

      return (
        bday.getDate() === today.getDate() &&
        bday.getMonth() === today.getMonth()
      );
    });

    setBirthdayPerson(birthdaysToday);
  }, [people, now]);

  return (
    <div className="container">
      <h2>
        {now.toLocaleDateString("it-IT")} -{" "}
        {now.toLocaleTimeString("it-IT")}
      </h2>
      
      {birthdayPerson.length > 0 ? (
        <>
          <img src="../img/birthday-celebrate.png" alt="Buon compleanno" style={{ width: "150px" }} />

          {birthdayPerson.map(p => (
            <div key={p._id}>
              <p>{p.firstName}{p.lastName} compie {getAgeToday(p.birthDate)} anni</p>
            </div>
          ))}
        </>
      ) : (
        <img src="../img/no-birthdays.png" style={{ width: "450px" }}/>
      )}
    </div>
  );
}