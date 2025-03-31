import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropertyServices from '../../services/PropertyServices'
import Carousel from "react-elastic-carousel"
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import {
    ProductsContainer,
    ProductsContainerCar,
    ProductsCard,
    ProductsIcon,
    ProductsH1,
    ProductsH2,
    ProductsP,
} from "./ProductElement";
import StaticImage from '../../common/assets/buy-a-house.svg';

function Products() {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true)
    const handleProductClick = (event,product) => {
        console.log(event)
        navigate(`/productdetails/${product.productId}`, { state: { product } });
      };
    const getData = () => {
        PropertyServices.getAllProperties().then(response => {
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
            <ProductsContainer id="products">
                <ProductsH1>SPONSORED PRODUCTS </ProductsH1>
                {loading
                    ? <div style={{
                        margin: "auto",
                        top: "50%",
                        display: "block",
                    }}>
                        <Box sx={{ display: 'flex' }}>
                            <CircularProgress />
                        </Box>
                    </div>
                    :
                    <ProductsContainerCar id="products">
                        <Carousel itemsToShow={4}>
                            {
                                data.map((pe, i) => {
                                    return (
                                        <ProductsCard onClick={event => handleProductClick(event, pe)}>
                                            <ProductsIcon src={pe.productImage} />
                                            <ProductsH2>{pe.productName}</ProductsH2>
                                            <ProductsP>{pe.productDescription}</ProductsP>
                                        </ProductsCard>
                                    );
                                })
                            }
                        </Carousel>
                    </ProductsContainerCar>
                }
            </ProductsContainer>
        </>
    );
};

export default Products;
