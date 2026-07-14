import { WebSocketServer } from 'ws';

const wss=new WebSocketServer({port:8080});

wss.on('connection', function(socket){
    console.log("connected")
    socket.on("message",(e)=>{
        socket.send("hi")
    });
    socket.on("close",()=>{
        console.log("disconnected")
    })
})