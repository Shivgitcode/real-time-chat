'use client'

import { useSession } from "next-auth/react"
import { createContext, useContext, useEffect, useState } from "react"

interface Context {
    socket: WebSocket | null | undefined,
    setIsLoggedIn?: React.Dispatch<React.SetStateAction<boolean>>
    onlineUser: null | string[]
}

export const AppContext = createContext<Context | undefined>(undefined)

export function AppContextProvider({ children }: { children: React.ReactNode }) {
    const [socket, setSocket] = useState<WebSocket | null>(null)
    const [onlineUser, setOnlineUser] = useState<string[] | null>(null)
    const data: string[] = []
    const session = useSession()

    useEffect(() => {
        if (session.status === "authenticated") {
            const newSocket = new WebSocket("ws://localhost:5000")
            newSocket.onopen = () => {
                console.log("connection established")
                data.push(session.data.user?.email as string)

                newSocket.send(Buffer.from(data.toString()))




            }

            newSocket.onmessage = (message) => {
                const userData = message.data
                setOnlineUser(userData.split(","))
                console.log(onlineUser)

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

    }, [session.status])


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