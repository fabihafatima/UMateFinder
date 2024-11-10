import {
  faLinkedin,
  faSquareInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import {
  faPenToSquare,
  faSquareCheck,
  faSquareXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col } from "react-bootstrap";
import PreferenceUpdateModal from "./PreferenceUpdateModal";
import "./Profile.css";
import ProfileUpdateModal from "./ProfileUpdateModal";
import UserCard from "./UserCard";

const Profile = (props) => {
  const [favouriteRoommates, setFavouriteRoommates] = useState([]);
  const [showModal, setShowModal] = useState(false); // State for modal visibility
  const [showPreferenceModal, setShowPreferenceModal] = useState(false); // State for modal visibility

  const [userData, setUserData] = useState(props.userData); // Store the user data

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

  const handleSaveProfile = (updatedData) => {
    // You can make an API call here to update the user data in the backend
    axios
      .put(`http://127.0.0.1:5000/user/update`, updatedData)
      .then((response) => {
        console.log("Profile updated successfully:", response.data);
        setUserData(updatedData); // Update the local state with new data
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
      });
  };

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
                    style={{ color: "black" }}
                    className="fa-2x"
                  />
                </a>
              ))}
          </div>
        </div>
        <div className="basic-info-div">
          <div className="middle-div">
            <h3>{props.userData.title}</h3>
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
                <span>
                  {props.userData.isRoommateFound
                    ? "You’ve found a roommate!"
                    : "Still on the hunt!"}
                </span>
              </p>
            </div>
          </div>
          <ProfileUpdateModal
            showModal={showModal}
            handleClose={() => setShowModal(false)} // Close the modal
            userData={userData}
            handleSave={handleSaveProfile} // Pass the save handler
          />
          <div className="separator"></div>
          <section>
            <div className="user-info-update">
              <h4>More info: </h4>
              {props.mode === "edit" ? (
                <span>
                  <Button
                    className="custom-filled-btn"
                    variant="outline-primary"
                    onClick={() => setShowModal(true)} // Open the modal
                  >
                    Update Profile
                  </Button>
                </span>
              ) : (
                <></>
              )}
            </div>
            <hr></hr>
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
              <div className="drink-smoke-div"><span>
                <strong>Drinks:</strong>{" "}
                {props.userData.drink ? (
                  <FontAwesomeIcon icon={faSquareCheck} />
                ) : (
                  <FontAwesomeIcon icon={faSquareXmark} />
                )}
              </span>
              <span>
                <strong>Smokes:</strong>{" "}
                {props.userData.smoke ? (
                  <FontAwesomeIcon icon={faSquareCheck} />
                ) : (
                  <FontAwesomeIcon icon={faSquareXmark} />
                )}
              </span></div>
              
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

      <div
        className={
          props.mode === "view"
            ? "potential-roommate-section-view"
            : "potential-roommate-section"
        }
      >
        <section className="preferences-section">
          <div className="preference-section-heading">
            <h4 className="preference-heading">
              <strong>Roommate Preferences</strong>
            </h4>
            {props.mode === "edit" ? (
              <Button
                className="custom-update-btn"
                variant="outline-primary"
                onClick={() => setShowPreferenceModal(true)} // Open the modal
              >
                <FontAwesomeIcon icon={faPenToSquare} />{" "}
              </Button>
            ) : (
              <></>
            )}
          </div>
          <PreferenceUpdateModal
            showModal={showPreferenceModal}
            handleClose={() => setShowPreferenceModal(false)} // Close the modal
            userData={userData}
            handleSave={handleSaveProfile} // Pass the save handler
          />
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
                <strong>Open to: </strong>{" "}
                <div className="drink-smoke-div">
                <span>
                  Drinking{" "}
                  {props.userData.preference.openToDrink ? (
                    <FontAwesomeIcon icon={faSquareCheck} />
                  ) : (
                    <FontAwesomeIcon icon={faSquareXmark} />
                  )}
                </span>
                <span>
                  Smoking{" "}
                  {props.userData.preference.openToSmoke ? (
                    <FontAwesomeIcon icon={faSquareCheck} />
                  ) : (
                    <FontAwesomeIcon icon={faSquareXmark} />
                  )}
                </span>
                </div>
                
              </p>
            </>
          ) : (
            <>No preferences have been set</>
          )}
        </section>
        {props.mode === "edit" ? (
          <section className="favourites-section">
            <div className="favourites-section-heading">
              <h4>My Favourites</h4>
            </div>

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
