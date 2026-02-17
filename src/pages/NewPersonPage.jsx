import { useContext, useState, useMemo } from "react"
import { GlobalContext } from "../contexts/BirthdayContext";

export default function NewPersonPage(){

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        birthDate: ""
    });

    const symbols = ["!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "+", "="];

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

    const fieldError = useMemo(() => {

        if (formData?.firstName?.trim().length === 0) {
            return "Il nome è obbligatorio!";
        }

        if (formData?.lastName?.trim().length === 0) {
            return "Il cognome è obbligatorio!";
        }

        if (!isFieldValid(formData?.firstName)) {
            return "Il nome contiene caratteri non validi";
        }

        if (!isFieldValid(formData?.lastName)) {
            return "Il cognome contiene caratteri non validi";
        }

        if (!formData?.birthDate) {
            return "La data di nascita è obbligatoria";
        }

        const today = new Date();
        const selectedDate = new Date(formData?.birthDate);

        if (selectedDate > today) {
            return "La data non può essere nel futuro";
        }

        return null;

    }, [formData]);

    function isFieldValid(field) {
        if(field){
            console.log(typeof field, field)
        if([...field].some((char) => symbols.includes(char))) return false
        }
        
        
        return true
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
            {fieldError && (
                    <p style={{ color: "red", marginTop: "10px" }}>
                        {fieldError}
                    </p>
                )}
            <button type="submit">Confirm</button>
           </form>
        </div>
        
    )
}