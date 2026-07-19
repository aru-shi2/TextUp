import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

interface RoomProps {
  socket: WebSocket | null,
  senderId: string | null
}

export default function RoomPage({ socket, senderId }: RoomProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [Messages, setMessages] = useState <{message: string, senderId: string}[]>([]);
  const {roomId}=useParams()
  const navigate=useNavigate()

  const handleSend = () => {
    if (!socket || socket.readyState !== WebSocket.OPEN || !inputRef.current) {
      return;
    }
    const msgData = JSON.stringify({
      type: "chat",
      payload: {
        message: inputRef.current.value,
      }
    });
    socket?.send(msgData);
    inputRef.current.value=""
  };


  useEffect(() => {
    if(!socket){
      return;
    }
      socket.onmessage = (e) => {
        const data=JSON.parse(e.data)
        if(data.type==="chat"){
        setMessages((prev)=>[...prev, {
          message:data.payload.message,
          senderId:data.payload.senderId
        }])
        }
      };

      return ()=>{
        socket.onmessage=null
      }
  }, [socket]);



   useEffect(() => {
    if (!socket || !roomId) {
      return;
    }
    console.log(roomId)
    const joinRoom = () => {
      const joinPayload = {
        type: "join",
        payload: {
          room: roomId,
          senderId,
        },
      };

      socket.send(JSON.stringify(joinPayload));
    };
    if (socket.readyState === WebSocket.OPEN) {
      joinRoom();
    } else {
      socket.onopen = () => {
        joinRoom();
      };
    }
  }, [socket, roomId]);


  const handleLeave=() => {
    socket?.close();
    navigate("/")
  }
  

  return (
    <div className="min-h-screen bg-[#0d0915] text-white font-mono p-4 md:p-8 relative overflow-hidden flex flex-col justify-between selection:bg-[#ff007f] selection:text-black">
      {/* Retro Grid Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1b1329_1px,transparent_1px),linear-gradient(to_bottom,#1b1329_1px,transparent_1px)] bg-size-[32px_32px] opacity-60 pointer-events-none" />

      {/* Header */}
      <header className="w-full max-w-7xl mx-auto flex justify-between items-center z-10 border-b-4 border-black pb-4 mb-6">
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-black uppercase tracking-tighter text-transparent stroke-text select-none">
            TEXTUP
          </h1>
          <div className="bg-[#00ffff] border-2 border-black text-black px-2 py-0.5 font-black text-xs -rotate-1 shadow-[2px_2px_0px_0px_#000]">
            ROOM: TEXTUP-X97
          </div>
        </div>
        <div className="font-bold text-xs uppercase tracking-widest text-[#39ff14] flex items-center gap-2">
          <span className="w-2.5 h-2.5 bg-[#39ff14] border border-black animate-ping rounded-full inline-block" />
          [ LIVE P2P STREAM ]
        </div>
      </header>

      {/* Main Workspace Grid */}
      <main className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch z-10 grow my-auto">
        {/* Left Side: Sidebar / Room Info (4 Columns) */}
        <div className="lg:col-span-3 space-y-6 flex flex-col">
          {/* Active Profile Info */}
          <div className="bg-[#fcf800] border-4 border-black text-black p-4 shadow-[4px_4px_0px_0px_#ff007f] -rotate-1">
            <span className="block text-[10px] font-black uppercase tracking-widest opacity-80 mb-1">
              YOUR IDENTITY:
            </span>
            <div className="bg-white border-2 border-black px-3 py-1.5 font-black text-sm flex items-center justify-between">
              <span>⚡ {`user_${senderId}`}</span>
              <span className="text-xs bg-[#ff007f] text-white px-1 border border-black">
                YOU
              </span>
            </div>
          </div>

          {/* Connected Users List Box */}
          <div className="border-4 border-black bg-black/80 p-4 shadow-[6px_6px_0px_0px_#00ffff] grow space-y-3 min-h-50">
            <h3 className="text-sm font-black text-[#39ff14] uppercase tracking-wider border-b-2 border-zinc-800 pb-1">
              🟢 ONLINE NOW 
            </h3>
            <ul className="space-y-2 text-xs font-bold uppercase tracking-wide">
              <li className="flex items-center gap-2 text-[#39ff14]">
                🔸 {`user_${senderId}`}
              </li>
            </ul>
          </div>

          {/* Danger Zone Action */}
          <button onClick={handleLeave} className="w-full py-3 bg-[#ff007f] hover:bg-[#e00070] text-white font-black text-sm border-4 border-black shadow-[4px_4px_0px_0px_#000] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0px_0px_#000] active:translate-x-1 active:translate-y-1 active:shadow-none uppercase tracking-wider">
            🚨 Leave Room
          </button>
        </div>

        {/* Right Side: Heavy Chat Arena (9 Columns) */}
        <div className="lg:col-span-9 flex flex-col bg-white border-8 border-black text-black shadow-[10px_10px_0px_0px_#39ff14] min-h-125 relative">
          {/* Chat Stream Header */}
          <div className="bg-zinc-100 border-b-4 border-black p-3 font-black text-xs uppercase tracking-widest flex justify-between items-center">
            <span>📡 ENCRYPTED CHAT PACKETS</span>
            <span className="bg-black text-[#fcf800] px-2 py-0.5 border-2 border-black text-[10px]">
              BUFFER: READY
            </span>
          </div>

          {/* message */}
          <div className="absolute inset-x-0 top-11.25 bottom-22.5 p-4 space-y-4 overflow-y-auto bg-zinc-50 flex flex-col justify-start">

            {Messages?.map((msg, index) => msg.senderId===senderId? 
            ( 
            <div key={index} className="flex flex-col items-end space-y-1 w-full">
              <span className="font-mono text-[10px] font-black uppercase text-[#ff007f] tracking-wider">
                ⚡ YOU
              </span>
              <div className="bg-[#fcf800] border-2 border-black p-3 max-w-xs sm:max-w-md shadow-[3px_3px_0px_0px_#000] text-sm font-black tracking-tight text-black">
                {msg.message}
              </div>
            </div>
        ):(
              <div key={index} className="flex flex-col items-start space-y-1 self-start">
                <span className="font-mono text-[10px] font-black uppercase text-zinc-500 tracking-wider">
                  {`user_${msg.senderId}`}
                </span>
                <div className="bg-[#00ffff] border-2 border-black p-3 max-w-xs sm:max-w-md shadow-[3px_3px_0px_0px_#000] text-sm font-bold tracking-tight text-black">
                  {msg.message}
                </div>
              </div>
            )
          )}
          </div>

          {/* Chat Input Dock */}
          <div className="border-t-4 bottom-0 absolute w-full border-black p-4 bg-zinc-100">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                ref={inputRef}
                type="text"
                placeholder="TYPE MALICIOUSLY LOUD TEXT HERE..."
                className="grow px-4 py-3.5 bg-white border-4 border-black text-black placeholder-zinc-500 font-mono font-black focus:outline-none focus:bg-[#00ffff] text-sm md:text-base tracking-wider shadow-[4px_4px_0px_0px_#000]"
              />
              <button
                onClick={handleSend}
                className="sm:w-32 py-3.5 bg-black hover:bg-zinc-800 text-[#39ff14] font-mono font-black text-base border-4 border-black shadow-[4px_4px_0px_0px_#ff007f] hover:shadow-[2px_2px_0px_0px_#ff007f] transition-all hover:translate-x-0.5 hover:translate-y-0.5 active:translate-x-1 active:translate-y-1 active:shadow-none uppercase tracking-widest"
              >
                SEND ⚡
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full max-w-7xl mx-auto border-t-4 border-black pt-4 mt-6 flex flex-col md:flex-row justify-between items-center gap-4 z-10 text-xs font-black text-slate-500 uppercase tracking-widest">
        <div>© 2026 TEXTUP INC. CODES ARE FOR CLOSERS.</div>
        <div className="bg-[#ff007f] text-white px-2 py-0.5 border-2 border-black shadow-[2px_2px_0px_0px_#000]">
          ROOM STATE: ACTIVE
        </div>
      </footer>

      {/* Styled text outlines styling using inline CSS injection */}
      <style>{`
        .stroke-text {
          -webkit-text-stroke: 2px #fff;
          font-weight: 950;
        }
      `}</style>
    </div>
  );
}
