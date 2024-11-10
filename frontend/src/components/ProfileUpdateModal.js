// src/components/ProfileUpdateModal.js
import React, { useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";

const ProfileUpdateModal = ({
  showModal,
  handleClose,
  userData,
  handleSave,
}) => {
  const [formData, setFormData] = useState({
    name: userData.name || "",
    age: userData.age || "",
    gender: userData.gender || "",
    homeTown: userData.homeTown || "",
    identification: userData.identification || "",
    phone: userData.phone || "",
    title: userData.title || "",
    socialMedia: userData.socialMedia || {
      facebook: "",
      linkedin: "",
      twitter: "",
    },
    courseDuration: userData.courseDuration || "",
    degree: userData.degree || "",
    major: userData.major || "",
    startDate: userData.startDate || "",
    endDate: userData.endDate || "",
    budget: userData.budget || "",
    cleanliness: userData.cleanliness || "",
    cook: userData.cook || false,
    drink: userData.drink || false,
    hobbies: userData.hobbies || [],
    smoke: userData.smoke || false,
    dietaryPreference: userData.dietaryPreference || "",
  });

  const handleInputChange = (e, nestedField, field) => {
    const { value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setFormData((prevData) => {
      if (nestedField) {
        return {
          ...prevData,
          [nestedField]: { ...prevData[nestedField], [field]: newValue },
        };
      }
      return { ...prevData, [field]: newValue };
    });
  };

  const handleSaveClick = () => {
    handleSave(formData);
    handleClose();
  };

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton className="custom-modal-header">
        <Modal.Title>Update Profile</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {/* Basic Details */}
          {/* <h5>Basic Details</h5> */}
          <Row className="custom-input-row">
            <Col md={6}>
              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange(e, null, "name")}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="age">
                <Form.Label>Age</Form.Label>
                <Form.Control
                  type="number"
                  value={formData.age}
                  onChange={(e) => handleInputChange(e, null, "age")}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="custom-input-row">
            <Col md={6}>
              <Form.Group controlId="gender">
                <Form.Label>Gender</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.gender}
                  onChange={(e) => handleInputChange(e, null, "gender")}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="homeTown">
                <Form.Label>Home Town</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.homeTown}
                  onChange={(e) => handleInputChange(e, null, "homeTown")}
                />
              </Form.Group>
            </Col>
          </Row>
          {/* Title */}
          {/* <h5 className="mt-3">Title</h5> */}
          <Form.Group controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              value={formData.title}
              onChange={(e) => handleInputChange(e, null, "title")}
            />
          </Form.Group>
          <hr></hr>
          {/* Social Media */}
          <h5 className="mt-3">Social Media</h5>
          <Form.Group controlId="socialMediaFacebook">
            <Form.Label>Facebook</Form.Label>
            <Form.Control
              type="url"
              value={formData.socialMedia.facebook}
              onChange={(e) => handleInputChange(e, "socialMedia", "facebook")}
            />
          </Form.Group>
          <Form.Group controlId="socialMediaLinkedIn">
            <Form.Label>LinkedIn</Form.Label>
            <Form.Control
              type="url"
              value={formData.socialMedia.linkedin}
              onChange={(e) => handleInputChange(e, "socialMedia", "linkedin")}
            />
          </Form.Group>
          <Form.Group controlId="socialMediaTwitter">
            <Form.Label>Twitter</Form.Label>
            <Form.Control
              type="url"
              value={formData.socialMedia.twitter}
              onChange={(e) => handleInputChange(e, "socialMedia", "twitter")}
            />
          </Form.Group>
          <hr></hr>
          {/* Course Details */}
          <h5 className="mt-3">Course Details</h5>
          <Row className="custom-input-row">
            <Col md={6}>
              <Form.Group controlId="degree">
                <Form.Label>Degree</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.degree}
                  onChange={(e) => handleInputChange(e, null, "degree")}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="major">
                <Form.Label>Major</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.major}
                  onChange={(e) => handleInputChange(e, null, "major")}
                />
              </Form.Group>
            </Col>
          </Row>
          <hr></hr>
          {/* My Details */}
          <h5 className="mt-3">My Details</h5>
          <Row className="custom-input-row">
            <Col md={6}>
              <Form.Group controlId="budget">
                <Form.Label>Budget</Form.Label>
                <Form.Control
                  type="number"
                  value={formData.budget}
                  onChange={(e) => handleInputChange(e, null, "budget")}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="cleanliness">
                <Form.Label>Cleanliness</Form.Label>
                <Form.Control
                  as="select"
                  value={formData.cleanliness}
                  onChange={(e) => handleInputChange(e, null, "cleanliness")}
                >
                  <option value="Neat Freak">Neat Freak</option>
                  <option value="Clean">Clean</option>
                  <option value="Messy">Messy</option>
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>

          {/* Checkbox Fields */}
          <Row className="custom-input-row">
            <Col md={4}>
              <Form.Group controlId="cook">
                <Form.Check
                  type="checkbox"
                  label="Can Cook"
                  checked={formData.cook}
                  onChange={(e) => handleInputChange(e, null, "cook")}
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId="drink">
                <Form.Check
                  type="checkbox"
                  label="Drink"
                  checked={formData.drink}
                  onChange={(e) => handleInputChange(e, null, "drink")}
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId="smoke">
                <Form.Check
                  type="checkbox"
                  label="Smoke"
                  checked={formData.smoke}
                  onChange={(e) => handleInputChange(e, null, "smoke")}
                />
              </Form.Group>
            </Col>
          </Row>

          {/* Hobbies */}
          <Row className="custom-input-row">
            <Col md={6}>
              <Form.Group controlId="hobbies">
                <Form.Label>Hobbies (comma-separated)</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.hobbies.join(", ")}
                  onChange={(e) =>
                    setFormData((prevData) => ({
                      ...prevData,
                      hobbies: e.target.value
                        .split(",")
                        .map((hobby) => hobby.trim()),
                    }))
                  }
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="dietaryPreference">
                <Form.Label>Dietary Preference</Form.Label>
                <Form.Control
                  as="select"
                  value={formData.dietaryPreference}
                  onChange={(e) =>
                    handleInputChange(e, null, "dietaryPreference")
                  }
                >
                  <option value="Vegetarian">Vegetarian</option>
                  <option value="Non-Vegetarian">Non-Vegetarian</option>
                  <option value="Vegan">Vegan</option>
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button
          variant="primary"
          onClick={handleSaveClick}
          className="custom-filled-btn"
        >
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProfileUpdateModal;
