import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import M from "materialize-css";

const Signup = () => {
  // used to push to /login page
  const history = useHistory();
  // Set state of name, email, and password
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState(undefined);

  useEffect(() => {
    if (url) {
      uploadFields();
    }
  }, [url])

  // used to upload profile pic
  const uploadProfilePic = () => {
    // Need to use FormData for image, and make fetch request to cloudinary to upload
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
        setUrl(data.url);
      })
      .catch((error) => {
        console.log(error);
      });
  };
    // Request to /createpost and format JSON
  const uploadFields = () => {
    // Check using regex if e-mail is valid. If not valid, will return with "Invalid e-mail" toast message
    if (
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      return M.toast({
        html: "Invalid e-mail",
        classes: "#d81b60 pink darken-1",
      });
    }
    fetch("/signup", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        password,
        pic: url
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          M.toast({ html: data.error, classes: "#d81b60 pink darken-1" });
        } else {
          M.toast({ html: data.message, classes: "#00695c teal darken-3" });
          history.push("/login");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // Method to send data in JSON format to server
  // if user hasn't uploaded image, then upload fields only. Done so user can upload profile pic at a later point.
  const PostData = () => {
    if (image) {
      uploadProfilePic();
    } else {
      uploadFields();
    }
  };

  return (
    <div className="mycard">
      <div className="card auth-card input-field">
        <h2>Shopigram</h2>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="file-field input-field">
          <div className="btn waves-effect waves-light #1976d2 blue darken-2">
            <span>Upload Profile Pic</span>
            <input
              type="file"
              onChange={(e) => {
                setImage(e.target.files[0]);
              }}
            />
          </div>
          <div className="file-path-wrapper">
            <input className="file-path validate" type="text" />
          </div>
        </div>
        <button
          className="btn waves-effect waves-light #1976d2 blue darken-2"
          onClick={() => PostData()}
        >
          Sign up
        </button>
        <h5>
          <Link to="/login">Already have an account?</Link>
        </h5>
      </div>
    </div>
  );
};

export default Signup;
