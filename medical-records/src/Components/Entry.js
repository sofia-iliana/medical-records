import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { MdOutlineEdit } from "react-icons/md";
import PatientNav from "./PatientNav";

function Entry() {
  const [user, setUser] = useState({});
  const [entry, setEntry] = useState({});
  const [specialtyEdit, setSpecialtyEdit] = useState(false);
  const [testEdit, setTestEdit] = useState(false);
  const [reportEdit, setReportEdit] = useState(false);
  const [specialty, setSpecialty] = useState(entry.specialty);
  const [test, setTest] = useState(entry.kindOfTest);
  const [report, setReport] = useState(entry.medicalReport);
  const navigate = useNavigate();

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
              .get(
                "http://localhost:1212/entry/id/" +
                  localStorage.getItem("entry")
              )
              .then(({ data }) => {
                console.log(data);
                setEntry(data);
              });
          } else {
            navigate("/"); //go to login
          }
          console.log(data);
        });
    } else {
      navigate("/");
    }
  }, []);

  function deleteEntry() {
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this entry?"
    );
    if (shouldDelete) {
      axios
        .delete(
          "http://localhost:1212/entry/delete/" + localStorage.getItem("entry")
        )
        .then(({ data }) => {
          alert(data.msg);
          navigate("/profile");
        });
    }
  }

  function showSpecialty() {
    setSpecialtyEdit(!specialtyEdit);
  }

  function showTest() {
    setTestEdit(!testEdit);
  }

  function showReport() {
    setReportEdit(!reportEdit);
  }

  function updateEntry() {
    const shouldUpdate = window.confirm(
      "Are you sure you want to save the changes?"
    );
    if (shouldUpdate) {
      axios
        .put(
          "http://localhost:1212/entry/update/" + localStorage.getItem("entry"),
          { specialty, medicalReport: report, kindOfTest: test }
        )
        .then(({ data }) => {
          alert(data.msg);
          window.location.reload(false);
        });
    }
  }

  return (
    <div>
      <PatientNav userId={user._id}></PatientNav>
      <h1>Medical Records</h1>
      <div>
        <p>Full Name: {user.fullName}</p>
        <p></p>
      </div>
      <div>
        <p>Social Security Number: {user.socialSecNum}</p>
        <p></p>
      </div>
      <div>
        <p>Date Of Birth: {user.dateOfBirth}</p>
        <p></p>
      </div>
      <div>
        <p>Date: {entry.date}</p>
        <p></p>
      </div>
      <div>
        <p>Specialty: {entry.specialty}</p>
        <button
          onClick={() => {
            showSpecialty();
          }}
        >
          <MdOutlineEdit></MdOutlineEdit>
        </button>
        {specialtyEdit && (
          <input
            onChange={(e) => {
              setSpecialty(e.currentTarget.value);
            }}
          ></input>
        )}
      </div>
      <div>
        <p>Medical Test: {entry.kindOfTest}</p>
        <button
          onClick={() => {
            showTest();
          }}
        >
          <MdOutlineEdit></MdOutlineEdit>
        </button>
        {testEdit && (
          <input
            onChange={(e) => {
              setTest(e.target.value);
            }}
          ></input>
        )}
      </div>
      <div>
        <p>Medical Report: {entry.medicalReport}</p>
        <button
          onClick={() => {
            showReport();
          }}
        >
          <MdOutlineEdit></MdOutlineEdit>
        </button>
        {reportEdit && (
          <textarea
            onChange={(e) => {
              setReport(e.currentTarget.value);
            }}
          ></textarea>
        )}
      </div>
      <div>
        <p>Image: </p>
        {entry.img ? (
          <>
            <img src={entry.img.url}></img>
          </>
        ) : (
          <p>No image found</p>
        )}

        <p></p>
      </div>
      <button
        onClick={() => {
          updateEntry();
        }}
      >
        Save changes
      </button>
      <button
        onClick={() => {
          deleteEntry();
        }}
      >
        Delete
      </button>
    </div>
  );
}

export default Entry;
