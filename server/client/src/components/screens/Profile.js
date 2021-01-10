import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../../App";

const Profile = () => {
  const [myPosts, setPosts] = useState([]);
  const { state, dispatch } = useContext(UserContext);
  const [image, setImage] = useState("");

  useEffect(() => {
    fetch("/mypost", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((response) => response.json())
      .then((result) => {
        setPosts(result.mypost);
      });
  }, []);

  useEffect(() => {
    if (image) {
      const data = new FormData();
      data.append("file", image);
      data.append("upload_preset", "shopigram");
      data.append("cloud_name", "shopigram");
      fetch("https://api.cloudinary.com/v1_1/shopigram/image/upload", {
        method: "post",
        body: data,
      })
        .then((response) => response.json())
        .then((data) => {
          localStorage.setItem("user", JSON.stringify({...state, pic: data.url}))
          // Make api call to update pic URL in user database
          dispatch({type: "UPDATEPIC", payload: data.url})
          fetch("/updatepic", {
            method: "put",
            headers: {
              "Content-Type": "application/json",
              "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
              pic: data.url
            })
          }).then(response => response.json())
          .then(result => {
            console.log(result)
          })
          window.location.reload();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [image])
  const updateProfilePic = (file) => {
    setImage(file);
  };
  if (state === null) {
    return(
      <h5>Loading...</h5>
    )
  } else {
    return (
      <div style={{ maxWidth: "600px", margin: "0px auto" }}>
        <div
          style={{
            margin: "20px 0px",
            borderBottom: "1px solid grey",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
            }}
          >
            <div>
              <img
                style={{ width: "160px", height: "160px", borderRadius: "80px" }}
                alt="profile"
                src={state ? state.pic : "loading"}
              />
            </div>
            <div>
              <h4>{state ? state.name : "loading"}</h4>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "110%",
                }}
              >
                <h6>{myPosts.length} posts</h6>
                <h6>{state ? state.followers.length : "loading"} followers</h6>
                <h6>{state ? state.following.length : "loading"} following</h6>
              </div>
            </div>
          </div>
          <div className="file-field input-field" style={{
            margin: "10px"
          }}>
            <div className="btn waves-effect waves-light #1976d2 blue darken-2">
              <span>Update Profile Pic</span>
              <input
                type="file"
                onChange={(e) => {
                  updateProfilePic(e.target.files[0]);
                }}
              />
            </div>
            <div className="file-path-wrapper">
                <input className="file-path validate" type="text" />
            </div>
          </div>      
        </div>
        <div className="gallery">
          {myPosts.map((item) => {
              return (
                <a href={item.image}>
                  <img
                    key={item._id}
                    className="item"
                    src={item.image}
                    alt={item._id}
                    style={{
                      margin: "5px",
                      width: "180px",
                      height: "180px",
                      overflow: "hidden"
                    }}
                  />
                </a>
            );
          })}
        </div>
      </div>
    );
  }

};

export default Profile;
