"use client"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sun, Moon } from "lucide-react"
import { useTheme } from "next-themes"

export default function Layout({ children }: { children: React.ReactNode }) {
    const { setTheme } = useTheme()

    return (
        <div className="flex flex-col items-end w-[60%] mx-auto">
            <div className="pt-[30px]">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="icon">
                            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                            <span className="sr-only">Toggle theme</span>
                        </Button>

                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setTheme("light")}>
                            light

                        </DropdownMenuItem>

                        <DropdownMenuItem onClick={() => setTheme("dark")}>
                            dark

                        </DropdownMenuItem>


                    </DropdownMenuContent>


                </DropdownMenu>

            </div>


            {children}




        </div>
    )
}
