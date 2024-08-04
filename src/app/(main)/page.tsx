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

export default function Home() {
    const session = useSession()
    const router = useRouter()

    useEffect(() => {
        if (session.status === "unauthenticated") {
            router.push("/login")
        }
    })




    return (
        <div className=" flex flex-col items-center w-full">


            <Card className="w-full mt-[200px] flex flex-row justify-center items-start">
                <Card className="w-[30%] flex flex-col justify-between items-start">
                    <Command className="min-h-full">
                        <CommandInput placeholder="search"></CommandInput>
                        <CommandList>
                            <CommandEmpty>No result Found</CommandEmpty>
                            {messages.map((el) => {
                                return <CommandItem className="bg-transparent">
                                    <Avatar className="mr-3">
                                        <AvatarImage src={`/${el.img}`}></AvatarImage>
                                        <AvatarFallback>DM</AvatarFallback>
                                    </Avatar>
                                    <span>John Doe</span>
                                </CommandItem>
                            })}

                        </CommandList>

                    </Command>

                    <Button variant={"outline"} className="mt-[100px]" onClick={() => signOut()}>
                        <LogOut></LogOut>
                    </Button>
                </Card>


                <Card className="w-full">



                    <CardHeader className="flex flex-row items-center gap-[30px] ">
                        <div className="relative w-[70px] h-[70px] ">
                            <Image src="/doma.png" alt="hello" fill className="rounded-full"></Image>
                        </div>
                        <div className="flex flex-col gap-[10px]">
                            <CardTitle>Shivansh</CardTitle>
                            <p className="text-xl text-muted-foreground">@shivn</p>
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
                            <SendIcon className="h-4 w-4"></SendIcon>

                        </Button>

                    </CardFooter>


                </Card>


            </Card>


        </div>
    )
}
