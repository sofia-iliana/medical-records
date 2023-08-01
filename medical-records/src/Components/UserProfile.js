import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function UserProfile() {
  const [search, setSearch] = useState("date");
  const [user, setUser] = useState("");
  const [date, setDate] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [test, setTest] = useState("");
  const [entries, setEntries] = useState([]);
  const [filteredEntries, setFilteredEntries] = useState([]);
  const navigate = useNavigate();

  //get all entries for user after login
  useEffect(() => {
    if (localStorage.getItem("token")) {
      axios
        .post("http://localhost:1212/user/verify", {
          token: localStorage.getItem("token"),
        })
        .then(({ data }) => {
          if (data._id) {
            setUser(data);
            console.log(data._id);
            axios
              .get("http://localhost:1212/entry/user/" + data._id)
              .then(({ data }) => {
                console.log(data);
                setEntries(data);
              });
          } else {
            navigate("/"); //go to login
          }
          console.log(data);
        });
    } else {
      navigate("/"); // go to login
    }
  }, []);

  //get all entries after searching
  function searchEntries() {
    let filtered = [];
    if (search === "date") {
      filtered = entries.filter((entry) => {
        return entry.date <= "date";
      });
      console.log(filtered);
    } else if (search === "specialty") {
      filtered = entries.filter((entry) => {
        return entry.specialty === specialty;
      });
      console.log(filtered);
    } else {
      filtered = entries.filter((entry) => {
        return entry.kindOfTest === test;
      });
      console.log(filtered);
    }

    setFilteredEntries(filtered);
  }

  return (
    <div>
      <h2>Welcome, {user.fullName}</h2>
      <div>
        <label htmlFor="searchBy">Search by:</label>
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
              <label htmlFor="date">Date:</label>
              <DatePicker
                id="date"
                selected={date}
                dateFormat="dd/MM/yyyy"
                onChange={(e) => {
                  setDate(e);
                }}
              ></DatePicker>
            </div>
          );
        } else if (search === "specialty") {
          return (
            <div>
              <label htmlFor="specialty">Specialty:</label>
              <input
                id="specialty"
                onChange={(e) => {
                  setSpecialty(e.target.value);
                }}
              ></input>
            </div>
          );
        } else {
          return (
            <div>
              <label htmlFor="test">Medical Test:</label>
              <input
                id="test"
                onChange={(e) => {
                  setTest(e.target.value);
                }}
              ></input>
            </div>
          );
        }
      })()}
      <button
        onClick={() => {
          searchEntries();
          console.log(filteredEntries);
        }}
      >
        Search
      </button>
      <button
        onClick={() => {
          navigate("/newEntry");
        }}
      >
        Create new entry
      </button>
      <h4>Results</h4>
      <table>
        <tr>
          <th>Date</th>
          <th>Specialty</th>
          <th>Medical Test</th>
        </tr>
        {entries.map((entry) => {
          return (
            <tr key={entry._id}>
              <th>{entry.date}</th>
              <th>{entry.specialty}</th>
              <th>{entry.kindOfTest}</th>
            </tr>
          );
        })}
      </table>
    </div>
  );
}

export default UserProfile;
