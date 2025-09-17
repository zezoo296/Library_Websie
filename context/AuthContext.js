'use client'
import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext({
    isAuthenticated: false,
    setIsAuthenticated: () => { },
    favourites: [],
    setFavourites: () => { },
    user: {},
    setUser: () => {}
});

const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [favourites, setFavourites] = useState([]);
    const [user, setUser] = useState({});

    useEffect(() => {
        
        if(!isAuthenticated)
            return;

        async function fetchFavourites() {
            const res = await fetch(`/api/library?shelfId=0`);

            if (res.ok) {
                const data = await res.json();
                setFavourites(data.map(book => book.id)); // store only IDs
            }
        }

        fetchFavourites();
    }, [isAuthenticated]);

    const ctxValue = {
        isAuthenticated,
        setIsAuthenticated,
        favourites,
        setFavourites,
        user,
        setUser
    }

    return (
        <AuthContext.Provider value={ctxValue}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
