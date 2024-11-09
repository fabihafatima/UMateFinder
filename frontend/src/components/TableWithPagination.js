import React, { useState, useMemo } from "react";
import {
  Table,
  Pagination,
  Dropdown,
  ButtonGroup,
  InputGroup,
  FormControl,
  Button,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faMessage, faEye } from "@fortawesome/free-solid-svg-icons";

const TableWithPagination = ({
  data,
  columns,
  itemsPerPage = 5,
  onFavourite,
  onChat,
  onView,
}) => {
  const [filters, setFilters] = useState({});
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [globalSearch, setGlobalSearch] = useState("");

  // Get unique values for dropdown filter
  const uniqueValues = (field) => [...new Set(data.map((item) => item[field]))];

  // Handle sorting of columns
  const handleSort = (field) => {
    const order = sortField === field && sortOrder === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortOrder(order);
  };

  // Handle filter change in columns
  const handleFilterChange = (field, value) => {
    setFilters((prevFilters) => ({ ...prevFilters, [field]: value }));
    setCurrentPage(1);
  };

  // Clear filter for a column
  const clearFilter = (field) => {
    setFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters };
      delete updatedFilters[field];
      return updatedFilters;
    });
  };

  // Apply global search, filters, and sorting
  const filteredData = useMemo(() => {
    return data
      .filter((item) =>
        columns.some((col) =>
          item[col.accessor]
            .toString()
            .toLowerCase()
            .includes(globalSearch.toLowerCase())
        )
      )
      .filter((item) =>
        Object.keys(filters).every((key) =>
          filters[key] ? item[key] === filters[key] : true
        )
      )
      .sort((a, b) => {
        if (!sortField) return 0;
        const orderFactor = sortOrder === "asc" ? 1 : -1;
        return a[sortField] > b[sortField] ? orderFactor : -orderFactor;
      });
  }, [data, filters, sortField, sortOrder, globalSearch]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const displayedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div>
      {/* Global Search */}
      <InputGroup className="mb-3">
        <FormControl
          placeholder="Search"
          onChange={(e) => {
            setGlobalSearch(e.target.value);
            setCurrentPage(1);
          }}
        />
      </InputGroup>

      <Table hover className="custom-table">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.accessor}>
                <div className="table-header">
                  {/* Column Name with Sorting */}
                  <div className="d-flex align-items-center">
                    <span
                      style={{ cursor: "pointer" }}
                      onClick={() => handleSort(col.accessor)}
                      className="col-header"
                    >
                      {col.label}
                    </span>
                    {sortField === col.accessor ? (
                      <span>{sortOrder === "asc" ? "▲" : "▼"}</span>
                    ) : (
                      <span> ⇅</span>
                    )}
                  </div>

                  {/* Filter Dropdown */}
                  <Dropdown as={ButtonGroup} className="mt-2">
                    <Dropdown.Toggle variant="light" id="dropdown-basic">
                      {/* Filter */}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      {uniqueValues(col.accessor).map((value) => (
                        <Dropdown.Item
                          key={value}
                          onClick={() =>
                            handleFilterChange(col.accessor, value)
                          }
                        >
                          {value}
                        </Dropdown.Item>
                      ))}
                      <Dropdown.Divider />
                      <Dropdown.Item onClick={() => clearFilter(col.accessor)}>
                        Clear Filter
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </th>
            ))}
            {/* Action Column */}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {displayedData.map((item, index) => (
            <tr key={index}>
              {columns.map((col) => (
                <td key={col.accessor}>{item[col.accessor]}</td>
              ))}
              {/* Action Buttons */}
              <td>
                <div className="actions-btn-div">
                  <Button className="custom-action-btn">
                    <FontAwesomeIcon icon={faStar} style={{ color: "#ffbe0b" }} />
                  </Button>
                  <Button className="custom-action-btn">
                    <FontAwesomeIcon
                      icon={faMessage}
                      style={{ color: "#ffbe0b" }}
                    />
                  </Button>
                  <Button className="custom-action-btn">
                    <FontAwesomeIcon icon={faEye} style={{ color: "#ffbe0b" }} />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Pagination */}
      <Pagination>
        {[...Array(totalPages).keys()].map((page) => (
          <Pagination.Item
            key={page + 1}
            active={page + 1 === currentPage}
            onClick={() => setCurrentPage(page + 1)}
          >
            {page + 1}
          </Pagination.Item>
        ))}
      </Pagination>
    </div>
  );
};

export default TableWithPagination;
