import { useNavigate } from "react-router-dom";

function SignOutButton() {
  const navigate = useNavigate();

  const signOut = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div>
      <button
        onClick={() => {
          signOut();
        }}
      >
        Sign Out
      </button>
    </div>
  );
}

export default SignOutButton;
