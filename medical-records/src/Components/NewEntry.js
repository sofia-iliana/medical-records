import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function NewEntry() {
  const [image, setImage] = useState("");

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
      <h1>New Medical Entry</h1>
      <div>
        <label for="date">Date:</label>
        <DatePicker id="date"></DatePicker>
      </div>
      <div>
        <label for="specialty">Specialty:</label>
        <input id="specialty" placeholder="Specialty"></input>
      </div>
      <div>
        <label for="test">Medical Test:</label>
        <input id="test" placeholder="Medical test"></input>
      </div>
      <div>
        <label for="report">Medical Report:</label>
        <textarea id="report" placeholder="Medical report"></textarea>
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
          console.log(image);
        }}
      >
        New Entry
      </button>
    </div>
  );
}

export default NewEntry;
