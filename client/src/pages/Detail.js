import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";

import { QUERY_PRODUCTS } from "../utils/queries";
import { useStoreContext } from "../utils/GlobalState";
import {
  REMOVE_FROM_CART,
  UPDATE_CART_QUANTITY,
  ADD_TO_CART,
  UPDATE_PRODUCTS,
} from "../utils/actions";
import { idbPromise } from "../utils/helpers";
// import { idbPromise } from "../../utils/helpers";
import spinner from "../assets/spinner.gif";
import SimilarProductList from "../components/SimilarProductList";
import Cart from "../components/Cart";
import styled from "styled-components";
import buyPattern from "../assets/images/buy-background.jpg";

const BuyBackground = styled.div`
  background-image: url(${buyPattern});
  height: 100vh;
  background-size: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const WhiteBackground = styled.div`
  background-color: white;
  border: 2px solid black;
  border-radius: 10px;
  color: black;
  z-index: 0;
  width: 100%;
  padding: 20px;
`;

const FormatButton = styled.button`
  background-color: lightpink;
  color: black; ;
`;

const StyledDiv = styled.div`
  padding-top: 60px; ;
`;

function Detail() {
  const [state, dispatch] = useStoreContext();

  const { id } = useParams();

  const [currentProduct, setCurrentProduct] = useState({});
  // passing the _id value of product selected to the useQuery() Hook and displaying the response to the page.
  const { loading, data } = useQuery(QUERY_PRODUCTS);

  const { products, cart } = state;
  //update global state, update in Indexeddb
  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === id);

    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
      // if we're updating quantity, use existing item data and increment purchaseQuantity value by one
      idbPromise("cart", "put", {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        product: { ...currentProduct, purchaseQuantity: 1 },
      });
      // if product isn't in the cart yet, add it to the current shopping cart in IndexedDB
      idbPromise("cart", "put", { ...currentProduct, purchaseQuantity: 1 });
    }
  };

  const removeFromCart = () => {
    dispatch({
      type: REMOVE_FROM_CART,
      _id: currentProduct._id,
    });

    // upon removal from cart, delete the item from IndexedDB using the `currentProduct._id` to locate what to remove
    idbPromise("cart", "delete", { ...currentProduct });
  };

  useEffect(() => {
    //already in global store
    if (products.length) {
      setCurrentProduct(products.find((product) => product._id === id));
      //data returned from useQuery Hook
    } else if (data) {
      dispatch({
        type: UPDATE_PRODUCTS,
        products: data.products,
      });

      data.products.forEach((product) => {
        idbPromise("products", "put", product);
      });
    }
    // get cache from idb
    else if (!loading) {
      idbPromise("products", "get").then((indexedProducts) => {
        dispatch({
          type: UPDATE_PRODUCTS,
          products: indexedProducts,
        });
      });
    }
  }, [products, data, loading, dispatch, id]);

  return (
    <BuyBackground>
      <StyledDiv className="media-adjustment">
        <WhiteBackground>
          {currentProduct ? (
            <div className="container my-1">
              <Link to="/buy">← Back to Products</Link>

              <h2>{currentProduct.name}</h2>

              <p>{currentProduct.description}</p>

              <p>
                <strong>Price:</strong>${currentProduct.price}{" "}
                <FormatButton className="button-hover" onClick={addToCart}>
                  Add to Cart
                </FormatButton>
                <FormatButton
                  className="button-hover"
                  disabled={!cart.find((p) => p._id === currentProduct._id)}
                  onClick={removeFromCart}
                >
                  Remove from Cart
                </FormatButton>
              </p>

              <img src={currentProduct.image} alt={currentProduct.name} />

              <h3>Similar Items:</h3>
              <SimilarProductList currentProduct={currentProduct} />
            </div>
          ) : null}
          {loading ? <img src={spinner} alt="loading" /> : null}
          <Cart />
        </WhiteBackground>
      </StyledDiv>
    </BuyBackground>
  );
}

export default Detail;
