import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { IoIosPulse } from "react-icons/io";
import Footer from "./Footer";
import axios from "axios";

function Signup() {
  const [role, setRole] = useState("patient");
  const [fullName, setFullName] = useState("");
  const [socialSecNum, setSocialSecNum] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [specialty, setSpecialty] = useState("");
  const navigate = useNavigate();

  function toLogin() {
    navigate("/");
  }

  //make a post request to sing up a user
  function sendPost(url, path, signupObj) {
    axios
      .post(url, signupObj)
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

  //signup as user or doctor
  function signup() {
    if (email && password && fullName) {
      if (role === "patient") {
        sendPost(
          "https://medical-records-backend.onrender.com/user/signup",
          "/profile",
          {
            fullName,
            email,
            password,
            phone,
            socialSecNum,
            dateOfBirth,
            role,
          }
        );
      } else {
        sendPost(
          "https://medical-records-backend.onrender.com/doctor/signup",
          "/doctorProfile",
          {
            fullName,
            email,
            password,
            specialty,
            role,
          }
        );
      }
    } else {
      alert("Please, fill the form");
    }
    console.log({
      fullName,
      email,
      password,
      specialty,
      role,
    });
  }

  return (
    <div className="container">
      <div className="header">
        <IoIosPulse className="pulseIcon"></IoIosPulse>
        <h1 className="title">Medical Records</h1>
      </div>
      <div className="formContainerSignup">
        <h1 className="login">Sign up</h1>
        <div className="roleContainer">
          <label htmlFor="role">Sign up as:</label>
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

        {role === "doctor" ? (
          <div>
            <div className="inputs">
              <label htmlFor="fullName">Full Name:</label>
              <input
                className="inputField"
                id="fullName"
                placeholder="Full name"
                onChange={(e) => {
                  setFullName(e.target.value);
                }}
              ></input>
            </div>
            <div className="inputs">
              <label htmlFor="specialty">Specialty:</label>
              <input
                className="inputField"
                id="specialty"
                placeholder="Specialty"
                onChange={(e) => {
                  setSpecialty(e.target.value);
                }}
              ></input>
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
          </div>
        ) : (
          <div>
            <div className="inputs">
              <label htmlFor="fullName">Full Name:</label>
              <input
                className="inputField"
                id="fullName"
                placeholder="Full name"
                onChange={(e) => {
                  setFullName(e.target.value);
                }}
              ></input>
            </div>
            <div className="inputs">
              <label htmlFor="socialSecNum">Social Security Number:</label>
              <input
                className="inputField"
                id="socialSecNum"
                placeholder="Social security number"
                onChange={(e) => {
                  setSocialSecNum(e.target.value);
                }}
              ></input>
            </div>
            <div className="inputs">
              <label htmlFor="dateOfBirth">Date Of Birth:</label>
              <input
                className="inputField"
                id="dateOfBirth"
                placeholder="Date of birth"
                onChange={(e) => {
                  setDateOfBirth(e.target.value);
                }}
              ></input>
            </div>
            <div className="inputs">
              <label htmlFor="phone">Phone Number:</label>
              <input
                className="inputField"
                id="phone"
                placeholder="Phone number"
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
              ></input>
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
          </div>
        )}
        <button
          className="btn"
          onClick={() => {
            signup();
          }}
        >
          Sign up
        </button>
        <p className="textLink">
          If you have an account{" "}
          <a
            onClick={() => {
              toLogin();
            }}
          >
            {" "}
            Login
          </a>
        </p>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default Signup;
