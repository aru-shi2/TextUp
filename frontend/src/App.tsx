import {BrowserRouter, Routes, Route} from "react-router-dom"
import Room from "./Pages/Room"
import Home from "./Pages/Home"
import { useEffect, useState } from "react"
import { nanoid } from "nanoid"
import dotenv from "dotenv"

function App() {

  dotenv.config()
  const [socket, setsocket] = useState<WebSocket | null>(null)

  const [senderId, setsenderId] = useState("")

  useEffect(() => {
    const ws=new WebSocket(process.env.BACKEND_URL as string)

    setsocket(ws);
    setsenderId(nanoid(6))

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
