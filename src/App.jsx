import { BrowserRouter, Route, Routes } from "react-router-dom"

import Body from "./components/Body"
import Profile from "./components/Profile"
import NavBar from "./components/NavBar"
function App() {


  return (
    <>
  <BrowserRouter basename="/">
  <Routes>
    <Route path="/" element={<Body/>}>
      <Route path="profile" element={<Profile/>}></Route>
    </Route>
  </Routes>
  </BrowserRouter>
    </>
  )
}

export default App
