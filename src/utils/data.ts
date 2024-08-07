"use server";

import prisma from "@/PrismaConfig/prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export const sendMessage = async (receiverId: string, messageBody: string) => {
    const currUser = await getServerSession(authOptions)
    const senderMail = currUser?.user?.email
    const findUser = await prisma.user.findFirst({
        where: {
            email: senderMail as string
        }
    })
    const currUserId = findUser?.id
    let conversation = await prisma.conversation.findFirst({
        where: {
            participantIds: {
                hasEvery: [currUserId as string, receiverId]

            }
        }
    })
    if (!conversation) {
        conversation = await prisma.conversation.create({
            data: {
                participantIds: {
                    set: [currUserId as string, receiverId]
                }
            }
        })

    }

    const newMessage = await prisma.messages.create({
        data: {
            body: messageBody,
            senderId: currUserId,
            conversationId: conversation.id
        }
    })

    if (newMessage) {
        conversation = await prisma.conversation.update({
            where: {
                id: conversation.id
            },
            data: {
                messages: {
                    connect: {
                        id: newMessage.id as string
                    }
                }

            }
        })
    }


}

export const getMessages = async (receiverId: string) => {
    const currUser = await getServerSession(authOptions)
    const findUser = await prisma.user.findFirst({
        where: {
            email: currUser?.user?.email as string
        }
    })

    const conversation = await prisma.conversation.findFirst({
        where: {
            participantIds: {
                hasEvery: [receiverId, findUser?.id as string]
            }
        },
        include: {
            participants: true,
            messages: {
                include: {
                    sender: true
                },
                orderBy: {
                    sendAt: "asc"
                }
            }
        }
    })

    return conversation



}

export const getUsersForSidebar = async () => {
    const currUser = await getServerSession(authOptions)
    const allUser = await prisma.user.findMany({
        where: {
            email: {
                not: currUser?.user?.email as string
            }
        }

    })
    return allUser


}