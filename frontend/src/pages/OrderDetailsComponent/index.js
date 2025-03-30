// LoginScreen.js

import React, {useState, useEffect, useContext} from 'react';
import { useLocation } from "react-router-dom";
import '../ProductsByCategory/ProductDetails.css';
import { GlobalStateContext } from '../../GlobalStateContext';
import DashboardNavbar from "../../components/DashboardNavBar/index"
import {
  FeaturesSec,
} from "../../components/DetaisSection/Features.elements";
import DashboardServices from "../../services/DashboardServices"
export default function OrderDetailsComponent({ lightTopLine }) {
  const [state, dispatch] = useContext(GlobalStateContext);
    const location = useLocation();
    const [orders, setOrders]= useState([])
    const queryParams = new URLSearchParams(location.search);
    const [employee, setEmployee] =useState('')
    const orderId = queryParams.get('orderId');
    const orderStatus = queryParams.get('orderStatus');
    const productIds =queryParams.get('productIds')
    const getData = () => {
      const idsArray = productIds.split(',').map(id => id.trim());
      const requests = idsArray.map(id => {
        return DashboardServices.getProductDetails(id).then(response => {
          const item = response.data;
          return {
            productId: item.productId,
            productName: item.productName,
            productImage: generateImage(item.productImage),
            productDescription: item.productDescription,
            productPrice: item.productPrice
          };
        });
      });


    
      Promise.all(requests)
        .then(results => {
          setOrders(results); // Update state with all product details
        })
        .catch(error => {
          console.error('Error fetching product details:', error);
        });
    };
    if(!orders){
      console.log(orders)
    }
    
  const generateImage = (base64Image) => {
    const imageData = base64Image.split(",")[1];
    const decodedImage = atob(imageData);
    const arrayBuffer = new Uint8Array(decodedImage.length);
    for (let i = 0; i < decodedImage.length; i++) {
        arrayBuffer[i] = decodedImage.charCodeAt(i);
    }
    const blob = new Blob([arrayBuffer], { type: 'image/jpeg' });
    return URL.createObjectURL(blob);
}
    useEffect(() => {
      getData();
      if(state.employeeData.employeeName!=undefined){
let e= "Thanks, for ordering the products from part pro. The employee "+ state.employeeData.employeeName +" would assist for order assistance for in-store pickup and the contact details would be " + state.employeeData.mobileNo +" and the emailID is "+ state.employeeData.emailId;
setEmployee(e)
dispatch({ type: 'CLEAR_EMPLOYEE' });
      }
      dispatch({ type: 'CLEAR_CART' });
  }, []);
  return (
    <>
    <DashboardNavbar>
    </DashboardNavbar>
    <FeaturesSec>
        <div className="product-grid">
        <p>
     Your OrderId for Tracking: <b>
     {orderId}
      </b>
    </p>
    <p>
  and Order Status is : <b>
  {orderStatus}
    </b>
    </p>
            {orders.map((item) => (
                <>
                    <div className="product-image">
                        <img style ={{"marginTop":"-15%","width":"75%" ,"height":"75%"}}src={item.productImage} alt={item.productName} />
                    </div>
                    <div className="product-info">
                        <h1>{item.productName}</h1>
                        <p className="product-description">{item.productDescription}</p>
                        <p className="product-price">${item.productPrice.toFixed(2)}</p>
                    </div>
                </>
            ))}
        </div>
        <p style={{ marginTop:"5%",alignItems:'center'}}>
      {
        employee !==null && (
          <b>
{employee}
          </b>
  
        )
      }
    </p>
    </FeaturesSec>
</>
  );
};


