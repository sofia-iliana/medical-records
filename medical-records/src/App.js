import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import NewEntry from "./Components/NewEntry";
import UserProfile from "./Components/UserProfile";
import Entry from "./Components/Entry";
import DoctorProfile from "./Components/DoctorProfile";
import EntryForDoctor from "./Components/EntryForDoctor";
import EntriesForDoctor from "./Components/EntriesForDoctor";
import "../src/Components/style/App.css";

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
            <Route path="/doctorEntries" element={<EntriesForDoctor />} />
            <Route path="/doctorEntry" element={<EntryForDoctor />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
