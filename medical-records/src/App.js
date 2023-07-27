import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import NewEntry from "./Components/NewEntry";
import UserProfile from "./Components/UserProfile";
import "./App.css";

function App() {
  return (
    <div>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/newEntry" element={<NewEntry />} />
            <Route path="/profile" element={<UserProfile />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
