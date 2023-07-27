import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function UserProfile() {
  const [search, setSearch] = useState("date");
  return (
    <div>
      <h2>Welcome</h2>
      <div>
        <label for="searchBy">Search by:</label>
        <select
          name="searchBy"
          id="searchBy"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        >
          <option value="date">Date</option>
          <option value="specialty">Specialty</option>
          <option value="test">Medical Test</option>
        </select>
      </div>
    </div>
  );
}

export default UserProfile;
