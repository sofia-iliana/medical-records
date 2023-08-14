import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PatientNav from "./PatientNav";
import Footer from "./Footer";

function NewEntry() {
  const [image, setImage] = useState("");
  const [date, setDate] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [test, setTest] = useState("");
  const [report, setReport] = useState("");
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      axios
        .post("http://localhost:1212/user/verify", {
          token: localStorage.getItem("token"),
        })
        .then(({ data }) => {
          setUser(data);
          console.log(data);
        });
    }
  }, []);

  function submitEntry() {
    axios
      .post("http://localhost:1212/entry/create", {
        fullName: user.fullName,
        socialSecNum: user.socialSecNum,
        userId: user._id,
        specialty: specialty,
        medicalReport: report,
        kindOfTest: test,
        date:
          date.getDate() +
          "/" +
          (date.getMonth() + 1) +
          "/" +
          date.getFullYear(),
        img: image,
      })
      .then((res) => {
        console.log(res);
        alert("Your entry has been submitted successfully!");
        window.location.reload(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleUploadImage(e) {
    const file = e.target.files[0];
    console.log(file);
    transformFile(file);
  }

  function transformFile(file) {
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImage(reader.result);
      };
    } else {
      setImage("");
    }
  }

  return (
    <div className="mainContainer">
      <PatientNav userId={user._id}></PatientNav>
      <h1 className="newEntryTitle">New Medical Entry</h1>
      <h4 className="newEntryText marginLeft">
        Fill the form to create new entry
      </h4>
      <div className="newContainer">
        <div className="fitContent">
          <div className="profileInput marginLeft">
            <label for="date">Date:</label>
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
          <div className="profileInput marginLeft">
            <label for="specialty">Specialty:</label>
            <input
              className="inputField"
              id="specialty"
              placeholder="Specialty"
              onChange={(e) => {
                setSpecialty(e.target.value);
              }}
            ></input>
          </div>
          <div className="profileInput marginLeft">
            <label for="test">Medical Test:</label>
            <input
              className="inputField"
              id="test"
              placeholder="Medical test"
              onChange={(e) => {
                setTest(e.target.value);
              }}
            ></input>
          </div>
          <div className="profileInput marginLeft">
            <label for="upload"> Upload test results:</label>
            <input
              type="file"
              accept="image/"
              onChange={(e) => {
                handleUploadImage(e);
              }}
            />
          </div>
        </div>

        <div className="reportInput marginLeft">
          <label for="report">Medical Report:</label>
          <textarea
            className="medicalReport"
            id="report"
            placeholder="Medical report"
            onChange={(e) => {
              setReport(e.target.value);
            }}
          ></textarea>
        </div>
      </div>

      <button
        className="saveBtn"
        onClick={() => {
          submitEntry();
          console.log(
            image,
            test,
            report,
            date.getDate() +
              "/" +
              (date.getMonth() + 1) +
              "/" +
              date.getFullYear(),
            specialty
          );
        }}
      >
        Save
      </button>
      <Footer></Footer>
    </div>
  );
}

export default NewEntry;
