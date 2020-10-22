import React from "react";
import styled from "styled-components"
import openGarage from "../assets/images/open-garage-door.png"
import garageDoor from "../assets/images/garage-door.jpg"
import garageSign from "../assets/images/garage-sale-sign.gif"

const StyledHomeBackground = styled.div`
  position: fixed;
  background-image: url(${openGarage});
  height: 100vh;
  width: 100vw;
  background-size: 126vh;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
;`

const GarageDoorDiv = styled.div`
  position: relative;
  top: -1%;
  left: 0;
  width: 515px;
  height: 290px;
  background-image: url(${garageDoor});
  background-size: 515px 290px;
  background-repeat: no-repeat;
  -webkit-transition: background-position 1s ease;
  -moz-transition: background-position 1s ease;
  -ms-transition: background-position 1s ease;
  -o-transition: background-position 1s ease;
  transition: background-position 1s ease;
;`

const CenteredSign= styled.div`
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
      <CenteredSign>
        <GarageSign/>
      </CenteredSign>

      <StyledHomeBackground className="garage">
        <GarageDoorDiv>

        </GarageDoorDiv>
      </StyledHomeBackground>
    </div>
  );
};

export default Home;
