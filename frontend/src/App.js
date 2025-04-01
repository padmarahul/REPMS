import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/LoginComponent";
import Dashboard from "./pages/DashboardComponent/index";
import Footer from "./components/Footer";
import Home from "./pages/index"
import 'bootstrap/dist/css/bootstrap.min.css';
import { GlobalStateProvider } from './GlobalStateContext'
import SignUpComponent from "./pages/SignUpComponent";
import ForgotPassword from "./pages/ForgotPassword";
import EmployeeDashboard from "./pages/EmployeeDashboardComponent";
import ManageInquiryComponent from "./pages/ManageInquiryComponent";
import AddInquiryComponent from "./pages/AddInquiryComponent";
import SaveProperties from "./pages/SaveProperties";
import SavedProperties from "./pages/SavedProperties"
import PropertyDetailsComponent from "./pages/PropertyDetailsComponent";
function App() {
  return (
    <>
      <GlobalStateProvider>
        <Router>
          <Routes>
          <Route path='/' element={<Home />} exact />
            <Route path='/login' element={<Login />} exact />
            <Route path='/signup' element={<SignUpComponent />} exact />
            <Route path='/dashboard' element={<Dashboard />} exact />
            <Route path='/employee-dashboard' element={< EmployeeDashboard/>} exact />
            <Route path='/changepassword' element={< ForgotPassword/>} exact />
            <Route path='/manage-inquiry/:id' element={< ManageInquiryComponent/>} exact />
            <Route path='/add-inquiry/:id1' element={< AddInquiryComponent/>} exact />
            <Route path='/save-property/:id1' element={< SaveProperties/>} exact />
            <Route path='/view-properties/:id1' element={< SavedProperties/>} exact />
            <Route path='/propertydetails/:id' element={< PropertyDetailsComponent/>} exact />
          </Routes>
        </Router>
        <Footer />
      </GlobalStateProvider>
    </>

  );
};

export default App;
