import React, { useContext, createContext, useState, useEffect, use } from "react";
import { IUserData } from "../interfaces/iuser-data";

const UserContext = createContext<IUserData | null>(null);

const UserContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<IUserData | null>(null);

    const url = `http://localhost:8000/user`;
    const accessToken = localStorage.getItem("accessToken")

    const fetchFunc = async () => {
        const response = await fetch(url, {
            method: "GET",
            headers: { "Authorization": `bearear ${accessToken}` },
            cache: "force-cache"
        });

        if (response.ok) {
            const data = await response.json() as IUserData;
            setUser(data)
        }
    }

    useEffect(() => {
        (async () => await fetchFunc())()
    }, [])

    return (
        <UserContext.Provider value={user}>
            {children}
        </UserContext.Provider>
    )
}

const useUserData = () => useContext(UserContext)

export { useUserData, UserContextProvider }