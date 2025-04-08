import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { deleteUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constants";
import PropTypes from "prop-types";
import { useAuthContext } from "../utils/userContext";

const NavBar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { setAuthUser } = useAuthContext();

  const handleClick = async () => {
    await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
    dispatch(deleteUser());
    localStorage.removeItem("chat-user");
    setAuthUser(null);

    navigate("/login");
  };
  // console.log(user.user
  // );

  return (
    <div
      className="navbar bg-blue-300
    "
    >
      <div className="flex-1">
        <Link
          to="/"
          className="btn btn-ghost text-2xl text-black font-sans font-bold"
        >
          DEVTINDER
        </Link>
      </div>
      <div className="flex-none gap-2">
        <div className="form-control">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-24 md:w-auto"
          />
        </div>
        {user.user && (
          <div className="dropdown dropdown-end flex">
            <h1 className="text-black pt-3 px-2">{user.user.name}</h1>
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src={user.user.profile}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to={"/profile"} className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li>
                <Link to="/connections">Connections</Link>
              </li>
              <li>
                <Link to="/connectionrequests">Requests</Link>
              </li>
              <li>
                <a onClick={handleClick}>Logout</a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
NavBar.propTypes = {
  socket: PropTypes.object,
};
export default NavBar;
