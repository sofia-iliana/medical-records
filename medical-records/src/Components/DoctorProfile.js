import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import SignOutButton from "./SignOutButton";

function DoctorProfile() {
  return (
    <div>
      <h2>Welcome </h2>
      <SignOutButton></SignOutButton>
      <h3>Search patient</h3>
      <div>
        <label htmlFor="fullName">Full Name:</label>
        <input id="fullName"></input>
      </div>
      <div>
        <label htmlFor="socialSecNum">Social Security Number:</label>
        <input id="socialSecNum"></input>
      </div>
      <button>Search</button>
    </div>
  );
}

export default DoctorProfile;
