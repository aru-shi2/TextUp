import WebSocket, { WebSocketServer } from 'ws';

const wss=new WebSocketServer({port:8080});

wss.on('connection', function(socket){
    console.log("user connected")

    socket.on("error", console.error)

    socket.on("message",function message(data, isBinary){
        wss.clients.forEach(function each(client){
           if(client!==socket && client.readyState===WebSocket.OPEN ){
              client.send(data, {binary:isBinary})
           }
        })
    });
  
})