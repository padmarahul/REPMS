import React, { useContext, useState } from 'react';
import { GlobalStateContext } from '../../GlobalStateContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import {FaStore, FaTrashAlt, FaPlus, FaMinus } from 'react-icons/fa';
import "./CartPage.css";
import {
  FeaturesSec
} from "../../components/DetaisSection/Features.elements";
import PaymentServices from '../../services/PaymentServices';
const CartComponent = () => {
  const [state, dispatch] = useContext(GlobalStateContext);
  const [cart, setCart] = useState({
    prodIds:[],
    totalAmount :''
});
console.log(state.cart)
  const increaseQuantity = (id) => {
    dispatch({ type: 'INCREASE_QUANTITY', payload: id });
  };

  const decreaseQuantity = (id) => {
    dispatch({ type: 'DECREASE_QUANTITY', payload: id });
  };

  const removeItem = (id) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: id });
  };

  const calculateTotal = () => {
    return state.cart.reduce((acc, item) => acc + item.productPrice * item.quantity, 0);
  };
  const getProductId =()=>{
    return state.cart.map(item => item.id);
  }
  const handlePayment = (event) => {
    const totalAmount=calculateTotal().toFixed(2)
    const ids=getProductId()
    event.preventDefault()
    setCart(prevCart => ({
      ...prevCart,
      prodIds: ids,
      totalAmount: totalAmount
    }));
    const response =  PaymentServices.createPayment(state.userData.userId, cart).then(resp => {
      console.log(response)
      if (resp.status === 200) {
      window.open(resp.data, '_blank');
      } 
    }).catch(err => {
      console.log(err)
    })
  };

  return (
    <>
    <FeaturesSec>
    <div className="container mt-4">
      <div className="row">
        {/* Product listing */}
        <div className="col-lg-9">
          {state.cart.map((item) => (
            <div className="card mb-3" key={item.id}>
              <div className="card-body">
                <div className="row">
                  <div className="col-sm-3">
                    <img src={item.productImage} alt={item.productName}  style={{ width: '200px', height: '200px' }} className="img-fluid" />
                  </div>
                  <div className="col-sm-6">
                    <h5 className="card-title">{item.productName}</h5>
                    <p className="card-text">{item.productDescription}</p>
                    <p className="card-text">Reviews and Rating: 4.5</p>
                  </div>
                  <div style={{color: "black", fontWeight:"bolder"}}className="col-sm-3 text-right">
                    <p style={{color: "black", fontWeight:"bolder"}}>Price: ${item.productPrice.toFixed(2)}</p>
                    <button className="btn btn-warning " onClick={() => decreaseQuantity(item.id)}><FaMinus /></button>
                    <span style={{color: "black",fontWeight:"bolder"}} className="mx-2">{item.quantity}</span>
                    <button className="btn btn-warning " onClick={() => increaseQuantity(item.id)}><FaPlus /></button>
                    <button className="btn btn-outline-danger" onClick={() => removeItem(item.id)}><FaTrashAlt /></button>
                    <div className="instore-option mt-2">
                      <button className="btn btn-outline-success">
                        <FaStore /> In-Store Pickup
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div style={{color: "black",fontWeight:"bolder"}} className="col-lg-3">
          <div className="sticky-top">
            <h4>Order Summary</h4>
            <div className="order-summary-content">
              <div  className="subtotal">
                <span>Subtotal</span>
                <span style={{color: "black",fontWeight:"bolder"}}>${calculateTotal().toFixed(2)}</span>
              </div>
              <button style={{color: "black",fontWeight:"bolder"}} className="btn btn-warning btn-block mt-3">CHECKOUT PAYMENT AS GUEST</button>
              <p style={{ fontSize:"30px", marginLeft:"40%",fontWeight:"bolder"}}> OR </p>
              <button style={{color: "black",fontWeight:"bolder"}} className="btn btn-warning btn-block mt-3"  onClick={(event) => handlePayment(event)}> Complete Payment By PayPal</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </FeaturesSec>
         </>
  );
};

export default CartComponent;
