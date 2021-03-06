import React, { useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";

import ProductItem from "../ProductItem";
import { QUERY_PRODUCTS } from "../../utils/queries";
import { useStoreContext } from "../../utils/GlobalState";
import { UPDATE_PRODUCTS } from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";
import styled from "styled-components";

const WhiteBackground = styled.div`
  background-color: white;
  border: 2px solid black;
  border-radius: 10px;
  color: black;
  z-index: 2;
  padding: 5px 5px 5px 10px;
  margin-bottom: 18px;
  width: 200px;
`;

function ProductList() {
  //immediately execute to retrieve current global state object, dispatch to update state
  const [state, dispatch] = useStoreContext();
  //products are being retrieved from the state object
  const { currentCategory } = state;

  const { loading, data } = useQuery(QUERY_PRODUCTS);
  //when product data from the useQuery() Hook's response to the global state object is saved with the dispatch() method, we also save each file to the products object store in IndexedDB using the idbPromise() function
  useEffect(() => {
    // if there's data to be stored
    if (data) {
      // let's store it in the global state object
      dispatch({
        type: UPDATE_PRODUCTS,
        products: data.products,
      });

      // but let's also take each product and save it to IndexedDB using the helper function
      data.products.forEach((product) => {
        idbPromise("products", "put", product);
      });
      // add else if to check if `loading` is undefined in `useQuery()` Hook
    } else if (!loading) {
      // since we're offline, get all of the data from the `products` store
      idbPromise("products", "get").then((products) => {
        // use retrieved data to set global state for offline browsing
        dispatch({
          type: UPDATE_PRODUCTS,
          products: products,
        });
      });
    }
  }, [data, loading, dispatch]);

  function filterProducts() {
    if (!currentCategory) {
      return state.products;
    }

    return state.products.filter(
      (product) => product.category._id === currentCategory
    );
  }

  return (
    <div className="my-2">
      <WhiteBackground>
        <h2>Great Finds:</h2>
      </WhiteBackground>
      {state.products.length ? (
        <div className="flex-row">
            {filterProducts().map(product => (
                <ProductItem
                  key= {product._id}
                  _id={product._id}
                  image={product.image}
                  name={product.name}
                  price={product.price}
                  quantity={product.quantity}
                />
            )).reverse()}
        </div>
      ) : (
        <h3>You haven't added anything for sale yet!</h3>
      )}
      {/* {loading ? <img src={spinner} alt="loading" /> : null} */}
    </div>
  );
}

export default ProductList;
