import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../../App";
import { useParams } from "react-router-dom";

const Profile = () => {
  const [userProfile, setProfile] = useState(null);
  const { state, dispatch } = useContext(UserContext);
  const { userid } = useParams();
  const [showFollow, setShowFollow] = useState(state ? !state.following.includes(userid) : true);
  
  useEffect(() => {
    fetch(`/user/${userid}`, {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then(response => response.json())
      .then(result => {
        console.log(userProfile)
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
        const newFollowers = previousState.user.followers.filter(item => item !== data._id);
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
        <div style={{ maxWidth: "600px", margin: "0px auto" }}>
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
                  src={userProfile.user.pic}
                />
              </div>
              <div>
                <h4>{userProfile.user.name}</h4>
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
                    marginTop: "10px"
                  }}
                  className="btn waves-effect waves-light #1976d2 blue darken-2"
                  onClick={() => followUser()}
                  >
                    Follow
                  </button>
                  :               
                  <button
                  style={{
                    marginTop: "10px"
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
      ) : (
        <h2>Loading...</h2>
      )}
    </>
  );
};

export default Profile;
