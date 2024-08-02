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
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SendIcon } from "lucide-react";

export default function Home() {




    return (
        <div className=" flex flex-col items-center w-full">
            <Card className="w-full mt-[200px]">

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
                        return <Badge variant={"secondary"} className={`${message.email === "random@gmail.com" ? " self-end" : "text-left"}  text-lg text-semibold`}>{message.message}</Badge>
                    })}

                </CardContent>

                <CardFooter className="gap-5">
                    <Input type="text" placeholder="Message"></Input>
                    <Button size={"icon"} variant="secondary">
                        <SendIcon className="h-4 w-4"></SendIcon>

                    </Button>

                </CardFooter>


            </Card>

        </div>
    )
}
