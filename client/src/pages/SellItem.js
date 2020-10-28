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
import sellPattern from "../assets/images/sell-background.jpg";

const SellBackground = styled.div`
  background-image: url(${sellPattern});
  position: fixed;
  height: 100vh;
  width: 100vw;
  background-position: center;
  background-size: 60%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-repeat: repeat;
;`

const WhiteBackground = styled.div`
  background-color: white;
  border: 2px solid black;
  border-radius: 10px;
  color: black;
  z-index: 2;
  width: 80%;
  padding: 20px;
;`

const StyledForm = styled.form`
  width: 100%;
;`

const StyledInput = styled.input`
  width: 100%;
  padding: 5px 10px;
  margin: 1px 0;
  margin-bottom: 10px;
  display: inline-block;
  border: 1px solid;
  border-radius: 4px;
  box-sizing: border-box;
;`

const StyledSelect = styled.select`
  width: 100%;
  padding: 5px 5px;
  margin: 1px 0;
  margin-bottom: 10px;
  display: inline-block;
  border: 1px solid;
  border-radius: 4px;
  box-sizing: border-box;
;`

const StyledTextArea = styled.textarea`
  width: 100%;
  padding: 10px 10px;
  margin: 1px 0;
  margin-bottom: 10px;
  display: inline-block;
  border: 1px solid;
  border-radius: 4px;
  box-sizing: border-box;
;`

const StyledPhotoInput = styled.input`
  width: 100%;
  padding: 5px 10px;
  margin: 1px 0;
  margin-bottom: 20px;
  display: inline-block;
  border: 1px solid;
  border-radius: 4px;
  box-sizing: border-box;
;`

const SellItem = () => {
    const [state, dispatch] = useStoreContext();
    const { data: categoryData } = useQuery(QUERY_CATEGORIES);
    // console.log({data})
    let { categories } = state;
    // console.log({state})
    const [ addProduct, {error} ] = useMutation(ADD_PRODUCT);
    const [formState, setFormState] = useState({ name: '', category: '', quantity: '', price: '', description: '', image: '', user: Auth.getProfile().data._id });
    const { data, loading } = useQuery(QUERY_PRODUCTS);
    categories = categories.slice(0, 5);

    useEffect(() => {
        // if categoryData exists or has changed from the response of useQuery, then run dispatch()
        if (categoryData) {
            dispatch({
                type: UPDATE_CATEGORIES,
                categories: categoryData.categories
            });
            //save to idb store
            categoryData.categories.forEach(category => {
                idbPromise('categories', 'put', category);
            });
        }
        else if (!loading) {
            idbPromise('categories', 'get').then(categories => {
                dispatch({
                type: UPDATE_CATEGORIES,
                categories: categories
                });
            });
        }
    }, [categoryData, loading, dispatch]);

    const handleFormSubmit = async event => {
        event.preventDefault();
        // console.log('handle submit', formState);

        if(formState.name && formState.price && formState.category && formState.user) {
            console.log({formState})

            if (data) {
                const newProduct = await addProduct({
                    variables: {
                      name: formState.name, 
                      description: formState.description,
                      quantity: parseInt(formState.quantity),
                      image: formState.image,
                      price: parseInt(formState.price),
                      category: formState.category,
                      user: formState.user
                    }
                  }); 
                console.log({newProduct});
                dispatch({
                  type: UPDATE_PRODUCTS,
                  products: [...data.products, newProduct]
                });
            
                idbPromise('products', 'put', newProduct.data.addProduct);
            } 
            else if (!loading) {
                idbPromise('products', 'get').then((products) => {
                  dispatch({
                    type: UPDATE_PRODUCTS,
                    products: products
                  });
                });
            }
        }
        else{
            //console.log("error");
            // TODO: error handling for required fields
        }
    };

    const handleChange = event => {
        let { name, value } = event.target;
        if(name === 'image') {
            value = document.querySelector('#image').files[0];
        }
        setFormState({
          ...formState,
          [name]: value
    });
  };

  return (
    <SellBackground>
      <div className="container">
        <WhiteBackground>
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
              {/* TODO: add a filter helper function to filter out duplicates */}
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
            <label>Upload an Image</label>
            <StyledPhotoInput
              name="image"
              id="image"
              type="file"
              onChange={handleChange}
            />
            <div className="flex-row flex-end">
              <button type="submit">Add Listing</button>
            </div>
          </StyledForm>
        </WhiteBackground>
      </div>
    </SellBackground>
  );
};

export default SellItem;
