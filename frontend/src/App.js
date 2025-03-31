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
          </Routes>
        </Router>
        <Footer />
      </GlobalStateProvider>
    </>

  );
};

export default App;
