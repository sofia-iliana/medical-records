import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import NewEntry from "./Components/NewEntry";
import UserProfile from "./Components/UserProfile";
import Entry from "./Components/Entry";
import DoctorProfile from "./Components/DoctorProfile";
import EntryForDoctor from "./Components/EntryForDoctor";
import GetResults from "./Components/EntriesForDoctor";
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
            <Route path="/entry" element={<Entry />} />
            <Route path="/doctorProfile" element={<DoctorProfile />} />
            <Route path="/getResults" element={<GetResults />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
