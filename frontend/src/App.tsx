import { useEffect, useState, useRef } from "react";

function App() {
  const [socket, setsocket] = useState()
  const inputRef=useRef(null);

  const handleSend=() => {
    
  }
  
useEffect(() => {
  const ws=new WebSocket("ws://localhost:8080");
  setsocket(ws);
    ws.onmessage=(event)=>{
      alert(event.data)
    }
}, [])


  return (
    <>
      <div>
          <div className="inp flex justify-center items-center bg-purple-200">
              <input ref={inputRef} type="text" placeholder="write here..." />
              <button onClick={handleSend}>Send</button>
          </div>
      </div>
    </>
  )
}

export default App
