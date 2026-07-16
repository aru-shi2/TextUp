import WebSocket, { WebSocketServer } from 'ws';

const wss=new WebSocketServer({port:8080});

interface User {
    socket: WebSocket,
    room: string
}
const allSockets: User[] = []

wss.on('connection', function(socket){
    console.log("user connected")

    socket.on("error", console.error)

    socket.on("message",(data)=>{
        
        const msg=JSON.parse(data.toString());
        
        if(msg.type=="join"){
            allSockets.push({
                socket,
                room:msg.payload.roomId
            })
        }

        if(msg.type=="chat"){
            const userRoom=allSockets.find((x)=>x.socket==socket)
            if(!userRoom){
                return
            }
            for(let i=0;i<allSockets.length;i++){
                if(allSockets[i]?.room==userRoom.room){
                    allSockets[i]?.socket.send(msg.payload.message)
                }
            }
        }
    })

    socket.on("close",()=>{
        const index=allSockets.findIndex(user=>
            user.socket==socket 
        )
        if(index!==-1){
            allSockets.splice(index,1)
        }
    })
})