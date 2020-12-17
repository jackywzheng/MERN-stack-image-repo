import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../../App";
import { useParams } from "react-router-dom";

const Profile = () => {
  const [userProfile, setProfile] = useState(null);
  const { state, dispatch } = useContext(UserContext);
  const { userid } = useParams();
  useEffect(() => {
    fetch(`/user/${userid}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then(response => response.json())
      .then(result => {
        console.log(result);
        setProfile(result);
      });
  }, []);
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
                  <h6>40 followers</h6>
                  <h6>40 following</h6>
                </div>
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
