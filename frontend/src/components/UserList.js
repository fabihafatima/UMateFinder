import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Pagination } from 'react-bootstrap';
import UserCard from './UserCard';

const UserList = (props) => {
    const [filteredUsers, setFilteredUsers] = useState(props.users || []);
    const [filters, setFilters] = useState({
    maxBudget: '',
    dietaryPreference: '',
    drink: '',
    smoke: '',
    gender: '',
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const applyFilters = () => {
    setCurrentPage(1); // Reset to the first page when filters are applied
    setFilteredUsers(
      props.users.filter((user) => {
        return (
          (filters.maxBudget === '' || user.budget <= filters.maxBudget) &&
          (filters.dietaryPreference === '' || user.dietaryPreference === filters.dietaryPreference) &&
          (filters.drink === '' || user.drink === (filters.drink === 'yes')) &&
          (filters.smoke === '' || user.smoke === (filters.smoke === 'yes')) &&
          (filters.gender === '' || user.gender === filters.gender)
        );
      })
    );
  };

  // Calculate total pages
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  // Get users for the current page
  const displayedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Container>
      {/* Filters Section */}
      <Row className="mb-4">
        <Col>
          <Form.Group controlId="maxBudget">
            <Form.Label>Max Budget</Form.Label>
            <Form.Control
              type="number"
              name="maxBudget"
              value={filters.maxBudget}
              onChange={handleFilterChange}
              placeholder="Enter max budget"
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="dietaryPreference">
            <Form.Label>Dietary Preference</Form.Label>
            <Form.Control
              as="select"
              name="dietaryPreference"
              value={filters.dietaryPreference}
              onChange={handleFilterChange}
            >
              <option value="">All</option>
              <option value="non-veg">Non-Veg</option>
              <option value="halal">Halal</option>
              <option value="kosher">Kosher</option>
              <option value="vegan">Vegan</option>
              <option value="vegetarian">Vegetarian</option>
            </Form.Control>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="drink">
            <Form.Label>Drink</Form.Label>
            <Form.Control
              as="select"
              name="drink"
              value={filters.drink}
              onChange={handleFilterChange}
            >
              <option value="">All</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </Form.Control>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="smoke">
            <Form.Label>Smoke</Form.Label>
            <Form.Control
              as="select"
              name="smoke"
              value={filters.smoke}
              onChange={handleFilterChange}
            >
              <option value="">All</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </Form.Control>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="gender">
            <Form.Label>Gender</Form.Label>
            <Form.Control
              as="select"
              name="gender"
              value={filters.gender}
              onChange={handleFilterChange}
            >
              <option value="">All</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </Form.Control>
          </Form.Group>
        </Col>
        
      </Row>
      <div className='apply-filter-div'>
          <Button onClick={applyFilters} className='custom-filled-btn'>Apply Filters</Button>
        </div>
      {/* Cards Display (One Card Per Row) */}
      <Row>
        {displayedUsers.map((user) => (
          <Col key={user.name} md={12} className="mb-4 user-card-col">
            <UserCard
              user={user}
              markAsFavourite={props.markAsFavourite}
              handleViewProfile={props.handleViewProfile}
              onChat={() => console.log(`Chat with ${user.name}`)}
            />
          </Col>
        ))}
      </Row>

      {/* Pagination */}
      <Row>
        <Col>
          <Pagination>
            <Pagination.Prev
              onClick={() => setCurrentPage(currentPage > 1 ? currentPage - 1 : 1)}
            />
            {[...Array(totalPages).keys()].map((page) => (
              <Pagination.Item
                key={page + 1}
                active={page + 1 === currentPage}
                onClick={() => setCurrentPage(page + 1)}
              >
                {page + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next
              onClick={() => setCurrentPage(currentPage < totalPages ? currentPage + 1 : totalPages)}
            />
          </Pagination>
        </Col>
      </Row>
    </Container>
  );
};

export default UserList;
