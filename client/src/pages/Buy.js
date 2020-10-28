import React from "react";
import styled from "styled-components";
import buyPattern from "../assets/images/buy-background.jpg";
import ProductList from "../components/ProductList";
import CategoryMenu from "../components/CategoryMenu";
import Cart from "../components/Cart";

const BuyBackground = styled.div`
  background-image: url(${buyPattern});
  background-position: center;
  background-size: 40%;
  background-repeat: repeat; ;
`;

const StyledDiv = styled.div`
  padding-top: 10vh; ;
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
    <BuyBackground className="">
      <StyledDiv className="container">
        <WhiteBackground>
          <CategoryMenu />
        </WhiteBackground>
        <ProductList />
        <Cart />
      </StyledDiv>
    </BuyBackground>
  );
};
// const Home = () => {
//   const [currentCategory, setCategory] = useState("");

//   return (
//     <div className="container">
//       <CategoryMenu setCategory={setCategory} />
//       <ProductList currentCategory={currentCategory} />
//     </div>
//   );
// };

export default Buy;
