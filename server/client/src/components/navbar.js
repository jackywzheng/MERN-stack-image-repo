import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../App";

const NavBar = () => {
  const { state, dispatch } = useContext(UserContext);
  const history = useHistory()
  const renderList = () => {
    // If logged in only show Profile and Create Post in navbar
    if (state) {
      return [
        <li key="profile">
          <Link to="/profile">Profile</Link>
        </li>,
        <li key="createpost">
          <Link to="/create">Create Post</Link>
        </li>,
        <li key="logout">
          <button
            className="btn #c62828 red darken-3"
            onClick={() => {
              localStorage.clear()
              dispatch({type: "CLEAR"})
              history.push("/login")
            }}
          >
            Logout
          </button>
        </li>
      ];
      // Else, only show Login and Sign up
    } else {
      return [
        <li key="login">
          <Link to="/login">Login</Link>
        </li>,
        <li key="signup">
          <Link to="/signup">Sign up</Link>
        </li>,
      ];
    }
  };
  return (
    <nav>
      <div className="nav-wrapper white">
        <Link to={state ? "/" : "/login"} className="brand-logo left">
          Shopigram
        </Link>
        <ul id="nav-mobile" className="right">
          {renderList()}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
