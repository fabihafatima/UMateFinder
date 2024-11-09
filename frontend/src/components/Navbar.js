// src/components/Navbar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import './Navbar.css';
import axios from 'axios';

const Navbar = ({
    isLoggedIn,
    setIsLoggedIn,
    userId,
    setUserId,
    password,
    setPassword,
  }) => {
  const [showLoginModal, setShowLoginModal] = useState(false);

  const [isEmailValid, setIsEmailValid] = useState(true); // for email validation
  const [touched, setTouched] = useState(false); // for tracking interaction
  const [errorMessage, setErrorMessage] = useState("");

  const handleLoginModalShow = () => setShowLoginModal(true);
  const handleLoginModalClose = () => {
    setShowLoginModal(false);
    setUserId("");
    setPassword("");
    setIsEmailValid(true);
    setTouched(false);
  };

  const handleEmailChange = (e) => {
    setUserId(e.target.value);
    setTouched(true);

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsEmailValid(emailRegex.test(e.target.value));
  };

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      // Sending login data to the backend
    //   const response = await axios.post('http://localhost:8081/login', {
    //     email: userId,
    //     password: password
    //   });

      const response = {
        status: 200
      }

      // Handle success response (status 200)
      if (response.status === 200) {
        console.log('Login Success:', response.data);
		      setIsLoggedIn(true);
        setShowLoginModal(false); // Close the modal on successful login
        // Handle successful login logic (e.g., redirect to dashboard or store user data)
      }
    } catch (error) {
      // Handle error response based on status codes
      if (error.response) {
        switch (error.response.status) {
          case 401:
            setErrorMessage('Invalid credentials. Please check your password.');
            break;
          case 404:
            setErrorMessage('User not found. Please check your email.');
            break;
          case 500:
            setErrorMessage('Internal server error. Please try again later.');
            break;
          default:
            setErrorMessage('An unknown error occurred.');
        }
      } else {
        setErrorMessage('Error: Could not connect to the server.');
      }
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top">
      <div className="container custom-nav">
        <Link className="navbar-brand" to="/">UMate Finder</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          {!isLoggedIn ? 
          <><li className="nav-item">
          <Link className="nav-link" to="/profile">Profile</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/browse">Browse Roommates</Link>
        </li>
        </>
             : <></>}
          </ul>
          {!isLoggedIn ? 
          <div className="d-flex">
          <Button className="custom-btn" variant="outline-primary" onClick={handleLoginModalShow}>
            Login
          </Button>
          <Link to="/signup" className="btn btn-primary ms-2 custom-filled-btn">
            Sign Up
          </Link>
        </div>: <>Welcome {userId}</>}
        </div>
      </div>

      {/* Login Modal */}
      <Modal show={showLoginModal} onHide={handleLoginModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email address</label>
              <input
                type="email"
                className={`form-control ${!isEmailValid && touched ? 'is-invalid' : ''}`}
                id="email"
                onChange={handleEmailChange}
                value={userId}
                required
              />
              {!isEmailValid && touched && (
                <div className="invalid-feedback">Please enter a valid email.</div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
              />
            </div>
            <Button variant="primary" type="submit" disabled={!isEmailValid || !password}>
              Log In
            </Button>
          </form>
        </Modal.Body>
      </Modal>
    </nav>
  );
};

export default Navbar;
