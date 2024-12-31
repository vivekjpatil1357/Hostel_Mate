import { createContext, useState, useContext } from "react";

const userContext = createContext();
export const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState({});
    return <userContext.Provider value={{ user, setUser }}>
        {children}
    </userContext.Provider>;
}

export const useUserContext = () => useContext(userContext);
