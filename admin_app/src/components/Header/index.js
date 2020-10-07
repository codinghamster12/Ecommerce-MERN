import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import {
  Link,
  NavLink
}
from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signout } from '../../actions/auth';

export default function Header(props) {
  const auth= useSelector(state => state.auth);
  const dispatch= useDispatch();

  const logout = () => {
    dispatch(signout());
  }
  const renderLoggedInLinks = () => {
    return (
      <Nav>
        <li className="nav-item">
      <span className="nav-link" onClick={logout}>Signout</span>
      </li>
      </Nav>
     
    )

  }

  const renderNonLoggedInLinks = () =>{
    return(
      <Nav>
      <li className="nav-item">
      <NavLink to="/signin" className="nav-link">Sign In</NavLink>
      </li>
      <li className="nav-item">
      <NavLink to="/signup" className="nav-link">Sign Up</NavLink>
      </li>
      
    </Nav>
    )

  }
  return (
    <>
      
        <Navbar style={{zIndex: 1}} fixed="top" collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container fluid>
          <Link to="/" className="navbar-brand">Admin Dashboard</Link>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto"></Nav>
            {auth.authenticate ? renderLoggedInLinks() : renderNonLoggedInLinks() }
            
          </Navbar.Collapse>
          </Container>
        </Navbar>

    </>
  );
}
