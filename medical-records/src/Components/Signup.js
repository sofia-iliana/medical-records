import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function Signup() {
  const [role, setRole] = useState("patient");
  const [roleB, setRoleB] = useState(true);
  const navigate = useNavigate();

  function toLogin() {
    navigate("/login");
  }

  function chooseRole() {
    if (role === "patient") {
      setRoleB(true);
    } else {
      setRoleB(false);
    }
    console.log(roleB);
  }

  return (
    <div>
      <div>
        <h1>Signup</h1>
        <label for="role">Signup as:</label>
        <select
          name="role"
          id="role"
          onChange={(e) => {
            setRole(e.target.value);
            chooseRole();
          }}
        >
          <option value="patient">Patient</option>
          <option value="doctor">Doctor</option>
        </select>
        {roleB ? (
          <div>
            <label for="fullName">Full Name:</label>
            <input id="fullName" placeholder="Full name"></input>
            <label for="specialty">Specialty:</label>
            <input id="specialty" placeholder="Specialty"></input>
            <label for="email">Email:</label>
            <input id="email" placeholder="Email"></input>
            <label for="password">Password:</label>
            <input id="password" placeholder="Password"></input>
          </div>
        ) : (
          <div>
            <label for="fullName">Full Name:</label>
            <input id="fullName" placeholder="Full name"></input>
            <label for="socialSecNum">Social Security Number:</label>
            <input
              id="socialSecNum"
              placeholder="Social security number"
            ></input>
            <label for="dateOfBirth">Date Of Birth:</label>
            <input id="dateOfBirth" placeholder="Date of birth"></input>
            <label for="phone">Phone Number:</label>
            <input id="phone" placeholder="Phone number"></input>
            <label for="email">Email:</label>
            <input id="email" placeholder="Email"></input>
            <label for="password">Password:</label>
            <input id="password" placeholder="Password"></input>
          </div>
        )}
        <button>Signup</button>
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
