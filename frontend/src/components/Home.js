import React from 'react';
import './HomePage.css';

const Home = () => {
  return (
    <div className="home-container">
      <header className="header-section">
        <h1>Welcome to Bumble for Roommates</h1>
        <h3>Your Perfect Roommate Match Awaits</h3>
        <p>Ever struggled to find the right roommate? With UMate, your search for the perfect roommate is just a swipe away!</p>
        <p>Whether you're a student looking for a place to stay off-campus or simply seeking a roommate who matches your preferences, UMate makes it easy to find your ideal living companion.</p>
      </header>

      <section className="how-it-works">
        <h2>How It Works</h2>
        <div className="steps">
          <div className="step">
            <h3>Create Your Profile</h3>
            <p>Sign up, customize your profile, and set preferences like budget, dietary needs, and lifestyle.</p>
          </div>
          <div className="step">
            <h3>Swipe for Matches</h3>
            <p>Just like a dating app, swipe right to connect with potential roommates or left to pass.</p>
          </div>
          <div className="step">
            <h3>Find Your Match</h3>
            <p>Our smart recommendation engine suggests the top roommate matches based on your preferences and compatibility.</p>
          </div>
        </div>
      </section>

      {/* <section className="features-section">
        <h2>Key Features</h2>
        <ul>
          <li><strong>User Authentication:</strong> Secure login and sign-up with email and password for personalized experiences.</li>
          <li><strong>Personalized Profiles:</strong> Share your preferences—budget, smoking habits, lifestyle, and more!</li>
          <li><strong>Smart Recommendations:</strong> Get the top 5 roommate matches based on your unique preferences.</li>
          <li><strong>Advanced Filtering:</strong> Filter potential roommates by budget, lifestyle habits, dietary needs, and more.</li>
          <li><strong>Swipe Interface:</strong> A fun and easy way to browse through roommate profiles, just like you would on dating apps.</li>
        </ul>
      </section> */}
    </div>
  );
};

export default Home;
