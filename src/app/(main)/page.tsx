"use client";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Command,
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
} from "@/components/ui/command"

import { Badge } from "@/components/ui/badge";
import { messages } from "@/utils/util";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LogOut, SendIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { getMessages, getUsersForSidebar, sendMessage } from "@/utils/data";
import { useUserStore } from "@/zustand/user";
import { useStore } from "@/zustand/store";

export default function Home() {
    const session = useSession()
    const router = useRouter()
    const { users, allUsers, } = useUserStore()
    const { conversations, setConversation } = useStore()

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

        }
        fetchUsers()



    }, [])

    const selectConversation = (id: string) => {
        console.log(id)

    }






    return (
        <div className=" flex flex-col items-center w-full">


            <Card className="w-full mt-[200px] flex flex-row justify-center items-start ">
                <Card className="w-[30%] flex flex-col justify-between items-start">
                    <Command className=" min-h-[286px]" >
                        <CommandInput placeholder="search"></CommandInput>
                        <CommandList>
                            <CommandEmpty>No result Found</CommandEmpty>
                            <CommandGroup heading="users">
                                {users?.map((el) => {
                                    return (
                                        <CommandItem key={el.id} onClick={() => selectConversation(el.id)} className="relative z-10">
                                            <Avatar className="mr-3">
                                                <AvatarImage src={`${el.image}`}></AvatarImage>
                                                <AvatarFallback>DM</AvatarFallback>
                                            </Avatar>
                                            <span>{el.name?.split(" ")[0].toLowerCase()}</span>
                                        </CommandItem>

                                    )
                                })}


                            </CommandGroup>

                        </CommandList>

                    </Command>

                    <Button variant={"outline"} className="mt-[100px]" onClick={handleLogout}>
                        <LogOut></LogOut>
                    </Button>
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
                        {messages.map((message) => {
                            return <div className={`${message.email === "random@gmail.com" ? " self-end flex-row-reverse" : "text-left"}  text-lg text-semibold flex gap-3 `}>
                                <Avatar>
                                    <AvatarImage src={`/${message.img}`}></AvatarImage>
                                    <AvatarFallback>DM</AvatarFallback>
                                </Avatar>
                                <Badge key={message.id} variant={"secondary"} className={`${message.email === "random@gmail.com" ? " self-end" : "text-left"}  text-lg text-semibold`}>{message.message}</Badge>
                            </div>
                        })}

                    </CardContent>

                    <CardFooter className="gap-5">
                        <Input type="text" placeholder="Message"></Input>
                        <Button size={"icon"} variant="secondary">
                            <SendIcon className="h-4 w-4" ></SendIcon>
                        </Button>

                    </CardFooter>


                </Card>


            </Card>


        </div>
    )
}
