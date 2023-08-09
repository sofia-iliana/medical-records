import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { MdNotifications } from "react-icons/md";
import "../Notification.css";
import { LuAlignJustify } from "react-icons/lu";

function DoctorNav(props) {
  const [results, setResults] = useState([]);
  const [show, setShow] = useState(false);
  const [requestId, setRequestId] = useState("");
  const navigate = useNavigate();

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
          <LuAlignJustify></LuAlignJustify>
        </button>
      </div>
      {results.length !== 0 && <div className="number">{results.length}</div>}

      {show && (
        <ul className="msgs">
          {results.map((result) => {
            return (
              <li key={result._id}>
                Patient {result.userName} gave you access to medical records
                <button
                  onClick={() => {
                    setRequestId(result._id);
                    localStorage.setItem("accessRequest", result._id);
                    navigate("/doctorEntries");
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
