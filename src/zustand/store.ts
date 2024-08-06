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
    messages: Message[] | null
    conversations: null | any
    allMessages: (conversation: Message[]) => void

    setConversation: (conversation: any) => void
}

export const useStore = create<Messages>((set) => ({
    messages: null,
    allMessages: (message: Message[]) => set((state) => ({ messages: message })),
    conversations: null,
    setConversation: (conversation: any) => set((state) => ({ conversations: conversation }))
}))