'use client'

import { useSession } from "next-auth/react"
import { createContext, useContext, useEffect, useState } from "react"

interface Context {
    socket: WebSocket | null | undefined,
    setIsLoggedIn?: React.Dispatch<React.SetStateAction<boolean>>
    onlineUser: null | { email: string }
}

export const AppContext = createContext<Context | undefined>(undefined)

export function AppContextProvider({ children }: { children: React.ReactNode }) {
    const [socket, setSocket] = useState<WebSocket | null>(null)
    const [onlineUser, setOnlineUser] = useState<{ email: string } | null>({ email: "" })
    const session = useSession()

    useEffect(() => {
        if (session.status === "authenticated" || session.status === "loading") {
            const newSocket = new WebSocket("ws://localhost:5000")
            newSocket.onopen = () => {
                console.log("connection established")


            }

            newSocket.onmessage = (message) => {
                console.log(typeof message.data)
                setOnlineUser(JSON.parse(message.data))

            }
            setSocket(newSocket);
            return () => newSocket.close();

        }
        else {
            if (socket) {
                socket?.close()
                setSocket(null)

            }


        }

    }, [session])

    const value: Context = {
        socket,
        onlineUser
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