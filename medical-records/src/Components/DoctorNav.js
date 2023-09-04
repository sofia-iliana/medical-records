import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { MdNotifications } from "react-icons/md";
import "./style/Notification.css";
import { LuAlignJustify } from "react-icons/lu";
import { IoIosPulse } from "react-icons/io";

function DoctorNav(props) {
  const [results, setResults] = useState([]);
  const [show, setShow] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
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
    if (showMenu) {
      setShowMenu(false);
    }
  }

  function showHideMenu() {
    setShowMenu(!showMenu);
    if (show) {
      setShow(false);
    }
  }

  const signOut = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="notificationContainer">
      <div className="profileTitle">
        <IoIosPulse className="pulse"></IoIosPulse>
        <h1 className="pageTitle">Medical Records</h1>
      </div>
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
        <ul className="msgs dropdownMenu">
          <li
            className="menuLink gray"
            onClick={() => {
              navigate("/doctorProfile");
            }}
          >
            Profile
          </li>
          <li
            className="gray"
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
            if (result.allow) {
              return (
                <li className="messageBox" key={result._id}>
                  Patient {result.userName} gave you access to medical records
                  <button
                    className="viewBtn"
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
            }
          })}
        </ul>
      )}
    </div>
  );
}

export default DoctorNav;
