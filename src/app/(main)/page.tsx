"use client";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { Badge } from "@/components/ui/badge";
import { messages } from "@/utils/util";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LogOut, SendIcon, Search } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FormEvent, useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { getMessages, getUsersForSidebar, sendMessage } from "@/utils/data";
import { Users, useUserStore } from "@/zustand/user";
import { useStore } from "@/zustand/store";
import { CommandDemo } from "@/components/CommandInput";

export default function Home() {
    const session = useSession()
    const router = useRouter()
    const { users, allUsers, } = useUserStore()
    const { conversations, setConversation } = useStore()
    const [myUsers, setMyUsers] = useState<Users[] | []>([])

    const handleLogout = () => {
        signOut()
        router.push("/login")
    }



    useEffect(() => {
        if (session.status === "unauthenticated") {
            return router.push("/login")
        }
        const fetchUsers = async () => {
            const data = await getUsersForSidebar()
            console.log(data)
            allUsers(data)
            setMyUsers(data)

        }
        fetchUsers()



    }, [])

    const selectConversation = async (id: string) => {
        const data = await getMessages(id)
        setConversation(data)



    }

    const handleAllUsers = (e: FormEvent) => {
        const input = e.target as HTMLInputElement
        setMyUsers(
            users.filter((el) => {
                if (el.name.toLowerCase().includes(input.value.toLowerCase())) {
                    return el
                }
            })
        )
        console.log(myUsers)
    }






    return (
        <div className=" flex flex-col items-center w-full">


            <div className="w-full mt-[200px] flex flex-row  justify-center  ">
                <Card className="flex flex-col items-start p-4 min-h-full justify-start relative">
                    <div className="flex items-center gap-4">
                        <Search />
                        <Input type="text" placeholder="search" onChange={handleAllUsers} />
                    </div>
                    <div className="flex mt-5 flex-col items-start gap-3">
                        {myUsers?.map((el) => (
                            <div className={`flex items-center gap-3 w-full cursor-pointer`} key={el.id} onClick={() => selectConversation(el.id)}>
                                <Avatar>
                                    <AvatarImage src={`${el.image}`}></AvatarImage>
                                    <AvatarFallback>DM</AvatarFallback>
                                </Avatar>
                                <span>{el.name.split(" ")[0].toLowerCase()}</span>
                            </div>
                        ))}
                    </div>

                    <div className=" absolute bottom-5">
                        <Button variant={"outline"} onClick={handleLogout}>
                            <LogOut></LogOut>
                        </Button>
                    </div>


                </Card>


                <Card className="w-full">


                    <CardHeader className="flex flex-row items-center gap-[30px] ">
                        <div className="relative w-[70px] h-[70px] ">
                            <Image src={session.data?.user?.image as string} alt="hello" fill className="rounded-full"></Image>
                        </div>
                        <div className="flex flex-col gap-[10px]">
                            <CardTitle>{session.data?.user?.name?.split(" ")[0]}</CardTitle>
                            <p className="text-xl text-muted-foreground">@{session.data?.user?.email?.slice(0, 5)}</p>
                        </div>


                    </CardHeader>
                    <CardContent className="w-full flex flex-col items-start gap-5">
                        {
                            conversations?.messages! ? conversations?.messages.map((conversation) => {
                                return <div className={`${conversation.sender.email === session.data?.user?.email ? " self-end flex-row-reverse" : "text-left"}  text-lg text-semibold flex gap-3 `}>
                                    <Avatar>
                                        <AvatarImage src={`/${conversation.sender.image}`}></AvatarImage>
                                        <AvatarFallback>DM</AvatarFallback>
                                    </Avatar>
                                    <Badge key={conversation.sender.id} variant={"secondary"} className={`${conversation.sender.email === session.data?.user?.email ? " self-end" : "text-left"}  text-lg text-semibold`}>{message.message}</Badge>
                                </div>
                            }) : <p className="flex justify-center items-center p-32 text-center w-full">Welcome to chat buddies {session.data?.user?.name}</p>
                        }


                    </CardContent>

                    <CardFooter className="gap-5">
                        <Input type="text" placeholder="Message"></Input>
                        <Button size={"icon"} variant="secondary">
                            <SendIcon className="h-4 w-4" ></SendIcon>
                        </Button>

                    </CardFooter>


                </Card>


            </div>


        </div>
    )
}
