import { useState, useContext } from "react"
import { AuthContext } from "../context/AuthContext.jsx"
import { Link, useNavigate} from "react-router-dom"

const LoginPage = () => {
    const {login} = useContext(AuthContext);
    const [email, setEmail] = useState("")
    const [password ,setPassword ] = useState("")
    const [error, setError] = useState([])
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError([])
        try{
            await login(email, password);
            navigate("/");
        } catch (err) {
            console.log(err.response.data.errors)
            setError(err.response.data.errors)
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email"/>
                {error.email && <p>{error.email}</p>}
                <input type="password" value={password} onChange={(e)=> setPassword(e.target.value)} placeholder="Enter your password"/>
                {error.password && <p>{error.password}</p>}
                <button type="submit" >Login</button>
            </form>
            <p>Don't have an account? | <Link to="/register-page">Register</Link></p>
        </div>
    )
}

export default LoginPage