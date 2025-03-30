import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import PaymentServices from "../../services/PaymentServices"
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
import './OnlineSales.css';
import {
    FeaturesRow,
    FeaturesColumn,
    StyledTable,
    TextWrapper,
    TopLine,
    FeaturesSec,
    FeaturesContainer,
    Table
} from "../../components/DetaisSection/Features.elements";

const ManageOnlineSalesComponent = ({ lightTopLine }) => {
    const [loading, setLoading] = useState(true);
    const [salesData, setSalesData] = useState([]);
    const [state] = useContext(GlobalStateContext);
    const navigate = useNavigate();

    useEffect(() => {
        fetchSalesData();
    }, []);

    const fetchSalesData = () => {
        PaymentServices.manageOnlineSales()
            .then(response => {
                setSalesData(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching sales data: ", error);
                setLoading(false);
            });
    };

    const renderSalesDataRows = () => {
        return salesData.map(sale => (
            <tr key={sale.saleID}>
                <td>{sale.saleID}</td>
                <td>{sale.totalPrice}</td>
                <td>{sale.employeeName}</td>
                <td>{sale.customerName}</td>
                <td>{sale.productName}</td>
            </tr>
        ));
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
                                    View Online Sales
                                </p>
                            </TopLine>
                            <FeaturesColumn>
                                <TextWrapper>
                                    <Table >
                                    <StyledTable>
                                        <thead>
                                            <tr>
                                                <th>Sale ID</th>
                                                <th>Total Price</th>
                                                <th>Employee Name</th>
                                                <th>Customer Name</th>
                                                <th>Product Name</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {renderSalesDataRows()}
                                        </tbody>
                                        </StyledTable>
                                    </Table>
                                </TextWrapper>
                            </FeaturesColumn>
                        </FeaturesRow>
                    </FeaturesContainer>
                )}
            </FeaturesSec>
        </>
    );

};

export default ManageOnlineSalesComponent;
