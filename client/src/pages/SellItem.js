import React, { useState } from "react";

const SellItem = () => {
    const [formState, setFormState] = useState({ title: '', price: '', description: '', image: '' });

    const handleFormSubmit = async event => {
        event.preventDefault();

        // if(formState.title && formState.price && formState.description && formState.image) {

        // }
        if(formState.title && formState.price && formState.description) {
            console.log(`${formState.title}, ${formState.price}, ${formState.description}`);
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