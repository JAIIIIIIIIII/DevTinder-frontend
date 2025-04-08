import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import PropTypes from "prop-types";
import { useAuthContext } from "../utils/userContext";

const Login = () => {
  const [email, setEmail] = useState("@gmail.com");
  const [password, setPassword] = useState("Jai@123");
  const [errormessage, setErrormessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { setAuthUser } = useAuthContext();
  const handleSubmit = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        { email, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      localStorage.setItem("chat-user", JSON.stringify(res.data));
      setAuthUser(res.data);
      navigate("/");
    } catch (err) {
      console.log("Error" + err);
      setErrormessage("Invalid Credentials");
    }
  };

  return (
    <div className="flex justify-center align-middle mt-24">
      <div className=" w-1/3 bg-blue-300 p-5 rounded-xl ">
        <div className="flex justify-center">
          <h1 className="text-black font-bold text-2xl">Login</h1>
        </div>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text text-black text-xl font-bold">
              Email
            </span>
          </div>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text text-black text-xl font-bold">
              Password
            </span>
          </div>
          <input
            type="password"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <h1 className="text-red-600"> {errormessage}</h1>
        <div className=" flex justify-center mt-6">
          <button
            className="btn btn-active btn-neutral text-white  "
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
        <div className="flex justify-center mt-6">
          <h1 className="text-black">
            New user? , <Link to="/register">Click Here</Link> to SignUp{" "}
          </h1>
        </div>
      </div>
    </div>
  );
};
Login.propTypes = {
  socket: PropTypes.object.isRequired, // Ensure 'socket' is an object and required
};

export default Login;
