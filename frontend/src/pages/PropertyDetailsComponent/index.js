import React, {useState, useContext} from 'react';
import { useLocation } from 'react-router-dom';
import '../ManageInquiryComponent/details.css';
import DashboardNavbar from "../../components/DashboardNavBar/index"
import { useNavigate } from "react-router-dom";
import {
  HeroBtnWrapper,
  ArrowForward,
  ArrowRight,
} from "../../components/HeroSection/HeroElements"
import { Button } from "../../components/ButtonElement";
import {
  FeaturesSec
} from "../../components/DetaisSection/Features.elements";
import {GlobalStateContext} from  '../../GlobalStateContext'
import StaticImage from '../../common/assets/buy-a-house.svg';

const PropertyDetailsComponent = () => {
  const navigate = useNavigate();
  const [state, dispatch] = useContext(GlobalStateContext);
  const location = useLocation();
  const product = location.state.product;
  const [hover, setHover] = useState(false);

  const handleBack=(event)=>{
    console.log(event)
    navigate("/dashboard")
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
        <img src={StaticImage} alt={product.productName} style={{"height":"65%", "width": "65%", "marginTop": "-15%"}} />
      </div>
      <div className="product-info">
        <h1>{product.productName}</h1>
        <p className="product-description">{"Modern apartment in prime location"}</p>
        <p className="product-price">${product.productPrice.toFixed(2)}</p>
        <HeroBtnWrapper style={{ display: "inline-block" }}>
                  <Button
                   onClick={(event) => handleBack(event)}
                    onMouseEnter={onHover}
                    onMouseLeave={onHover}
                    primary="true"
                    dark="true"
                  >
                    Go Back{hover ? <ArrowForward /> : <ArrowRight />}
                  </Button>
                </HeroBtnWrapper>
      </div>
      
    </div>
    </FeaturesSec>
    </>
  );
};

export default PropertyDetailsComponent;
