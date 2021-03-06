import React from "react";
import styled from "styled-components";
import ProductList from "../components/ProductList";
import CategoryMenu from "../components/CategoryMenu";
import Cart from "../components/Cart";

const BuyBackground = styled.div`
  background-image: url('https://garageendeavor.s3.us-west-1.amazonaws.com/buy-background.jpg');
  background-size: 400px;
  display: flex;
`;

const StyledDiv = styled.div`
  padding-top: 90px;
`;

const WhiteBackground = styled.div`
  background-color: white;
  border: 2px solid black;
  border-radius: 10px;
  color: black;
  z-index: 2;
  padding: 20px;
  padding-top: 0;
`;

const Buy = () => {
  return (
    <BuyBackground>
      <StyledDiv className="container media-adjustment">
        <WhiteBackground>
          <CategoryMenu />
        </WhiteBackground>
        <ProductList />
        <Cart />
      </StyledDiv>
    </BuyBackground>
  );
};

export default Buy;