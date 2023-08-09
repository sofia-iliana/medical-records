import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import DisconnectButton from "./DisconnectFromEntries";
import DoctorNav from "./DoctorNav";
import axios from "axios";

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
        .post("http://localhost:1212/doctor/verify", {
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
                  "http://localhost:1212/request/getEntry/" +
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
                          "http://localhost:1212/entry/user/" + data[0].userId
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
    <div>
      <DoctorNav doctorId={doctor._id}></DoctorNav>
      <h2>Welcome {doctor.fullName}</h2>

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

      <h4>Results for patient {patientName}</h4>
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
                    navigate("/doctorEntry");
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
      <DisconnectButton></DisconnectButton>
    </div>
  );
}

export default EntriesForDoctor;
