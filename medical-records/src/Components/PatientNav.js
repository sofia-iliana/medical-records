import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { MdNotifications } from "react-icons/md";
import "./style/Notification.css";
import { LuAlignJustify } from "react-icons/lu";
import { IoIosPulse } from "react-icons/io";
import { AiOutlineCheckCircle } from "react-icons/ai";

function PatientNav(props) {
  const [results, setResults] = useState([]);
  const [show, setShow] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [requestId, setRequestId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(
        "https://medical-records-backend.onrender.com/request/get/" +
          props.userId
      )
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

  function giveAccess() {
    if (requestId) {
      axios
        .put(
          "https://medical-records-backend.onrender.com/request/access/" +
            requestId,
          {
            allow: true,
          }
        )
        .then(({ data }) => {
          alert(data.msg);
        });
      console.log(requestId);
    }
  }

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
              navigate("/profile");
            }}
          >
            Profile
          </li>
          <li
            className="menuLink gray"
            onClick={() => {
              navigate("/newEntry");
            }}
          >
            Create New Entry
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

      {results.length !== 0 && (
        <div
          className="number"
          onClick={() => {
            showHide();
          }}
        >
          {results.length}
        </div>
      )}
      {show && (
        <ul className="msgs">
          {results.map((result) => {
            return (
              <li className="messageBox" key={result._id}>
                Doctor {result.doctorName} requests access to your medical
                records
                {!result.allow ? (
                  <button
                    className="acceptBtn"
                    onClick={() => {
                      setRequestId(result._id);
                      giveAccess();
                    }}
                  >
                    Accept
                  </button>
                ) : (
                  <AiOutlineCheckCircle className="check"></AiOutlineCheckCircle>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default PatientNav;
