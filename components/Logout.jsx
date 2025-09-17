import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"

export default function Logout(){
    const { setIsAuthenticated, setUser } = useContext(AuthContext);
    
    async function handleLogout(){
        const res = await fetch('/api/auth',{
            method: "DELETE"
        })
        if(!res)
        {
            window.alert("Couldn't logout");
            return;
        }
        setIsAuthenticated(false);
        setUser({});
    }
    return <button className="cursor-pointer" onClick={handleLogout}>Logout</button>
}