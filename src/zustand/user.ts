import { create } from "zustand"


interface Users {
    id: string
    name: string
    email: string
    conversationId: string,
    image: string
}

type User = {
    users: Users[] | null
    allUsers: (user: any) => void
}

export const useUserStore = create<User>((set) => ({
    users: null,
    allUsers: (user: any) => set({ users: user })
}))