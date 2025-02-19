import { BrowserRouter, Route, Routes } from "react-router-dom"

import Body from "./components/Body"
import Profile from "./components/Profile"
import Login from "./components/Login"
import { Provider } from "react-redux"
import appStore from "./utils/appStore"
import Feed from "./components/Feed"
import EditProfile from "./components/EditProfile"
import Connections from "./components/Connections"
import Requests from "./components/Requests"

function App() {


  return (
    <>
    <Provider store={appStore}>
  <BrowserRouter basename="/">
  <Routes>
    <Route path="/" element={<Body/>}>
      <Route path="profile" element={<Profile/>}></Route>
      <Route path="/login" element={<Login/>} />
      <Route path="/" element={<Feed/>} />
      <Route path="/edit" element={<EditProfile/>} />
      <Route path="/connections" element={<Connections/>} />
      <Route path="/connectionrequests" element={<Requests/>} />
      
    </Route>
  </Routes>
  </BrowserRouter>
  </Provider>
    </>
  )
}

export default App
