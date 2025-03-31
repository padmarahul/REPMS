import React, { useState, useContext } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import InquiryServices from "../../services/InquiryServices"
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

const AddInquiryComponent = ({ lightTopLine }) => {
    const location = useLocation();
    const productdata = location.state.param;
    const [hover, setHover] = useState(false);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const [state] = useContext(GlobalStateContext);
    const [inquiry, setInquiry] = useState({
        userId: Number(state.userData.userId),
        propertyId: Number(productdata.productId),
        message: ''
    });
    console.log(productdata.productId)
    const onHover = () => {
        setHover(!hover);
    };
    const handleChange = (e) => {
        setInquiry({ ...inquiry, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(inquiry);
        InquiryServices.sendInquiry(inquiry).then(response => {
            console.log(response.data)
            setLoading(e => !e)
            navigate('/dashboard')
        }).catch(error => {
            console.log(error)
        })
    };
    const renderInputField = (key, value) => {
        switch (key) {
            case 'userId':
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
                        value={state.userData.userId}
                        onChange={handleChange}
                    />
                );
                case 'propertyId':
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
                            value={productdata.productId}
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
                                REPMS WEBSITE
                                <p style={{ color: "grey", fontSize: "2vh", marginTop: "1vh" }}>
                                    Send Inquiry
                                </p>
                            </TopLine>
                            <FeaturesColumn>
                                <TextWrapper>
                                    <Table>
                                        <tbody>
                                            {Object.entries(inquiry).map(([key, value]) => (
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
                                        Add Inquiry Information {hover ? <ArrowForward /> : <ArrowRight />}
                                    </Button>
                                </HeroBtnWrapper>
                            </FeaturesColumn>
                        </FeaturesRow>
                    </FeaturesContainer>
                )}
            </FeaturesSec>
        </>
    );

};

export default AddInquiryComponent;
