import React, { useState } from "react";
import { QUERY_PRODUCTS } from "../utils/queries";
import { useQuery } from '@apollo/react-hooks';
import { idbPromise } from "../utils/helpers";
import { useStoreContext } from '../utils/GlobalState';
import { UPDATE_PRODUCTS } from '../utils/actions';
import Auth from "../utils/auth";

const SellItem = () => {
    const [state, dispatch] = useStoreContext();
    console.log(Auth.getProfile().data._id);
    // const [formState, setFormState] = useState({ title: '', category: '', price: '', description: '', image: '', seller: Auth.getProfile().data._id });
    const [formState, setFormState] = useState({ title: '', category: 'Food', price: '', description: '', image: '' });
    const { data, loading } = useQuery(QUERY_PRODUCTS);
    const { categories } = state;
    console.log('state', state);
    if(data){
        console.log('data', data)
    }
    // FIXME: no data, state coming through

    const handleFormSubmit = async event => {
        event.preventDefault();
        console.log('handle submit', formState);
        if(formState.title && formState.category && formState.price && formState.description) {

            if (data) {
                const newProductList = [...data.products, formState];
                console.log('data', data)
                console.log(newProductList)
                dispatch({
                  type: UPDATE_PRODUCTS,
                  products: newProductList
                });
            
                newProductList.forEach((product) => {
                  idbPromise('products', 'put', product);
                });
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
            console.log("error");
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
                name='title'
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
                    <option value={category}>{category}</option>
                ))}
            </select>
            <label>Price</label>
            <input 
                name='price'
                placeholder='Add a price'
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