import {
  faLinkedin,
  faSquareInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import {
  faSquareCheck,
  faSquareXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Col } from "react-bootstrap";
import "./Profile.css";
import UserCard from "./UserCard";
import axios from "axios";

const Profile = ({ userData, mode }) => {
  const [favouriteRoommates, setFavouriteRoommates] = useState([]);
  useEffect(() => {
    // Check if userData and email are available before calling the API
    if (userData && userData.email) {
      // Replace with your API endpoint and include email as a query parameter
      axios
        .get(
          `http://127.0.0.1:5000/user/favourite-roommates?email=${userData.email}`
        )
        .then((response) => {
          setFavouriteRoommates(response.data); // Assuming API response has `roommates` array
        })
        .catch((error) => {
          console.error("Error fetching favourite roommates:", error);
        });
    }
  }, [userData]);

  return (
    <div className="user-profile">
      <div className="profile-header">
        <div className="social-div">
          <img
            src={userData.photoUrl ? userData.photoUrl : "/logo.jpg"}
            alt="Profile"
            className="profile-image"
          />
          <div className="social-btn-div">
            {userData.socialMedia &&
              userData.socialMedia.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="custom-social-btn"
                >
                  <FontAwesomeIcon
                    icon={
                      social.name === "instagram"
                        ? faSquareInstagram
                        : social.name === "linkedin"
                        ? faLinkedin
                        : social.name === "twitter"
                        ? faTwitter
                        : null
                    }
                    className="fa-2x"
                  />
                </a>
              ))}
          </div>
        </div>
        <div className="basic-info-div">
          <div className="middle-div">
            <h2>{userData.title}</h2>
            <p>
              {userData.age} years old | {userData.gender}
            </p>
            <p>
              Here for a {userData.degree} in {userData.major} for{" "}
              {userData.courseDuration} years
            </p>
            <p>
              From <strong>{userData.homeTown}</strong>
            </p>
            <br />
            <div>
              <p>
                {userData.isRoommateFound
                  ? "You’ve found a roommate!"
                  : "Still on the hunt!"}
              </p>
            </div>
          </div>
          <div className="separator"></div>
          <section>
            <h3>More info:</h3>
            <p>
              <strong>Budget:</strong> ${userData.budget}/month
            </p>
            <p>
              <strong>Cleanliness:</strong> {userData.cleanliness}
            </p>
            <p>
              <strong>Dietary Preference:</strong> {userData.dietaryPreference}
            </p>
            <p>
              <span>
                <strong>Drink:</strong>{" "}
                {userData.drink ? (
                  <FontAwesomeIcon icon={faSquareCheck} />
                ) : (
                  <FontAwesomeIcon icon={faSquareXmark} />
                )}
              </span>
              <span>
                <strong>Smoke:</strong>{" "}
                {userData.smoke ? (
                  <FontAwesomeIcon icon={faSquareCheck} />
                ) : (
                  <FontAwesomeIcon icon={faSquareXmark} />
                )}
              </span>
            </p>
            <p>
              <strong>Hobbies:</strong>{" "}
              {userData.hobbies && userData.hobbies.join(", ")}
            </p>
            <p>
              <strong>Cooking:</strong> {userData.cook ? "Yes" : "No"}
            </p>
          </section>
        </div>
      </div>

      <div className="potential-roommate-section">
        <section className="preferences-section">
          <h5>Potential Roommate Preferences</h5>
          {userData.preference ? (
            <>
              <p>
                <strong>Preferred Gender:</strong> {userData.preference.gender}
              </p>
              <p>
                <strong>Preferred Location:</strong>{" "}
                {userData.preference.location.join(", ")}
              </p>
              <p>
                <strong>Preferred Dietary Preference:</strong>{" "}
                {userData.preference.dietaryPreference}
              </p>
              <p>
                <strong>Number of Roommates:</strong>{" "}
                {userData.preference.numberOfRoommates}
              </p>
              <p>
                <strong>Room Preference:</strong>{" "}
                {userData.preference.roomPreference}
              </p>
              <p>
                <strong>Open to Drink:</strong>{" "}
                {userData.preference.openToDrink ? (
                  <FontAwesomeIcon icon={faSquareCheck} />
                ) : (
                  <FontAwesomeIcon icon={faSquareXmark} />
                )}
              </p>
              <p>
                <strong>Open to Smoke:</strong>{" "}
                {userData.preference.openToSmoke ? (
                  <FontAwesomeIcon icon={faSquareCheck} />
                ) : (
                  <FontAwesomeIcon icon={faSquareXmark} />
                )}
              </p>
            </>
          ) : (
            <>No preferences have been set</>
          )}
        </section>
          {
            mode==="edit"? <section className="favourites-section">
            <h3>My Favourites</h3>
            {favouriteRoommates.length > 0 ? (
              favouriteRoommates.map((user, index) => (
                <Col key={user.name} md={12} className="mb-4">
                  <UserCard
                    user={user}
                    onFavorite={() => console.log(`Favorite ${user.name}`)}
                    onChat={() => console.log(`Chat with ${user.name}`)}
                    onView={() => console.log(`View ${user.name}`)}
                  />
                </Col>
              ))
            ) : (
              <p>Loading favorite roommates...</p>
            )}
          </section>:<></>
          }
        
      </div>
    </div>
  );
};

export default Profile;
