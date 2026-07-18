import { useRef, useState } from 'react';
import { nanoid } from 'nanoid'
import { useNavigate } from 'react-router-dom';

interface HomeProps{
  socket: WebSocket|null,
  senderId: string|null
}

export default function Home({socket, senderId}:HomeProps) {
  const [Code, setCode] = useState("")
  const [joinRoomId, setjoinRoomId] = useState("")
  const navigate=useNavigate()

  const handleCreate=() => {
    const id=nanoid(6);
    setCode(id)
  }
  
  const handleJoin=() => {
    if(!socket||!joinRoomId.trim()){
      return
    }

    const joinPayload={
    type:"join",
    payload:{
      room:joinRoomId,
      senderId:senderId
    }
  }

    if(socket?.readyState===WebSocket.OPEN){
      socket.send(JSON.stringify(joinPayload))
      navigate(`/${joinRoomId}`)
    }
    else{
      socket.onopen=()=>{
        socket.send(JSON.stringify(joinPayload))
        navigate(`/${joinRoomId}`)
      }
    }

  }
  

  return (

    <div className="min-h-screen bg-[#0d0915] text-white font-mono p-6 md:p-12 relative overflow-hidden flex flex-col justify-between selection:bg-[#ff007f] selection:text-black">
      
      {/* Retro Grid / Dot Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1b1329_1px,transparent_1px),linear-gradient(to_bottom,#1b1329_1px,transparent_1px)] bg-size-[32px_32px] opacity-60 pointer-events-none" />
      
      {/* Decorative Chaos Shapes & Stickers */}
      <div className="absolute top-10 left-[8%] hidden lg:block -rotate-6 bg-[#39ff14] text-black font-black text-xs px-4 py-2 border-4 border-black shadow-[4px_4px_0px_0px_#ff007f] uppercase tracking-widest z-0">
        ⚡ 100% Free & No Logins
      </div>
      <div className="absolute top-24 right-[10%] hidden lg:block rotate-12 bg-[#00ffff] text-black font-black text-xs px-4 py-2 border-4 border-black shadow-[4px_4px_0px_0px_#39ff14] uppercase tracking-widest z-0">
        🔒 Encrypted & Direct
      </div>

      {/* Header (Top Nav-style sticker bar) */}
      <header className="w-full max-w-6xl mx-auto flex justify-between items-center z-10">
        <div className="bg-[#ff007f] border-4 border-black text-black px-4 py-1.5 font-black text-lg rotate-1 shadow-[4px_4px_0px_0px_#000]">
          BETA v2.6
        </div>
        <div className="font-bold text-xs uppercase tracking-widest text-[#39ff14]">
          [ STABILITY: UNSTABLE ]
        </div>
      </header>

      {/* Main Content Area */}
      <main className="w-full max-w-4xl mx-auto my-12 grid grid-cols-1 md:grid-cols-12 gap-8 items-center z-10">
        
        {/* Left Side: Massive Headings & Manifesto */}
        <div className="md:col-span-7 space-y-6 text-left">
          <div className="relative inline-block">
            <h1 className="text-7xl md:text-9xl font-black uppercase tracking-tighter text-transparent stroke-text -rotate-2 select-none leading-none">
              TEXTUP
            </h1>
            <span className="absolute -top-3 -right-6 bg-[#39ff14] text-black font-black text-xs px-2 py-0.5 border-2 border-black uppercase rotate-6">
              LOUD!
            </span>
          </div>
          
          <div className="border-4 border-black bg-black/80 p-6 shadow-[8px_8px_0px_0px_#00ffff]">
            <h2 className="text-xl font-black text-[#ff007f] uppercase mb-2">💥 WHY CHOOSE BORING?</h2>
            <p className="text-sm md:text-base text-slate-300 leading-relaxed">
              Stop hanging out in dull corporate chat boxes. <strong className="text-white">Textup</strong> is the loud, unapologetic playground where rooms are born in milliseconds. Toss in a temporary room code, blast your messages, and disappear like dust. 
            </p>
          </div>
          
          <div className="flex flex-wrap gap-2 text-xs font-black uppercase">
            <span className="bg-[#00ffff] text-black px-3 py-1 border-2 border-black">#WEBRTC</span>
            <span className="bg-[#ff007f] text-white px-3 py-1 border-2 border-black">#P2P</span>
            <span className="bg-[#39ff14] text-black px-3 py-1 border-2 border-black">#CHAOS</span>
          </div>
        </div>

        {/* Right Side: The Heavy Actions Card */}
        <div className="md:col-span-5 w-full bg-[#fcf800] border-8 border-black text-black p-6 md:p-8 shadow-[12px_12px_0px_0px_#ff007f] rotate-1">
          
          <h3 className="text-3xl font-black uppercase tracking-tight mb-6 text-black border-b-4 border-black pb-2">
            Control Panel
          </h3>

          <div className="space-y-6">
            
            {/* Create Room Block */}
            <div className="space-y-4">
              <button onClick={handleCreate} className="w-full py-3 px-4 bg-[#ff007f] hover:bg-[#e00070] text-white font-black text-base border-4 border-black shadow-[4px_4px_0px_0px_#000] transition-all hover:translate-x-0.5 hover:translate-y-0.5 uppercase tracking-wider active:translate-x-1 active:translate-y-1 active:shadow-none">
                ⚡ Create A Room
              </button>

              {/* Hardcoded Active Code and Copy Block */}
            {Code && <div className="bg-[#00ffff] border-4 border-black p-3.5 shadow-[4px_4px_0px_0px_#000] -rotate-1">
                <div className="text-[10px] font-black uppercase tracking-widest text-black mb-1.5">
                  🔥 Room Active! Share Code:
                </div>
                 <div className="flex gap-2">
                  <div className="grow bg-white border-4 border-black px-3 py-2 text-sm md:text-base font-black tracking-widest text-black flex items-center justify-center select-all">
                    {Code}
                  </div>
                  <button onClick={()=>navigator.clipboard.writeText(Code)} className="bg-black hover:bg-zinc-800 text-[#39ff14] font-black text-xs px-4 border-4 border-black shadow-[2px_2px_0px_0px_#000] hover:shadow-[1px_1px_0px_0px_#000] hover:translate-x-px hover:translate-y-px active:translate-x-0.5 active:translate-y-0.5 active:shadow-none uppercase tracking-widest transition-all">
                    Copy
                  </button>
                </div>
              </div>}

            </div>

            {/* Brutalist Divider */}
            <div className="relative flex py-1 items-center">
              <div className="grow border-t-4 border-black"></div>
              <span className="shrink mx-4 font-black text-lg uppercase tracking-widest bg-black text-[#fcf800] px-3 py-1 border-2 border-black">OR</span>
              <div className="grow border-t-4 border-black"></div>
            </div>

            {/* Join Room Block */}
            <div className="space-y-3">
              <label className="block text-xs font-black tracking-widest text-black">
                Enter Secret Passage Code:
              </label>
              <div className="flex flex-col gap-3">
                <input
                value={joinRoomId}
                onChange={(e)=>setjoinRoomId(e.target.value)}
                  type="text" 
                  placeholder="EX: CRASH-69" 
                  className="w-full px-4 py-3 bg-white border-4 border-black text-black placeholder-slate-500 font-black focus:outline-none focus:bg-[#00ffff] focus:placeholder-black text-base tracking-widest shadow-[4px_4px_0px_0px_#000]"
                />
                <button onClick={handleJoin} className="w-full py-3.5 bg-black hover:bg-zinc-800 text-[#39ff14] font-black text-base border-4 border-black shadow-[4px_4px_0px_0px_#ff007f] hover:shadow-[2px_2px_0px_0px_#ff007f] transition-all hover:translate-x-0.5 hover:translate-y-0.5 active:translate-x-1 active:translate-y-1 active:shadow-none uppercase">
                  Join Active Room →
                </button>
              </div>
            </div>

          </div>
        </div>

      </main>

      {/* Footer */}
      <footer className="w-full max-w-6xl mx-auto border-t-4 border-black pt-6 flex flex-col md:flex-row justify-between items-center gap-4 z-10 text-xs font-black text-slate-500 uppercase tracking-widest">
        <div>© 2026 TEXTUP INC. CODES ARE FOR CLOSERS.</div>
        <div className="text-[#39ff14]">SYS_STATUS: RADICAL</div>
      </footer>

      {/* Styled text outlines styling using inline CSS injection */}
      <style>{`
        .stroke-text {
          -webkit-text-stroke: 3px #fff;
          font-weight: 950;
        }
        @media (max-width: 768px) {
          .stroke-text {
            -webkit-text-stroke: 2px #fff;
          }
        }
      `}</style>
    </div>
  );
}