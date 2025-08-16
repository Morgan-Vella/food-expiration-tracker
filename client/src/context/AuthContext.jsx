import { createContext, useState, useEffect } from "react";
import api from "../api/axios.js";

export const AuthContext = createContext();

export const AuthProvider  = ({ children }) => {
    const [user, setUser ] = useState(null); 
    const [loading, setLoading ] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try{
                const res = await api.get("/verify")
                setUser(res.data);
            } catch(err) {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    },[]);

    const login = async (email, password) => {
        const res = await api.post("/login", {email, password});
        setUser(req.data.user);
    };

    const logout = async () => {
        await api.post("/logout");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}