import {BrowserRouter, Routes, Route} from "react-router-dom"
import Room from "./Pages/Room"
import Home from "./Pages/Home"
import { useEffect, useState } from "react"
import { nanoid } from "nanoid"

function App() {

  const [socket, setsocket] = useState<WebSocket | null>(null)

  const [senderId, setsenderId] = useState(localStorage.getItem("senderId")||nanoid(6))

  useEffect(() => {
    localStorage.setItem("senderId", senderId)
  }, [senderId])
  

  useEffect(() => {
    const ws=new WebSocket("ws://localhost:8080")

    setsocket(ws);

    return()=>{
      ws.close();
    }
  }, [])
  

  return (
    <>
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home socket={socket} senderId={senderId}/>}/>
            <Route path="/:roomId" element={<Room socket={socket} senderId={senderId}/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
