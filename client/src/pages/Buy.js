import React from "react";
import styled from "styled-components";
import buyPattern from "../assets/images/buy-background.jpg";
import ProductList from "../components/ProductList";
import CategoryMenu from "../components/CategoryMenu";
import Cart from '../components/Cart';

const BuyBackground = styled.div`
background-image: url(${buyPattern});
position: fixed;
height: 100vh;
width: 100vw;
background-position: center;
background-size: 40%;
display: flex;
justify-content: center;
align-items: center;
background-repeat: repeat
;`

const WhiteBackground = styled.div`
background-color: white; /* Black w/opacity/see-through */
border: 2px solid black;
border-radius: 10px;
color: black;
z-index: 2;
width: 80%;
padding: 20px;
;`

const Buy = () => {
  return (
    <BuyBackground className="">
      <div className="container">
        <WhiteBackground>
          <CategoryMenu />
          <ProductList />
          <Cart />
        </WhiteBackground>
      </div>
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
