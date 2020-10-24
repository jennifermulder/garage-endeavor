import React, { useState } from "react";
import { QUERY_PRODUCTS } from "../utils/queries";
import { useMutation, useQuery } from '@apollo/react-hooks';
import { idbPromise } from "../utils/helpers";
import { useStoreContext } from '../utils/GlobalState';
import { UPDATE_PRODUCTS } from '../utils/actions';
import { ADD_PRODUCT } from '../utils/mutations';
import Auth from "../utils/auth";

const SellItem = () => {
    const [state, dispatch] = useStoreContext();
    const [ addProduct, {error} ] = useMutation(ADD_PRODUCT);
    const [formState, setFormState] = useState({ name: '', category: '5f924623323598356c1a444a', price: '', description: '', image: '', user: Auth.getProfile().data._id });
    // const [formState, setFormState] = useState({ name: '', category: '5f924623323598356c1a444a', price: '', description: '', image: '' });
    const { data, loading } = useQuery(QUERY_PRODUCTS);
    const { categories } = state;

    const handleFormSubmit = async event => {
        event.preventDefault();
        console.log('handle submit', formState);
        if(formState.name && formState.category && formState.price) {

            if (data) {
                const newProduct = await addProduct(formState);
                console.log({newProduct});
                // const newProductList = [...data.products, newProduct];
                dispatch({
                  type: UPDATE_PRODUCTS,
                  products: [...data.products, newProduct]
                });
            
                idbPromise('products', 'put', newProduct);
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
        }
    };

    const handleChange = event => {
        const { name, value } = event.target;
        setFormState({
          ...formState,
          [name]: value
        });
    };

    return (
      <div className="container">
        <h1>Add a Listing</h1>
        <form onSubmit={handleFormSubmit}>
            <label>Listing Title</label>
            <input 
                name='name'
                placeholder='Add a title'
                onChange={handleChange}
            />
            <label>Category</label>
            <select 
                name='category'
                placeholder='Add a category'
                onChange={handleChange}
            >
                {categories.map(category => (
                    <option value={category._id}>{category.name}</option>
                ))}
            </select>
            <label>Price</label>
            <input 
                name='price'
                placeholder='Add a price'
                onChange={handleChange}
            />
            <label for="quantity">Quantity:</label>
            <input 
                type='number'
                name='quantity'
                placeholder='1'
                onChange={handleChange}
            />
            <label>Item Description</label>
            <textarea 
                name='description'
                placeholder='Add a description'
                onChange={handleChange}
            />
            {/* <label>Upload an Image</label>
            <input 
                name='image'
                type='file'
                onChange={handleChange}
            /> */}
            <button type='submit'>Add Listing</button>
        </form>
      </div>
    );
};

export default SellItem;