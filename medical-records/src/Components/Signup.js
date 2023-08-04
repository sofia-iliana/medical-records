import { useNavigate } from "react-router-dom";
import { useState } from "react";
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
  const [userSignup, setUserSignup] = useState({
    fullName,
    email,
    password,
    phone,
    socialSecNum,
    dateOfBirth,
    role,
  });
  const [doctorSignup, setDoctorSignup] = useState({
    fullName,
    email,
    password,
    specialty,
    role,
  });

  function toLogin() {
    navigate("/");
  }

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
        sendPost("http://localhost:1212/user/signup", "/profile", userSignup);
      } else {
        sendPost(
          "http://localhost:1212/doctor/signup",
          "/doctorProfile",
          doctorSignup
        );
      }
    } else {
      alert("Please, fill the form");
    }
  }

  return (
    <div className="container">
      <div className="formContainer">
        <h1>Signup</h1>
        <div>
          <label htmlFor="role">Signup as:</label>
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

        {role === "doctor" ? (
          <div>
            <div>
              <label htmlFor="fullName">Full Name:</label>
              <input
                id="fullName"
                placeholder="Full name"
                onChange={(e) => {
                  setFullName(e.target.value);
                }}
              ></input>
            </div>
            <div>
              <label htmlFor="specialty">Specialty:</label>
              <input
                id="specialty"
                placeholder="Specialty"
                onChange={(e) => {
                  setSpecialty(e.target.value);
                }}
              ></input>
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
          </div>
        ) : (
          <div>
            <div>
              <label htmlFor="fullName">Full Name:</label>
              <input
                id="fullName"
                placeholder="Full name"
                onChange={(e) => {
                  setFullName(e.target.value);
                }}
              ></input>
            </div>
            <div>
              <label htmlFor="socialSecNum">Social Security Number:</label>
              <input
                id="socialSecNum"
                placeholder="Social security number"
                onChange={(e) => {
                  setSocialSecNum(e.target.value);
                }}
              ></input>
            </div>
            <div>
              <label htmlFor="dateOfBirth">Date Of Birth:</label>
              <input
                id="dateOfBirth"
                placeholder="Date of birth"
                onChange={(e) => {
                  setDateOfBirth(e.target.value);
                }}
              ></input>
            </div>
            <div>
              <label htmlFor="phone">Phone Number:</label>
              <input
                id="phone"
                placeholder="Phone number"
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
              ></input>
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
          </div>
        )}
        <button
          onClick={() => {
            signup();
          }}
        >
          Signup
        </button>
        <p>
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
    </div>
  );
}

export default Signup;
