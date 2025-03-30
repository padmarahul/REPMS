import React from "react";
import Products from "../DashboardComponent/Products";
import Categories from "../DashboardComponent/Categories"
import DashboardNavbar from "../../components/DashboardNavBar"
const Dashboard = () => {

  return (
    <>
    <DashboardNavbar>
    </DashboardNavbar>
      <Products />
      <Categories/>
    </>
  );
};

export default Dashboard;
