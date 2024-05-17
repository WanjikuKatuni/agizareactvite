import React from "react";
import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import "../styles/Form.css";
import LoadingIndicator from "./LoadingIndicator";

function Form({ route, method }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // define form method whether it is login or register
  const name = method === "login" ? "LogIn" : "SignUp";

  // submiting form
  const handleSubmit = async (e) => {
    e.preventDefault();

    // form validation checks
    if ( method === "register" && (!email || !username || !password)) {
        setError("Field cannot be empty")
        return
    }

    if (method === "login" && (!username || !password)) {
        setError("Username and password are required");
        return;
      }

    if (method === "register" && !validateEmail(email)){
        setError("Enter a valid email address")
        return
    }

    if (method === "register" && !validatePassword(password)){
        setError("Password must contain at least one uppercase letter, one lowercase letter, one special character, and be at least 8 characters long")
        return
    }


    setLoading(true);

    try {
      const res = await api.post(route, { email, username, password });
      if (method === "login") {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
        navigate("/");
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.error("Error", error);
    //   alert(error);
    if (error.response && error.response.status === 401) {
        setError("Invalid username or password");
      } else {
        setError("An error occurred. Please try again or use different credentials.");
      }
    } finally {
      setLoading(false);
    }
  };

  const validateEmail = (email) => {
    const re = 
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    return re.test(String(email).toLowerCase())
  }
  const validatePassword = (password) => {
    const re =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
    return re.test(password);
  }

//   redirect to register
const registerRedirect = () => {
    navigate('/register')
}
// redirect to login
const loginRedirect = () => {
    navigate('/login')
}

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h1>{name}</h1>
      {error && <p className="error-message"> {error} </p>}

      {/* render email for registration */}
      {method === "register" && (
        <input
          className="form-input"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
      )}

      {/* common fields for both login and register */}
      <input
        className="form-input"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input
        className="form-input"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      {loading && <LoadingIndicator />}
      <button className="form-button" type="submit">
        {name}
      </button>
      {method === 'login' ?(
        <p className="register-link" onClick={registerRedirect}>Don't have an account? Register here</p>
      ):
      <p className="login-link" onClick={loginRedirect}>Already have an account? Login</p>
      }
    </form>
  );
}

export default Form;
