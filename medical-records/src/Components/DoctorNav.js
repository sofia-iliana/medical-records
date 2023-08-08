import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { MdNotifications } from "react-icons/md";
import "../Notification.css";
import { RxDropdownMenu } from "react-icons/rx";

function DoctorNav(props) {
  const [results, setResults] = useState([]);
  const [show, setShow] = useState(false);
  const [requestId, setRequestId] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:1212/request/getForDoctor/" + props.doctorId)
      .then(({ data }) => {
        setResults(data);
        console.log(results);
      });
  }, [results]);

  function showHide() {
    setShow(!show);
  }

  function giveAccess() {
    axios
      .put("http://localhost:1212/request/access/" + requestId, { allow: true })
      .then(({ data }) => {
        alert(data.msg);
      });
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
                <button
                  onClick={() => {
                    setRequestId(result._id);
                    giveAccess();
                  }}
                >
                  View
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default DoctorNav;
