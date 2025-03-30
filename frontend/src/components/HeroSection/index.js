import React, { useState } from "react";
// import { herosectionbg2 as Image } from "../../common/imageUrls";
import Image from "../../common/assets/bgImage.jpg";
import {
  HeroContainer,
  HeroBg,
  ImageBg,
  HeroContent,
  HeroH1,
  HeroP,
  HeroBtnWrapper,
  ArrowForward,
  ArrowRight,
} from "./HeroElements";
import { Button } from "../ButtonElement";
import Navbar2 from "../../components/Navbar/index";
const HeroSection = () => {
  const [hover, setHover] = useState(false);

  const onHover = () => {
    setHover(!hover);
  };
  return (
    <>
    <Navbar2 />
    <HeroContainer>
      <HeroBg>
        <ImageBg src={Image} />
      </HeroBg>
      <HeroContent>
        <HeroH1>Real Estate Properties Management System</HeroH1>
        <HeroP>
          <br />
          A Real Estate Property Management System is a web application designed to facilitate seamless property browsing and management. The platform serves both customers and administrators. Customers can explore available properties, save favorites, and submit inquiries. The dashboard dynamically displays properties based on preferences and location. Admins can manage property listings, update availability, monitor inquiries, and analyze property metrics to track performance and user engagement.
           </HeroP>
        <HeroBtnWrapper>
          <Button
            to="smartContract"
            onMouseEnter={onHover}
            onMouseLeave={onHover}
            primary="true"
            dark="true"
          >
            Get Started {hover ? <ArrowForward /> : <ArrowRight />}
          </Button>
        </HeroBtnWrapper>
      </HeroContent>
    </HeroContainer>
    </>
  );
};

export default HeroSection;
