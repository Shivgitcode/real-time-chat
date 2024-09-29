import { WebSocketServer, WebSocket } from "ws";
import express from "express"

const app = express()
const server = app.listen(5000, () => {
    console.log("listening on server on port 5000")
})
// const socket = new WebSocketServer()
const wss = new WebSocketServer({ server })
let userIds: String[] = []


wss.on("connection", (socket) => {
    socket.on("error", console.error)
    socket.on("message", (data) => {
        console.log(data.toString())
        const socketData = data.toString()
        console.log(socketData)
        userIds.push(socketData)
        const dataString = userIds.join(",")




        socket.send(Buffer.from(dataString), { binary: false })


        socket.on("close", (data) => {
            userIds = userIds.filter(userId => userId !== socketData)


        })







    })

})

