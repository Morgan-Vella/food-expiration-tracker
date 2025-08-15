import {useState} from "react"
import axios from "axios"

const AddFood = ({addOn}) => {
    const [name, setName ] = useState("")
    const [date, setDate ] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await axios.post("http://localhost:8000/api/food", {
            name,
            expirationDate: date
        });
        addOn(res.data)
        setName("")
        setDate("")
    };

    return(
        <>
        <form onSubmit={handleSubmit}>
            <input 
                placeholder="Food Name" 
                value={name}
                onChange={e => setName(e.target.value)}
            />
            <input 
                type="date" 
                value={date}
                onChange={e => setDate(e.target.value)}    
            />
            <button type="submit">Add Food</button>
        </form>
        </>
    )
}

export default AddFood 