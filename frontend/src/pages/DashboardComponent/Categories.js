import { useNavigate } from "react-router-dom";
import React from "react";
import { useState,useEffect } from "react";
import Carousel from "react-elastic-carousel"
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import {
  ProductsContainer,
  ProductsCard,
  ProductsIcon,
  ProductsH2,
  ProductsP,
} from "./ProductElement";

import DashboardServices from '../../services/DashboardServices'

function NewProduct() {
    const navigate = useNavigate();
    const [categoryData, setCategoryData] = useState([]);
    const [loading, setLoading] = useState(true)
    const getData = () => {
      DashboardServices.getAllCategories().then(response => {
          console.log(response.data)
          const modifiedData = response.data.map(item => ({
              categoryId: item.categoryId,
              categoryName: item.categoryName,
              categoryImage: generateImage(item.categoryImage),
              categoryDescription: item.description
          }));
          setCategoryData(modifiedData);
          setLoading(e => !e)
      }).catch(error => {
          console.log(error)
      })
  }
  const  generateImage =(base64Image)=>{
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
},[]);

    const handleClick = (event,categoryName) => {
      navigate(`/getProductsByCategory/${categoryName}`, { state: { categoryName } });
  };

  return (
    <>
   <ProductsContainer id="categories" style={{background: "#f9f9f9", display: "flow-npm root"}}>
                <h1 style ={{ color : "#000000", marginLeft:"38%"}}><b>FEATURED CATEGORIES</b></h1>
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
                        <Carousel style={{ height: "100%" }} itemsToShow={4}>
                            {
                                categoryData.map((ce, i) => {
                                    return (
                                        <ProductsCard onClick={event => handleClick(event, ce.categoryName)} className="ProductsCard">
                                            <ProductsIcon src={ce.categoryImage} />
                                            <ProductsH2>{ce.categoryName}</ProductsH2>
                                            <ProductsP>{ce.categoryDescription}</ProductsP>
                                        </ProductsCard>
                                    );
                                })
                            }
                        </Carousel>
                  
                }
            </ProductsContainer>
    </>
  );
}

export default NewProduct;
