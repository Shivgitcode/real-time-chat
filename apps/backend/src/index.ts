import { WebSocketServer, WebSocket } from "ws";
import express from "express"

const app = express()
const server = app.listen(5000, () => {
    console.log("listening on server on port 5000")
})
// const socket = new WebSocketServer()
const wss = new WebSocketServer({ server })
const userIds: String[] = []


wss.on("connection", (socket) => {
    socket.on("error", console.error)
    socket.on("message", (data) => {



        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(data, { binary: false })
            }
        })




    })

})

