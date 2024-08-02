"use client";

import { Button } from "@/components/ui/button"
import { ChromeIcon } from "lucide-react"
import { signIn, useSession } from "next-auth/react"
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function page() {
    const session = useSession()
    const router = useRouter()

    const handleSignin = () => {
        signIn("google")
    }

    useEffect(() => {
        if (session.status == "authenticated") {
            router.push("/")
        }
    })

    return (

        <div className="w-full min-h-screen flex justify-between items-center mx-auto ">
            <div>
                <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Welcome to chat buddies</h1>
                <h2 className="text-xl text-muted-foreground">chat with your friends</h2>
            </div>
            <div>
                <Button onClick={handleSignin}>Login</Button>
            </div>

        </div>
    )
}
