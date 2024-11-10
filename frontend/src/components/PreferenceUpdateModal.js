// src/components/PreferenceUpdateModal.js
import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';

const PreferenceUpdateModal = ({ showModal, handleClose, userData, handleSave }) => {
  const [formData, setFormData] = useState({
    cleanliness: userData.preference.cleanliness || '',
    dietaryPreference: userData.preference.dietaryPreference || '',
    gender: userData.preference.gender || '',
    location: userData.preference.location || [],
    numberOfRoommates: userData.preference.numberOfRoommates || '',
    openToDrink: userData.preference.openToDrink || false,
    openToSmoke: userData.preference.openToSmoke || false,
    roomPreference: userData.preference.roomPreference || ''
  });

  const handleInputChange = (e, field) => {
    const { value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;

    setFormData((prevData) => ({
      ...prevData,
      [field]: newValue
    }));
  };

  const handleSaveClick = () => {
    handleSave({ preference: formData });
    handleClose();
  };

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton className='custom-modal-header'>
        <Modal.Title>Update Preferences</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {/* Cleanliness */}
          <Form.Group controlId="cleanliness" className="custom-input-row">
            <Form.Label>Cleanliness</Form.Label>
            <Form.Control
              as="select"
              value={formData.cleanliness}
              onChange={(e) => handleInputChange(e, 'cleanliness')}
            >
              <option value="">Select Cleanliness Level</option>
              <option value="Neat Freak">Neat Freak</option>
              <option value="Clean">Clean</option>
              <option value="Messy">Messy</option>
            </Form.Control>
          </Form.Group>

          {/* Dietary Preference */}
          <Form.Group controlId="dietaryPreference" className="custom-input-row" >
            <Form.Label>Dietary Preference</Form.Label>
            <Form.Control
              as="select"
              value={formData.dietaryPreference}
              onChange={(e) => handleInputChange(e, 'dietaryPreference')}
            >
              <option value="">Select Dietary Preference</option>
              <option value="Vegetarian">Vegetarian</option>
              <option value="Non-Vegetarian">Non-Vegetarian</option>
              <option value="Vegan">Vegan</option>
            </Form.Control>
          </Form.Group>

          {/* Gender Preference */}
          <Form.Group controlId="gender" className="custom-input-row">
            <Form.Label>Gender Preference</Form.Label>
            <Form.Control
              as="select"
              value={formData.gender}
              onChange={(e) => handleInputChange(e, 'gender')}
            >
              <option value="">Select Gender Preference</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Any">Any</option>
            </Form.Control>
          </Form.Group>

          {/* Location */}
          <Form.Group controlId="location" className="custom-input-row">
            <Form.Label>Preferred Locations (comma-separated)</Form.Label>
            <Form.Control
              type="text"
              value={formData.location.join(', ')}
              onChange={(e) =>
                setFormData((prevData) => ({
                  ...prevData,
                  location: e.target.value.split(',').map((loc) => loc.trim())
                }))
              }
            />
          </Form.Group>

          {/* Number of Roommates */}
          <Form.Group controlId="numberOfRoommates" className="custom-input-row">
            <Form.Label>Number of Roommates</Form.Label>
            <Form.Control
              type="number"
              value={formData.numberOfRoommates}
              onChange={(e) => handleInputChange(e, 'numberOfRoommates')}
            />
          </Form.Group>
        <div className='custom-form-grid'>
        <Form.Group controlId="openToDrink" className="custom-input-row">
            <Form.Check
              type="checkbox"
              label="Open to Drink"
              checked={formData.openToDrink}
              onChange={(e) => handleInputChange(e, 'openToDrink')}
            />
          </Form.Group>

          {/* Open to Smoke */}
          <Form.Group controlId="openToSmoke" className="custom-input-row">
            <Form.Check
              type="checkbox"
              label="Open to Smoke"
              checked={formData.openToSmoke}
              onChange={(e) => handleInputChange(e, 'openToSmoke')}
            />
          </Form.Group>
        </div>
          {/* Open to Drink */}
          

          {/* Room Preference */}
          <Form.Group controlId="roomPreference" className="custom-input-row">
            <Form.Label>Room Preference</Form.Label>
            <Form.Control
              as="select"
              value={formData.roomPreference}
              onChange={(e) => handleInputChange(e, 'roomPreference')}
            >
              <option value="">Select Room Preference</option>
              <option value="Single Room">Single Room</option>
              <option value="Shared Room">Shared Room</option>
            </Form.Control>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSaveClick} className='custom-filled-btn'>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PreferenceUpdateModal;
