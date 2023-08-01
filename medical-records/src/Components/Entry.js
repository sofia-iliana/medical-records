import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function Entry() {
  const [user, setUser] = useState({});
  return (
    <div>
      <h1>Medical Records</h1>
      <div>
        <p>Full Name:</p>
        <p></p>
      </div>
      <div>
        <p>Social Security Number:</p>
        <p></p>
      </div>
      <div>
        <p>Date Of Birth:</p>
        <p></p>
      </div>
      <div>
        <p>Date:</p>
        <p></p>
      </div>
      <div>
        <p>Specialty:</p>
        <p></p>
      </div>
      <div>
        <p>Medical Test:</p>
        <p></p>
      </div>
      <div>
        <p>Medical Report:</p>
        <p></p>
      </div>
      <div>
        <p>Image:</p>
        <p></p>
      </div>
      <button>Update</button>
      <button>Delete</button>
    </div>
  );
}

export default Entry;
