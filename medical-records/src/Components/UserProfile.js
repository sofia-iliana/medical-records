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
      {(() => {
        if (search === "date") {
          return (
            <div>
              <label for="date">Date:</label>
              <DatePicker id="date"></DatePicker>
            </div>
          );
        } else if (search === "specialty") {
          return (
            <div>
              <label for="specialty">Specialty:</label>
              <input id="specialty"></input>
            </div>
          );
        } else {
          return (
            <div>
              <label for="test">Medical Test:</label>
              <input id="test"></input>
            </div>
          );
        }
      })()}
      <button>Search</button>
      <h4>Results</h4>
      <ul>
        <li>test1</li>
      </ul>
    </div>
  );
}

export default UserProfile;
