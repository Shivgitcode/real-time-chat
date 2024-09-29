"use client";
import { create } from "zustand"
import { Users } from "./user";
export type Message = {
    id: string
    sendAt: string
    conversationId: string
    senderId: string
    sender: Users
    body: string


}

export interface Conversation {
    id: string
    createdAt: string
    participantsId: string[]
    participants: Users[]
    messages: Message[]



}


export interface Store {
    conversations: null | Conversation
    receiverId: string,
    setReceiverId: (id: string) => void
    setConversation: (conversation: Conversation) => void
}

export const useStore = create<Store>((set) => ({
    conversations: null,
    receiverId: "",
    setConversation: (conversation: Conversation) => set((state) => ({ conversations: conversation })),
    setReceiverId: (id: string) => set(({ receiverId: id }))
}))