import {BrowserRouter, Routes, Route} from "react-router-dom"
import Room from "./Pages/Room"
import Home from "./Pages/Home"

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* ./:roomId */}
            <Route path="/" element={<Home/>}/>
            <Route path="/room" element={<Room/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
