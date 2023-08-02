import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function Entry() {
  const [user, setUser] = useState({});
  const [entry, setEntry] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      axios
        .post("http://localhost:1212/user/verify", {
          token: localStorage.getItem("token"),
        })
        .then(({ data }) => {
          if (data._id) {
            setUser(data);
            console.log(data._id);
            axios
              .get(
                "http://localhost:1212/entry/id/" +
                  localStorage.getItem("entry")
              )
              .then(({ data }) => {
                console.log(data);
                setEntry(data);
              });
          } else {
            navigate("/"); //go to login
          }
          console.log(data);
        });
    } else {
      navigate("/");
    }
  }, []);

  return (
    <div>
      <h1>Medical Records</h1>
      <div>
        <p>Full Name: {user.fullName}</p>
        <p></p>
      </div>
      <div>
        <p>Social Security Number: {user.socialSecNum}</p>
        <p></p>
      </div>
      <div>
        <p>Date Of Birth: {user.dateOfBirth}</p>
        <p></p>
      </div>
      <div>
        <p>Date: {entry.date}</p>
        <p></p>
      </div>
      <div>
        <p>Specialty: {entry.specialty}</p>
        <p></p>
      </div>
      <div>
        <p>Medical Test: {entry.kindOfTest}</p>
        <p></p>
      </div>
      <div>
        <p>Medical Report: {entry.medicalReport}</p>
        <p></p>
      </div>
      <div>
        <p>Image: </p>
        {entry.img ? (
          <>
            <img src={entry.img.url}></img>
          </>
        ) : (
          <p>No image found</p>
        )}

        <p></p>
      </div>
      <button>Update</button>
      <button>Delete</button>
    </div>
  );
}

export default Entry;
