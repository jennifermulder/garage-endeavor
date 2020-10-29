import React, { useState } from "react";

import styled from "styled-components";
import loginPattern from "../assets/images/login-background.jpg";

import { useMutation } from "@apollo/react-hooks";
import { Link } from "react-router-dom";
import { LOGIN } from "../utils/mutations";
import Auth from "../utils/auth";

const StyledLoginBackground = styled.div`
  background-image: url(${loginPattern});
  position: fixed;
  height: 100vh;
  width: 100vw;
  background-position: center;
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
  z-index: 2;
  width: 80%;
  padding: 20px;
  justify-content: center;
  align-items: center;
`;

const StyledForm = styled.form`
  width: 100%; ;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 5px 10px;
  margin: 1px 0;
  margin-bottom: 10px;
  display: inline-block;
  border: 1px solid;
  border-radius: 4px;
  box-sizing: border-box; ;
`;

const StyledButton = styled.button`
  margin: 3px;
  background-color: lightpink;
  color: black; ;
`;

function Login(props) {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { error }] = useMutation(LOGIN);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const mutationResponse = await login({
        variables: { email: formState.email, password: formState.password },
      });
      const token = mutationResponse.data.login.token;
      Auth.login(token);
    } catch (e) {
      //console.log(e)
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <StyledLoginBackground>
      <WhiteBackground className="adjustment">
        <Link to="/signup">← Go to Signup</Link>
        <h2>Login</h2>
        <StyledForm onSubmit={handleFormSubmit}>
          <div className="flex-row space-between my-2">
            <label htmlFor="email">Email address:</label>
            <StyledInput
              placeholder="youremail@test.com"
              name="email"
              type="email"
              id="email"
              onChange={handleChange}
            />
          </div>
          <div className="flex-row space-between my-2">
            <label htmlFor="pwd">Password:</label>
            <StyledInput
              placeholder="******"
              name="password"
              type="password"
              id="pwd"
              onChange={handleChange}
            />
          </div>
          {error ? (
            <div>
              <p className="error-text">
                The provided credentials are incorrect
              </p>
            </div>
          ) : null}
          <div className="flex-row flex-end">
            <StyledButton className="button-hover" type="submit">
              Submit
            </StyledButton>
          </div>
        </StyledForm>
      </WhiteBackground>
    </StyledLoginBackground>
  );
}

export default Login;
