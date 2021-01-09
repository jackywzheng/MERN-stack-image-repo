import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import M from "materialize-css";

const CreatePost = () => {
  const history = useHistory();
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");

  // To stop asynchronous calls. We only want to call this AFTER image has been uploaded and a url is received. Essentially a callback here.
  useEffect(() => {
    if (url) {
      fetch("/createpost", {
        method: "post",
        // Need to include Authorization header as server requires it due to privacy
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          body,
          image: url,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (data.error) {
            M.toast({ html: data.error, classes: "#d81b60 pink darken-1" });
          } else {
            M.toast({
              html: "Created post successfully",
              classes: "#00695c teal darken-3",
            });
            history.push("/");
          }
        });
    }
  }, [url]);

  // Process data and image
  const PostData = () => {
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
    // Request to /createpost and format JSON
  };

  return (
    <div
      className="card input-filled"
      style={{
        margin: "30px auto",
        maxWidth: "500px",
        padding: "20px",
        textAlign: "center",
      }}
    >
      <input
        type="text"
        placeholder="Caption"
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />
      <div className="file-field input-field">
        <div className="btn waves-effect waves-light #1976d2 blue darken-2">
          <span>Upload Image</span>
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
        Submit Post
      </button>
    </div>
  );
};

export default CreatePost;
