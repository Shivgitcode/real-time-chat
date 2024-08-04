import { Avatar } from "@radix-ui/react-avatar";
import { AvatarFallback, AvatarImage } from "../ui/avatar";

export default function MyAvatar() {
    return (
        <div>
            <Avatar>
                <AvatarImage src="/doma.jpg" alt="hello"></AvatarImage>
                <AvatarFallback>DM</AvatarFallback>
            </Avatar>
        </div>
    )
}
