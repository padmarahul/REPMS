import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/LoginComponent";
import Dashboard from "./pages/DashboardComponent/index";
import AddVehicleDetails from "./pages/AddVehicleDetails"
import UpdatePersonalDetails from "./pages/UpdatePersonalDetails"
import Footer from "./components/Footer";
import Home from "./pages/index"
import 'bootstrap/dist/css/bootstrap.min.css';
import { GlobalStateProvider } from './GlobalStateContext'
import SignUpComponent from "./pages/SignUpComponent";
import ProductDetailsComponent from "./pages/ProductDetailsComponent";
import CartComponent from "./pages/CartComponent"
import ForgotPassword from "./pages/ForgotPassword";
import OrderDetailsComponent from "./pages/OrderDetailsComponent";
import ProductsByCategory from "./pages/ProductsByCategory";
import EmployeeDashboard from "./pages/EmployeeDashboardComponent";
import ManageProductsComponents from "./pages/ManageProductsComponent";
import PostProductsComponent from "./pages/PostProductsComponent";
import UpdateProductComponent from "./pages/UpdateProductcomponent";
import UpdateInventoryComponent from "./pages/UpdateInventoryComponent";
import OrderTrackingComponent from "./pages/OrderTrackingComponent";
import ManageFeedbackComponent from "./pages/ManageFeedbackComponent";
import ManageInventoryLevelsComponent from "./pages/ManageInventoryLevelsComponent";
import ManageOnlineSalesComponent from "./pages/ManageOnlineSalesComponent";
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
            <Route path='/addvehicledetails/:id' element={<AddVehicleDetails />} exact />
            <Route path='/updatepersonaldetails/:id' element={<UpdatePersonalDetails />} exact />
            <Route path='/productdetails/:id' element={<ProductDetailsComponent />} exact />
            <Route path='/getProductsByCategory/:categoryName' element={<ProductsByCategory />} exact />
            <Route path='/cart' element={<CartComponent />} exact />
            <Route path='/manage-products/:id' element={<ManageProductsComponents />} exact />
            <Route path='/changepassword' element={< ForgotPassword/>} exact />
            <Route path='/add-product/:id' element={< PostProductsComponent/>} exact />
            <Route path='/update-product/:id' element={< UpdateProductComponent/>} exact />
            <Route path='/manage-inventory/:id' element={< UpdateInventoryComponent/>} exact />
            <Route path='/order-tracking/:id' element={< OrderTrackingComponent/>} exact />
            <Route path='/manage-feedback/:id' element={< ManageFeedbackComponent/>} exact />
            <Route path='/manage-stockstatus/:id' element={< ManageInventoryLevelsComponent/>} exact />
            <Route path='/manage-onlinesales/:id' element={< ManageOnlineSalesComponent/>} exact />
            <Route path='/payment-success/' element={< OrderDetailsComponent/>} exact />
          </Routes>
        </Router>
        <Footer />
      </GlobalStateProvider>
    </>

  );
};

export default App;
