import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import components
import Home from "./app/page";
import LoginScreen from "./app/Admin/app/login/page";
import Dashboard from "./app/Admin/app/dashboard/page";
import Clinics from './app/Admin/app/clinics/page';
import DoctorList from "./app/Admin/app/doctors/page";
import NeedApproval from "./app/Admin/app/needApproval/page";

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<LoginScreen />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/clinics" element={<Clinics />} />
                <Route path="/doctors" element={<DoctorList />} />
                <Route path="/doctors/needApproval" element={<NeedApproval />} />
                <Route path="*" element={<div>404 - Page Not Found</div>} />
            </Routes>
        </Router>
    );
}

export default App;