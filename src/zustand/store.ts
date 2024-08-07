"use client";
import { create } from "zustand"
type Message = {
    id: string
    sendAt: string
    conversationId: string
    senderId: string
    body: string


}


interface Messages {
    conversations: null | any

    setConversation: (conversation: any) => void
}

export const useStore = create<Messages>((set) => ({
    conversations: null,
    setConversation: (conversation: any) => set((state) => ({ conversations: conversation }))
}))