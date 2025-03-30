import React, { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import EmployeeServices from "../../services/EmployeeServices"
import PaymentServices from '../../services/PaymentServices';
import { GlobalStateContext } from '../../GlobalStateContext';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import '../../components/DetaisSection/Features.css'
import { Button } from "../../components/ButtonElement";
import {
    HeroBtnWrapper,
    ArrowForward,
    ArrowRight,
} from "../../components/HeroSection/HeroElements"
import {
    FeaturesRow,
    FeaturesColumn,
    TextWrapper,
    TopLine,
    FeaturesSec,
    FeaturesContainer,
    Table
} from "../../components/DetaisSection/Features.elements";
const OrderTrackingComponent = ({ lightTopLine }) => {
    const [hover, setHover] = useState(false);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const [state] = useContext(GlobalStateContext);
    const [tracking, setTracking] = useState({
        trackingId: ''
    });
    const [details, setDetails] = useState('')
    const onHover = () => {
        setHover(!hover);
    };
    const handleChange = (e) => {
        setTracking({ ...tracking, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(tracking);
        PaymentServices.trackOrder(tracking.trackingId).then(response => {
            console.log(response.data)
            setDetails(response.data)
            // setLoading(e => !e)
            console.log(details)
        }).catch(error => {
            console.log(error)
        })
    };
    const renderInputField = (key, value) => {
        switch (key) {
            case 'productPrice':
                return (
                    <input
                        style={{
                            borderRadius: "6px",
                            textAlign: "center",
                            padding: "0.7vh",
                            marginLeft: "1vh",
                        }}
                        type="number"
                        name={key}
                        value={value}
                        onChange={handleChange}
                    />
                );

            default:
                return (
                    <input
                        style={{
                            borderRadius: "6px",
                            textAlign: "center",
                            padding: "0.7vh",
                            marginLeft: "1vh",
                        }}
                        type="text"
                        name={key}
                        value={value}
                        onChange={handleChange}
                    />
                );
        }
    };


    return (
        <>
            <FeaturesSec>
                {loading ? (
                    <div
                        style={{
                            margin: "auto",
                            top: "50%",
                            display: "block",
                        }}
                    >
                        <Box sx={{ display: "flex" }}>
                            <CircularProgress />
                        </Box>
                    </div>
                ) : (
                    <FeaturesContainer>
                        <FeaturesRow>
                            <TopLine lightTopLine={lightTopLine}>
                                PART PRO WEBSITE
                                <p style={{ color: "grey", fontSize: "2vh", marginTop: "1vh" }}>
                                    Track Order
                                </p>
                            </TopLine>
                            <FeaturesColumn>
                                <TextWrapper>
                                    <Table>
                                        <tbody>
                                            {Object.entries(tracking).map(([key, value]) => (
                                                <tr key={key}>
                                                    <td style={{ textAlign: 'left', paddingRight: '10px' }}>
                                                        {key}
                                                    </td>
                                                    <td style={{
                                                        color: "white",
                                                        padding: "1vh",
                                                        fontSize: "2vh",
                                                    }}>
                                                        {renderInputField(key, value)}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                </TextWrapper>
                                <HeroBtnWrapper style={{ display: "inline-block" }}>
                                    <Button
                                        onClick={(event) => handleSubmit(event)}
                                        onMouseEnter={onHover}
                                        onMouseLeave={onHover}
                                        primary="true"
                                        dark="true"
                                    >
                                        Track Order {hover ? <ArrowForward /> : <ArrowRight />}
                                    </Button>
                                </HeroBtnWrapper>
                                {details && (
                                    <>
                                        <div style={{ marginTop:"5%"}}>
                                            <h3><b>
                                                Order Details:
                                            </b></h3>
                                            <p>
                                                <b>
                                                    PaymentId:  {details.paymentId}
                                                </b>
                                            </p>
                                            <p>
                                                <b>
                                                    PayerId:  {details.payerId}
                                                </b>
                                            </p>
                                            <p>
                                                <b>
                                                    OrderStatus:  {details.orderStatus}
                                                </b>
                                            </p>
                                            <p>
                                                <b>
                                                    PaymentStatus:  {details.paymentStatus}
                                                </b>
                                            </p>
                                            <p>
                                                <b>
                                                    Order Amount:  {details.amount}  {details.currency}
                                                </b>
                                            </p>
                                        </div>
                                    </>
                                )}
                            </FeaturesColumn>
                        </FeaturesRow>
                    </FeaturesContainer>
                )}
            </FeaturesSec>
        </>
    );

};

export default OrderTrackingComponent;
