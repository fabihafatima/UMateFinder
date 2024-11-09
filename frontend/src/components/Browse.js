import React, { useEffect, useState } from "react";
import "./Browser.css"; // You can style the loader here
import TableWithPagination from "./TableWithPagination";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as faStarSolid, faMessage, faEye } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarRegular} from '@fortawesome/free-regular-svg-icons';
import AdvancedFilterGrid from './AdvancedFilterGrid';

const Browse = (props) => {
  const [topRoommates, setTopRoommates] = useState([
    {
      userName: "Emma Johnson",
      age: "24",
      description: "Avid traveler with a knack for capturing sunsets.",
      img: "/images/s-img-1.jpg",
    },
    {
      userName: "Liam Smith",
      age: "18",
      description: "Coffee enthusiast and aspiring novelist.",
      img: "/images/s-img-2.jpg",
    },
    {
      userName: "Olivia Brown",
      age: "34",
      description: "Yoga instructor who loves sharing wellness tips.",
      img: "/images/s-img-3.jpg",
    },
    {
      userName: "Noah Davis",
      age: "23",
      description: "Software developer with a passion for hiking.",
      img: "/images/s-img-4.jpg",
    },
    {
      userName: "Sophia Garcia",
      age: "22",
      description: "Baker and culinary experimenter at heart.",
      img: "/images/s-img-5.jpg",
    },
]
);

const columns = [
  { headerName: 'Name', field: 'name', filter: 'agTextColumnFilter' },
  { headerName: 'Course Duration', field: 'courseDuration', filter: 'agTextColumnFilter' },
  { headerName: 'Home Town', field: 'homeTown', filter: 'agTextColumnFilter' },
  { headerName: 'Dietary Preference', field: 'dietaryPreference', filter: 'agTextColumnFilter' },
  { headerName: 'Drink', field: 'drink', filter: 'agTextColumnFilter' },
  { headerName: 'Smoke', field: 'smoke', filter: 'agTextColumnFilter' },
  { headerName: 'Cleanliness', field: 'cleanliness', filter: 'agNumberColumnFilter' },
  { headerName: 'Budget', field: 'budget', filter: 'agNumberColumnFilter' },
  { headerName: 'Identification', field: 'identification', filter: 'agTextColumnFilter' },
  { headerName: 'Cook', field: 'cook', filter: 'agTextColumnFilter' },
  { headerName: 'Age', field: 'age', filter: 'agNumberColumnFilter' },
  { headerName: 'Degree', field: 'degree', filter: 'agTextColumnFilter' },
  { headerName: 'Major', field: 'major', filter: 'agTextColumnFilter' },
  { headerName: 'Gender', field: 'gender', filter: 'agTextColumnFilter' }
];

const data = [
  { name: 'John Doe', courseDuration: '3 months', homeTown: 'New York', dietaryPreference: 'Vegan', drink: 'Water', smoke: 'No', cleanliness: 8, budget: 500, identification: 'Passport', cook: 'Yes', age: 25, degree: 'BSc', major: 'Computer Science', gender: 'Female' },
  { name: 'Jane Smith', courseDuration: '6 months', homeTown: 'Los Angeles', dietaryPreference: 'Vegetarian', drink: 'Coffee', smoke: 'Yes', cleanliness: 7, budget: 700, identification: 'ID Card', cook: 'No', age: 28, degree: 'BA', major: 'Economics', gender: 'Male' },
  { name: 'Alice Brown', courseDuration: '1 year', homeTown: 'Chicago', dietaryPreference: 'Non-Vegetarian', drink: 'Juice', smoke: 'No', cleanliness: 9, budget: 1000, identification: 'Driving License', cook: 'Yes', age: 30, degree: 'MA', major: 'Business Administration', gender: 'Female' },
  // Add more rows as needed...
];

  return (
    <>
      {props.isLoggedIn ? (
        <>
          <section className="speciality" id="speciality">
            <h3 class="heading">
              {" "}
              Top 5 <span>Suggestions</span>{" "}
            </h3>

            <div class="box-container">
              {topRoommates.map((roommate, index) => (
                <div className="main-box">
                  <div className="box" key={index}>
                    <img
                      className="image"
                      src={roommate.img}
                      alt={roommate.userName}
                    />
                    <div className="content">
                      <h5>{roommate.userName} | {roommate.age}</h5>
                      <p>{roommate.description}</p>
                    </div>
                  </div>
                  <div className="actions-btn-div">
                    <Button className="custom-action-btn"><FontAwesomeIcon icon={faStarRegular} style={{ color: '#ffbe0b' }}/></Button>
                    <Button className="custom-action-btn"><FontAwesomeIcon icon={faMessage} style={{ color: '#ffbe0b' }}/></Button>
                    <Button className="custom-action-btn"><FontAwesomeIcon icon={faEye} style={{ color: '#ffbe0b' }}/></Button>
                  </div>
                </div>
              ))}
            </div>
          </section>
          <section className="speciality">
            {/* <TableWithPagination data={roommateList} columns={columns} itemsPerPage={5} /> */}
            <AdvancedFilterGrid columns={columns} data={data} />

          </section>
          
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default Browse;
