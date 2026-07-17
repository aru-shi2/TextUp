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

const idd = nanoid(6);

  socket.send(
    JSON.stringify({
      type: "init",
      payload: {
        senderId: idd,
      },
    }),
  );

  socket.on("error", console.error);

  socket.on("message", (data) => {
    const msg = JSON.parse(data.toString());

    if (msg.type == "join") {
      allSockets.push({
        socket,
        room: msg.payload.roomId,
        senderId: idd,
      });
    }

    if (msg.type == "chat") {
      const userRoom = allSockets.find((x) => x.socket == socket);
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
