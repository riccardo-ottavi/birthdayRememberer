import { useContext, useState } from "react"
import { GlobalContext } from "../contexts/BirthdayContext";

export default function NewPersonPage(){

    const [formData, setFormData] = useState({})

    const {setPeople} = useContext(GlobalContext)

    async function handleSubmit(e) {
    e.preventDefault();

    const url = "http://localhost:3000/people";

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        });

        const data = await response.json();
        console.log("Nuova persona aggiunta:", data);
        setPeople(prev => [...prev, data]);
        setFormData({});
    } catch (error) {
        console.error("Errore durante l'invio:", error);
    }
}

    function setFieldValue(e){
        const { value, name } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    return(
        <div>
           <h1>Sono la NewPersonPage</h1>
           <form onSubmit={handleSubmit}>
            <p>Nome</p>
            <input type="text" name="firstName" onChange={setFieldValue}/>
            <p>Cognome</p>
            <input type="text" name="lastName" onChange={setFieldValue}/>
            <p>Birth Date</p>
            <input type="date" name="birthDate" onChange={setFieldValue}/> 
            <button type="submit">Invia</button>
           </form>
        </div>
        
    )
}