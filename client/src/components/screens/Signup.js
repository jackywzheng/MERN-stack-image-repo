import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import M from "materialize-css";

const Signup = () => {
  // used to push to /login page
  const history = useHistory();
  // Set state of name, email, and password
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // Method to send data in JSON format to server
  const PostData = () => {
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
          type="text"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
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
