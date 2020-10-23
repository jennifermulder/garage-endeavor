import React from "react";
import styled from "styled-components"
import openGarage from "../assets/images/open-garage-door.png"
import garageDoor from "../assets/images/garage-door.png"
import garageSign from "../assets/images/garage-sale-sign.gif"

const StyledHomeBackground = styled.div`
  position: fixed;
  background-image: url(${openGarage});
  height: 100%;
  width: 100%;
  background-size: 126vh;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
  background-repeat: repeat-x;
;`

const GarageDoorDiv = styled.div`
  position: relative;
  background-image: url(${garageDoor});
  top: -1%;
  left: 0.7%;
  width: 492px;
  height: 276px;
  background-size: 492px 276px;
  background-repeat: no-repeat;
  -webkit-transition: background-position 1s ease;
  -moz-transition: background-position 1s ease;
  -ms-transition: background-position 1s ease;
  -o-transition: background-position 1s ease;
  transition: background-position 1s ease;
;`

const CenteredSign = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
;`

const GarageSign = styled.div`
  position: fixed;
  top: 18%;
  background-image: url(${garageSign});
  background-size: 100% 100%;
  height: 144px;
  width: 216px;
  background-repeat: no-repeat;
  z-index: 1;
;`

const Home = () => {
  return (
    <div className="">
      {/* <CenteredSign> */}
        <GarageSign/>
      {/* </CenteredSign> */}

      <StyledHomeBackground className="garage">
        {/* <GarageDoorDiv>

        </GarageDoorDiv> */}
      </StyledHomeBackground>
    </div>
  );
};

export default Home;
