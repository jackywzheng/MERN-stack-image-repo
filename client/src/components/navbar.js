import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../App";

const NavBar = () => {
  const { state, dispatch } = useContext(UserContext);
  const renderList = () => {
    // If logged in only show Profile and Create Post in navbar
    if (state) {
      return [
        <li>
          <Link to="/profile">Profile</Link>
        </li>,
        <li>
          <Link to="/create">Create Post</Link>
        </li>,
      ];
      // Else, only show Login and Sign up
    } else {
      return [
        <li>
          <Link to="/login">Login</Link>
        </li>,
        <li>
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
