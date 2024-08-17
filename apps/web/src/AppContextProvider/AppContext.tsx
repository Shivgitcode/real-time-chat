'use client'

import { createContext, useContext, useState } from "react"

interface Context {
    isLoggedIn: boolean,
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
}

export const AppContext = createContext<Context | undefined>(undefined)

export function AppContextProvider({ children }: { children: React.ReactNode }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const value: Context = {
        isLoggedIn,
        setIsLoggedIn
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