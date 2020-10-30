import React from "react";
import { Link } from "react-router-dom";
import { idbPromise, pluralize } from "../../utils/helpers";

import { useStoreContext } from "../../utils/GlobalState";
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from "../../utils/actions";

import styled from "styled-components";

const StyledButton = styled.button`
  margin: 3px;
  background-color: lightpink;
  color: black; ;
`;

const WhiteBackground = styled.div`
  background-color: white;
  border: 2px solid black;
  border-radius: 10px;
  color: black;
  // height: initial;
  align-items: center;
  justify-content: center;
  margin: 0 4% 3%;
  padding: 2%;
`;

function ProductItem(item) {
  const { image, name, _id, price, quantity } = item;

  const [state, dispatch] = useStoreContext();
  // destructure cart from state so that it can be used
  const { cart } = state;

  const addToCart = () => {
    // find the cart item with the matching id
    const itemInCart = cart.find((cartItem) => cartItem._id === _id);

    // if there was a match, call UPDATE with a new purchase quantity
    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: _id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
      idbPromise("cart", "put", {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        product: { ...item, purchaseQuantity: 1 },
      });
      idbPromise("cart", "put", { ...item, purchaseQuantity: 1 });
    }
  };

  return (
    <WhiteBackground className="card px-1 py-1 card-hover">
      <Link to={`/products/${_id}`}>
        <p>{name}</p>
        <img alt={name} src={`${image}`} />
      </Link>
      <div>
        <span>${price}</span>
        <div>
          {quantity} {pluralize("item", quantity)} in stock
        </div>
      </div>
      <StyledButton className="button-hover" onClick={addToCart}>
        Add to cart
      </StyledButton>
    </WhiteBackground>
  );
}

export default ProductItem;
