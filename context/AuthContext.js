'use client'
import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext({
    isAuthenticated: false,
    setIsAuthenticated: () => { },
    token: '',
    setToken: () => { },
    favourites: [],
    setFavourites: () => { }
});

const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [token, setToken] = useState('');
    const [favourites, setFavourites] = useState([]);

    useEffect(() => {
        if (!token) return;
        async function fetchFavourites() {
            const res = await fetch(`/api/library?shelfId=0`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (res.ok) {
                const data = await res.json();
                setFavourites(data.map(book => book.id)); // store only IDs
            }
        }

        fetchFavourites();
    }, [token]);

    const ctxValue = {
        isAuthenticated,
        setIsAuthenticated,
        token,
        setToken,
        favourites,
        setFavourites
    }

    return (
        <AuthContext.Provider value={ctxValue}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
