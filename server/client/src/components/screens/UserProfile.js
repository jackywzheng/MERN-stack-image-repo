import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../../App";
import { useParams } from "react-router-dom";

const Profile = () => {
  const [userProfile, setProfile] = useState(null);
  const [showFollow, setShowFollow] = useState(true);
  const { state, dispatch } = useContext(UserContext);
  const { userid } = useParams();
  useEffect(() => {
    fetch(`/user/${userid}`, {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then(response => response.json())
      .then(result => {
        setProfile(result);
      });
  }, []);

  const followUser = () => {
    fetch("/follow", {
      method: "put",
      headers: {
        "Content-type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      },
      body: JSON.stringify({
        followId: userid
      })
    }).then(response => response.json())
    .then(data => {
      console.log(data)
      dispatch({type: "UPDATE", payload: {
        following: data.following,
        followers: data.followers
      }})
      localStorage.setItem("User", JSON.stringify(data))
      // This logic is suboptimal
      setProfile((previousState) => {
        return {
          ...previousState,
          user: {
            ...previousState.user,
            followers: [...previousState.user.followers, data._id]
          }
        }
      })
      setShowFollow(false);
    })
  }

  const unfollowUser = () => {
    fetch("/unfollow", {
      method: "put",
      headers: {
        "Content-type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      },
      body: JSON.stringify({
        unfollowId: userid
      })
    }).then(response => response.json())
    .then(data => {
      console.log(data)
      dispatch({type: "UPDATE", payload: {
        following: data.following,
        followers: data.followers
      }})
      localStorage.setItem("User", JSON.stringify(data))
      // This logic is suboptimal
      setProfile((previousState) => {
        const newFollowers = previousState.user.followers.filter(item => item != data._id);
        return {
          ...previousState,
          user: {
            ...previousState.user,
            followers: newFollowers}
        }
      })
      setShowFollow(true);
    })
  }

  return (
    <>
      {userProfile ? (
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
                  style={{
                    width: "160px",
                    height: "160px",
                    borderRadius: "80px",
                  }}
                  alt="profile"
                  src="https://images.unsplash.com/photo-1587930734782-4fe289d9ea8f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
                />
              </div>
              <div>
                <h4>{userProfile.user.name}</h4>
                <h5>{userProfile.user.email}</h5>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "110%",
                  }}
                >
                  <h6>{userProfile.posts.length} posts</h6>
                  <h6>{userProfile.user.followers.length} followers</h6>
                  <h6>{userProfile.user.following.length} following</h6>
                </div>
                {
                  showFollow ?
                  <button 
                  style={{
                    margin: "10px"
                  }}
                  className="btn waves-effect waves-light #1976d2 blue darken-2"
                  onClick={() => followUser()}
                  >
                    Follow
                  </button>
                  :               
                  <button
                  style={{
                    margin: "10px"
                  }}
                  className="btn waves-effect waves-light #1976d2 blue darken-2"
                  onClick={() => unfollowUser()}
                  >
                    Unfollow
                  </button>
                }
              </div>
            </div>
          </div>
          <div className="gallery">
            {userProfile.posts.map((item) => {
              return (
                <img
                  key={item._id}
                  className="item"
                  alt="gallery"
                  src={item.image}
                  alt={item.title}
                />
              );
            })}
          </div>
        </div>
      ) : (
        <h2>Loading...</h2>
      )}
    </>
  );
};

export default Profile;
