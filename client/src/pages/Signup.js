import React, { useState } from "react";

import styled from "styled-components"
import signupPattern from "../assets/images/signup-background.jpg"

// import { Link } from "react-router-dom";
import { useMutation } from '@apollo/react-hooks';
import Auth from "../utils/auth";
import { ADD_USER } from "../utils/mutations";

function Signup(props) {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [addUser] = useMutation(ADD_USER);

  const handleFormSubmit = async event => {
    event.preventDefault();
    const mutationResponse = await addUser({
      variables: {
        email: formState.email, password: formState.password,
        firstName: formState.firstName, lastName: formState.lastName
      }
    });
    const token = mutationResponse.data.addUser.token;
    Auth.login(token);
  };

  const handleChange = event => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value
    });
  };

  const StyledSignupBackground = styled.div`
    background-image: url(${signupPattern});
    position: fixed;
    height: 100vh;
    width: 100vw;
    background-position: center;
    background-size: 40%;
    display: flex;
    justify-content: center;
    align-items: center;
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

  return (
    <StyledSignupBackground>
      <div className="container my-1">
        {/* <WhiteBackground>
          <Link to="/signup">
            ← Go to Signup
          </Link>
        </WhiteBackground> */}
        <WhiteBackground> 
          <h2>Signup</h2>
          <form onSubmit={handleFormSubmit}>
            <div className="flex-row space-between my-2">
              <label htmlFor="firstName">First Name:</label>
              <input
                placeholder="First"
                name="firstName"
                type="firstName"
                id="firstName"
                onChange={handleChange}
                />
            </div>
            <div className="flex-row space-between my-2">
              <label htmlFor="lastName">Last Name:</label>
              <input
                placeholder="Last"
                name="lastName"
                type="lastName"
                id="lastName"
                onChange={handleChange}
                />
            </div>
            <div className="flex-row space-between my-2">
              <label htmlFor="email">Email:</label>
              <input
                placeholder="youremail@test.com"
                name="email"
                type="email"
                id="email"
                onChange={handleChange}
                />
            </div>
            <div className="flex-row space-between my-2">
              <label htmlFor="pwd">Password:</label>
              <input
                placeholder="******"
                name="password"
                type="password"
                id="pwd"
                onChange={handleChange}
                />
            </div>
            <div className="flex-row flex-end">
              <button type="submit">
                Submit
              </button>
            </div>
          </form>
        </WhiteBackground>
      </div>
    </StyledSignupBackground>
  );

}

export default Signup;
