import React from "react";
import Products from "../DashboardComponent/Products";
import EmployeeNavbar from "../../components/EmployeeNabBar"
const EmployeeDashboard = () => {

  return (
    <>
    <EmployeeNavbar>
    </EmployeeNavbar>
      <Products />
    </>
  );
};

export default EmployeeDashboard;
