import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import SignOutButton from "./SignOutButton";
import PatientNav from "./PatientNav";

function UserProfile() {
  const [search, setSearch] = useState("date");
  const [user, setUser] = useState("");
  const [date, setDate] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [test, setTest] = useState("");
  const [entries, setEntries] = useState([]);
  const [filteredEntries, setFilteredEntries] = useState([]);
  const [show, setShow] = useState(true);
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
    if (search === "date" && date) {
      filtered = entries.filter((entry) => {
        return (
          entry.date >=
          date.getDate() +
            "/" +
            (date.getMonth() + 1) +
            "/" +
            date.getFullYear()
        );
      });
      console.log(filtered);
    } else if (search === "specialty" && specialty) {
      filtered = entries.filter((entry) => {
        return entry.specialty.toLowerCase() === specialty.toLowerCase();
      });
      console.log(filtered);
    } else if (test) {
      filtered = entries.filter((entry) => {
        return entry.kindOfTest.toLowerCase() === test.toLowerCase();
      });
    }
    console.log(date);
    setFilteredEntries(filtered);
  }

  return (
    <div>
      <PatientNav userId={user._id}></PatientNav>
      <h2>Welcome {user.fullName}</h2>
      <SignOutButton></SignOutButton>
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
          setShow(false);
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
      {entries.length !== 0 ? (
        show && (
          <table>
            <tr>
              <th>Date</th>
              <th>Specialty</th>
              <th>Medical Test</th>
            </tr>
            {entries.map((entry) => {
              return (
                <tr
                  key={entry._id}
                  onClick={() => {
                    localStorage.setItem("entry", entry._id);
                    navigate("/entry");
                  }}
                >
                  <th>{entry.date}</th>
                  <th>{entry.specialty}</th>
                  <th>{entry.kindOfTest}</th>
                </tr>
              );
            })}
          </table>
        )
      ) : (
        <p>No entries found</p>
      )}
      {!show && filteredEntries.length !== 0 && (
        <table>
          <tr>
            <th>Date</th>
            <th>Specialty</th>
            <th>Medical Test</th>
          </tr>
          {filteredEntries.map((entry) => {
            return (
              <tr
                key={entry._id}
                onClick={() => {
                  localStorage.setItem("entry", entry._id);
                  navigate("/entry");
                }}
              >
                <th>{entry.date}</th>
                <th>{entry.specialty}</th>
                <th>{entry.kindOfTest}</th>
              </tr>
            );
          })}
        </table>
      )}
    </div>
  );
}

export default UserProfile;
