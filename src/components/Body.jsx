import { Outlet } from "react-router-dom"
import NavBar from "./NavBar"


const Body = () => {
  return (
    <>
    <div className="">
        <NavBar/>
        <Outlet/>
    </div>
    </>
  )
}

export default Body