import { WebSocketServer, WebSocket } from "ws";
import express from "express"

const app = express()
const server = app.listen(5000, () => {
    console.log("listening on server on port 5000")
})
// const socket = new WebSocketServer()
const wss = new WebSocketServer({ server })

wss.on("connection", (socket) => {
    socket.send("connection open")

})

