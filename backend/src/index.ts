import WebSocket, { WebSocketServer } from "ws";

const wss = new WebSocketServer({
  port: Number(process.env.PORT) || 8080,
});

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
      const existingUser = allSockets.find((u) => u.socket === socket);

      if (existingUser) {
        existingUser.room = msg.payload.room;
      }
      else{
      allSockets.push({
        socket,
        room: msg.payload.room,
        senderId: msg.payload.senderId,
      });
    }

      const usersInRoom = allSockets
        .filter((user) => user.room === msg.payload.room)
        .map((us) => us.senderId);

      allSockets
        .filter((user) => user.room === msg.payload.room)
        .forEach((u) => {
          u.socket.send(
            JSON.stringify({
              type: "users",
              payload: {
                users: usersInRoom,
              },
            }),
          );
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
      const room = allSockets[index]?.room
      allSockets.splice(index, 1);

      const usersInRoom = allSockets
      .filter((user) => user.room === room)
      .map((user) => user.senderId);

    allSockets
      .filter((user) => user.room === room)
      .forEach((user) => {
        user.socket.send(
          JSON.stringify({
            type: "users",
            payload: {
              users: usersInRoom,
            },
          })
        );
      });
    }
  });
});
