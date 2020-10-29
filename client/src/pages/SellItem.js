import React, { useState, useEffect } from "react";
import { QUERY_PRODUCTS, QUERY_CATEGORIES } from "../utils/queries";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { idbPromise } from "../utils/helpers";
import { useStoreContext } from "../utils/GlobalState";
import {
  UPDATE_PRODUCTS,
  UPDATE_CATEGORIES,
  UPDATE_CURRENT_CATEGORY,
} from "../utils/actions";
import { ADD_PRODUCT } from "../utils/mutations";
import Auth from "../utils/auth";
import styled from "styled-components";

const SellBackground = styled.div`
  background-image: url('https://garageendeavor.s3.us-west-1.amazonaws.com/sell-background.jpg');
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
  width: 60%;
  padding: 20px;
  justify-content: center;
  align-items: center;
  margin: 70px 0 20px 0;
`;

const StyledForm = styled.form`
  width: 100%;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 5px 10px;
  margin: 1px 0;
  margin-bottom: 10px;
  display: inline-block;
  border: 1px solid;
  border-radius: 4px;
  box-sizing: border-box;
`;

const StyledSelect = styled.select`
  width: 100%;
  padding: 5px 5px;
  margin: 1px 0;
  margin-bottom: 10px;
  display: inline-block;
  border: 1px solid;
  border-radius: 4px;
  box-sizing: border-box;
`;

const StyledTextArea = styled.textarea`
  width: 100%;
  padding: 10px 10px;
  margin: 1px 0;
  margin-bottom: 10px;
  display: inline-block;
  border: 1px solid;
  border-radius: 4px;
  box-sizing: border-box;
`;

const StyledPhotoInput = styled.input`
  width: 100%;
  padding: 5px 10px;
  margin: 1px 0;
  margin-bottom: 20px;
  display: inline-block;
  border: 1px solid;
  border-radius: 4px;
  box-sizing: border-box;
`;

const Error = styled.span`
  display: none;
  color: red;
`;

const StyledButton = styled.button`
  margin: 3px;
  background-color: lightpink;
  color: black;
`;

const SellItem = () => {
  const [state, dispatch] = useStoreContext();
  const { data: categoryData } = useQuery(QUERY_CATEGORIES);
  const [addProduct, { error }] = useMutation(ADD_PRODUCT);
  const { data, loading } = useQuery(QUERY_PRODUCTS);

  let userID = "";
  if (Auth.loggedIn()) {
    userID = Auth.getProfile().data._id;
  }

  const [formState, setFormState] = useState({
    name: "",
    category: "",
    quantity: "",
    price: "",
    description: "",
    tag: "",
    image: "",
    user: userID,
  });
  let { categories } = state;
  categories = categories.slice(0, 5);

  useEffect(() => {
    // if categoryData exists or has changed from the response of useQuery, then run dispatch()
    if (categoryData) {
      dispatch({
        type: UPDATE_CATEGORIES,
        categories: categoryData.categories,
      });
      //save to idb store
      categoryData.categories.forEach((category) => {
        idbPromise("categories", "put", category);
      });
    } else if (!loading) {
      idbPromise("categories", "get").then((categories) => {
        dispatch({
          type: UPDATE_CATEGORIES,
          categories: categories,
        });
      });
    }
  }, [categoryData, loading, dispatch]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (
      formState.name &&
      !isNaN(parseInt(formState.price)) &&
      formState.category &&
      formState.user &&
      formState.image
    ) {
      if (data) {
        const newProduct = await addProduct({
          variables: {
            name: formState.name,
            description: formState.description,
            tag: formState.tag,
            quantity: parseInt(formState.quantity),
            image: formState.image,
            price: parseInt(formState.price),
            category: formState.category,
            user: formState.user,
          },
        });

        dispatch({
          type: UPDATE_PRODUCTS,
          products: [...data.products, newProduct],
        });

        idbPromise("products", "put", newProduct.data.addProduct);

        if (newProduct.data.addProduct.name) {
          window.location.assign(
            `/redirect?${newProduct.data.addProduct.name}`
          );
        }
      } else if (!loading) {
        idbPromise("products", "get").then((products) => {
          dispatch({
            type: UPDATE_PRODUCTS,
            products: products,
          });
        });
      }
    } else {
      document.getElementById("error-msg").style.display = "block";
    }
  };

  const handleChange = (event) => {
    let { name, value } = event.target;
    if (name === "image") {
      value = document.querySelector("#image").files[0];
    }

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <SellBackground>
      {Auth.loggedIn() ? (
        <WhiteBackground className="sell-adjustment">
          <h1>Add a Listing</h1>
          <StyledForm onSubmit={handleFormSubmit}>
            <label>Listing Title</label>
            <StyledInput
              name="name"
              placeholder="Add a title"
              onChange={handleChange}
            />
            <label>Category</label>
            <StyledSelect
              name="category"
              placeholder="Add a category"
              onChange={handleChange}
            >
              <option value="" hidden>
                Choose a category...
              </option>
              {categories.map((category) => (
                <option value={category._id}>{category.name}</option>
              ))}
            </StyledSelect>
            <label>Price</label>
            <StyledInput
              name="price"
              placeholder="Add a price"
              onChange={handleChange}
            />
            <label for="quantity">Quantity:</label>
            <StyledInput
              type="number"
              name="quantity"
              placeholder="1"
              min="1"
              onChange={handleChange}
            />
            <label>Item Description</label>
            <StyledTextArea
              name="description"
              placeholder="Add a description"
              onChange={handleChange}
            />
            <label>Item Tag</label>
            <StyledTextArea
              name="tag"
              placeholder="Add a tag"
              onChange={handleChange}
            />
            <label>Upload an Image</label>
            <StyledPhotoInput
              name="image"
              id="image"
              type="file"
              onChange={handleChange}
            />
            <Error id="error-msg">
              *Either a required field is missing or information has been
              inputted incorrectly. Please review your information.
            </Error>
            <div className="flex-row flex-end">
              <StyledButton className="button-hover" type="submit">
                Add Listing
              </StyledButton>
            </div>
          </StyledForm>
        </WhiteBackground>
      ) : (
        <WhiteBackground>
          <div>
            <h2>You must be logged in to add a listing.</h2>
            <a href="login">Login</a>
          </div>
        </WhiteBackground>
      )}
    </SellBackground>
  );
};

export default SellItem;
