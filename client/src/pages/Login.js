import React, { useState } from "react";

import styled from "styled-components"
import loginPattern from "../assets/images/login-background.jpg"

import { useMutation } from '@apollo/react-hooks';
import { Link } from "react-router-dom";
import { LOGIN } from "../utils/mutations"
import Auth from "../utils/auth";

const StyledLoginBackground = styled.div`
background-image: url(${loginPattern});
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
background-color: white;
border: 2px solid black;
border-radius: 10px;
color: black;
z-index: 2;
width: 80%;
padding: 20px;
;`

function Login(props) {
  const [formState, setFormState] = useState({ email: '', password: '' })
  const [login, { error }] = useMutation(LOGIN);

  const handleFormSubmit = async event => {
    event.preventDefault();
    try {
      const mutationResponse = await login({ variables: { email: formState.email, password: formState.password } })
      const token = mutationResponse.data.login.token;
      Auth.login(token);
    } catch (e) {
      //console.log(e)
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
    <StyledLoginBackground>
      <div className="container my-1">
        <WhiteBackground>
          <Link to="/signup">
            ← Go to Signup
          </Link>
          <h2>Login</h2>
          <form onSubmit={handleFormSubmit}>
            <div className="flex-row space-between my-2">
              <label htmlFor="email">Email address:</label>
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
            {
              error ? <div>
                <p className="error-text" >The provided credentials are incorrect</p>
              </div> : null
            }
            <div className="flex-row flex-end">
              <button type="submit">
                Submit
              </button>
            </div>
          </form>
        </WhiteBackground>
      </div>
    </StyledLoginBackground>
  );
}


export default Login;
