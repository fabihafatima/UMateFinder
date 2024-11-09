import './App.css';
import React, { useState, useEffect } from 'react';
import Profile from './components/Profile';
import Browse from './components/Browse';
import Navbar from './components/Navbar';
import Home from './components/Home';
import SignUp from './components/SignUp';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Loader from './components/Loader';  // Import the loader component

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); // Hide the loader after 3 seconds (for example)
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
    {loading && <Loader />}
      <Router>
      {!loading && (
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} userId={userId} setUserId={setUserId} password={password} setPassword={setPassword}/>
      )}
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile isLoggedIn={isLoggedIn}/>} />
            <Route path="/browse" element={<Browse isLoggedIn={isLoggedIn}/>} />
            <Route path="/signup" element={<SignUp/>} />
          </Routes>
        </div>
      </Router>
    </>

  );
}

export default App;
