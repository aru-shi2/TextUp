import { useRef, useState, useEffect } from "react"

const Room = () => {
  const [socket, setsocket] = useState()
  const inputRef=useRef()

  const handleSend=() => {
    if(!socket || !inputRef.current){
      return;
    }
    const message=inputRef.current.value
    socket.send(message)
  }
  
  useEffect(() => {
    const ws=new WebSocket("ws://localhost:8080")
    setsocket(ws);

    
  }, [])
  

  return (
    <div>
      <div className="flex justify-center items-center gap-5">
        <input className="border" ref={inputRef} type="text" placeholder='Write here...'/>
        <button className="border" onClick={handleSend}>Send</button>
      </div>
    </div>
  )
}

export default Room
