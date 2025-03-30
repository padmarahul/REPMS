import React, { useContext, useState, useEffect} from 'react';
import { useLocation, useNavigate} from 'react-router-dom';
import DashboardServices from '../../services/DashboardServices';
import {
    FeaturesSec
} from "../../components/DetaisSection/Features.elements";
import {GlobalStateContext} from  '../../GlobalStateContext'
import { Button } from "../../components/ButtonElement";
import '../ProductDetailsComponent/ProductDetails.css';
import EmployeeNavbar from "../../components/EmployeeNabBar/index"
import {
    HeroBtnWrapper,
    ArrowForward,
    ArrowRight,
  } from "../../components/HeroSection/HeroElements"
import EmployeeServices from '../../services/EmployeeServices';
const ManageProductsComponents = () => {
    const [state, dispatch] = useContext(GlobalStateContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true)
    const [products, setProducts] = useState([])

    const [hover, setHover] = useState(false);

    const onHover = () => {
        setHover(!hover);
      };

      const handleNewProduct =(event,param)=>{
event.preventDefault()
const id = state.userData.userId;
navigate(`/add-product/${id}`);
      }
      const handleUpdateProduct =(event,param)=>{
        event.preventDefault()
        const id = state.userData.userId;
        navigate(`/update-product/${id}`,{ state: { param } });
              }

      const handleDeleteProduct=(event,param)=>{
        event.preventDefault()
        EmployeeServices.deleteProduct(param.productId).then(response => {
    console.log(response.data)
    navigate("/employee-dashboard")
}).catch(error => {
    console.log(error)
})
      }
    const getData = () => {
        DashboardServices.getAllProducts().then(response => {
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
            <EmployeeNavbar>
            </EmployeeNavbar>
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
                                        onClick={(event) => handleNewProduct(event,item)}
                                        onMouseEnter={onHover}
                                        onMouseLeave={onHover}
                                        primary="true"
                                        dark="true"
                                    >
                                        Add New Product{hover ? <ArrowForward /> : <ArrowRight />}
                                    </Button>
                                </HeroBtnWrapper>
                                <HeroBtnWrapper style={{ display: "inline-block" }}>
                                    <Button
                                        onClick={(event) => handleUpdateProduct(event,item)}
                                        onMouseEnter={onHover}
                                        onMouseLeave={onHover}
                                        primary="true"
                                        dark="true"
                                    >
                                        Update Product{hover ? <ArrowForward /> : <ArrowRight />}
                                    </Button>
                                </HeroBtnWrapper>
                                <HeroBtnWrapper style={{ display: "inline-block" }}>
                                    <Button
                                        onClick={(event) => handleDeleteProduct(event,item)}
                                        onMouseEnter={onHover}
                                        onMouseLeave={onHover}
                                        primary="true"
                                        dark="true"
                                    >
                                       Delete Product{hover ? <ArrowForward /> : <ArrowRight />}
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

export default ManageProductsComponents;