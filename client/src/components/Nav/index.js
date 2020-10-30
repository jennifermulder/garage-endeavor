import React from "react";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledHeader = styled.header`
  z-index: 10;
  `

function Nav() {

  function showNavigation() {
    if (Auth.loggedIn()) {
      return (
        <ul className="flex-row changing-size-profile-logout">
          <li className="mx-1">
            <Link to="/user">
              User Profile
            </Link>
          </li>
          <li className="mx-1">
            {/* this is not using the Link component to logout or user and then refresh the application to the start */}
            <a href="/" onClick={() => Auth.logout()}>
              Logout
            </a>
          </li>
        </ul>
      );
    } else {
      return (
        <ul className="flex-row changing-size-signup-login">
          <li className="mx-1">
            <Link to="/signup">
              Signup
            </Link>
          </li>
          <li className="mx-1">
            <Link to="/login">
              Login
            </Link>
          </li>
        </ul>
      );
    }
  }

  return (
    <StyledHeader className="flex-row px-1">
      <h1>
        <Link to="/">
          <span role="img" aria-label="shopping bag"></span>
          Garage Collage
        </Link>
      </h1>

      <nav>
        {showNavigation()}
      </nav>
    </StyledHeader>
  );
}

export default Nav;
