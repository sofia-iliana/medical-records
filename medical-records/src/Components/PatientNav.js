import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { MdNotifications } from "react-icons/md";
import "../Notification.css";
import { LuAlignJustify } from "react-icons/lu";

function PatientNav(props) {
  const [results, setResults] = useState([]);
  const [show, setShow] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [requestId, setRequestId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:1212/request/get/" + props.userId)
      .then(({ data }) => {
        setResults(data);
        console.log(results);
      });
  }, [results]);

  function showHide() {
    setShow(!show);
  }

  function showHideMenu() {
    setShowMenu(!showMenu);
  }

  const signOut = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

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
        <button
          className="menu"
          onClick={() => {
            showHideMenu();
          }}
        >
          <LuAlignJustify></LuAlignJustify>
        </button>
      </div>
      {showMenu && (
        <ul className="msgs">
          <li
            onClick={() => {
              navigate("/profile");
            }}
          >
            Profile
          </li>
          <li
            onClick={() => {
              navigate("/newEntry");
            }}
          >
            Create New Entry
          </li>
          <li
            onClick={() => {
              signOut();
            }}
          >
            Sign Out
          </li>
        </ul>
      )}

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
