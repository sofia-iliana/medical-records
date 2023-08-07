import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { MdNotifications } from "react-icons/md";
import "../Notification.css";
import { RxDropdownMenu } from "react-icons/rx";

function PatientNav() {
  const [results, setResults] = useState([]);
  const [show, setShow] = useState(false);
  const [requestId, setRequestId] = useState("");

  useEffect(() => {
    axios.get("http://localhost:1212/request/get/123456").then(({ data }) => {
      setResults(data);
      console.log(results);
    });
  }, []);

  function showHide() {
    setShow(!show);
  }

  function giveAccess() {
    console.log(requestId);
  }

  return (
    <div className="notificationContainer">
      <div className="icon">
        <button
          className="notificationBtn"
          onClick={() => {
            showHide();
          }}
        >
          <MdNotifications className="bell"></MdNotifications>
        </button>
        <button className="menu">
          <RxDropdownMenu></RxDropdownMenu>
        </button>
      </div>
      {results.length !== 0 && <div className="number">{results.length}</div>}

      {show && (
        <ul className="msgs">
          {results.map((result) => {
            return (
              <li key={result._id}>
                Doctor {result.doctorName} requests access to your medical
                records
                {result.userId}
                <button
                  onClick={() => {
                    setRequestId(result._id);
                    giveAccess();
                  }}
                >
                  accept
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default PatientNav;
