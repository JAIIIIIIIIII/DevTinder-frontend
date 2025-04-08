import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Body from "./components/Body";
import Profile from "./components/Profile";
import Login from "./components/Login";
import Feed from "./components/Feed";
import EditProfile from "./components/EditProfile";
import Connections from "./components/Connections";
import Requests from "./components/Requests";
import Signup from "./components/Signup";
import Chat from "./components/Chat";
import ViewProfile from "./components/ViewProfile";
import { useAuthContext } from "./utils/userContext.jsx";

function App() {
  const user = useAuthContext();

  return (
    <>
      <BrowserRouter basename="/">
        <Routes>
          {/* Unauthenticated routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Signup />} />
          {/* Authenticated routes */}
          {/* Authenticated routes */}
          <Route path="/" element={user ? <Body /> : <Navigate to="/login" />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/" element={<Feed />} />
            <Route path="/edit" element={<EditProfile />} />
            <Route path="/connections" element={<Connections />} />
            <Route path="/connectionrequests" element={<Requests />} />
            <Route path="/chat/:id" element={<Chat />} />
            <Route path="/viewprofile/:id" element={<ViewProfile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
