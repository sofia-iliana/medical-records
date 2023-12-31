import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PatientNav from "./PatientNav";
import Footer from "./Footer";

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
        .post("https://medical-records-backend.onrender.com/user/verify", {
          token: localStorage.getItem("token"),
        })
        .then(({ data }) => {
          if (data._id) {
            setUser(data);
            console.log(data._id);
            axios
              .get(
                "https://medical-records-backend.onrender.com/entry/user/" +
                  data._id
              )
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
    <div className="mainContainer">
      <PatientNav userId={user._id}></PatientNav>
      <div>
        <div className="headlineInput">
          <h2 className="welcome">Welcome {user.fullName}</h2>
          <h4>View your medical history</h4>
          <div className="patientSearch">
            <div className="profileInput">
              <label htmlFor="searchBy" className="bold">
                Search by:
              </label>
              <select
                className="roleSelect"
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
                  <div className="profileInput">
                    <label htmlFor="date" className="bold">
                      Date:
                    </label>
                    <DatePicker
                      className="inputField"
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
                  <div className="profileInput">
                    <label htmlFor="specialty" className="bold">
                      Specialty:
                    </label>
                    <input
                      className="inputField"
                      id="specialty"
                      onChange={(e) => {
                        setSpecialty(e.target.value);
                      }}
                    ></input>
                  </div>
                );
              } else {
                return (
                  <div className="profileInput">
                    <label htmlFor="test" className="bold">
                      Medical Test:
                    </label>
                    <input
                      className="inputField"
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
              className="searchBtn"
              onClick={() => {
                searchEntries();
                setShow(false);
              }}
            >
              Search
            </button>
          </div>
        </div>

        <div className="table">
          {entries.length !== 0 ? (
            show && (
              <table>
                <tr>
                  <th className="tbl-header">Date</th>
                  <th className="tbl-header">Specialty</th>
                  <th className="tbl-header">Medical Test</th>
                  <th className="tbl-header lastCell"></th>
                </tr>

                {entries.map((entry) => {
                  return (
                    <tr className="tbl-content" key={entry._id}>
                      <td>{entry.date}</td>
                      <td>{entry.specialty}</td>
                      <td>{entry.kindOfTest}</td>
                      <td>
                        <button
                          className="viewBtn"
                          onClick={() => {
                            localStorage.setItem("entry", entry._id);
                            navigate("/entry");
                          }}
                        >
                          View
                        </button>
                      </td>
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
                <th className="tbl-header">Date</th>
                <th className="tbl-header">Specialty</th>
                <th className="tbl-header">Medical Test</th>
                <th className="tbl-header lastCell"></th>
              </tr>
              {filteredEntries.map((entry) => {
                return (
                  <tr className="tbl-content" key={entry._id}>
                    <td>{entry.date}</td>
                    <td>{entry.specialty}</td>
                    <td>{entry.kindOfTest}</td>
                    <td>
                      <button
                        className="viewBtn"
                        onClick={() => {
                          localStorage.setItem("entry", entry._id);
                          navigate("/entry");
                        }}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                );
              })}
            </table>
          )}
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default UserProfile;
