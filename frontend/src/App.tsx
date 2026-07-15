import {BrowserRouter, Routes, Route} from "react-router-dom"
import Room from "./Pages/Room"

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* ./:roomId */}
            <Route path="/" element={<Room/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
