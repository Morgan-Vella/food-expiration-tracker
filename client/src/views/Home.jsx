import {useState, useEffect, useContext } from "react"
import AddFood from "../components/AddFood.jsx"
import api from "../api/axios.js"
import FoodsList from "../components/FoodsList.jsx"
import { AuthContext } from "../context/AuthContext.jsx"

const Home = () => {
    const [foods,setFoods] = useState([]);
    const [expiringFoods, setExpiringFoods] = useState([]);
    const [listToRender, setListToRender] = useState("all");
    const { logout } = useContext(AuthContext);

    useEffect(() =>{ 
        api.get("/food")
            .then(res => {setFoods(res.data), console.log(res.data)})
            .catch(err => console.log(err))
    }, []);
    
    const handleShowExpiring = async () =>{ 
        try{
            const res = await api.get("/expiring-soon")
            setExpiringFoods(res.data)
            setListToRender("expiringFoods")
        } catch (err) {
            console.log(err)

        }
    };
    const handleShowAll = () =>{ 
        setListToRender("all")
    }
    const foodsToShow = listToRender === "all" ? foods : expiringFoods

    const handleAdd = (newFood) => {
        setFoods([...foods, newFood])
    }
    const handleDelete = async (id) => {
        try{
            await api.delete(`/food/${id}`)
            setFoods(prevFoods => prevFoods.filter(food=>food._id !== id))
        }catch(err) {
            console.log(err)
        }
    }

    return(
        <>
        <div>
            <h1>Food Expiration Tracker</h1>
            <div style={{marginBottom: "10px"}}>
                <button onClick={handleShowAll}>Show All Foods</button> 
                <button onClick={handleShowExpiring}>Show Expiring Soon</button>
                <button onClick={logout}>Logout</button>
            </div>
            <AddFood addOn={handleAdd}/>
            <FoodsList foods={foodsToShow} onDelete={handleDelete} />
        </div>
        </>
    )
}

export default Home