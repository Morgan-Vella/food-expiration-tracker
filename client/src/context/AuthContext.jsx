import { createContext, useState, useEffect } from "react";
import api from "../api/axios.js";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await api.get("/verify")
                setUser(res.data);
            } catch (err) {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, []);

    const login = async (email, password) => {
        const res = await api.post("/login", { email, password }, { withCredentials: true });
        setUser(res.data);
    };

    const logout = async () => {
        await api.post("/logout", {}, { withCredentials: true });
        setUser(null);
    };

    const register = async (userData) => {
        const res = await api.post("/register", userData, { withCredentials: true })
        setUser(res.data)
    }

    const search = async (query) => {
        const res = await api.get(`/search?q=${query}`);
        return res.data;
    }
    return (
        <AuthContext.Provider value={{ user, loading, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    )
}