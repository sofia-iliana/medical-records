import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import SignOutButton from "./SignOutButton";

function DoctorProfile() {
  const [doctor, setDoctor] = useState("");
  const [socialSecNum, setSocialSecNum] = useState("");
  const [patients, setPatients] = useState([]);
  const [show, setShow] = useState(false);
  const [patientId, setPatientId] = useState("");
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

  function sendRequest() {
    if (patientId) {
      axios
        .post("http://localhost:1212/request/create", {
          doctorName: doctor.fullName,
          doctorId: doctor._id,
          userId: patientId,
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
    <div>
      <h2>Welcome {doctor.fullName}</h2>
      <SignOutButton></SignOutButton>
      <h3>Search patient</h3>

      <div>
        <label htmlFor="socialSecNum">Social Security Number:</label>
        <input
          id="socialSecNum"
          placeholder="Social security number"
          onChange={(e) => {
            setSocialSecNum(e.target.value);
          }}
        ></input>
      </div>
      <button
        onClick={() => {
          getPatients();
          showValues();
        }}
      >
        Search
      </button>
      {show && (
        <div>
          {patients.length !== 0 ? (
            <table>
              <tr>
                <th>Name</th>
                <th>Social Security Number</th>
              </tr>
              {patients.map((patient) => {
                return (
                  <tr
                    key={patient._id}
                    onClick={() => {
                      setPatientId(patient._id);
                      console.log(patientId);
                    }}
                  >
                    <th>{patient.fullName}</th>
                    <th>{patient.socialSecNum}</th>
                  </tr>
                );
              })}
            </table>
          ) : (
            <p>No patients found</p>
          )}
        </div>
      )}
    </div>
  );
}

export default DoctorProfile;
