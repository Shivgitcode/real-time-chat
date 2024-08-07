import { create } from "zustand"


export interface Users {
    id: string
    name: string
    email: string
    conversationId: string,
    image: string
}

type User = {
    users: Users[] | null,
    myUsers: Users[] | null
    allUsers: (user: any) => void
    handleUsers: (user: any, value: string) => void
}

export const useUserStore = create<User>((set) => ({
    users: null,
    myUsers: null,
    allUsers: (user: Users[]) => set({ users: user }),
    handleUsers: (user: Users[], value: string) => set({ myUsers: user.filter(el => { el.name.includes(value) }) })
}))