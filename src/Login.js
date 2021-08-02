import React, { useState } from "react";
import "./Login.css";
import { Link, useHistory } from "react-router-dom";
import { auth } from "./firebase.js";
function Login() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const signIn = (e) => {
    //dont  want it to refresh
    e.preventDefault();
    //firebase sign in
    auth
      .signInWithEmailAndPassword(email, password)
      .then((auth) => {
        history.push("/");
      })
      .catch((err) => alert(err.message));
  };
  const register = (e) => {
    e.preventDefault();
    //firebase register
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((auth) => {
        //it successfully created a new user with email and password
        console.log(auth);
        if (auth) {
          history.push("/");
        }
      })
      .catch((error) => alert(error.message));
  };
  return (
    <div className="login">
      <Link to="/">
        <img
          className="login__logo"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6Sne8-aF9h86detXMyZ0sYR7PXp-OeWwO0g&usqp=CAU"
        />
      </Link>
      <div className="login__container">
        <h1>Sign-In</h1>
        <form>
          <h5>E-mail</h5>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <h5>Password</h5>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="login__signInButton"
            type="submit"
            onClick={signIn}
          >
            Sign In
          </button>
        </form>
        <p>
          By signing-in you agree to Fitness Delieverer Conditions of Use &
          Sale. Please see our Privacy Notice, our Cookies Notice and our
          Interest-Based Ads Notice.
        </p>
        <button className="login__registerButton" onClick={register}>
          Create your FitnessDeliver account
        </button>
      </div>
    </div>
  );
}

export default Login;
