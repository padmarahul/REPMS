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
import {  Form, Modal } from 'react-bootstrap';
import {
    HeroBtnWrapper,
    ArrowForward,
    ArrowRight,
  } from "../../components/HeroSection/HeroElements"
import EmployeeServices from '../../services/EmployeeServices';
const ManageInventoryLevelsComponent = () => {
    const [state, dispatch] = useContext(GlobalStateContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true)
    const [products, setProducts] = useState([])
    const [id,setId]=useState('')
    const [ quantity, setQuantity] = useState('')
    const [showQuantityModal, setShowQuantityModal] = useState(false);
    const [hover, setHover] = useState(false);

    const onHover = () => {
        setHover(!hover);
      };

      const handleQuantity =async (event)=>{
        event.preventDefault()
        const response = await EmployeeServices.addOrUpdateInventory(id,quantity).then(resp => {
            console.log(resp)
          if (resp.data === 'Innventory Changed' && resp.status === 200) {
            setShowQuantityModal(false);
           navigate('/employee-dashboard')
          }
        }).catch(err => {
          console.log(err)
        })

      }

      const handleInventory=(event,param)=>{
        event.preventDefault()
        if(param!== undefined)
        {
            setId(param.productId)
    setShowQuantityModal(true);
        }
      }
    const getData = () => {
        EmployeeServices.getInventoryByStatus().then(response => {
            console.log(response.data)
            const modifiedData = response.data.map(item => ({
                productId: item.productId,
                productName: item.productName,
                productImage: generateImage(item.productImage),
                productDescription: item.productDescription,
                productPrice: item.productPrice,
                status: item.status
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
                                        onClick={(event) => handleInventory(event,item)}
                                        onMouseEnter={onHover}
                                        onMouseLeave={onHover}
                                        primary="true"
                                        dark="true"
                                    >
                                        Update Inventory By Stock Status{hover ? <ArrowForward /> : <ArrowRight />}
                                    </Button>
                                </HeroBtnWrapper>
                            </div>
                        </>
                    ))}
                </div>
                  
          <Modal show={showQuantityModal} onHide={() => setShowQuantityModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Enter Product Quantity</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group>
                  <Form.Label>Quantity</Form.Label>
                  <Form.Control type="text" placeholder="Quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)} />
                </Form.Group>
                <HeroBtnWrapper style={{ width: "400px", display: "inline-block" }}>
                  <Button
                    onClick={(event) => handleQuantity(event)}
                    onMouseEnter={onHover}
                    onMouseLeave={onHover}
                    primary="true"
                    dark="true"
                  >
                    Submit {hover ? <ArrowForward /> : <ArrowRight />}
                  </Button>
                </HeroBtnWrapper>
              </Form>
            </Modal.Body>
          </Modal>
            </FeaturesSec>
        </>
    );
}

export default ManageInventoryLevelsComponent;