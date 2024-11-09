import './App.css';
import React, { useState } from 'react';
import Profile from './components/Profile';
import Browse from './components/Browse';
import Navbar from './components/Navbar';
import Home from './components/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <Router>
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} userId={userId} setUserId={setUserId} password={password} setPassword={setPassword}/>
        <div className="content">
          <Routes>
          <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/browse" element={<Browse />} />
          </Routes>
        </div>
      </Router>
    </>

  );
}

export default App;
