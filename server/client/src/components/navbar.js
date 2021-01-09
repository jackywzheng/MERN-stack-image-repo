import React, { useContext, useRef, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../App";
import M from "materialize-css"

const NavBar = () => {
  const searchModal = useRef(null);
  const [search, setSearch] = useState("");
  const [userDetails, setUserDetails] = useState([])
  const { state, dispatch } = useContext(UserContext);
  const history = useHistory();
  // pass in elements for Modal search
  useEffect(() => {
    M.Modal.init(searchModal.current)
  }, [])
  const renderList = () => {
    // If logged in only show Profile and Create Post in navbar
    if (state) {
      return [
        <li key="search">
          <i data-target="modal1" className="large material-icons modal-trigger" style={{color: "black", marginRight: "10px"}}>search</i>
        </li>,
        <li key="profile">
          <Link to="/profile">Profile</Link>
        </li>,
        <li key="createpost">
          <Link to="/create">Create Post</Link>
        </li>,
        <li key="followedposts">
          <Link to="/followedposts">Following</Link>
        </li>,
        <li key="logout">
          <button
            className="btn #c62828 red darken-3"
            onClick={() => {
              localStorage.clear();
              dispatch({ type: "CLEAR" });
              history.push("/login");
            }}
            style={{
              marginRight: "10px"
            }}
          >
            Logout
          </button>
        </li>,
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

  // Fetch users that match search results
  const fetchUsers = (query) => {
    setSearch(query)
    fetch("/searchusers", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        query
      })
    }).then(response => response.json())
    .then(results => {
      setUserDetails(results.user)
    })
  }

  return (
    <nav>
      <div className="nav-wrapper white">
        <Link to={state ? "/" : "/login"} className="brand-logo left" style={{marginLeft:"10px"}}>
          Shopigram
        </Link>
        <ul id="nav-mobile" className="right">
          {renderList()}
        </ul>
      </div>
      <div
        id="modal1"
        className="modal"
        ref={searchModal}
        style={{ color: "black" }}
      >
        <div className="modal-content">
          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) => fetchUsers(e.target.value)}
          />
          <ul className="collection">
            {userDetails.map((item) => {
              return (
                // Link to clicked user's profile page
                <Link key={item.email}
                  to={
                    item._id !== state._id ? "/profile/" + item._id : "/profile"
                  }
                  onClick={() => {
                    M.Modal.getInstance(searchModal.current).close();
                    setSearch("");
                  }}
                >
                  <li key="results" className="collection-item">{item.name}</li>
                </Link>
              );
            })}
          </ul>
        </div>
        <div className="modal-footer">
          <button
            className="modal-close waves-effect waves-green btn-flat"
            onClick={() => setSearch("")}
          >
            close
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
