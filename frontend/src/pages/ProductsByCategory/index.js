import React, { useContext, useState, useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import DashboardServices from '../../services/DashboardServices';
import {
    FeaturesSec
} from "../../components/DetaisSection/Features.elements";
import {GlobalStateContext} from  '../../GlobalStateContext'
import { Button } from "../../components/ButtonElement";
import './ProductDetails.css';
import DashboardNavbar from "../../components/DashboardNavBar/index"
import {
    HeroBtnWrapper,
    ArrowForward,
    ArrowRight,
  } from "../../components/HeroSection/HeroElements"
import EmployeeServices from "../../services/EmployeeServices"
const ProductsByCategory = () => {
    const [state, dispatch] = useContext(GlobalStateContext);
    const location = useLocation();
    const [loading, setLoading] = useState(true)
    const [products, setProducts] = useState([])
    const categoryName = location.state.categoryName;
    const [hover, setHover] = useState(false);

    const onHover = () => {
        setHover(!hover);
      };

    const getData = () => {
        DashboardServices.getProductsByCategoryName(categoryName).then(response => {
            console.log(response.data)
            const modifiedData = response.data.map(item => ({
                productId: item.productId,
                productName: item.productName,
                productImage: generateImage(item.productImage),
                productDescription: item.productDescription,
                productPrice: item.productPrice
            }));
            setProducts(modifiedData)
            setLoading(e => !e)
        }).catch(error => {
            console.log(error)
        })
    }
    const handleCart=(event,item)=>{
        const existingProduct = state.cart.find(cartItem => cartItem.id === item.productId);
        if (existingProduct) {
          dispatch({ 
            type: 'INCREASE_QUANTITY', 
            payload: item.productId
          });
        } else {
        const cartdata={
          id: item.productId,
          productImage:item.productImage,
          productPrice:item.productPrice,
          productDescription: item.productDescription,
          productName: item.productName,
          quantity: 1
        };
        dispatch({ type: 'ADD_TO_CART', payload: cartdata});
      }
    }
    const handlePickUpCart=(event,item)=>{
        EmployeeServices.findAssistantEmployee().then(response => {
            console.log(response.data)
            dispatch({ type: 'EMPLOYEE_DATA', payload: response.data});
        }).catch(error => {
            console.log(error)
        })
        const existingProduct = state.cart.find(cartItem => cartItem.id === item.productId);
        if (existingProduct) {
          dispatch({ 
            type: 'INCREASE_QUANTITY', 
            payload: item.productId
          });
        } else {
        const cartdata={
          id: item.productId,
          productImage:item.productImage,
          productPrice:item.productPrice,
          productDescription: item.productDescription,
          productName: item.productName,
          quantity: 1
        };
        dispatch({ type: 'ADD_TO_CART', payload: cartdata});
      }
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
    }, []);

    return (
        <>
            <DashboardNavbar>
            </DashboardNavbar>
            <FeaturesSec>
                <div className="product-grid">
                    {products.map((item) => (
                        <>
                            <div className="product-image">
                                <img src={item.productImage} alt={item.productName} />
                            </div>
                            <div className="product-info">
                                <h1>{item.productName}</h1>
                                <p className="product-description">{item.productDescription}</p>
                                <p className="product-price">${item.productPrice.toFixed(2)}</p>
                                <HeroBtnWrapper style={{ display: "inline-block" }}>
                                    <Button
                                        onClick={(event) => handleCart(event,item)}
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
                        </>
                    ))}
                </div>
            </FeaturesSec>
        </>
    );
}

export default ProductsByCategory;