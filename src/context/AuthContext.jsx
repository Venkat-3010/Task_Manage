import { createContext, useEffect, useState } from "react";
import mockAPI from "../api/mockApi";

const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if(storedUser){
            setUser(JSON.parse(storedUser));
        }
    },[])

    const register = async(email, password) =>{
        const response = await mockAPI.register(email, password);
        return response;
    }

    const login = async(email, password) => {
        const response = await mockAPI.login(email, password);
        console.log(response);
        if(response.success){
            localStorage.setItem('user', JSON.stringify(response.user));
            setUser(response.user);
        }
        return response;
    }

    const logout = () => {
        localStorage.removeItem('user');
        setUser(null); 
      };

    return(
        <AuthContext.Provider value={{user, logout, register, login }}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthProvider };