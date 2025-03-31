import React, { useContext, useState, useEffect } from 'react';
import {useNavigate } from 'react-router-dom';
import CustomerServices from '../../services/CustomerServices';
import PropertyServices from '../../services/PropertyServices'
import {
    FeaturesSec
} from "../../components/DetaisSection/Features.elements";
import { GlobalStateContext } from '../../GlobalStateContext'
import { Button } from "../../components/ButtonElement";
import '../ManageInquiryComponent/details.css';
import DashboardNavBar from "../../components/DashboardNavBar/index"
import {
    HeroBtnWrapper,
    ArrowForward,
    ArrowRight,
} from "../../components/HeroSection/HeroElements"
import StaticImage from '../../common/assets/buy-a-house.svg';

const SaveProperties = () => {
    const [state, dispatch] = useContext(GlobalStateContext);
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true)


    const [hover, setHover] = useState(false);

    const onHover = () => {
        setHover(!hover);
    };

    const getData = () => {
        CustomerServices.getAllSavedProperties(state.userData.userId).then(response => {
            console.log(response.data)
            const modifiedData = response.data.map(item => ({
                productId: item.id,
                productName: item.name,
                productImage: StaticImage,
                productDescription: "Modern apartment in prime location",
                productPrice: item.price
            }));
            setData(modifiedData);
            setLoading(e => !e)
        }).catch(error => {
            console.log(error)
        })
    }


    useEffect(() => {
        getData();
    }, []);

    return (
        <>
            <DashboardNavBar>
            </DashboardNavBar>
            <FeaturesSec>
                <div className="product-grid">
                    {data.map((item) => (
                        <>
                            <div className="product-image">
                                <img src={item.productImage} alt={item.productName} style={{"height":"65%", "width": "65%", "marginTop": "-15%"}} />
                            </div>
                            <div className="product-info">
                                <h1>{item.productName}</h1>
                                <p className="product-description">{item.productDescription}</p>
                                <p className="product-price">${item.productPrice.toFixed(2)}</p>
                            </div>
                        </>
                    ))}
                </div>
            </FeaturesSec>
        </>
    );
}

export default SaveProperties;