import { useState, useContext } from "react"
import { AuthContext } from "../context/AuthContext.jsx"
import { Link, useNavigate} from "react-router-dom"

const RegisterPage = () => {
    
    const { register } = useContext(AuthContext);
    const [userData, setUserData ] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "" 
    });
    const [error, setError] = useState([]);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError([])
        try{ 
            await register(userData);
            navigate("/");
        } catch (err) {
            setError(err.response.data.errors)
        }
    }
    const handleUserData = {
        fName: e => setUserData({...userData, "firstName": e.target.value}),
        lName: e => setUserData({...userData, "lastName": e.target.value}),
        email: e => setUserData({...userData, "email": e.target.value}),
        password: e => setUserData({...userData, "password": e.target.value}),
        confirmPassword: e => setUserData({...userData, "confirmPassword": e.target.value})
    }



    return(
        <div>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" value={userData.firstName} placeholder="First Name" onChange={handleUserData.fName}/> 
                {error.firstName && <p>{error.firstName.message}</p>}
                <input type="text" value={userData.lastName} placeholder="Last Name" onChange={handleUserData.lName}/>
                {error.lastName && <p>{error.lastName.message}</p>}
                <input type="email" value={userData.email} placeholder="Email" onChange={handleUserData.email}/> 
                {error.email && <p>{error.email.message}</p>}
                <input type="password" value={userData.password} placeholder="Password" onChange={handleUserData.password}/>
                {error.password && <p>{error.password.message}</p>} 
                <input type="password" value={userData.confirmPassword} placeholder="Confirm Password" onChange={handleUserData.confirmPassword}/>
                <button type="submit">Register</button>
                {error.confirmPassword && <p>{error.confirmPassword.message}</p>}
            </form>
            <p>Already have an account | <Link to="/login-page">Login</Link></p>
        </div>
    )
}

export default RegisterPage;