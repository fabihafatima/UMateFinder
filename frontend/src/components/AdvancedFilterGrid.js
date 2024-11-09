import React, { useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const AdvancedFilterGrid = ({ columns, data }) => {
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const [filters, setFilters] = useState({});

  // Setting up grid options and column definitions
  const columnDefs = columns;

  // Setting up row data
  const rowData = data;

  // On Grid Ready to initialize the grid API and Column API
  const onGridReady = (params) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
  };

  // Function to handle filter changes
  const handleFilterChange = (field, value) => {
    setFilters(prevFilters => {
      const updatedFilters = { ...prevFilters, [field]: value };
      applyFilters(updatedFilters);
      return updatedFilters;
    });
  };

  // Function to apply filters to the grid
  const applyFilters = (filters) => {
    const filterModel = {};
    Object.keys(filters).forEach((field) => {
      if (filters[field]) {
        filterModel[field] = {
          filterType: 'text',
          type: 'contains',
          filter: filters[field],
        };
      }
    });
    gridApi.setFilterModel(filterModel);
  };

  return (
    <div>
      {/* Advanced Filter Inputs */}
      {/* <div className="filter-container">
        {columns.map(col => (
          <div key={col.field} className="filter-item">
            <label>{col.headerName}:</label>
            <input
              type="text"
              value={filters[col.field] || ''}
              onChange={(e) => handleFilterChange(col.field, e.target.value)}
              placeholder={`Filter by ${col.headerName}`}
            />
          </div>
        ))}
      </div> */}

      <div className="ag-theme-alpine" style={{ height: 400, width: '100%' }}>
        <AgGridReact
          onGridReady={onGridReady}
          columnDefs={columnDefs}
          rowData={rowData}
          pagination={true}
          domLayout="autoHeight"
          defaultColDef={{
            flex: 1,
            minWidth: 150,
            filter: true,
          }}
        />
      </div>
    </div>
  );
};

export default AdvancedFilterGrid;
