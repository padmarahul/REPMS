import React, {useState, useContext} from 'react';
import { useLocation } from 'react-router-dom';
import './ProductDetails.css';
import DashboardNavbar from "../../components/DashboardNavBar/index"
import {
  HeroBtnWrapper,
  ArrowForward,
  ArrowRight,
} from "../../components/HeroSection/HeroElements"
import { Button } from "../../components/ButtonElement";
import {
  FeaturesSec
} from "../../components/DetaisSection/Features.elements";
import EmployeeServices from "../../services/EmployeeServices"
import {GlobalStateContext} from  '../../GlobalStateContext'


const ProductDetailsComponent = () => {
  const [state, dispatch] = useContext(GlobalStateContext);
  const location = useLocation();
  const product = location.state.product;
  const [hover, setHover] = useState(false);
  const handleCart=(event)=>{
    console.log(event)
    const existingProduct = state.cart.find(item => item.id === product.productId);
    if (existingProduct) {
      dispatch({ 
        type: 'INCREASE_QUANTITY', 
        payload: product.productId
      });
    } else {
    const cartdata={
      id: product.productId,
      productImage:product.productImage,
      productPrice:product.productPrice,
      productDescription: product.productDescription,
      productName: product.productName,
      quantity: 1
    };
    dispatch({ type: 'ADD_TO_CART', payload: cartdata});
  }
}

const handlePickUpCart=(event)=>{
  console.log(event)
  EmployeeServices.findAssistantEmployee().then(response => {
    console.log(response.data)
    dispatch({ type: 'EMPLOYEE_DATA', payload: response.data});
}).catch(error => {
    console.log(error)
})
  const existingProduct = state.cart.find(item => item.id === product.productId);
  if (existingProduct) {
    dispatch({ 
      type: 'INCREASE_QUANTITY', 
      payload: product.productId
    });
  } else {
  const cartdata={
    id: product.productId,
    productImage:product.productImage,
    productPrice:product.productPrice,
    productDescription: product.productDescription,
    productName: product.productName,
    quantity: 1
  };
  dispatch({ type: 'ADD_TO_CART', payload: cartdata});
}
}
  const onHover = () => {
    setHover(!hover);
  };

  console.log("sss",state.cart)
  // Redirect back or show a message if the product is not available in the state
  if (!product) {
    return <div>Product not found. Please go back to the product list.</div>;
  }


  return (
    <>
    <DashboardNavbar>

    </DashboardNavbar>
    <FeaturesSec>
    <div className="product-grid">
      <div className="product-image">
        <img src={product.productImage} alt={product.productName} />
      </div>
      <div className="product-info">
        <h1>{product.productName}</h1>
        <p className="product-description">{product.productDescription}</p>
        <p className="product-price">${product.productPrice.toFixed(2)}</p>
        <HeroBtnWrapper style={{ display: "inline-block" }}>
                  <Button
                   onClick={(event) => handleCart(event)}
                    onMouseEnter={onHover}
                    onMouseLeave={onHover}
                    primary="true"
                    dark="true"
                  >
                    Add to Cart{hover ? <ArrowForward /> : <ArrowRight />}
                  </Button>
                </HeroBtnWrapper>
                <HeroBtnWrapper style={{ display: "inline-block" }}>
                  <Button
                   onClick={(event) => handlePickUpCart(event)}
                    onMouseEnter={onHover}
                    onMouseLeave={onHover}
                    primary="true"
                    dark="true"
                  >
                    Add to Store Pickup {hover ? <ArrowForward /> : <ArrowRight />}
                  </Button>
                </HeroBtnWrapper>
      </div>
      
    </div>
    </FeaturesSec>
    </>
  );
};

export default ProductDetailsComponent;
