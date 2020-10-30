import React, { useState } from "react";
import styled from "styled-components"
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import Auth from "../utils/auth";
import { ADD_USER } from "../utils/mutations";

const StyledSignupBackground = styled.div`
  background-image: url('https://garageendeavor.s3.us-west-1.amazonaws.com/signup-background.jpg');
  height: inherit;
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
  width: 40%;
  padding: 20px;
  margin: 162px 0 110px 0;
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
  box-sizing: border-box;
`;

const StyledButton = styled.button`
  margin: 3px;
  background-color: lightpink;
  color: black;
`;

function Signup(props) {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [addUser] = useMutation(ADD_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const mutationResponse = await addUser({
      variables: {
        email: formState.email,
        password: formState.password,
        firstName: formState.firstName,
        lastName: formState.lastName,
      },
    });
    const token = mutationResponse.data.addUser.token;
    Auth.login(token);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <StyledSignupBackground>
      <WhiteBackground className="adjustment">
        <Link to="/login">← Go to Login</Link>
        <h2>Signup</h2>
        <StyledForm onSubmit={handleFormSubmit}>
          <div className="flex-row space-between my-2">
            <label htmlFor="firstName">First Name:</label>
            <StyledInput
              placeholder="First"
              name="firstName"
              type="firstName"
              id="firstName"
              onChange={handleChange}
            />
          </div>
          <div className="flex-row space-between my-2">
            <label htmlFor="lastName">Last Name:</label>
            <StyledInput
              placeholder="Last"
              name="lastName"
              type="lastName"
              id="lastName"
              onChange={handleChange}
            />
          </div>
          <div className="flex-row space-between my-2">
            <label htmlFor="email">Email:</label>
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
          <div className="flex-row flex-end">
            <StyledButton className="button-hover" type="submit">
              Submit
            </StyledButton>
          </div>
        </StyledForm>
      </WhiteBackground>
    </StyledSignupBackground>
  );
}

export default Signup;
