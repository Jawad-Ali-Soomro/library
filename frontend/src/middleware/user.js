import { createContext, useContext } from "react";


export const UserContext = createContext();
// Custom hook to use UserContext
export const useUser = () => {
    return useContext(UserContext);
};
