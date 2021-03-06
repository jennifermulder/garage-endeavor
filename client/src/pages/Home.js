import React from "react";
import styled from "styled-components";
import garageSign from "../assets/images/garage-sale-sign.gif";
import { Link } from "react-router-dom";
import Auth from "../utils/auth";

const StyledHomeBackground = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-image: url('https://garageendeavor.s3.us-west-1.amazonaws.com/open-garage-door.png');
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  height: 100%;
  background-size: 100vh 100%;
  background-position: center;
  background-repeat: repeat-x;
  z-index: -1; 
  padding-top: 100vh;
`;

const GarageDoorDiv = styled.div`
  position: absolute;
  background-image: url('https://garageendeavor.s3.us-west-1.amazonaws.com/garage-door.png');
  background-size: 100% 100%;
  height: 33vh;
  width: 52vh;
  background-repeat: no-repeat;
  transition: background-position 1s ease;
  margin: 0.5vh 0 0 2vh;
  z-index: 3;
  display: flex;
  align-items: center;
  margin-top: -61vh !important;
`;

const GarageSign = styled.section`
  position: absolute;
  transform: rotate(60deg);
  background-image: url(${garageSign});
  background-size: 100% 100%;
  height: 17vh;
  width: 27vh;
  background-repeat: no-repeat;
  z-index: 2;
  margin-top: -78vh !important;
`;

const Stylediv = styled.div`
  background-size: 100% 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Buttondiv = styled.section`
  margin-top: -45vh;
`;

const Button = styled(Link)`
  height: 8vh;
  width: 16vh;
  position: relative;
  font-size: 3vh;
  margin: 3vh 4.5vh;
  padding: 2vh 4vh;
  border: 2px solid;
  border-radius: 3px;
  z-index: 1;
  -webkit-transition: opacity 1.4s;
  transition: opacity 1.4s;
  opacity: 0;
  color: black;
  border-color: black;
  background-color: cyan;
  text-align: center;
`;

const Home = () => {
  const [buttonClass, setButtonClass] = React.useState("");
  const [garageClass, setGarageClass] = React.useState("");

  function makeButtonZedGoDown() {
    setButtonClass("");
    setGarageClass("");
  }

  function makeButtonsZedIndexGoUp() {
    setButtonClass("make-button-visible");
    setGarageClass("make-garage-door-stay-up");
  }

  return (
    <div className="">
      <StyledHomeBackground className="garage media-cart-placement-adjustment">
        <Stylediv>
          <GarageSign />
          <Stylediv>
            <Buttondiv href="#">
              <Button
                to="/buy"
                className={buttonClass}
                onMouseEnter={() => makeButtonsZedIndexGoUp()}
              >
                Shop
              </Button>
              {Auth.loggedIn() ? (
                <Button
                  to="/sell-item"
                  className={buttonClass}
                  onMouseEnter={() => makeButtonsZedIndexGoUp()}
                >
                  Sell
                </Button>
              ) : (
                <Button
                  to="/login"
                  className={buttonClass}
                  onMouseEnter={() => makeButtonsZedIndexGoUp()}
                >
                  Login
                </Button>
              )}
            </Buttondiv>

            <GarageDoorDiv
              className={garageClass}
              onMouseEnter={() => makeButtonsZedIndexGoUp()}
              onMouseLeave={() => makeButtonZedGoDown()}
            />
          </Stylediv>
        </Stylediv>
      </StyledHomeBackground>
    </div>
  );
};

export default Home;
