import { useState } from "react"

export default function NewPersonPage(){

    const [formData, setFormData] = useState([{}])

    function handleSubmit(e){
        e.preventDefault()
        console.log("Form inviato", formData)
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