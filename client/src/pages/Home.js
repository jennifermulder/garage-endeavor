import React from "react";
import styled from "styled-components"
import openGarage from "../assets/images/open-garage-door.png"
import garageDoor from "../assets/images/garage-door.png"
import garageSign from "../assets/images/garage-sale-sign.gif"

const StyledHomeBackground = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  background-image: url(${openGarage});
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  height: 100%;
  background-size: 100vh 100%;
  background-position: center;
  background-repeat: repeat-x;
  z-index: -1;
;`

const GarageDoorDiv = styled.div`
  position: absolute;
  background-image: url(${garageDoor});
  background-size: 100% 100%;
  height: 33vh;
  width: 52vh;
  background-repeat: no-repeat;
  transition: background-position 1s ease;
  margin: 0.5vh 0 0 2vh;
  z-index: 3;
  display: flex;
  // flex-direction: column;
  align-items: center;
;`

const GarageSign = styled.section`
  background-image: url(${garageSign});
  background-size: 100% 100%;
  height: 17vh;
  width: 27vh;
  background-repeat: no-repeat;
  z-index: 2;
  margin-top: 21vh;
;`

const Stylediv = styled.div`
  background-size: 100% 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
;`

const Buttondiv = styled.section`
  // flex-direction: row;
;`

const RealButtondiv = styled.section`
  position: relative;
  // flex-direction: row;
;`

const Button = styled.button`
  height: 8vh;
  width: 16vh;
  position: relative;
  font-size: 1.2em;
  margin: 0.7em;
  padding: 0.25em 0.5em;
  border: 2px solid;
  border-radius: 3px;
  z-index: 1;
;`

const BuyButton = styled(Button)`
  color: black;
  border-color: black;
  background-color: darkcyan;
  margin-top: 25%; 
;`

const SellButton = styled(Button)`
  color: black;
  border-color: black;
  background-color: darkcyan;
  margin-top: 25%;
;`

const TradeButton = styled(Button)`
  color: black;
  border-color: black;
  background-color: darkcyan;
;`

const RealButton = styled.button`
  height: 8vh;
  width: 16vh;
  position: fixed;
  font-size: 1.2em;
  margin: 0.7em;
  padding: 0.25em 0.5em;
  border: 2px solid;
  border-radius: 3px;
  z-index: 1;
;`

const RealBuyButton = styled(RealButton)`
  color: black;
  border-color: black;
  background-color: darkcyan;
  margin-top: 25%; 
;`

const RealSellButton = styled(RealButton)`
  color: black;
  border-color: black;
  background-color: darkcyan;
  margin-top: 25%;
;`

const RealTradeButton = styled(RealButton)`
  color: black;
  border-color: black;
  background-color: darkcyan;
;`

const Home = () => {
  return (
    <div className="">
      <StyledHomeBackground className="garage">
        <Stylediv>
          <GarageSign/>
          <Stylediv>
            <Buttondiv href="#">
              <BuyButton href="#">Buy</BuyButton>
              <SellButton href="#">Sell</SellButton>
              <Stylediv>
                <TradeButton href="#">Trade</TradeButton>
              </Stylediv>
            </Buttondiv>
            
            <RealButtondiv>
              <BuyButton href="#">Buy</BuyButton>
              <SellButton href="#">Sell</SellButton>
              <Stylediv>
                <TradeButton href="#">Trade</TradeButton>
              </Stylediv>
            </RealButtondiv>
            
            <GarageDoorDiv>
            </GarageDoorDiv>
          </Stylediv>
        </Stylediv>
      </StyledHomeBackground>
    </div>
  );
};

export default Home;
