import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";
import {
  faEye,
  faMessage,
  faStar as faStarSolid,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Button } from "react-bootstrap";
import "./UserCard.css"; // You can style the loader here

const UserCard = ({ user, mode, markAsFavourite, handleViewProfile , onChat }) => {
  const {
    name,
    age,
    gender,
    title,
    startDate,
    locations,
    isFav,
    budget,
    dietaryPreference,
    drink,
    smoke,
    email,
    photoUrl
  } = user;

  return (
    <div className="user-card" style={styles.card}>
      {/* First section - Photo */}
      <div className="user-photo" style={styles.photo}>
      <img
            src={photoUrl ? photoUrl : "/logo.jpg"}
            alt="Profile"
            className="profile-image"
          />
      </div>

      {/* Second section - User Info */}
      <div className="user-info" style={styles.info}>
        <h4>
          {name} | {age}
        </h4>
        <p className="info-gender">
          {gender} . <span className="info-start">Starting {startDate}</span>
        </p>
        <p>{title}</p>
        <p>Living Preferences: {locations && locations.join(", ")}</p>
      </div>

      {/* Third section - Action Buttons */}
      <div className="actions-btn-div-new">
        <Button className="custom-action-btn-new" onClick={() => {console.log(user);markAsFavourite(email,2);
          console.log(user)
        }}>
          {isFav || mode === "userProfile"? (
            <FontAwesomeIcon icon={faStarSolid} style={{ color: "#ffd600" }} />
          ) : (
            <FontAwesomeIcon
              icon={faStarRegular}
              style={{ color: "#ffd600" }}
            />
          )}
        </Button>
        <Button className="custom-action-btn-new">
          <FontAwesomeIcon icon={faMessage} style={{ color: "#ffd600" }} />
        </Button>
        <Button className="custom-action-btn-new" onClick={() => handleViewProfile(email)}>
          <FontAwesomeIcon icon={faEye} style={{ color: "#ffd600" }} />
        </Button>
      </div>
    </div>
  );
};

const styles = {
  card: {
    display: "flex",
    flexDirection: "row",
    border: "1px solid #ddd",
    borderRadius: "8px",
    margin: "10px",
    padding: "10px",
    boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
  },
  photo: {
    flex: 1,
    marginRight: "15px",
  },
  image: {
    width: "100%",
    borderRadius: "8px",
  },
  info: {
    flex: 2,
    display: "flex",
    flexDirection: "column",
  },
  actions: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
};

export default UserCard;
