import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { MdOutlineEdit } from "react-icons/md";
import { AiOutlineCloseCircle } from "react-icons/ai";
import DisconnectButton from "./DisconnectFromEntries";
import DoctorNav from "./DoctorNav";
import Footer from "./Footer";

function EntryForDoctor() {
  const [doctor, setDoctor] = useState({});
  const [entry, setEntry] = useState({});
  const [specialtyEdit, setSpecialtyEdit] = useState(false);
  const [testEdit, setTestEdit] = useState(false);
  const [reportEdit, setReportEdit] = useState(false);
  const [specialty, setSpecialty] = useState(entry.specialty);
  const [test, setTest] = useState(entry.kindOfTest);
  const [report, setReport] = useState(entry.medicalReport);
  const [showImage, setShowImage] = useState(false);
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

  function showSpecialty() {
    setSpecialtyEdit(!specialtyEdit);
  }

  function showTest() {
    setTestEdit(!testEdit);
  }

  function showReport() {
    setReportEdit(!reportEdit);
  }

  function showHideImage() {
    setShowImage(!showImage);
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
    <div className="mainDoctorProfile">
      <DoctorNav doctorId={doctor._id}></DoctorNav>
      <div className="entryHeadline">
        <h1 className="entryTitle">Medical Entry</h1>
        <DisconnectButton className="entryExitBtn"></DisconnectButton>
      </div>

      <div className="wholeEntry">
        <div className="entryDetails marginLeft">
          <p>
            <span className="bold">Full Name:</span> {entry.fullName}
          </p>
          <p>
            <span className="bold">Social Security Number:</span>{" "}
            {entry.socialSecNum}
          </p>
          <p>
            <span className="bold">Date: </span>
            {entry.date}
          </p>
          <div className="editEntry">
            <p>
              <span className="bold">Specialty:</span> {entry.specialty}
            </p>
            <button
              className="editBtn"
              onClick={() => {
                showSpecialty();
              }}
            >
              <MdOutlineEdit></MdOutlineEdit>
            </button>
            {specialtyEdit && (
              <input
                className="inputField marginTop"
                onChange={(e) => {
                  setSpecialty(e.currentTarget.value);
                }}
              ></input>
            )}
          </div>
          <div className="editEntry">
            <p>
              <span className="bold">Medical Test:</span> {entry.kindOfTest}
            </p>
            <button
              className="editBtn"
              onClick={() => {
                showTest();
              }}
            >
              <MdOutlineEdit></MdOutlineEdit>
            </button>
            {testEdit && (
              <input
                className="inputField marginTop"
                onChange={(e) => {
                  setTest(e.target.value);
                }}
              ></input>
            )}
          </div>
          <div className="editEntry">
            <p>
              <span className="bold">Medical Report:</span>{" "}
              {entry.medicalReport}
            </p>
            <button
              className="editBtn"
              onClick={() => {
                showReport();
              }}
            >
              <MdOutlineEdit></MdOutlineEdit>
            </button>
            {reportEdit && (
              <textarea
                className="doctorTextarea marginTop"
                onChange={(e) => {
                  setReport(e.currentTarget.value);
                }}
              ></textarea>
            )}
          </div>
        </div>

        <div>
          <p
            className="bold"
            style={{
              textAlign: "center",
              marginRight: "600px",
              marginTop: "100px",
            }}
          >
            Image:{" "}
          </p>
          {entry.img ? (
            <>
              <img
                src={entry.img.url}
                className="image"
                onClick={() => {
                  showHideImage();
                }}
              ></img>
              {
                //image popup
                showImage && (
                  <div className="modal">
                    <button
                      className="closeBtn"
                      onClick={() => {
                        showHideImage();
                      }}
                    >
                      <AiOutlineCloseCircle></AiOutlineCloseCircle>
                    </button>
                    <img src={entry.img.url}></img>
                  </div>
                )
              }
            </>
          ) : (
            <p
              style={{
                textAlign: "center",
                marginRight: "600px",
                marginTop: "100px",
                fontSize: "20px",
              }}
            >
              No image found
            </p>
          )}
        </div>
      </div>
      <div className="btnContainer">
        <button
          className="searchBtn marginRight"
          style={{ width: "120px" }}
          onClick={() => {
            updateEntry();
          }}
        >
          Save changes
        </button>
      </div>

      <Footer></Footer>
    </div>
  );
}

export default EntryForDoctor;
/*<div
              className="modal fade"
              id="imageEntry"
              tabIndex="-1"
              aria-hidden="true"
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-body">
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                    <img src={entry.img.url} className="d-block w-100"></img>
                  </div>
                </div>
              </div>
            </div>*/

//data-bs-toggle="modal"
// data-bs-target="#imageEntry"
