import {BrowserRouter, Routes, Route} from "react-router-dom"
import Room from "./Pages/Room"
import Home from "./Pages/Home"
import { useEffect, useState } from "react"

function App() {

  const [socket, setsocket] = useState<WebSocket | null>(null)
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
            <Route path="/" element={<Home socket={socket}/>}/>
            <Route path="/:roomid" element={<Room socket={socket}/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
