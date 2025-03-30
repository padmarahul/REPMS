import React, { useContext, useState, useEffect} from 'react';
import { useLocation, useNavigate} from 'react-router-dom';
import DashboardServices from '../../services/DashboardServices';
import {
    FeaturesSec
} from "../../components/DetaisSection/Features.elements";
import {GlobalStateContext} from  '../../GlobalStateContext'
import { Button } from "../../components/ButtonElement";
import '../ProductDetailsComponent/ProductDetails.css';
import Navbar from "../../components/DashboardNavBar/index"
import {  Form, Modal } from 'react-bootstrap';
import {
    HeroBtnWrapper,
    ArrowForward,
    ArrowRight,
  } from "../../components/HeroSection/HeroElements"
import CustomerServices from '../../services/CustomerServices';
const ManageFeedbackComponent = () => {
    const [state, dispatch] = useContext(GlobalStateContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true)
    const [products, setProducts] = useState([])
    const [id,setId]=useState('')
    const [ rating, setRating] = useState('')
    const [viewrating, setViewRating]= useState('')
    const [showViewRatingModal, setShowViewRatingModal]=useState(false)
    const [showRatingModal, setShowRatingModal] = useState(false);
    const [hover, setHover] = useState(false);

    const onHover = () => {
        setHover(!hover);
      };

      const handleRating =async (event)=>{
        event.preventDefault()
        const response = await CustomerServices.manageFeedback(state.userData.userId, id,rating).then(resp => {
            console.log(resp)
          if (resp.data === 'Feedback changed' && resp.status === 200) {
            setShowRatingModal(false);
           navigate('/dashboard')
          }
        }).catch(err => {
          console.log(err)
        })
      }

      const handleFeedbackClick=(event,param)=>{
        event.preventDefault()
        if(param!== undefined)
        {
            setId(param.productId)
    setShowRatingModal(true);
        }
      }

      const handleViewFeedbackClick= async (event,param)=>{
        event.preventDefault()
        if(param !==undefined){
          const response = await CustomerServices.viewFeedback(state.userData.userId, param.productId).then(resp => {
            console.log(resp)
          if (resp.status === 200) {
            setViewRating(resp.data.rating)
            setShowViewRatingModal(true);
          }
        }).catch(err => {
          console.log(err)
        })
        }
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
            <Navbar>
            </Navbar>
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
                                        onClick={(event) => handleFeedbackClick(event,item)}
                                        onMouseEnter={onHover}
                                        onMouseLeave={onHover}
                                        primary="true"
                                        dark="true"
                                    >
                                        Add/Update Feedback {hover ? <ArrowForward /> : <ArrowRight />}
                                    </Button>
                                </HeroBtnWrapper>

                                <HeroBtnWrapper style={{ display: "inline-block" }}>
                                    <Button
                                        onClick={(event) => handleViewFeedbackClick(event,item)}
                                        onMouseEnter={onHover}
                                        onMouseLeave={onHover}
                                        primary="true"
                                        dark="true"
                                    >
                                        View Feedback{hover ? <ArrowForward /> : <ArrowRight />}
                                    </Button>
                                </HeroBtnWrapper>
                            </div>
                        </>
                    ))}
                </div>
                  
          <Modal show={showRatingModal} onHide={() => setShowRatingModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Enter Rating</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group>
                  <Form.Label>Rating</Form.Label>
                  <Form.Control type="text" placeholder="Rating"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)} />
                </Form.Group>
                <HeroBtnWrapper style={{ width: "400px", display: "inline-block" }}>
                  <Button
                    onClick={(event) => handleRating(event)}
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

          <Modal show={showViewRatingModal} onHide={() => setShowViewRatingModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>View Rating</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group>
                  <Form.Label>Rating</Form.Label>
                  <Form.Control type="text" placeholder=" View Rating"
                    value={viewrating} />
                </Form.Group>
              </Form>
            </Modal.Body>
          </Modal>
            </FeaturesSec>
        </>
    );
}

export default ManageFeedbackComponent;