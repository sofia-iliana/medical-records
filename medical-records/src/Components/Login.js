import { useNavigate } from "react-router-dom";
import { useState } from "react";
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
        sendPost("http://localhost:1212/user/login", "/profile");
      } else {
        sendPost("http://localhost:1212/doctor/login", "/doctorProfile");
      }
    } else {
      alert("Enter email and password");
    }
  }

  return (
    <div className="container">
      <div className="formContainer">
        <h1>Login</h1>
        <div>
          <label htmlFor="role">Login as:</label>
          <select
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

        <div>
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            placeholder="Email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          ></input>
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          ></input>
        </div>

        <button
          onClick={() => {
            login();
          }}
        >
          Login
        </button>
        <p>
          If you don't have an account{" "}
          <a
            onClick={() => {
              toSignup();
            }}
          >
            {" "}
            Signup
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;
