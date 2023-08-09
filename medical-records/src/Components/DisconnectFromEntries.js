import { useNavigate } from "react-router-dom";
import { ImExit } from "react-icons/im";
import axios from "axios";

function DisconnectButton() {
  const navigate = useNavigate();

  const disconnect = () => {
    if (localStorage.getItem("accessRequest")) {
      const shouldDisconnect = window.confirm(
        "Are you sure you want to exit patient's entries?"
      );
      if (shouldDisconnect) {
        axios
          .delete(
            "http://localhost:1212/request/delete/" +
              localStorage.getItem("accessRequest")
          )
          .then(({ data }) => {
            if (data) {
              localStorage.removeItem("accessRequest");
              navigate("/doctorProfile");
            }
          });
      }
    }
  };

  return (
    <div>
      <button
        onClick={() => {
          disconnect();
        }}
      >
        <ImExit></ImExit>
      </button>
    </div>
  );
}

export default DisconnectButton;
