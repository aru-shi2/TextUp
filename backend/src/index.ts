import WebSocket, { WebSocketServer } from "ws";
import { nanoid } from "nanoid";

const wss = new WebSocketServer({ port: 8080 });

interface User {
  socket: WebSocket;
  room: string;
  senderId: string;
}
const allSockets: User[] = [];

wss.on("connection", function (socket) {
  console.log("user connected");

  socket.on("error", console.error);

  socket.on("message", (data) => {
    const msg = JSON.parse(data.toString());

    if (msg.type == "join") {

      const existingUser=allSockets.find((u)=>u.socket===socket)

      if(existingUser){
        existingUser.room=msg.payload.room
      }
      allSockets.push({
        socket,
        room: msg.payload.room,
        senderId: msg.payload.senderId,
      });
  }

    if (msg.type == "chat") {
      const userRoom = allSockets.find((x) => x.socket === socket);
      if (!userRoom) {
        return;
      }
      for (let i = 0; i < allSockets.length; i++) {
        if (allSockets[i]?.room == userRoom.room) {
          allSockets[i]?.socket.send(
            JSON.stringify({
              type: "chat",
              payload: {
                message: msg.payload.message,
                senderId: userRoom.senderId,
              },
            }),
          );
        }
      }
    }
  });

  socket.on("close", () => {
    const index = allSockets.findIndex((user) => user.socket == socket);
    if (index !== -1) {
      allSockets.splice(index, 1);
    }
  });
});
