import { createContext, useState } from "react";

export const UserContext = createContext({})                     //this file is used to be able tp use the userinfo from any file

export function UserContextProvider({children}) {
    const [userInfo, setUserInfo] = useState({})
    return(
        //data save is id and username
        <UserContext.Provider value = {{userInfo, setUserInfo}} >  
            {children}
        </UserContext.Provider>
    )
}
