import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import DisconnectButton from "./DisconnectFromEntries";
import DoctorNav from "./DoctorNav";
import axios from "axios";
import Footer from "./Footer";

function EntriesForDoctor() {
  const [access, setAccess] = useState("");
  const [entries, setEntries] = useState([]);
  const [doctor, setDoctor] = useState("");
  const [date, setDate] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [test, setTest] = useState("");
  const [search, setSearch] = useState("date");
  const [filteredEntries, setFilteredEntries] = useState([]);
  const [show, setShow] = useState(true);
  const navigate = useNavigate();
  const [patientName, setPatientName] = useState("");

  useEffect(() => {
    if (localStorage.getItem("token")) {
      axios
        .post("https://medical-records-backend.onrender.com/doctor/verify", {
          token: localStorage.getItem("token"),
        })
        .then(({ data }) => {
          if (data._id) {
            setDoctor(data);
            console.log(data._id);
            if (localStorage.getItem("accessRequest")) {
              //get the request data to check if patient have given permission
              axios
                .get(
                  "https://medical-records-backend.onrender.com/request/getEntry/" +
                    localStorage.getItem("accessRequest") //the id of the request
                )
                .then(({ data }) => {
                  if (data) {
                    console.log(data);
                    setAccess(data);
                    if (data[0].allow) {
                      //if doctor has permission, get the entries of the patient
                      axios
                        .get(
                          "https://medical-records-backend.onrender.com/entry/user/" +
                            data[0].userId
                        )
                        .then(({ data }) => {
                          setPatientName(data[0].fullName);
                          console.log(data);
                          setEntries(data);
                        });
                    }
                  }
                });
            }
          } else {
            navigate("/"); //go to login
          }
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
    <div className="mainDoctorProfile">
      <DoctorNav doctorId={doctor._id}></DoctorNav>
      <div className="flex">
        <h2 className="welcome marginLeft">Welcome {doctor.fullName}</h2>
        <DisconnectButton className="exitBtn"></DisconnectButton>
      </div>
      <h4 className="marginLeft">View patient's entries</h4>
      <div className="patientSearch">
        <div className="profileInput marginLeft">
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
              <div className="profileInput marginLeft">
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
              <div className="profileInput marginLeft">
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
              <div className="profileInput marginLeft">
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

      <h4 className="resultsHeadline">Results for patient {patientName}</h4>
      <div className="doctorTableEntries">
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
                  <tr key={entry._id} className="tbl-content">
                    <td>{entry.date}</td>
                    <td>{entry.specialty}</td>
                    <td>{entry.kindOfTest}</td>
                    <td>
                      <button
                        className="viewBtn"
                        onClick={() => {
                          localStorage.setItem("entry", entry._id);
                          navigate("/doctorEntry");
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
                        navigate("/doctorEntry");
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

      <Footer></Footer>
    </div>
  );
}

export default EntriesForDoctor;
