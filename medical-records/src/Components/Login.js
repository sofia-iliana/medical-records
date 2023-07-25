import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function Login() {
  const [role, setRole] = useState("patient");
  const [roleB, setRoleB] = useState(true);
  const navigate = useNavigate();

  function toSignup() {
    navigate("/signup");
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
    <div className="container">
      <div className="formContainer">
        <h1>Login</h1>
        <div>
          <label for="role">Login as:</label>
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
        </div>

        {roleB ? (
          <div>
            <div>
              <label for="email">Email:</label>
              <input id="email" placeholder="Email"></input>
            </div>
            <div>
              <label for="password">Password:</label>
              <input id="password" placeholder="Password"></input>
            </div>
          </div>
        ) : (
          <div>
            <div>
              <label for="email">Email:</label>
              <input id="email" placeholder="Email"></input>
            </div>
            <div>
              <label for="password">Password:</label>
              <input id="password" placeholder="Password"></input>
            </div>
          </div>
        )}
        <button>Login</button>
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
