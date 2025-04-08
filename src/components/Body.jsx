import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useEffect } from "react";
import { BASE_URL } from "../utils/constants";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user.user);

  const getUser = async () => {
    try {
      const user = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });

      dispatch(addUser(user.data.data));
    } catch (err) {
      navigate("/login");
      console.log(err);
    }
  };
  useEffect(() => {
    if (!userData) {
      getUser();
    }

  }, []);

  return (
    <>
      <div className="">
        <NavBar />
        <Outlet />
      </div>
    </>
  );
};

export default Body;
