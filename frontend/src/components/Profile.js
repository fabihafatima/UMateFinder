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
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col } from "react-bootstrap";
import "./Profile.css";
import UserCard from "./UserCard";

const Profile = (props) => {
  const [favouriteRoommates, setFavouriteRoommates] = useState([]);
  useEffect(() => {
    // Check if props.userData and email are available before calling the API
    if (props.userData && props.userData.email) {
      // Replace with your API endpoint and include email as a query parameter
      axios
        .get(
          `http://127.0.0.1:5000/user/favourite-roommates?email=${props.userData.email}`
        )
        .then((response) => {
          setFavouriteRoommates(response.data); // Assuming API response has `roommates` array
        })
        .catch((error) => {
          console.error("Error fetching favourite roommates:", error);
        });
    }
  }, [props.userData]);

  return (
    <div className="user-profile">
      <div className="profile-header">
        <div className="social-div">
          <img
            src={
              props.userData.photoUrl ? props.userData.photoUrl : "/logo.jpg"
            }
            alt="Profile"
            className="profile-image"
          />
          <div className="social-btn-div">
            {props.userData.socialMedia &&
              props.userData.socialMedia.map((social, index) => (
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
            <h2>{props.userData.title}</h2>
            <p>
              {props.userData.age} years old | {props.userData.gender}
            </p>
            <p>
              Here for a {props.userData.degree} in {props.userData.major} for{" "}
              {props.userData.courseDuration} years
            </p>
            <p>
              From <strong>{props.userData.homeTown}</strong>
            </p>
            <br />
            <div>
              <p>
                {props.userData.isRoommateFound
                  ? "You’ve found a roommate!"
                  : "Still on the hunt!"}
              </p>
            </div>
          </div>
          <div className="separator"></div>
          <section>
            <h3>More info:</h3>
            <p>
              <strong>Budget:</strong> ${props.userData.budget}/month
            </p>
            <p>
              <strong>Cleanliness:</strong> {props.userData.cleanliness}
            </p>
            <p>
              <strong>Dietary Preference:</strong>{" "}
              {props.userData.dietaryPreference}
            </p>
            <p>
              <span>
                <strong>Drink:</strong>{" "}
                {props.userData.drink ? (
                  <FontAwesomeIcon icon={faSquareCheck} />
                ) : (
                  <FontAwesomeIcon icon={faSquareXmark} />
                )}
              </span>
              <span>
                <strong>Smoke:</strong>{" "}
                {props.userData.smoke ? (
                  <FontAwesomeIcon icon={faSquareCheck} />
                ) : (
                  <FontAwesomeIcon icon={faSquareXmark} />
                )}
              </span>
            </p>
            <p>
              <strong>Hobbies:</strong>{" "}
              {props.userData.hobbies && props.userData.hobbies.join(", ")}
            </p>
            <p>
              <strong>Cooking:</strong> {props.userData.cook ? "Yes" : "No"}
            </p>
          </section>
        </div>
      </div>

      <div className="potential-roommate-section">
        <section className="preferences-section">
          <h5>Potential Roommate Preferences</h5>
          {props.userData.preference ? (
            <>
              <p>
                <strong>Preferred Gender:</strong>{" "}
                {props.userData.preference.gender}
              </p>
              <p>
                <strong>Preferred Location:</strong>{" "}
                {props.userData.preference.location.join(", ")}
              </p>
              <p>
                <strong>Preferred Dietary Preference:</strong>{" "}
                {props.userData.preference.dietaryPreference}
              </p>
              <p>
                <strong>Number of Roommates:</strong>{" "}
                {props.userData.preference.numberOfRoommates}
              </p>
              <p>
                <strong>Room Preference:</strong>{" "}
                {props.userData.preference.roomPreference}
              </p>
              <p>
                <strong>Open to Drink:</strong>{" "}
                {props.userData.preference.openToDrink ? (
                  <FontAwesomeIcon icon={faSquareCheck} />
                ) : (
                  <FontAwesomeIcon icon={faSquareXmark} />
                )}
              </p>
              <p>
                <strong>Open to Smoke:</strong>{" "}
                {props.userData.preference.openToSmoke ? (
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
        {props.mode === "edit" ? (
          <section className="favourites-section">
            <h3>My Favourites</h3>
            {favouriteRoommates.length > 0 ? (
              favouriteRoommates.map((user, index) => (
                <Col key={user.name} md={12} className="mb-4">
                  <UserCard
                    user={user}
                    mode="userProfile"
                    markAsFavourite={props.markAsFavourite}
                    handleViewProfile={props.handleViewProfile}
                    onChat={() => console.log(`Chat with ${user.name}`)}
                  />
                </Col>
              ))
            ) : (
              <p>Loading favorite roommates...</p>
            )}
          </section>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Profile;
