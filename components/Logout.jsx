import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"

export default function Logout(){
    const { setIsAuthenticated, setToken } = useContext(AuthContext);
    
    function handleLogout(){
        setIsAuthenticated(false);
        setToken(null);
    }
    return <button className="cursor-pointer" onClick={handleLogout}>Logout</button>
}