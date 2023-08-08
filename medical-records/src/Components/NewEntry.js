import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import SignOutButton from "./SignOutButton";
import PatientNav from "./PatientNav";

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
    <div>
      <PatientNav userId={user._id}></PatientNav>
      <h1>New Medical Entry</h1>
      <SignOutButton></SignOutButton>
      <div>
        <label for="date">Date:</label>
        <DatePicker
          id="date"
          selected={date}
          dateFormat="dd/MM/yyyy"
          onChange={(e) => {
            setDate(e);
          }}
        ></DatePicker>
      </div>
      <div>
        <label for="specialty">Specialty:</label>
        <input
          id="specialty"
          placeholder="Specialty"
          onChange={(e) => {
            setSpecialty(e.target.value);
          }}
        ></input>
      </div>
      <div>
        <label for="test">Medical Test:</label>
        <input
          id="test"
          placeholder="Medical test"
          onChange={(e) => {
            setTest(e.target.value);
          }}
        ></input>
      </div>
      <div>
        <label for="report">Medical Report:</label>
        <textarea
          id="report"
          placeholder="Medical report"
          onChange={(e) => {
            setReport(e.target.value);
          }}
        ></textarea>
      </div>
      <div>
        <label for="upload"> Upload the test results:</label>
        <input
          type="file"
          accept="image/"
          onChange={(e) => {
            handleUploadImage(e);
          }}
        />
      </div>
      <button
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
      <button
        onClick={() => {
          navigate("/profile");
        }}
      >
        Back to profile
      </button>
    </div>
  );
}

export default NewEntry;
