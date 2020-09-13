import React from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div className="mycard">
      <div className="card auth-card input-field">
        <h2>Shopigram</h2>
        <input type="text" placeholder="Name" />
        <input type="text" placeholder="E-mail" />
        <input type="text" placeholder="Password" />
        <button className="btn waves-effect waves-light #1976d2 blue darken-2">
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
