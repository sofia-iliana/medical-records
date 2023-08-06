import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { MdNotifications } from "react-icons/md";

function GetResults() {
  const [results, setResults] = useState([]);
  const [show, setShow] = useState(false);
  const [requestId, setRequestId] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:1212/request/getForDoctor/12345")
      .then(({ data }) => {
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
    <div>
      <MdNotifications
        onClick={() => {
          showHide();
        }}
      ></MdNotifications>
      {show && (
        <ul>
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

export default GetResults;
