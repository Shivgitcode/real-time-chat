import GoogleProvider from "next-auth/providers/google"
export const messages = [
    {
        id: "1", email: "shivneeraj2004@gmail.com", message: "Hello", img: "doma.jpg"
    },
    {
        id: "2", email: "random@gmail.com", message: "Hello", img: "gojo.webp"
    },
    {
        id: "3", email: "random@gmail.com", message: "Hello", img: "gojo.webp"
    },
    {
        id: "4", email: "shivneeraj2004@gmail.com", message: "Hello", img: "doma.jpg"
    },
]


export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        })
    ]

}