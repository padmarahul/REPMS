import React from "react";
import Products from "../DashboardComponent/Products";
import Categories from "../DashboardComponent/Categories"
import EmployeeNavbar from "../../components/EmployeeNabBar"
const EmployeeDashboard = () => {

  return (
    <>
    <EmployeeNavbar>
    </EmployeeNavbar>
      <Products />
      <Categories/>
    </>
  );
};

export default EmployeeDashboard;
