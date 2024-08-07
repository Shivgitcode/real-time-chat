"use client";
import { create } from "zustand"
import { Users } from "./user";
type Message = {
    id: string
    sendAt: string
    conversationId: string
    senderId: string
    sender: Users
    body: string


}

interface Conversation {
    id: string
    createdAt: string
    participantsId: string[]
    participants: Users[]
    messages: Message[]



}


interface Messages {
    conversations: null | Conversation

    setConversation: (conversation: Conversation) => void
}

export const useStore = create<Messages>((set) => ({
    conversations: null,
    setConversation: (conversation: Conversation) => set((state) => ({ conversations: conversation }))
}))