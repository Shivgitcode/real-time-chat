'use client'

import { useSession } from "next-auth/react"
import { createContext, useContext, useEffect, useState } from "react"

interface Context {
    socket: WebSocket | null | undefined,
    setIsLoggedIn?: React.Dispatch<React.SetStateAction<boolean>>
}

export const AppContext = createContext<Context | undefined>(undefined)

export function AppContextProvider({ children }: { children: React.ReactNode }) {
    const [socket, setSocket] = useState<WebSocket | null>(null)
    const session = useSession()

    useEffect(() => {
        const newSocket = new WebSocket("ws://localhost:5000")
        newSocket.onopen = () => {
            console.log("connection established")

        }
        newSocket.onmessage = (message) => {
            console.log(message.data)
        }
        setSocket(newSocket);
        return () => newSocket.close();
    }, [])

    const value: Context = {
        socket
    }

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}


export default function useMyContext() {
    const context = useContext(AppContext)
    if (typeof context === "undefined") {
        throw new Error("context undefined")
    }
    return context
}