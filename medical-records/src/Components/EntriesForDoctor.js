import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function EntriesForDoctor() {
  const [access, setAccess] = useState("");
  const [entries, setEntries] = useState([]);
  const [doctor, setDoctor] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      axios
        .post("http://localhost:1212/doctor/verify", {
          token: localStorage.getItem("token"),
        })
        .then(({ data }) => {
          if (data._id) {
            setDoctor(data);
            console.log(data._id);
            if (localStorage.getItem("user") && data._id) {
              axios
                .get(
                  "http://localhost:1212/request/getEntry/" +
                    localStorage.getItem("user") +
                    "/" +
                    data._id
                )
                .then(({ result }) => {
                  if (result) {
                    console.log(result);
                    setAccess(result);
                    /*if (data.allow) {
                      axios
                        .get(
                          "http://localhost:1212/entry/user/" +
                            localStorage.getItem("user")
                        )
                        .then(({ result }) => {
                          if (result._id) {
                            console.log(result);
                            setEntries(result);
                          }
                        });
                    }*/
                  } else {
                    console.log("error");
                  }
                });
            }
          } else {
            navigate("/"); //go to login
          }
        });
    } else {
      navigate("/"); // go to login
    }
  }, []);
}

export default EntriesForDoctor;
