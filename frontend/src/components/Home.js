import React from "react";
import "./HomePage.css";
import {
  faUserPlus,
  faHeart,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Home = () => {
  return (
    <div className="home-container">
      <header className="header-section">
        <h1>Welcome to UMate</h1>
        <h3>Find Your Ideal Roommate with Ease</h3>
        <p>
          Say goodbye to endless roommate searches! UMate connects you with
          compatible roommates tailored to your lifestyle and preferences—just a
          swipe away.
        </p>
        <p>
          Whether you're a student looking for off-campus housing or need a
          roommate who fits your vibe, UMate streamlines the search for the
          perfect match.
        </p>
      </header>

      <section className="how-it-works">
        <h2>How It Works</h2>
        <div className="steps">
          <div className="step">
          <FontAwesomeIcon icon={faUserPlus} />{" "}
            <h3>Create Your Profile</h3>
            <p>
              Sign up, customize your profile, and set preferences like budget,
              dietary needs, and lifestyle.
            </p>
          </div>
          <div className="step">
          <FontAwesomeIcon icon={faHeart} />{" "}
            <h3>Swipe for Matches</h3>
            <p>
              Just like a dating app, swipe right to connect with potential
              roommates or left to pass.
            </p>
          </div>
          <div className="step">
          <FontAwesomeIcon icon={faSearch} />{" "}
            <h3>Find Your Match</h3>
            <p>
              Our smart recommendation engine suggests the top roommate matches
              based on your preferences and compatibility.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
