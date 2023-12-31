import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { IoIosPulse } from "react-icons/io";
import "../Components/style/Login.css";
import Footer from "./Footer";
import axios from "axios";

function Login() {
  const [role, setRole] = useState("patient");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function toSignup() {
    navigate("/signup");
  }

  function sendPost(url, path) {
    axios
      .post(url, {
        email,
        password,
      })
      .then(({ data }) => {
        console.log(data);
        if (data.token) {
          localStorage.setItem("token", data.token);
          navigate(path);
        } else {
          alert(data.msg);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //checks if you are logging in as patient or doctor
  function login() {
    if (email && password) {
      if (role === "patient") {
        sendPost(
          "https://medical-records-backend.onrender.com/user/login",
          "/profile"
        );
      } else {
        sendPost(
          "https://medical-records-backend.onrender.com/doctor/login",
          "/doctorProfile"
        );
      }
    } else {
      alert("Enter email and password");
    }
  }

  return (
    <div className="container">
      <div className="header">
        <IoIosPulse className="pulseIcon"></IoIosPulse>
        <h1 className="title">Medical Records</h1>
      </div>

      <div className="formContainer">
        <h1 className="login">Login</h1>
        <div className="roleContainer">
          <label htmlFor="role">Login as:</label>
          <select
            className="roleSelect"
            name="role"
            id="role"
            onChange={(e) => {
              setRole(e.target.value);
            }}
          >
            <option value="patient">Patient</option>
            <option value="doctor">Doctor</option>
          </select>
        </div>

        <div className="inputs">
          <label htmlFor="email">Email:</label>
          <input
            className="inputField"
            id="email"
            placeholder="Email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          ></input>
        </div>
        <div className="inputs">
          <label htmlFor="password">Password:</label>
          <input
            className="inputField"
            id="password"
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          ></input>
        </div>

        <button
          className="btn"
          onClick={() => {
            login();
          }}
        >
          Login
        </button>
        <p className="textLink">
          If you don't have an account{" "}
          <a
            onClick={() => {
              toSignup();
            }}
          >
            {" "}
            Sign up
          </a>
        </p>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default Login;
