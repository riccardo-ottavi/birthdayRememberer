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
        alert("Inserimento riuscito!")
    } catch (error) {
        console.error("Errore durante l'invio:", error);
    }
}

    function setFieldValue(e){
        const { value, name } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    return(
        <div className="container">
           <form onSubmit={handleSubmit}>
            <p>First Name</p>
            <input type="text" name="firstName" onChange={setFieldValue}/>
            <p>Last Name</p>
            <input type="text" name="lastName" onChange={setFieldValue}/>
            <p>Birth Date</p>
            <input type="date" name="birthDate" onChange={setFieldValue}/> 
            <button type="submit">Confirm</button>
           </form>
        </div>
        
    )
}