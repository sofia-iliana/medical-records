import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import DoctorNav from "./DoctorNav";
import Footer from "./Footer";

function DoctorProfile() {
  const [doctor, setDoctor] = useState("");
  const [socialSecNum, setSocialSecNum] = useState("");
  const [patients, setPatients] = useState([]);
  const [show, setShow] = useState(false);
  const [patientId, setPatientId] = useState("");
  const [patientName, setPatientName] = useState("");
  const navigate = useNavigate();

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
          } else {
            navigate("/"); //go to login
          }
          console.log(data);
        });
    } else {
      navigate("/"); // go to login
    }
  }, []);

  //find patients with social security number
  function getPatients() {
    if (socialSecNum) {
      axios
        .get("http://localhost:1212/user/ssn/" + socialSecNum)
        .then(({ data }) => {
          if (data) {
            console.log(data);
            setPatients(data);
          }
        });
    }
  }

  //send request to patient to view medical record
  function sendRequest() {
    if (patientId) {
      console.log(patientId);
      axios
        .post("http://localhost:1212/request/create", {
          doctorName: doctor.fullName,
          doctorId: doctor._id,
          userId: patientId,
          userName: patientName,
        })
        .then(({ data }) => {
          if (data) {
            alert(data.msg);
          }
        });
    }
  }

  function showValues() {
    setShow(true);
  }

  return (
    <div className="mainDoctorProfile">
      <DoctorNav doctorId={doctor._id}></DoctorNav>

      <h2>Welcome {doctor.fullName}</h2>
      <div>
        <h3>Search patient</h3>

        <div className="profileInput">
          <label htmlFor="socialSecNum">Social Security Number:</label>
          <input
            className="inputField width90"
            id="socialSecNum"
            placeholder="Social security number"
            onChange={(e) => {
              setSocialSecNum(e.target.value);
            }}
          ></input>
        </div>
        <button
          className="searchBtn"
          onClick={() => {
            getPatients();
            showValues();
          }}
        >
          Search
        </button>
      </div>

      {show && (
        <div className="doctorTable">
          {patients.length !== 0 ? (
            <table>
              <tr>
                <th className="tbl-header">Name</th>
                <th className="tbl-header">Social Security Number</th>
                <th className="tbl-header lastCell"></th>
              </tr>
              {patients.map((patient) => {
                return (
                  <tr className="tbl-content" key={patient._id}>
                    <td>{patient.fullName}</td>
                    <td>{patient.socialSecNum}</td>
                    <td>
                      <button
                        className="requestBtn"
                        onClick={() => {
                          setPatientId(patient._id);
                          setPatientName(patient.fullName);
                          sendRequest();
                        }}
                      >
                        Request Access
                      </button>
                    </td>
                  </tr>
                );
              })}
            </table>
          ) : (
            <p>No patients found</p>
          )}
        </div>
      )}
      <Footer></Footer>
    </div>
  );
}

export default DoctorProfile;
