import React, {useEffect, useState, useContext} from "react";
import {UserContext} from "../../App"

const Profile = () => {
  const [myPosts, setPosts] = useState([])
  const {state, dispatch} = useContext(UserContext)
  useEffect(() => {
    fetch('/mypost', {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      }
    }).then(response => response.json())
    .then(result => {
      setPosts(result.mypost)
    })
  }, [])
  return (
    <div style={{ maxWidth: "550px", margin: "0px auto" }}>
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            margin: "20px 0px",
            borderBottom: "1px solid grey",
          }}
        >
          <div>
            <img
              style={{ width: "160px", height: "160px", borderRadius: "80px" }}
              alt="profile"
              src="https://images.unsplash.com/photo-1587930734782-4fe289d9ea8f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
            />
          </div>
          <div>
          <h4>{state?state.name: "loading"}</h4>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "110%",
              }}
            >
              <h6>{myPosts.length} posts</h6>
              <h6>{state ? state.followers.length : "loading"} followers</h6>
              <h6>{state ? state.following.length: "loading"} following</h6>
            </div>
          </div>
        </div>
      </div>
      <div className="gallery">
        {
          myPosts.map(item=> {
            return(
            <img key={item._id}
              className="item"
              alt="gallery"
              src={item.image}
              alt={item.title}
            />)
          })
        }
      </div>
    </div>
  );
};

export default Profile;
